const assert = require('assert');
const fs = require('fs');
const path = require('path');
const deepmerge = require('deepmerge');
const Joi = require('joi');
const sls = require('smart-fs');
const { populateVars } = require('./vars');
const strategies = require('./strategies');


const taskSchema = Joi.object().keys({
  target: Joi.string(),
  format: Joi.string().allow(null),
  strategy: Joi.string().valid(...Object.keys(strategies)),
  snippets: Joi.array().items(
    Joi.string(),
    Joi.object().keys({
      name: Joi.string().required(),
      variables: Joi.object().min(1).required()
    }).unknown(false)
  ).min(1),
  requires: Joi.array().items(Joi.string()),
  purpose: Joi.array().items(Joi.string()),
  description: Joi.string(),
  tasks: Joi.array().items(Joi.string())
})
  .and('target', 'strategy', 'snippets', 'format', 'requires', 'purpose')
  .and('tasks', 'description')
  .xor('target', 'tasks')
  .unknown(false)
  .required();


const loadSnippet = (snippetDir, snippetName, task, snippetVars) => {
  assert(typeof snippetDir === 'string');
  assert(typeof snippetName === 'string');
  assert(task instanceof Object && !Array.isArray(task));
  assert(snippetVars instanceof Object && !Array.isArray(snippetVars));

  const fileName = sls.guessFile(path.join(snippetDir, snippetName));
  assert(fileName !== null, `Invalid Snippet File Name: ${snippetName}`);
  const snippet = sls.smartRead(fileName, { treatAs: task.format });

  return populateVars(snippet, snippetVars, false);
};


const loadTask = (plugin, taskName, variables) => {
  assert(typeof taskName === 'string');
  assert(variables instanceof Object && !Array.isArray(variables));

  // load task file
  const taskFilePath = path.join(plugin.taskDir, `${taskName}.json`);
  if (!fs.existsSync(taskFilePath)) {
    return null;
  }
  const task = sls.smartRead(taskFilePath);
  if (task.target !== undefined) {
    task.format = task.format || null;
  }

  assert(Joi.validate(task, taskSchema).error === null, `Invalid Task Detected: ${taskName}`);
  assert(taskName.includes('/@') === (task.tasks !== undefined), `Invalid Task Name Detected: ${taskName}`);

  if (typeof task.target === 'string') {
    // load and merge task snippets into task
    const snippetDir = path.join(plugin.taskDir, taskName.split('/')[0], 'snippets');
    task.target = populateVars([task.target], variables, true)[0];
    task.toWrite = deepmerge.all(task.snippets
      .map(m => (typeof m === 'string' ? [m, {}] : [m.name, m.variables]))
      .map(([snippetName, snippetVars]) => [snippetName, populateVars(snippetVars, variables, true)])
      .map(([snippetName, snippetVars]) => loadSnippet(snippetDir, snippetName, task, snippetVars)));
  }

  return task;
};


const applyTask = (plugin, projectRoot, task) => {
  assert(task instanceof Object && !Array.isArray(task));
  assert(typeof projectRoot === 'string');

  const target = path.join(projectRoot, task.target);
  return sls.smartWrite(target, task.toWrite, {
    treatAs: task.format,
    mergeStrategy: strategies[task.strategy]
  });
};


// todo: move into plugin
const applyTaskRec = (plugin, projectRoot, taskNames, variables) => {
  const result = [];
  taskNames.forEach((taskName) => {
    const task = loadTask(plugin, taskName, variables);
    assert(task !== null, `Bad Task Name: ${taskName}`);
    if (task.target !== undefined && applyTask(plugin, projectRoot, task)) {
      result.push(`Updated: ${task.target}`);
    }
    if (task.tasks !== undefined) {
      result.push(...applyTaskRec(plugin, projectRoot, task.tasks, variables));
    }
  });
  return result;
};
module.exports.applyTaskRec = applyTaskRec;
