const assert = require('assert');
const fs = require('fs');
const path = require('path');
const Joi = require('joi');
const appRoot = require('app-root-path');
const sfs = require('smart-fs');
const { applyTaskRec } = require('./util/task');
const { generateDocs, syncTaskDocs } = require('./util/docs');

const roboConfigSchema = Joi.object().keys({
  tasks: Joi.array().items(Joi.string().regex(/^[^/@]+\/@[^/@]+$/)).required(),
  variables: Joi.object().required(),
  projectRoot: Joi.string().required(),
  taskDir: Joi.string().required(),
  configPath: Joi.string().required(),
  confDocsPath: Joi.string().required()
})
  .unknown(false)
  .required();

const fn = (args = {}) => {
  // load from input args with defaults
  const opts = Object.assign({
    variables: {},
    projectRoot: appRoot.path,
    taskDir: path.join(appRoot.path, 'src', 'tasks'),
    configPath: '.roboconfig.json',
    confDocsPath: 'CONFDOCS.md'
  }, args);

  // load from roboconfig configuration file
  const roboConfigFilePath = path.join(opts.projectRoot, opts.configPath);
  if (fs.existsSync(roboConfigFilePath)) {
    const roboConfig = sfs.smartRead(roboConfigFilePath);
    assert(roboConfig instanceof Object && !Array.isArray(roboConfig));
    Object.assign(opts, roboConfig);
  }

  // validate roboconfig
  const robotConfigValidationError = Joi.validate(opts, roboConfigSchema).error;
  if (robotConfigValidationError !== null) {
    throw new Error(robotConfigValidationError);
  }

  // execute tasks and generate docs
  const result = applyTaskRec(opts.tasks, opts.variables, opts.projectRoot);
  if (sfs.smartWrite(
    path.join(opts.projectRoot, opts.confDocsPath),
    [
      '# Codebase Configuration Documentation',
      '',
      'Documents configuration tasks managed by [robo-config](https://github.com/blackflux/robo-config).',
      '',
      ...generateDocs(opts.taskDir, opts.tasks, 1)
    ]
  )) {
    result.push(`Updated: ${opts.confDocsPath}`);
  }

  return result;
};
fn.syncTaskDocs = syncTaskDocs;
module.exports = fn;
