const assert = require('assert');
const fs = require('fs');
const path = require('path');
const deepmerge = require('deepmerge');
const Joi = require('joi');
const sls = require('smart-fs');
const { populateVars } = require('./vars');


const configSchema = Joi.object().keys({
  target: Joi.string(),
  variables: Joi.object(),
  modules: Joi.array().items(Joi.object().keys({
    name: Joi.string().required(),
    variables: Joi.object().required()
  }).unknown(false).required()),
  configs: Joi.array().items(Joi.string())
})
  .with('target', 'variables')
  .with('target', 'modules')
  .unknown(false)
  .required();


const loadModule = (moduleDir, moduleName, config, moduleVars) => {
  assert(typeof moduleDir === 'string');
  assert(typeof moduleName === 'string');
  assert(config instanceof Object && !Array.isArray(config));
  assert(moduleVars instanceof Object && !Array.isArray(moduleVars));

  const fileName = ['json', 'yml', 'yaml', 'txt'].reduce(
    (name, ext) => (!fs.existsSync(name) && fs.existsSync(`${name}.${ext}`) ? `${name}.${ext}` : name),
    path.join(moduleDir, moduleName)
  );

  const module = sls.smartRead(fileName);

  return populateVars(module, moduleVars, false);
};


module.exports.loadConfig = (configName, variables) => {
  assert(typeof configName === 'string');
  assert(variables instanceof Object && !Array.isArray(variables));

  // load config file
  const configFilePath = path.join(__dirname, '..', 'configs', `${configName}.json`);
  if (!fs.existsSync(configFilePath)) {
    return null;
  }
  const config = sls.smartRead(configFilePath);

  assert(Joi.validate(config, configSchema).error === null, `Invalid Config Detected: ${configName}`);

  if (typeof config.target === 'string') {
    Object.assign(config, { variables: populateVars(config.variables, variables, true) });

    // load and merge config modules into config
    const moduleDir = path.join(__dirname, '..', 'configs', configName.split('/')[0], 'modules');
    config.toWrite = deepmerge.all(config.modules
      .map(m => [m.name, m.variables])
      .map(([moduleName, moduleVars]) => [moduleName, populateVars(moduleVars, config.variables, true)])
      .map(([moduleName, moduleVars]) => loadModule(moduleDir, moduleName, config, moduleVars)));
  }

  return config;
};


module.exports.applyConfig = (config, projectRoot) => {
  assert(config instanceof Object && !Array.isArray(config));
  assert(typeof projectRoot === 'string');

  const target = path.join(projectRoot, config.target);
  return sls.smartWrite(target, config.toWrite);
};
