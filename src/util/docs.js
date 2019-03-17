const assert = require('assert');
const path = require('path');
const sfs = require('smart-fs');

const documentTask = ({ level, taskName, task }) => {
  assert(Number.isInteger(level));
  assert(typeof taskName === 'string');
  assert(task instanceof Object && !Array.isArray(task));

  const result = [];
  if (typeof task.target === 'string') {
    result.push(`${'#'.repeat(level + 1)} ${taskName}`, '');
    result.push(`_Updating \`${task.target}\` using \`${task.strategy}\`._`);
    result.push('');
    if (task.requires.length !== 0) {
      result.push(`_Requires ${task.requires.map(r => `\`${r}\``).join(', ')}._`);
      result.push('');
    }
    result.push(...task.purpose.map(d => `- ${d}`));
    result.push('');
  } else {
    result.push(`${'#'.repeat(level + 1)} \`${taskName}\``, '');
    result.push(task.description);
    result.push('');
  }
  return result;
};

const generateDocs = (taskNames, baseLevel) => {
  assert(Array.isArray(taskNames) && taskNames.every(e => typeof e === 'string'));
  assert(Number.isInteger(baseLevel));

  const sections = taskNames.map(taskName => ({ level: baseLevel, taskName }));

  // expand tasks with subtasks
  for (let idx = 0; idx < sections.length; idx += 1) {
    const { level, taskName } = sections[idx];
    const task = sfs.smartRead(sfs.guessFile(path.join(__dirname, '..', 'tasks', taskName)));
    sections[idx].task = task;
    sections.splice(idx + 1, 0, ...(task.tasks || [])
      .sort((a, b) => b.includes('/@') - a.includes('/@'))
      .map(subtaskName => ({ level: level + 1, taskName: subtaskName })));
  }

  const result = [];

  // generate docs for tasks
  let lastLevel = baseLevel;
  sections.forEach((section) => {
    if (lastLevel < section.level) {
      result.push(`${'  '.repeat(lastLevel - baseLevel)}<details>`);
      result.push(`${'  '.repeat(lastLevel + 1 - baseLevel)}<summary>Details</summary>`);
      result.push('');
    } else if (lastLevel > section.level) {
      result.push(`${'  '.repeat(section.level - baseLevel)}</details>`);
      result.push('');
    }
    result.push(...documentTask(section));
    lastLevel = section.level;
  });
  result.push('</details>');
  result.push('');

  return result;
};
module.exports.generateDocs = generateDocs;
