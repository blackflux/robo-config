const assert = require('assert');
const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');
const deepmerge = require('deepmerge');
const { writeFile, loadFile } = require('./file');


const loadModule = (moduleDir, moduleName, config, variables) => {
  assert(typeof moduleDir === 'string');
  assert(typeof moduleName === 'string');
  assert(config instanceof Object && !Array.isArray(config));
  assert(variables instanceof Object && !Array.isArray(variables));

  const module = loadFile(path.join(moduleDir, moduleName));

  // todo: inject variables
  // ...

  return module;
};


module.exports.loadConfig = (configName, variables) => {
  assert(typeof configName === 'string');
  assert(variables instanceof Object && !Array.isArray(variables));

  // load config file
  const configFilePath = path.join(__dirname, '..', 'template', `${configName}.json`);
  if (!fs.existsSync(configFilePath)) {
    return null;
  }
  const config = loadFile(configFilePath);

  // load and merge config modules into config
  const moduleDir = path.join(__dirname, '..', 'template', configName.split('/')[0], 'modules');
  config.toWrite = deepmerge
    .all(config.modules.map(moduleName => loadModule(moduleDir, moduleName, config, variables)));

  return config;
};


module.exports.writeConfig = (config) => {
  assert(config instanceof Object && !Array.isArray(config));

  const target = path.join(appRoot.path, config.target);
  return writeFile(target, config.toWrite);
};
