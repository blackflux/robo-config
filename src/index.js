const assert = require('assert');
const fs = require('fs');
const path = require('path');
const Joi = require('joi');
const appRoot = require('app-root-path');
const sfs = require('smart-fs');
const { loadTask, applyTask } = require('./util/task');
const { generateDocs } = require('./util/docs');

const roboConfigSchema = Joi.object().keys({
  tasks: Joi.array().items(Joi.string().regex(/^[^/@]+\/@[^/@]+$/)).required(),
  variables: Joi.object().required(),
  projectRoot: Joi.string().required(),
  configPath: Joi.string().required(),
  confDocsPath: Joi.string().required()
})
  .unknown(false)
  .required();

const applyTaskRec = (taskNames, variables, projectRoot) => {
  const result = [];
  taskNames.forEach((taskName) => {
    const task = loadTask(taskName, variables);
    assert(task !== null, `Bad Task Name: ${taskName}`);
    if (task.target !== undefined && applyTask(task, projectRoot)) {
      result.push(`Updated: ${task.target}`);
    }
    if (task.tasks !== undefined) {
      result.push(...applyTaskRec(task.tasks, variables, projectRoot));
    }
  });
  return result;
};

const generateTaskDocs = (taskNames) => {
  assert(Array.isArray(taskNames) && taskNames.every(e => typeof e === 'string'));
  return [
    '# Codebase Configuration Documentation',
    '',
    'Documents configuration tasks managed by [robo-config](https://github.com/blackflux/robo-config).',
    '',
    ...generateDocs(taskNames)
  ];
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
  const robotConfigValidationError = Joi.validate(opts, roboConfigSchema).error;
  if (robotConfigValidationError !== null) {
    throw new Error(robotConfigValidationError);
  }

  // execute tasks
  const result = applyTaskRec(opts.tasks, opts.variables, opts.projectRoot);
  if (sfs.smartWrite(path.join(opts.projectRoot, opts.confDocsPath), generateTaskDocs(opts.tasks))) {
    result.push(`Updated: ${opts.confDocsPath}`);
  }

  return result;
};
