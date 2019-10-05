const assert = require('assert');
const path = require('path');
const fs = require('smart-fs');
const Joi = require('joi-strict');
const { syncDocs, generateDocs } = require('./plugin/docs');
const { applyTasksRec, listPublicTasks, extractMeta } = require('./plugin/task');
const lockFile = require('./lock-file');

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

    lockFile.resetPlugin(projectRoot, pl.name);

    const meta = extractMeta(pl.taskDir, taskNames);
    const unexpectedVars = Object.keys(variables).filter((v) => !meta.variables.includes(v));
    assert(unexpectedVars.length === 0, `Unexpected Variable(s) Provided: ${unexpectedVars.join(', ')}`);
    const result = applyTasksRec(pl.name, pl.taskDir, projectRoot, taskNames, variables, exclude);

    lockFile.validatePlugin(projectRoot, pl.name);

    return result;
  };
  const genDocs = (taskNames, exclude) => [
    `## Plugin [${pl.name}](https://www.npmjs.com/package/${pl.name})`,
    '',
    ...generateDocs(pl.name, pl.taskDir, pl.reqDir, pl.varDir, pl.targetDir, taskNames, exclude, 2)
  ];

  return ({
    name: pl.name,
    syncDocs: () => syncDocs(pl.name, pl.taskDir, pl.reqDir, pl.varDir, pl.targetDir, pl.docDir),
    generateDocs: (taskNames, exclude) => genDocs(taskNames, exclude),
    apply: applyTasks,
    test: (testRoot, variables = {}) => {
      const taskNames = listPublicTasks(pl.taskDir);
      const result = {};
      const knownVars = [];
      taskNames.forEach((taskName) => {
        const taskRoot = path.join(testRoot, taskName);
        const taskVars = extractMeta(pl.taskDir, [taskName]).variables
          .reduce((p, c) => Object.assign(p, { [c]: variables[c] || c }), {});
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
      return result;
    }
  });
};
