const assert = require('assert');
const path = require('path');
const sfs = require('smart-fs');

const documentConfig = (heading, config, level) => {
  assert(typeof heading === 'string');
  assert(config instanceof Object && !Array.isArray(config));
  assert(Number.isInteger(level));

  const result = [];
  if (typeof config.target === 'string') {
    result.push(`${'#'.repeat(level + 1)} ${heading}`, '');
    result.push(`_Updating \`${config.target}\` using \`${config.strategy}\`._`);
    result.push('');
    if (config.requires.length !== 0) {
      result.push(`_Requires ${config.requires.map(r => `\`${r}\``).join(', ')}._`);
      result.push('');
    }
    result.push(...config.purpose.map(d => `- ${d}`));
    result.push('');
  } else {
    result.push(`${'#'.repeat(level + 1)} \`${heading}\``, '');
    result.push(config.description);
    result.push('');
  }
  return result;
};

const generateDocsRec = (configNames, level = 0) => {
  assert(Array.isArray(configNames) && configNames.every(e => typeof e === 'string'));
  const result = [];
  configNames
    .sort((a, b) => b.includes('/@') - a.includes('/@'))
    .forEach((configName) => {
      const config = sfs.smartRead(sfs.guessFile(path.join(__dirname, '..', 'configs', configName)));
      result.push(...documentConfig(configName, config, level + 1));
      if (typeof config.target !== 'string') {
        result.push(`${'  '.repeat(level)}<details>`);
        result.push(`${'  '.repeat(level + 1)}<summary>Details</summary>`);
        result.push('');
        result.push(...generateDocsRec(config.configs || [], level + 1));
        result.push(`${'  '.repeat(level)}</details>`);
        result.push('');
      }
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
