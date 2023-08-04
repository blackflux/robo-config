import assert from 'assert';
import path from 'path';
import fs from 'smart-fs';
import Joi from 'joi-strict';
import appRoot from 'app-root-path';
import objectScan from 'object-scan';
import load from './load.js';
import { validate } from './lock-file.js';

const pluginPayloadSchema = Joi.object().keys({
  tasks: Joi.array().items(Joi.alternatives(
    Joi.string().regex(/^[^/@]+\/@[^/@]+$/),
    Joi.object().keys({
      name: Joi.string().regex(/^[^/@]+\/@[^/@]+$/),
      variables: Joi.object()
    })
  )),
  variables: Joi.object(),
  exclude: Joi.array().items(Joi.string()).unique(),
  confDocs: Joi.string()
});

export default async (projectRoot = appRoot.path) => {
  assert(typeof projectRoot === 'string', 'Invalid "projectRoot" parameter format.');

  // load configuration file
  const configFile = path.join(projectRoot, '.roboconfig');
  assert(fs.guessFile(configFile, { exclude: ['lock'] }) != null, `Configuration File missing: ${configFile}`);
  const config = fs.smartRead(fs.guessFile(configFile, { exclude: ['lock'] }));
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

  // validate configs
  Object
    .values(pluginCfgs)
    .forEach((pluginPayload) => {
      Joi.assert(pluginPayload, pluginPayloadSchema, 'Validation Error:\n\n');
    });

  // generify data format
  Object
    .values(pluginCfgs)
    .forEach((pluginCfg) => {
      Object.assign(pluginCfg, {
        tasks: pluginCfg.tasks
          .map((name) => (typeof name === 'string' ? { name, variables: {} } : name))
      });
    });

  // load the plugins
  const entries = Object.entries(pluginCfgs);
  for (let i = 0; i < entries.length; i += 1) {
    const [pluginName, pluginPayload] = entries[i];
    // eslint-disable-next-line no-await-in-loop
    const { default: raw } = await import(pluginName);
    const plugin = load(raw);
    objectScan(['**.variables'], {
      filterFn: ({ value }) => {
        plugin.validateVars(value);
      }
    })(pluginPayload);
    Object.assign(pluginPayload, { plugin });
  }

  // validate plugin lockfile
  validate(projectRoot, Object.values(pluginCfgs));

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
      if (fs.smartWrite(
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
