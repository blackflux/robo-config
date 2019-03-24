const path = require('path');
const { syncDocs, generateDocs } = require('./plugin/docs');
const { applyTaskRec } = require('./plugin/task');

module.exports = (pluginDir) => {
  const taskDir = path.join(pluginDir, 'tasks');
  const docsDir = path.join(pluginDir, 'docs');

  return {
    syncDocs: () => syncDocs(taskDir, docsDir),
    generateDocs: (pluginName, taskNames) => [
      `## Plugin \`${pluginName}\``,
      '',
      ...generateDocs(taskDir, taskNames, 2)
    ],
    applyTaskRec: (projectRoot, tasks, variables) => applyTaskRec(taskDir, projectRoot, tasks, variables)
  };
};
