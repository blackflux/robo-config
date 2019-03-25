const path = require('path');
const { plugin } = require('../../src/index');

module.exports = plugin(path.join(__dirname, 'plugin'));
