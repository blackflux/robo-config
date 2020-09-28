const assert = require('assert');
const path = require('path');
const fs = require('smart-fs');
const Joi = require('joi-strict');
const { syncDocs, generateDocs } = require('./plugin/docs');
const { applyTasksRec, listPublicTasks, extractMeta } = require('./plugin/task');
const { populateVars, varTypes } = require('./plugin/vars');

module.exports = (pl) => {
  Joi.assert(pl, Joi.object().keys({
    name: Joi.string(),
    taskDir: Joi.string(),
    reqDir: Joi.string(),
    varDir: Joi.string(),
    targetDir: Joi.string(),
    docDir: Joi.string(),
    exports: Joi.any().optional()
  }), 'Bad Plugin Definition.');

  const var2Type = fs.walkDir(pl.varDir).reduce((p, f) => Object.assign(p, {
    [f.slice(0, -5)]: fs.smartRead(path.join(pl.varDir, f)).type
  }), {});

  const applyTasks = (projectRoot, tasks, variables, exclude) => {
    assert(typeof projectRoot === 'string');
    assert(
      Array.isArray(tasks) && tasks.every((e) => !Array.isArray(e) && e instanceof Object),
      'Invalid "tasks" parameter format.'
    );
    assert(variables instanceof Object && !Array.isArray(variables));
    assert(Array.isArray(exclude));

    const meta = extractMeta(pl.taskDir, tasks);
    const vars = { ...variables };
    meta.variables.forEach((v) => {
      if (vars[v] === undefined) {
        const varPath = path.join(pl.varDir, `${v}.json`);
        assert(fs.existsSync(varPath), `Unexpected Variable Detected: ${v}`);
        const varDef = fs.smartRead(varPath);
        if (varDef.default !== undefined) {
          vars[v] = varDef.default;
        }
      }
    });
    const unexpectedVars = Object.keys(vars)
      .filter((v) => !meta.variables.includes(v));
    assert(unexpectedVars.length === 0, `Unexpected Variable(s) Provided: ${unexpectedVars.join(', ')}`);
    return applyTasksRec(pl.taskDir, projectRoot, tasks, vars, exclude);
  };
  const genDocs = (tasks, exclude) => [
    `## Plugin [${pl.name}](https://www.npmjs.com/package/${pl.name})`,
    '',
    ...generateDocs(pl.name, pl.taskDir, pl.reqDir, pl.varDir, pl.targetDir, tasks, exclude, 2)
  ];

  return ({
    name: pl.name,
    getTargets: (tasks) => extractMeta(pl.taskDir, tasks),
    syncDocs: () => syncDocs(pl.name, pl.taskDir, pl.reqDir, pl.varDir, pl.targetDir, pl.docDir),
    generateDocs: (tasks, exclude) => genDocs(tasks, exclude),
    apply: applyTasks,
    validateVars: (vars) => {
      Object.entries(vars).forEach(([k, v]) => {
        const types = Array.isArray(var2Type[k]) ? var2Type[k] : [var2Type[k]];
        if (!types.some((t) => varTypes[t](v) === true)) {
          throw new Error(`Invalid variable type for "${k}". Expected "${var2Type[k]}".`);
        }
      });
    },
    test: (testRoot, variables = {}) => {
      const knownTargets = fs
        .walkDir(testRoot)
        .reduce((p, c) => Object.assign(p, { [c]: false }), {});
      const taskNames = listPublicTasks(pl.taskDir);
      const result = {};
      const knownVars = [];
      taskNames.forEach((taskName) => {
        const task = [{ name: taskName, variables: {} }];
        const taskRoot = path.join(testRoot, taskName);
        const meta = extractMeta(pl.taskDir, task);
        const taskVars = meta.variables
          .reduce((p, c) => Object.assign(p, { [c]: variables[c] || c }), {});
        knownTargets[path.join(taskName, 'CONFDOCS.md')] = true;
        knownTargets[path.join(taskName, '.roboconfig.lock')] = true;
        meta.target.forEach((t) => {
          const target = populateVars([t], taskVars, true)[0];
          knownTargets[path.join(taskName, target)] = true;
        });
        knownVars.push(...Object.keys(taskVars));
        const taskResult = applyTasks(taskRoot, task, taskVars, []);
        if (fs.smartWrite(path.join(taskRoot, 'CONFDOCS.md'), genDocs(task, []))) {
          taskResult.push('Updated: CONFDOCS.md');
        }
        result[taskName] = taskResult;
      });
      assert(
        Object.keys(variables).filter((v) => !knownVars.includes(v)).length === 0,
        `Unexpected variable provided: ${Object.keys(variables).filter((v) => !knownVars.includes(v)).join(', ')}`
      );
      const rougeTargets = Object
        .entries(knownTargets)
        .filter(([_, v]) => v !== true);
      assert(
        rougeTargets.length === 0,
        `Rouge test targets detected: ${JSON.stringify(rougeTargets)}`
      );
      return result;
    }
  });
};
