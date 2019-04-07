const assert = require('assert');
const path = require('path');
const sfs = require('smart-fs');
const { syncDocs, generateDocs } = require('./plugin/docs');
const { applyTasksRec, listPublicTasks, extractMeta } = require('./plugin/task');

module.exports = (pl) => {
  assert(Object.keys(pl).length === 5, 'Unknown property exposed.');
  assert(typeof pl.name === 'string');
  assert(typeof pl.taskDir === 'string');
  assert(typeof pl.reqDir === 'string');
  assert(typeof pl.varDir === 'string');
  assert(typeof pl.docDir === 'string');

  const applyTasks = (projectRoot, taskNames, variables) => {
    const meta = extractMeta(pl.taskDir, taskNames);
    const unexpectedVars = Object.keys(variables).filter(v => !meta.variables.includes(v));
    assert(unexpectedVars.length === 0, `Unexpected Variable(s) Provided: ${unexpectedVars.join(', ')}`);
    return applyTasksRec(pl.taskDir, projectRoot, taskNames, variables);
  };
  const genDocs = taskNames => [
    `## Plugin [${pl.name}](https://www.npmjs.com/package/${pl.name})`,
    '',
    ...generateDocs(pl.name, pl.taskDir, pl.reqDir, pl.varDir, taskNames, 2)
  ];

  return ({
    syncDocs: () => syncDocs(pl.name, pl.taskDir, pl.reqDir, pl.varDir, pl.docDir),
    generateDocs: taskNames => genDocs(taskNames),
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
        const taskResult = applyTasks(taskRoot, [taskName], taskVars);
        if (sfs.smartWrite(path.join(taskRoot, 'CONFDOCS.md'), genDocs([taskName]))) {
          taskResult.push('Updated: CONFDOCS.md');
        }
        result[taskName] = taskResult;
      });
      assert(
        Object.keys(variables).filter(v => !knownVars.includes(v)).length === 0,
        `Unexpected variable provided: ${Object.keys(variables).filter(v => !knownVars.includes(v)).join(', ')}`
      );
      return result;
    }
  });
};
