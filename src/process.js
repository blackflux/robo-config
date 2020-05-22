const assert = require('assert');
const path = require('path');
const Joi = require('joi-strict');
const appRoot = require('app-root-path');
const sfs = require('smart-fs');
const load = require('./load');
const lockFile = require('./lock-file');

const pluginPayloadSchema = Joi.object().keys({
  tasks: Joi.object().pattern(Joi.string().regex(/^[^/@]+\/@[^/@]+$/), Joi.object()),
  variables: Joi.object(),
  exclude: Joi.array().items(Joi.string()).unique(),
  confDocs: Joi.string()
});

module.exports = (projectRoot = appRoot.path) => {
  assert(typeof projectRoot === 'string', 'Invalid "projectRoot" parameter format.');

  // load configuration file
  const configFile = path.join(projectRoot, '.roboconfig');
  assert(sfs.guessFile(configFile, { exclude: ['lock'] }) != null, `Configuration File missing: ${configFile}`);
  const config = sfs.smartRead(sfs.guessFile(configFile, { exclude: ['lock'] }));
  assert(config instanceof Object && !Array.isArray(config), 'Invalid configuration file content.');

  // initialize configs with static defaults
  const pluginCfgs = Object
    .entries(config)
    .reduce((p, [k, v]) => Object.assign(p, {
      [k]: {
        variables: {},
        exclude: [],
        confDocs: 'CONFDOCS.md',
        ...v
      }
    }), {});

  // generify data format
  Object
    .values(pluginCfgs)
    .forEach((pluginCfg) => {
      if (Array.isArray(pluginCfg.tasks)) {
        Object.assign(pluginCfg, {
          tasks: pluginCfg.tasks.reduce((p, c) => Object.assign(p, { [c]: {} }), {})
        });
      }
    });

  // validate configs
  Object
    .values(pluginCfgs)
    .forEach((pluginPayload) => {
      Joi.assert(pluginPayload, pluginPayloadSchema, 'Validation Error:\n\n');
    });

  // load the plugins
  Object
    .entries(pluginCfgs)
    .forEach(([pluginName, pluginPayload]) => {
      // eslint-disable-next-line import/no-dynamic-require,global-require
      const plugin = load(require(pluginName));
      Object.assign(pluginPayload, { plugin });
    });

  // validate plugin lockfile
  lockFile.validate(projectRoot, Object.values(pluginCfgs));

  // execute plugins
  const result = [];
  Object
    .entries(pluginCfgs)
    .forEach(([pluginName, {
      plugin, tasks, variables, exclude
    }]) => {
      result.push(...plugin.apply(projectRoot, tasks, variables, exclude));
    });

  // write documentation files
  const docFiles = {};
  Object
    .entries(pluginCfgs)
    .forEach(([pluginName, {
      plugin, tasks, exclude, confDocs
    }]) => {
      const confDocsFile = path.join(projectRoot, confDocs);
      docFiles[confDocsFile] = docFiles[confDocsFile] || {
        confDocs,
        lines: []
      };
      docFiles[confDocsFile].lines.push(...plugin.generateDocs(tasks, exclude));
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
