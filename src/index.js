const assert = require('assert');
const { loadConfig, applyConfig } = require('./util/config');


module.exports = (configNames, variables = {}) => {
  assert(Array.isArray(configNames));
  assert(configNames.every(configName => configName.split('/').length === 2));
  assert(variables instanceof Object && !Array.isArray(variables));
  const events = [];

  configNames.forEach((configName) => {
    const config = loadConfig(configName, variables);
    if (config === null) {
      events.push(`${configName}: Error! Bad Name!`);
    } else if (applyConfig(config)) {
      events.push(`${configName}: Configuration File Updated`);
    }
  });

  return events;
};
