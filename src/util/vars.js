const assert = require('assert');
const cloneDeep = require('lodash.clonedeep');
const objectScan = require('object-scan');

module.exports.injectVars = (data, variables) => {
  const result = cloneDeep(data);
  const variableEntries = Object
    .entries(variables)
    .map(([k, v]) => [`\${${k}}`, v]);

  // todo: test for unmatched variables

  objectScan(['**'], {
    joined: false,
    filterFn: (key, value, { parents }) => {
      const parentTarget = key[key.length - 1];
      const entry = { key: parentTarget, value };
      const inArray = Array.isArray(parents[0]);
      const isString = typeof value === 'string';
      variableEntries.forEach(([k, v]) => {
        if (!inArray) {
          while (entry.key.indexOf(k) !== -1) {
            assert(typeof v === 'string');
            entry.key = entry.key.replace(k, v);
          }
        }
        if (isString) {
          if (entry.value === k) {
            entry.value = v;
          } else {
            while (entry.value.indexOf(k) !== -1) {
              assert(typeof v === 'string');
              entry.value = entry.value.replace(k, v);
            }
          }
        }
      });
      if (parentTarget !== entry.key) {
        // eslint-disable-next-line no-param-reassign
        delete parents[0][parentTarget];
      }
      // eslint-disable-next-line no-param-reassign
      parents[0][entry.key] = entry.value;
      return true;
    }
  })(result);

  return result;
};
