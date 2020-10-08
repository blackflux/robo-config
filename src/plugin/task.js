const assert = require('assert');
const fs = require('smart-fs');
const path = require('path');
const get = require('lodash.get');
const deepmerge = require('deepmerge');
const Joi = require('joi-strict');
const sfs = require('smart-fs');
const mustache = require('mustache');
const objectScan = require('object-scan');
const { populateVars, determineVars } = require('./vars');
const strategies = require('./strategies');

const taskSchema = Joi.object().keys({
  target: Joi.string().optional(),
  format: Joi.string().allow(null).optional(),
  resolve: Joi.boolean().optional(),
  strategy: Joi.string().valid(...Object.keys(strategies)).optional(),
  create: Joi.boolean().optional(),
  pretty: Joi.boolean().optional(),
  snippets: Joi.array().items(
    Joi.string().optional(),
    Joi.object().keys({
      name: Joi.string(),
      variables: Joi.object().min(1)
    }).optional()
  ).min(1).optional(),
  requires: Joi.array().items(Joi.string()).optional(),
  purpose: Joi.array().min(1).items(Joi.string()).optional(),
  description: Joi.string().optional(),
  tasks: Joi.array().items(Joi.string()).optional()
})
  .and('target', 'strategy', 'create', 'snippets', 'format', 'requires', 'purpose', 'resolve')
  .and('tasks', 'description')
  .xor('target', 'tasks');

const loadSnippet = (snippetDir, snippetName, task, snippetVars) => {
  assert(typeof snippetDir === 'string', 'Invalid "snippetDir" parameter format.');
  assert(typeof snippetName === 'string', 'Invalid "snippetName" parameter format.');
  assert(task instanceof Object && !Array.isArray(task), 'Invalid "task" parameter format.');
  assert(snippetVars instanceof Object && !Array.isArray(snippetVars), 'Invalid "snippetVars" parameter format.');

  const fileName = sfs.guessFile(path.join(snippetDir, snippetName));
  assert(fileName !== null, `Invalid Snippet File Name: ${snippetName}`);

  const isTemplate = fileName.endsWith('.mustache');
  const contentRaw = fs.readFileSync(fileName, 'utf8');
  const contentRendered = isTemplate
    ? mustache.render(contentRaw, snippetVars)
    : contentRaw;
  const contentParsed = sfs.smartParse(contentRendered, {
    treatAs: task.format,
    resolve: task.resolve,
    refPath: isTemplate ? fileName.slice(0, -9) : fileName
  });

  return populateVars(contentParsed, snippetVars, isTemplate);
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
    assert([false, undefined].includes(task.create), 'Option "create" defaults to true. Remove.');
    task.format = task.format || null;
    task.create = task.create === undefined ? true : task.create;
    task.pretty = task.pretty === undefined ? true : task.pretty;
    task.resolve = task.resolve === undefined ? false : task.resolve;
  }

  Joi.assert(task, taskSchema, `Invalid Task: ${taskName}\n\n`);
  assert(
    (taskName.includes('/@') || taskName.includes('/#')) === (task.tasks !== undefined),
    `Invalid Task Name Detected: ${taskName}`
  );

  if (typeof task.target === 'string') {
    // load and merge task snippets into task
    const snippetDir = path.join(taskDir, taskName.split('/')[0], 'snippets');
    task.target = populateVars([task.target], variables, true)[0];
    task.toWrite = deepmerge.all(task.snippets
      .map((m) => (typeof m === 'string' ? [m, {}] : [m.name, m.variables]))
      .map(([snippetName, snippetVars]) => [snippetName, populateVars(snippetVars, variables, true)])
      .map(([snippetName, snippetVars]) => loadSnippet(snippetDir, snippetName, task, snippetVars)));
  }

  return task;
};

const applyTask = (taskDir, projectRoot, task, exclude) => {
  assert(task instanceof Object && !Array.isArray(task), 'Invalid "task" parameter format.');
  assert(typeof projectRoot === 'string', 'Invalid "projectRoot" parameter format.');
  if (exclude.includes(task.target)) {
    return false;
  }

  const target = path.join(projectRoot, task.target);
  return sfs.smartWrite(target, task.toWrite, {
    treatAs: task.format,
    mergeStrategy: strategies[task.strategy],
    create: task.create,
    pretty: task.pretty
  });
};

const listPublicTasks = (taskDir) => sfs
  .walkDir(taskDir)
  .filter((f) => f.includes('/@'))
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.slice(0, -5));
module.exports.listPublicTasks = listPublicTasks;

const applyTasksRec = (taskDir, projectRoot, tasks, variables, exclude) => {
  const result = [];
  tasks.forEach((t) => {
    const vars = { ...variables, ...t.variables };
    const task = loadTask(taskDir, t.name, vars);
    assert(task !== null, `Bad Task Name: ${t.name}`);
    if (
      task.target !== undefined
      && applyTask(taskDir, projectRoot, task, exclude) === true
    ) {
      result.push(`Updated: ${task.target}`);
    }
    if (task.tasks !== undefined) {
      const subtasks = task.tasks.map((stn) => ({
        name: stn.includes('/') ? stn : `${t.name.split('/')[0]}/${stn}`,
        variables: {}
      }));
      result.push(...applyTasksRec(taskDir, projectRoot, subtasks, vars, exclude));
    }
  });
  return result;
};
module.exports.applyTasksRec = applyTasksRec;

const extractMeta = (taskDir, tasks) => {
  assert(typeof taskDir === 'string', 'Invalid "taskDir" parameter format.');
  assert(
    Array.isArray(tasks) && tasks.every((e) => !Array.isArray(e) && e instanceof Object),
    'Invalid "tasks" parameter format.'
  );

  const variables = new Set();
  const target = new Set();

  const taskNameStack = tasks.map(({ name }) => name);
  while (taskNameStack.length !== 0) {
    const taskName = taskNameStack.pop();
    const fileName = sfs.guessFile(path.join(taskDir, taskName));
    if (fileName !== null) {
      const task = sfs.smartRead(fileName);
      if (task.tasks !== undefined) {
        taskNameStack.push(...task.tasks.map((stn) => (stn.includes('/') ? stn : `${taskName.split('/')[0]}/${stn}`)));
      }
      objectScan(['snippets[*].variables', 'target'], { joined: false })(task)
        .forEach((vs) => determineVars([get(task, vs)]).forEach((v) => variables.add(v)));
      if (task.target !== undefined) {
        target.add(task.target);
      }
    }
  }
  return {
    variables: [...variables],
    target: [...target]
  };
};
module.exports.extractMeta = extractMeta;
