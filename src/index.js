import load from './load.js';
import process from './process.js';

const fn = async (...args) => process(...args);
fn.load = load;
export default fn;
