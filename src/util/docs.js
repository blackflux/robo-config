const assert = require('assert');
const path = require('path');
const sfs = require('smart-fs');

const generateDocs = (title, description, configNames, level = 0) => {
  assert(Array.isArray(configNames) && configNames.every(e => typeof e === 'string'));

  const result = [`${'#'.repeat(level + 1)} ${title}`, '', description, ''];

  configNames
    .sort((a, b) => a.includes('/@') - b.includes('/@'))
    .forEach((configName) => {
      const config = sfs.smartRead(sfs.guessFile(path.join(__dirname, '..', 'configs', configName)));
      result.push(...generateDocs(configName, config.description, config.configs || [], level + 1));
    });

  return result;
};
module.exports.generateDocs = generateDocs;
