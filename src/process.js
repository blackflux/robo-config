const assert = require('assert');
const path = require('path');
const Joi = require('joi');
const deepmerge = require('deepmerge');
const appRoot = require('app-root-path');
const sfs = require('smart-fs');

const pluginPayloadSchema = Joi.object().keys({
  tasks: Joi.array().items(Joi.string().regex(/^[^/@]+\/@[^/@]+$/)).required(),
  variables: Joi.object().required(),
  projectRoot: Joi.string().required(),
  confDocs: Joi.string().required()
})
  .unknown(false)
  .required();

module.exports = (configFile = path.join(appRoot.path, '.roboconfig.json'), argsCfg = {}) => {
  assert(argsCfg instanceof Object && !Array.isArray(argsCfg));

  // load configuration file
  const fileCfg = configFile !== null ? sfs.smartRead(configFile) : {};
  assert(fileCfg instanceof Object && !Array.isArray(fileCfg));

  // merge file and args config
  const cfg = deepmerge(fileCfg, argsCfg);

  // initialize configs with static defaults
  const pluginCfgs = Object
    .entries(cfg)
    .reduce((p, [k, v]) => Object.assign(p, {
      [k]: Object.assign({
        projectRoot: appRoot.path,
        variables: {},
        confDocs: 'CONFDOCS.md'
      }, v)
    }), {});

  // validate configs
  Object
    .values(pluginCfgs)
    .forEach((pluginPayload) => {
      const validationError = Joi.validate(pluginPayload, pluginPayloadSchema).error;
      if (validationError !== null) {
        throw new Error(validationError);
      }
    });

  // load the plugins
  Object
    .entries(pluginCfgs)
    .forEach(([pluginName, pluginPayload]) => {
      // eslint-disable-next-line import/no-dynamic-require,global-require
      const plugin = require(pluginName);
      Object.assign(pluginPayload, { plugin });
    });

  // execute plugins
  const result = [];
  Object
    .entries(pluginCfgs)
    .forEach(([pluginName, {
      plugin, projectRoot, tasks, variables
    }]) => {
      result.push(...plugin.applyTaskRec(projectRoot, tasks, variables));
    });

  // write documentation files
  const docFiles = {};
  Object
    .entries(pluginCfgs)
    .forEach(([pluginName, {
      plugin, projectRoot, tasks, confDocs
    }]) => {
      const confDocsFile = path.join(projectRoot, confDocs);
      docFiles[confDocsFile] = docFiles[confDocsFile] || {
        confDocs,
        lines: []
      };
      docFiles[confDocsFile].lines.push(...plugin.generateDocs(pluginName, tasks));
    });
  Object
    .entries(docFiles)
    .forEach(([confDocsFile, { confDocs, lines }]) => {
      if (sfs.smartWrite(
        confDocsFile,
        [
          '# Codebase Configuration Documentation',
          '',
          'Documents configuration tasks managed by [robo-config](https://github.com/blackflux/robo-config).',
          '',
          ...lines
        ]
      )) {
        result.push(`Updated: ${confDocs}`);
      }
    });

  return result;
};
