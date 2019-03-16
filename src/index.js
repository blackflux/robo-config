const assert = require('assert');
const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');
const sfs = require('smart-fs');
const { loadConfig, applyConfig } = require('./util/config');


const applyConfigRec = (configNames, variables, projectRoot) => {
  const result = [];
  configNames.forEach((configName) => {
    const config = loadConfig(configName, variables);
    assert(config !== null, `Bad Config Name: ${configName}`);
    if (config.target !== undefined && applyConfig(config, projectRoot)) {
      result.push(`Updated: ${config.target}`);
    }
    if (config.configs !== undefined) {
      result.push(...applyConfigRec(config.configs, variables, projectRoot));
    }
  });
  return result;
};

const generateDocsRec = (configNames) => {
  const result = [
    '# Codebase Configuration Documentation'
  ];
  return result;
};


module.exports = (args = {}) => {
  // load from input args with defaults
  const opts = Object.assign({
    variables: {},
    projectRoot: appRoot.path,
    configPath: '.roboconfig.json',
    confDocsPath: 'CONFDOCS.md'
  }, args);

  // load from roboconfig configuration file
  const configFilePath = path.join(opts.projectRoot, opts.configPath);
  if (fs.existsSync(configFilePath)) {
    const roboConfig = sfs.smartRead(configFilePath);
    assert(roboConfig instanceof Object && !Array.isArray(roboConfig));
    Object.assign(opts, roboConfig);
  }

  // validate roboconfig
  // todo: ...

  // execute configuration
  const result = applyConfigRec(opts.configs, opts.variables, opts.projectRoot);
  if (sfs.smartWrite(path.join(opts.projectRoot, opts.confDocsPath), generateDocsRec(opts.configs))) {
    result.push(`Updated: ${opts.confDocsPath}`);
  }

  return result;
};
