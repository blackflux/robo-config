const assert = require('assert');


module.exports.generateDocs = (title, description, configNames, level = 0) => {
  assert(Array.isArray(configNames) && configNames.every(e => typeof e === 'string'));

  const result = [`${'#'.repeat(level + 1)} ${title}`, '', description, ''];

  configNames.forEach((configName) => {
    result.push(`- ${configName}`);
  });

  return result;
};
