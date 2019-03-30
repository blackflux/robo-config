const pluginInit = require('./plugin-init');
const process = require('./process');

const fn = (...args) => process(...args);
fn.init = pluginInit;
module.exports = fn;
