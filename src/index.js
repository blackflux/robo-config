const assert = require('assert');
const appRoot = require('app-root-path');
const { loadConfig, applyConfig } = require('./util/config');


const applyConfigRec = (configNames, variables, projectRoot) => {
  const result = [];
  configNames.forEach((configName) => {
    const config = loadConfig(configName, variables);
    if (config === null) {
      result.push(`${configName}: Error! Bad Name!`);
    } else {
      if (config.target !== undefined && applyConfig(config, projectRoot)) {
        result.push(`${configName}: Configuration File Updated`);
      }
      if (config.configs !== undefined) {
        result.push(...applyConfigRec(config.configs, variables, projectRoot));
      }
    }
  });
  return result;
};


module.exports = ({
  configs: configNames,
  variables = {},
  projectRoot = appRoot.path
}) => {
  assert(Array.isArray(configNames) && configNames.every(configName => configName.split('/').length === 2));
  assert(variables instanceof Object && !Array.isArray(variables));

  return applyConfigRec(configNames, variables, projectRoot);
};
