const path = require('path');
const { syncDocs, generateDocs } = require('./docs');
const { applyTaskRec } = require('./task');

module.exports = (pluginDir) => {
  const taskDir = path.join(pluginDir, 'tasks');

  return {
    syncDocs: () => syncDocs(taskDir, path.join(pluginDir, 'docs')),
    generateDocs: (taskNames, baseLevel) => generateDocs(taskDir, taskNames, baseLevel),
    applyTaskRec: (projectRoot, tasks, variables) => applyTaskRec(taskDir, projectRoot, tasks, variables)
  };
};
