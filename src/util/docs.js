const assert = require('assert');
const path = require('path');
const sfs = require('smart-fs');
const treeify = require('object-treeify');
const { determineVars } = require('./vars');

const startSpoiler = (summary, level) => [
  `<!---${level}--><details>`,
  `<!---${level}--><summary>${summary}</summary>`,
  ''
];
const endSpoiler = level => [
  `<!---${level}--></details>`,
  ''
];

const documentFiles = (root, files) => {
  const result = [];
  result.push('```');
  result.push(root);

  const fileTree = files
    .reduce((prev, file) => {
      file.split('/').reduce((p, c) => Object.assign(p, { [c]: p[c] || {} })[c], prev);
      return prev;
    }, {});

  result.push(...treeify(fileTree, { joined: false }));
  result.push('```');
  result.push('');

  return result;
};
module.exports.documentFiles = documentFiles;

const documentSection = (baseLevel, {
  level, taskName, task, targets, requires, variables
}) => {
  assert(Number.isInteger(level));
  assert(typeof taskName === 'string');
  assert(task instanceof Object && !Array.isArray(task));

  const result = [];
  if (typeof task.target === 'string') {
    result.push(`${'#'.repeat(level + 1)} ${taskName}`, '');
    result.push(`_Updating \`${task.target}\` using \`${task.strategy}\`._`);
    result.push('');
    result.push(...task.purpose.map(d => `- ${d}`));
    result.push('');
  } else {
    result.push(`${'#'.repeat(level + 1)} \`${taskName}\``, '');
    result.push(task.description);
    result.push('');
  }

  result.push(...startSpoiler('Targets', level - baseLevel));
  result.push(...documentFiles('project', targets));
  result.push(...endSpoiler(level - baseLevel));

  if (requires.length !== 0) {
    result.push(...startSpoiler('Requires', level - baseLevel));
    result.push(...requires.map(r => `- \`${r}\``));
    result.push('');
    result.push(...endSpoiler(level - baseLevel));
  }

  if (variables.length !== 0) {
    result.push(...startSpoiler('Variables', level - baseLevel));
    result.push(...variables.map(r => `- \`${r}\``));
    result.push('');
    result.push(...endSpoiler(level - baseLevel));
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

  // pull information into upper sections
  sections.forEach((section, idx) => {
    const targets = [section.task.target];
    const requires = section.task.requires || [];
    const variables = (section.task.snippets || [])
      .filter(s => typeof s !== 'string')
      .reduce(
        (p, s) => p.concat(...determineVars(s.variables)),
        determineVars({ target: section.task.target })
      );
    for (let i = idx + 1; i < sections.length; i += 1) {
      const subSection = sections[i];
      if (subSection.level <= section.level) {
        break;
      }
      targets.push(subSection.task.target);
      requires.push(...(subSection.task.requires || []));
      variables.push(...(subSection.task.snippets || [])
        .filter(s => typeof s !== 'string')
        .reduce(
          (p, s) => p.concat(...determineVars(s.variables)),
          determineVars({ target: subSection.task.target })
        ));
    }
    Object.assign(section, {
      targets: [...new Set(targets.filter(e => !!e))],
      requires: [...new Set(requires)],
      variables: [...new Set(variables)]
    });
  });

  // generate docs for tasks
  let lastLevel = baseLevel;
  sections.forEach((section) => {
    if (lastLevel < section.level) {
      result.push(...startSpoiler('Details', lastLevel - baseLevel));
    } else if (lastLevel > section.level) {
      result.push('------');
      result.push(...endSpoiler(section.level - baseLevel));
    }
    result.push(...documentSection(baseLevel, section));
    lastLevel = section.level;
  });
  result.push('</details>');
  result.push('');

  return result;
};
module.exports.generateDocs = generateDocs;
