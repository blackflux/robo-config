const plugin = require('./plugin');
const process = require('./process');

const fn = (...args) => process(...args);
fn.plugin = plugin;
module.exports = fn;
