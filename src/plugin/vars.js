const assert = require('assert');
const cloneDeep = require('lodash.clonedeep');
const difference = require('lodash.difference');
const objectScan = require('object-scan');

const modifiers = {
  UPPER: (input) => input.toUpperCase(),
  TITLE: (input) => input.toLowerCase().replace(
    /(?:^\w|[A-Z]|\b\w)/g,
    (w) => w.toUpperCase()
  ),
  CAMEL: (input) => input.replace(
    /(?:^\w|[A-Z]|\b\w)/g,
    (w, idx) => (idx === 0 ? w.toLowerCase() : w.toUpperCase())
  ).replace(/[^a-zA-Z0-9]+/g, ''),
  LOWER: (input) => input.toLowerCase(),
  KEBAB: (input) => input.replace(/[^a-zA-Z0-9]+/g, '-'),
  SNAKE: (input) => input.replace(/[^a-zA-Z0-9]+/g, '_'),
  STRIP: (input) => input.replace(/[^a-zA-Z0-9]+/g, '')
};
const applyModifier = (input, modifier) => {
  if (typeof input !== 'string') {
    return input;
  }
  if (modifier === undefined) {
    return input;
  }
  return modifier.slice(1).split('|').reduce((value, m) => modifiers[m](value), input);
};

const varNameGroup = new RegExp([
  /(?<varName>[-_a-zA-Z0-9]+)/.source,
  '(?<modifier>(?:\\|(?:',
  Object.keys(modifiers).join('|'),
  '))+)?'
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
    const { varName, modifier } = varRegexExact.exec(input).groups;
    result = applyModifier(variables[varName], modifier);
    assert(result !== undefined, `Unmatched Variable Found: $\{${varName}}`);
    usedVars.add(varName);
  } else {
    result = input
      .replace(varRegex, (...args) => {
        const { varName, modifier } = args[args.length - 1];
        const r = applyModifier(variables[varName], modifier);
        assert(r !== undefined, `Unmatched Variable Found: $\{${varName}}`);
        assert(!(r instanceof Object), `Variable Expected to be Primitive: $\{${varName}}`);
        usedVars.add(varName);
        return r;
      });
  }
  return typeof result === 'string'
    ? result.replace(escapedVarRegex, (...args) => {
      const { escape, varName } = args[args.length - 1];
      return `$${escape.slice(1)}{${varName}}`;
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
            result.push(varRegex.exec(m).groups.varName);
          });
        });
      return true;
    }
  })(data);
  return result;
};

module.exports.varTypes = {
  string: (v) => typeof v === 'string',
  boolean: (v) => typeof v === 'boolean',
  object: (v) => v instanceof Object && !Array.isArray(v),
  array: (v) => Array.isArray(v),
  number: (v) => typeof v === 'number',
  integer: (v) => Number.isInteger(v)
};
