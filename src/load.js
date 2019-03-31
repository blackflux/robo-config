const assert = require('assert');
const { syncDocs, generateDocs } = require('./plugin/docs');
const { applyTasksRec, listTasks } = require('./plugin/task');

module.exports = (p) => {
  assert(Object.keys(p).length === 4, 'Unknown property exposed.');
  assert(typeof p.taskDir === 'string');
  assert(typeof p.reqDir === 'string');
  assert(typeof p.varDir === 'string');
  assert(typeof p.docDir === 'string');

  return ({
    syncDocs: () => syncDocs(p.taskDir, p.reqDir, p.varDir, p.docDir),
    generateDocs: (pluginName, taskNames) => [
      `## Plugin [${pluginName}](https://www.npmjs.com/package/${pluginName})`,
      '',
      ...generateDocs(p.taskDir, p.reqDir, p.varDir, taskNames, 2)
    ],
    apply: (projectRoot, taskNames, variables) => applyTasksRec(p.taskDir, projectRoot, taskNames, variables),
    // todo: should generate CONFDOC.md file ?
    test: (projectRoot, variables) => applyTasksRec(p.taskDir, projectRoot, listTasks(p.taskDir), variables)
  });
};
