const path = require('path');
const { syncDocs, generateDocs } = require('./docs');

module.exports = (pluginDir) => {
  const taskDir = path.join(pluginDir, 'tasks');

  return {
    taskDir,
    syncDocs: () => syncDocs(taskDir, path.join(pluginDir, 'docs')),
    generateDocs: (taskNames, baseLevel) => generateDocs(taskDir, taskNames, baseLevel)
  };
};
