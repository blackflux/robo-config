const path = require('path');
const { plugin } = require('./index');

module.exports = plugin(path.join(__dirname, 'plugin'));
