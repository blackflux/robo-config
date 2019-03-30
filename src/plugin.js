const path = require('path');
const { syncDocs, generateDocs } = require('./plugin/docs');
const { applyTasksRec, listTasks } = require('./plugin/task');

module.exports = (pluginDir) => {
  const taskDir = path.join(pluginDir, 'tasks');
  const docsDir = path.join(pluginDir, 'docs');

  return {
    syncDocs: () => syncDocs(taskDir, docsDir),
    generateDocs: (pluginName, taskNames) => [
      `## Plugin [${pluginName}](https://www.npmjs.com/package/${pluginName})`,
      '',
      ...generateDocs(taskDir, taskNames, 2)
    ],
    apply: (projectRoot, taskNames, variables) => applyTasksRec(taskDir, projectRoot, taskNames, variables),
    test: (projectRoot, variables) => applyTasksRec(taskDir, projectRoot, listTasks(taskDir), variables)
  };
};
