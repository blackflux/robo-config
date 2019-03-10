const assert = require('assert');
const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');
const deepmerge = require('deepmerge');
const { writeFile, loadFile } = require('./file');
const { injectVars } = require('./vars');


const loadModule = (moduleDir, moduleName, config, moduleVars) => {
  assert(typeof moduleDir === 'string');
  assert(typeof moduleName === 'string');
  assert(config instanceof Object && !Array.isArray(config));
  assert(moduleVars instanceof Object && !Array.isArray(moduleVars));

  let fileName = path.join(moduleDir, moduleName);
  if (!fs.existsSync(fileName)) {
    ['json', 'yml', 'yaml', 'txt'].forEach((fileEnding) => {
      if (fileName.indexOf('.') === -1) {
        const fileNameTest = `${fileName}.${fileEnding}`;
        if (fs.existsSync(fileNameTest)) {
          fileName = fileNameTest;
        }
      }
    });
  }

  const module = loadFile(fileName);

  return injectVars(module, moduleVars);
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
  config.toWrite = deepmerge.all(config.modules
    .map(m => [m.name, m.variables])
    .map(([moduleName, moduleVars]) => [moduleName, injectVars(moduleVars, variables)])
    .map(([moduleName, moduleVars]) => loadModule(moduleDir, moduleName, config, moduleVars)));

  return config;
};


module.exports.applyConfig = (config) => {
  assert(config instanceof Object && !Array.isArray(config));

  const target = path.join(appRoot.path, config.target);
  return writeFile(target, config.toWrite);
};
