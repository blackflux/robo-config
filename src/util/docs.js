const assert = require('assert');
const path = require('path');
const sfs = require('smart-fs');

const documentTask = (heading, task, level) => {
  assert(typeof heading === 'string');
  assert(task instanceof Object && !Array.isArray(task));
  assert(Number.isInteger(level));

  const result = [];
  if (typeof task.target === 'string') {
    result.push(`${'#'.repeat(level + 1)} ${heading}`, '');
    result.push(`_Updating \`${task.target}\` using \`${task.strategy}\`._`);
    result.push('');
    if (task.requires.length !== 0) {
      result.push(`_Requires ${task.requires.map(r => `\`${r}\``).join(', ')}._`);
      result.push('');
    }
    result.push(...task.purpose.map(d => `- ${d}`));
    result.push('');
  } else {
    result.push(`${'#'.repeat(level + 1)} \`${heading}\``, '');
    result.push(task.description);
    result.push('');
  }
  return result;
};

const generateDocs = (taskNames, level = 0) => {
  assert(Array.isArray(taskNames) && taskNames.every(e => typeof e === 'string'));
  assert(Number.isInteger(level));

  const result = [];
  taskNames
    .sort((a, b) => b.includes('/@') - a.includes('/@'))
    .forEach((taskName) => {
      const task = sfs.smartRead(sfs.guessFile(path.join(__dirname, '..', 'tasks', taskName)));
      result.push(...documentTask(taskName, task, level + 1));
      if (typeof task.target !== 'string') {
        result.push(`${'  '.repeat(level)}<details>`);
        result.push(`${'  '.repeat(level + 1)}<summary>Details</summary>`);
        result.push('');
        result.push(...generateDocs(task.tasks, level + 1));
        result.push(`${'  '.repeat(level)}</details>`);
        result.push('');
      }
    });
  return result;
};
module.exports.generateDocs = generateDocs;
