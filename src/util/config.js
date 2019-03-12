const assert = require('assert');
const fs = require('fs');
const path = require('path');
const deepmerge = require('deepmerge');
const Joi = require('joi');
const sls = require('smart-fs');
const { populateVars } = require('./vars');
const strategies = require('./strategies');


const configSchema = Joi.object().keys({
  target: Joi.string(),
  strategy: Joi.string().valid(...Object.keys(strategies)),
  variables: Joi.object(),
  snippets: Joi.array().items(
    Joi.string(),
    Joi.object().keys({
      name: Joi.string().required(),
      variables: Joi.object().min(1).required()
    }).unknown(false)
  ).min(1),
  configs: Joi.array().items(Joi.string())
})
  .and('target', 'strategy', 'variables', 'snippets')
  .unknown(false)
  .required();


const loadSnippet = (snippetDir, snippetName, config, snippetVars) => {
  assert(typeof snippetDir === 'string');
  assert(typeof snippetName === 'string');
  assert(config instanceof Object && !Array.isArray(config));
  assert(snippetVars instanceof Object && !Array.isArray(snippetVars));

  const fileName = sls.guessFile(path.join(snippetDir, snippetName));
  assert(fileName !== null, `Invalid Snippet File Name: ${snippetName}`);
  const snippet = sls.smartRead(fileName);

  return populateVars(snippet, snippetVars, false);
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

    // load and merge config snippets into config
    const snippetDir = path.join(__dirname, '..', 'configs', configName.split('/')[0], 'snippets');
    config.toWrite = deepmerge.all(config.snippets
      .map(m => (typeof m === 'string' ? [m, {}] : [m.name, m.variables]))
      .map(([snippetName, snippetVars]) => [snippetName, populateVars(snippetVars, config.variables, true)])
      .map(([snippetName, snippetVars]) => loadSnippet(snippetDir, snippetName, config, snippetVars)));
  }

  return config;
};


module.exports.applyConfig = (config, projectRoot) => {
  assert(config instanceof Object && !Array.isArray(config));
  assert(typeof projectRoot === 'string');

  const target = path.join(projectRoot, config.target);
  return sls.smartWrite(target, config.toWrite, {
    mergeStrategy: strategies[config.strategy]
  });
};
