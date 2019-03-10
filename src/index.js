const assert = require('assert');
const appRoot = require('app-root-path');
const { loadConfig, applyConfig } = require('./util/config');


module.exports = ({
  configs: configNames,
  variables = {},
  projectRoot = appRoot.path
}) => {
  assert(Array.isArray(configNames) && configNames.every(configName => configName.split('/').length === 2));
  assert(variables instanceof Object && !Array.isArray(variables));

  const events = [];

  configNames.forEach((configName) => {
    const config = loadConfig(configName, variables);
    if (config === null) {
      events.push(`${configName}: Error! Bad Name!`);
    } else if (applyConfig(config, projectRoot)) {
      events.push(`${configName}: Configuration File Updated`);
    }
  });

  return events;
};
