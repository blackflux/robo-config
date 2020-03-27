const assert = require('assert');
const path = require('path');
const fs = require('smart-fs');
const Joi = require('joi-strict');
const { syncDocs, generateDocs } = require('./plugin/docs');
const { applyTasksRec, listPublicTasks, extractMeta } = require('./plugin/task');
const { populateVars } = require('./plugin/vars');

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

  const applyTasks = (projectRoot, taskNames, variables, exclude) => {
    assert(typeof projectRoot === 'string');
    assert(Array.isArray(taskNames));
    assert(variables instanceof Object && !Array.isArray(variables));
    assert(Array.isArray(exclude));

    const meta = extractMeta(pl.taskDir, taskNames);
    const unexpectedVars = Object.keys(variables).filter((v) => !meta.variables.includes(v));
    assert(unexpectedVars.length === 0, `Unexpected Variable(s) Provided: ${unexpectedVars.join(', ')}`);
    return applyTasksRec(pl.taskDir, projectRoot, taskNames, variables, exclude);
  };
  const genDocs = (taskNames, exclude) => [
    `## Plugin [${pl.name}](https://www.npmjs.com/package/${pl.name})`,
    '',
    ...generateDocs(pl.name, pl.taskDir, pl.reqDir, pl.varDir, pl.targetDir, taskNames, exclude, 2)
  ];

  return ({
    name: pl.name,
    getTargets: (taskNames) => extractMeta(pl.taskDir, taskNames),
    syncDocs: () => syncDocs(pl.name, pl.taskDir, pl.reqDir, pl.varDir, pl.targetDir, pl.docDir),
    generateDocs: (taskNames, exclude) => genDocs(taskNames, exclude),
    apply: applyTasks,
    test: (testRoot, variables = {}) => {
      const knownTargets = fs
        .walkDir(testRoot)
        .reduce((p, c) => Object.assign(p, { [c]: false }), {});
      const taskNames = listPublicTasks(pl.taskDir);
      const result = {};
      const knownVars = [];
      taskNames.forEach((taskName) => {
        const taskRoot = path.join(testRoot, taskName);
        const meta = extractMeta(pl.taskDir, [taskName]);
        const taskVars = meta.variables
          .reduce((p, c) => Object.assign(p, { [c]: variables[c] || c }), {});
        knownTargets[path.join(taskName, 'CONFDOCS.md')] = true;
        knownTargets[path.join(taskName, '.roboconfig.lock')] = true;
        meta.target.forEach((t) => {
          knownTargets[path.join(taskName, populateVars({ t }, taskVars, true).t)] = true;
        });
        knownVars.push(...Object.keys(taskVars));
        const taskResult = applyTasks(taskRoot, [taskName], taskVars, []);
        if (fs.smartWrite(path.join(taskRoot, 'CONFDOCS.md'), genDocs([taskName], []))) {
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
      assert(rougeTargets.length === 0, `Rouge test targets detected: ${rougeTargets}`);
      return result;
    }
  });
};
