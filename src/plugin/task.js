const assert = require('assert');
const fs = require('fs');
const path = require('path');
const deepmerge = require('deepmerge');
const Joi = require('joi');
const sfs = require('smart-fs');
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
  assert(typeof snippetDir === 'string', 'Invalid "snippetDir" parameter format.');
  assert(typeof snippetName === 'string', 'Invalid "snippetName" parameter format.');
  assert(task instanceof Object && !Array.isArray(task), 'Invalid "task" parameter format.');
  assert(snippetVars instanceof Object && !Array.isArray(snippetVars), 'Invalid "snippetVars" parameter format.');

  const fileName = sfs.guessFile(path.join(snippetDir, snippetName));
  assert(fileName !== null, `Invalid Snippet File Name: ${snippetName}`);
  const snippet = sfs.smartRead(fileName, { treatAs: task.format });

  return populateVars(snippet, snippetVars, false);
};


const loadTask = (taskDir, taskName, variables) => {
  assert(typeof taskName === 'string', 'Invalid "taskName" parameter format.');
  assert(variables instanceof Object && !Array.isArray(variables), 'Invalid "variables" parameter format.');

  // load task file
  const taskFilePath = path.join(taskDir, `${taskName}.json`);
  if (!fs.existsSync(taskFilePath)) {
    return null;
  }
  const task = sfs.smartRead(taskFilePath);
  if (task.target !== undefined) {
    task.format = task.format || null;
  }

  assert(
    Joi.validate(task, taskSchema).error === null,
    `Invalid Task: ${taskName}\n\n${JSON.stringify(Joi.validate(task, taskSchema).error, null, 2)}`
  );
  assert(taskName.includes('/@') === (task.tasks !== undefined), `Invalid Task Name Detected: ${taskName}`);

  if (typeof task.target === 'string') {
    // load and merge task snippets into task
    const snippetDir = path.join(taskDir, taskName.split('/')[0], 'snippets');
    task.target = populateVars([task.target], variables, true)[0];
    task.toWrite = deepmerge.all(task.snippets
      .map(m => (typeof m === 'string' ? [m, {}] : [m.name, m.variables]))
      .map(([snippetName, snippetVars]) => [snippetName, populateVars(snippetVars, variables, true)])
      .map(([snippetName, snippetVars]) => loadSnippet(snippetDir, snippetName, task, snippetVars)));
  }

  return task;
};


const applyTask = (taskDir, projectRoot, task) => {
  assert(task instanceof Object && !Array.isArray(task), 'Invalid "task" parameter format.');
  assert(typeof projectRoot === 'string', 'Invalid "projectRoot" parameter format.');

  const target = path.join(projectRoot, task.target);
  return sfs.smartWrite(target, task.toWrite, {
    treatAs: task.format,
    mergeStrategy: strategies[task.strategy]
  });
};

const listTasks = taskDir => sfs
  .walkDir(taskDir)
  .filter(f => f.includes('/@'))
  .filter(f => f.endsWith('.json'))
  .map(f => f.slice(0, -5));
module.exports.listTasks = listTasks;

const applyTasksRec = (taskDir, projectRoot, taskNames, variables) => {
  const result = [];
  taskNames.forEach((taskName) => {
    const task = loadTask(taskDir, taskName, variables);
    assert(task !== null, `Bad Task Name: ${taskName}`);
    if (task.target !== undefined && applyTask(taskDir, projectRoot, task)) {
      result.push(`Updated: ${task.target}`);
    }
    if (task.tasks !== undefined) {
      const subtasks = task.tasks.map(stn => (stn.includes('/') ? stn : `${taskName.split('/')[0]}/${stn}`));
      result.push(...applyTasksRec(taskDir, projectRoot, subtasks, variables));
    }
  });
  return result;
};
module.exports.applyTasksRec = applyTasksRec;
