const assert = require('assert');
const path = require('path');
const sfs = require('smart-fs');
const { syncDocs, generateDocs } = require('./plugin/docs');
const { applyTasksRec, listTasks, extractMeta } = require('./plugin/task');

module.exports = (pl) => {
  assert(Object.keys(pl).length === 4, 'Unknown property exposed.');
  assert(typeof pl.taskDir === 'string');
  assert(typeof pl.reqDir === 'string');
  assert(typeof pl.varDir === 'string');
  assert(typeof pl.docDir === 'string');

  const applyTasks = (projectRoot, taskNames, variables) => {
    const meta = extractMeta(pl.taskDir, taskNames);
    const unexpectedVars = Object.keys(variables).filter(v => !meta.variables.includes(v));
    assert(unexpectedVars.length === 0, `Unexpected Variable(s) Provided: ${unexpectedVars.join(', ')}`);
    return applyTasksRec(pl.taskDir, projectRoot, taskNames, variables);
  };
  const genDocs = (title, taskNames) => [title, '', ...generateDocs(pl.taskDir, pl.reqDir, pl.varDir, taskNames, 2)];

  return ({
    syncDocs: () => syncDocs(pl.taskDir, pl.reqDir, pl.varDir, pl.docDir),
    generateDocs: (pluginName, taskNames) => genDocs(
      `## Plugin [${pluginName}](https://www.npmjs.com/package/${pluginName})`,
      taskNames
    ),
    apply: applyTasks,
    test: (projectRoot, variables = {}) => {
      const taskNames = listTasks(pl.taskDir);
      const vars = extractMeta(pl.taskDir, taskNames).variables
        .reduce((p, c) => Object.assign(p, { [c]: p[c] || c }), variables);
      const result = applyTasks(projectRoot, taskNames, vars);
      if (sfs.smartWrite(path.join(projectRoot, 'CONFDOCS.md'), genDocs('## Example CONFDOCS.md', taskNames))) {
        result.push('Updated: CONFDOCS.md');
      }
      return result;
    }
  });
};
