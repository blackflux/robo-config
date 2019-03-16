const assert = require('assert');
const path = require('path');
const sfs = require('smart-fs');

const generateDocs = (title, details, configNames, level = 0) => {
  assert(Array.isArray(configNames) && configNames.every(e => typeof e === 'string'));

  const result = [`${'#'.repeat(level + 1)} ${title}`, ''];
  if (Array.isArray(details)) {
    result.push(...details.map(d => `- ${d}`));
  } else {
    result.push(details);
  }
  result.push('');

  configNames
    .sort((a, b) => a.includes('/@') - b.includes('/@'))
    .forEach((configName) => {
      const config = sfs.smartRead(sfs.guessFile(path.join(__dirname, '..', 'configs', configName)));
      result.push(...generateDocs(configName, config.description || config.purpose, config.configs || [], level + 1));
    });

  return result;
};
module.exports.generateDocs = generateDocs;
