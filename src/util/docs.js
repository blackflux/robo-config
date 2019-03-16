const assert = require('assert');


module.exports.generateDocs = (title, configs) => {
  assert(Array.isArray(configs) && configs.every(e => typeof e === 'string'));

  return [`# ${title}`];
};
