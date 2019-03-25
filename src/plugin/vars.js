const assert = require('assert');
const cloneDeep = require('lodash.clonedeep');
const difference = require('lodash.difference');
const objectScan = require('object-scan');

const varRegex = /\${([-_a-zA-Z0-9]+)}/g;
const varRegexExact = /^\${([-_a-zA-Z0-9]+)}$/g;

const substituteVariables = (input, variables, allowFullMatch, usedVars) => {
  assert(typeof input === 'string');
  assert(variables instanceof Object && !Array.isArray(variables));
  assert(typeof allowFullMatch === 'boolean');
  assert(usedVars instanceof Set);

  if (allowFullMatch === true && input.match(varRegexExact) !== null) {
    const varName = input.slice(2, -1);
    const result = variables[varName];
    assert(result !== undefined, `Unmatched Variable Found: $\{${varName}}`);
    usedVars.add(varName);
    return result;
  }
  return input
    .replace(varRegex, (_, varName) => {
      const result = variables[varName];
      assert(result !== undefined, `Unmatched Variable Found: $\{${varName}}`);
      assert(typeof result === 'string', `Variable Expected to be String: $\{${varName}}`);
      usedVars.add(varName);
      return result;
    });
};

module.exports.populateVars = (data, variables, allowUnused) => {
  assert(data instanceof Object);
  assert(variables instanceof Object && !Array.isArray(variables));
  assert(typeof allowUnused === 'boolean');

  const result = cloneDeep(data);
  const usedVars = new Set();

  objectScan(['**'], {
    joined: false,
    filterFn: (key, value, { parents }) => {
      const relKey = key[key.length - 1];
      const entry = { key: relKey, value };

      if (!Array.isArray(parents[0])) {
        entry.key = substituteVariables(entry.key, variables, false, usedVars);
      }
      if (typeof value === 'string') {
        entry.value = substituteVariables(entry.value, variables, true, usedVars);
      }

      const newKey = relKey !== entry.key;
      if (newKey) {
        // eslint-disable-next-line no-param-reassign
        delete parents[0][relKey];
      }
      if (newKey || entry.value !== value) {
        // eslint-disable-next-line no-param-reassign
        parents[0][entry.key] = entry.value;
      }

      return true;
    }
  })(result);

  assert(
    allowUnused === true
    || difference(Object.keys(variables), [...usedVars]).length === 0,
    `Unmatched Variables Provided: ${JSON.stringify(difference(Object.keys(variables), [...usedVars]))}`
  );

  return result;
};

module.exports.determineVars = (data) => {
  assert(data instanceof Object);

  const result = [];
  objectScan(['**'], {
    joined: false,
    filterFn: (key, value) => {
      [key[key.length - 1], value]
        .filter(str => typeof str === 'string')
        .map(str => str.match(varRegex))
        .filter(matches => matches !== null)
        .forEach(matches => result.push(...matches.map(m => m.slice(2, -1))));
      return true;
    }
  })(data);
  return result;
};
