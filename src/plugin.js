const path = require('path');

// todo: some basic path validation etc
module.exports = pluginDir => ({
  taskDir: path.join(pluginDir, 'tasks'),
  docsDir: path.join(pluginDir, 'docs')
});
