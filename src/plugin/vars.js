const assert = require('assert');
const cloneDeep = require('lodash.clonedeep');
const difference = require('lodash.difference');
const objectScan = require('object-scan');

const modifiers = {
  CAPS: (input) => input.toUpperCase(),
  TITLE: (input) => `${input.slice(0, 1).toUpperCase()}${input.slice(1).toLowerCase()}`
};
const applyModifier = (input, modifier) => {
  if (typeof input !== 'string') {
    return input;
  }
  if (modifier === undefined) {
    return input;
  }
  return modifiers[modifier](input);
};

const varNameGroup = new RegExp([
  /(?<name>[-_a-zA-Z0-9]+)/.source,
  '(?:\\|(?<modifier>',
  Object.keys(modifiers).join('|'),
  '))?'
].join(''), 'g');

const varRegex = new RegExp([
  /\${/.source,
  varNameGroup.source,
  /}/.source
].join(''), 'g');
const varRegexExact = new RegExp([
  /^/.source,
  varRegex.source,
  /$/.source
].join(''), 'g');
const escapedVarRegex = new RegExp([
  /\$(?<escape>[\\]+){/.source,
  varNameGroup.source,
  /}/.source
].join(''), 'g');


const substituteVariables = (input, variables, allowFullMatch, usedVars) => {
  assert(typeof input === 'string', 'Invalid "input" parameter format.');
  assert(variables instanceof Object && !Array.isArray(variables), 'Invalid "variables" parameter format.');
  assert(typeof allowFullMatch === 'boolean', 'Invalid "allowFullMatch" parameter format.');
  assert(usedVars instanceof Set, 'Invalid "usedVars" parameter format.');

  let result;
  if (allowFullMatch === true && input.match(varRegexExact) !== null) {
    const { name, modifier } = varRegexExact.exec(input).groups;
    result = applyModifier(variables[name], modifier);
    assert(result !== undefined, `Unmatched Variable Found: $\{${name}}`);
    usedVars.add(name);
  } else {
    result = input
      .replace(varRegex, (...args) => {
        const { name, modifier } = args[args.length - 1];
        const r = applyModifier(variables[name], modifier);
        assert(r !== undefined, `Unmatched Variable Found: $\{${name}}`);
        assert(typeof r === 'string', `Variable Expected to be String: $\{${name}}`);
        usedVars.add(name);
        return r;
      });
  }
  return typeof result === 'string'
    ? result.replace(escapedVarRegex, (...args) => {
      const { escape, name } = args[args.length - 1];
      return `$${escape.slice(1)}{${name}}`;
    })
    : result;
};

module.exports.populateVars = (data, variables, allowUnused) => {
  assert(data instanceof Object, 'Invalid "data" parameter format.');
  assert(variables instanceof Object && !Array.isArray(variables), 'Invalid "variables" parameter format.');
  assert(typeof allowUnused === 'boolean', 'Invalid "allowUnused" parameter format.');

  const result = cloneDeep(data);
  const usedVars = new Set();

  objectScan(['**'], {
    joined: false,
    filterFn: ({ key, value, parents }) => {
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
  assert(data instanceof Object, 'Invalid "data" parameter format.');

  const result = [];
  objectScan(['**'], {
    joined: false,
    filterFn: ({ key, value }) => {
      [key[key.length - 1], value]
        .filter((str) => typeof str === 'string')
        .map((str) => str.match(varRegex))
        .filter((matches) => matches !== null)
        .forEach((matches) => {
          matches.forEach((m) => {
            result.push(varRegex.exec(m).groups.name);
          });
        });
      return true;
    }
  })(data);
  return result;
};
