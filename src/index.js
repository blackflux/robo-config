const plugin = require('./plugin');
const pluginInit = require('./plugin-init');
const process = require('./process');

const fn = (...args) => process(...args);
fn.plugin = plugin;
fn.init = pluginInit;
module.exports = fn;
