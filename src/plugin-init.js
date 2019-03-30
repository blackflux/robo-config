const { syncDocs, generateDocs } = require('./plugin/docs');
const { applyTasksRec, listTasks } = require('./plugin/task');

module.exports = p => (p.apply === undefined ? ({
  syncDocs: () => syncDocs(p.taskDir, p.docsDir),
  generateDocs: (pluginName, taskNames) => [
    `## Plugin [${pluginName}](https://www.npmjs.com/package/${pluginName})`,
    '',
    ...generateDocs(p.taskDir, taskNames, 2)
  ],
  apply: (projectRoot, taskNames, variables) => applyTasksRec(p.taskDir, projectRoot, taskNames, variables),
  // todo: should generate CONFDOC.md file
  test: (projectRoot, variables) => applyTasksRec(p.taskDir, projectRoot, listTasks(p.taskDir), variables)
}) : p);
