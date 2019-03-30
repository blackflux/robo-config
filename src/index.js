const load = require('./load');
const process = require('./process');

const fn = (...args) => process(...args);
fn.load = load;
module.exports = fn;
