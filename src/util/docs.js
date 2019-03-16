const assert = require('assert');
const path = require('path');
const sfs = require('smart-fs');

const documentConfig = (heading, config, level = 0) => {
  assert(typeof configName === 'string');
  assert(config instanceof Object && !Array.isArray(config));
  assert(Number.isInteger(level));

  const result = [];
  result.push(`${'#'.repeat(level + 1)} ${heading}`, '');
  const hasTarget = typeof config.target === 'string';
  if (hasTarget) {
    result.push(`_Updating \`${config.target}\` using \`${config.strategy}\`._`);
    result.push('');
    result.push(...config.purpose.map(d => `- ${d}`));
    result.push('');
  } else {
    result.push(config.description);
    result.push('');
  }
  return result;
};

const generateDocsRec = (configNames, level = 0) => {
  assert(Array.isArray(configNames) && configNames.every(e => typeof e === 'string'));
  const result = [];
  configNames
    .sort((a, b) => a.includes('/@') - b.includes('/@'))
    .forEach((configName) => {
      const config = sfs.smartRead(sfs.guessFile(path.join(__dirname, '..', 'configs', configName)));
      result.push(...documentConfig(configName, config, level + 1));
      result.push(...generateDocsRec(config.configs || [], level + 1));
    });
  return result;
};

const generateDocs = (title, details, configNames) => {
  assert(typeof title === 'string');
  assert(typeof details === 'string');
  assert(Array.isArray(configNames) && configNames.every(e => typeof e === 'string'));
  return [
    `# ${title}`,
    '',
    `${details}`,
    '',
    ...generateDocsRec(configNames)
  ];
};

module.exports.generateDocs = generateDocs;
