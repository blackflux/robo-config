const path = require('path');

module.exports = ({
  taskDir: path.join(__dirname, 'plugin', 'tasks'),
  docDir: path.join(__dirname, 'plugin', 'docs'),
  reqDir: path.join(__dirname, 'plugin', 'reqs'),
  varDir: path.join(__dirname, 'plugin', 'vars')
});
