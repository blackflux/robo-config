const path = require('path');

module.exports = ({
  name: 'mock-plugin',
  taskDir: path.join(__dirname, 'plugin', 'tasks'),
  docDir: path.join(__dirname, 'plugin', 'docs'),
  reqDir: path.join(__dirname, 'plugin', 'reqs'),
  varDir: path.join(__dirname, 'plugin', 'vars'),
  targetDir: path.join(__dirname, 'plugin', 'targets')
});
