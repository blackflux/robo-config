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
  confDocsPath: Joi.string().required()
})
  .unknown(false)
  .required();

module.exports = (configFile = path.join(appRoot.path, '.roboconfig.json'), argsCfg = {}) => {
  assert(argsCfg instanceof Object && !Array.isArray(argsCfg));

  // load configuration file
  const fileCfg = configFile !== null ? sfs.smartRead(configFile) : {};
  assert(fileCfg instanceof Object && !Array.isArray(fileCfg));

  // merge file and arg config
  const cfg = deepmerge(fileCfg, argsCfg);

  // initialize configs with defaults
  const pluginCfgs = Object
    .entries(cfg)
    .reduce((p, [k, v]) => Object.assign(p, {
      [k]: Object.assign({
        projectRoot: appRoot.path,
        variables: {},
        confDocsPath: 'CONFDOCS.md'
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

  // execute plugins
  const result = [];
  Object
    .entries(pluginCfgs)
    .forEach(([pluginName, pluginPayload]) => {
      // eslint-disable-next-line import/no-dynamic-require,global-require
      const plugin = require(pluginName);
      result.push(...plugin.applyTaskRec(pluginPayload.projectRoot, pluginPayload.tasks, pluginPayload.variables));
      // todo: fix handling of multiple plugins
      if (sfs.smartWrite(
        path.join(pluginPayload.projectRoot, pluginPayload.confDocsPath),
        [
          '# Codebase Configuration Documentation',
          '',
          'Documents configuration tasks managed by [robo-config](https://github.com/blackflux/robo-config).',
          '',
          ...plugin.generateDocs(pluginPayload.tasks, 1)
        ]
      )) {
        result.push(`Updated: ${pluginPayload.confDocsPath}`);
      }
    });
  return result;
};
