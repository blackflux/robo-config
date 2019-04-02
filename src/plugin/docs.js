const assert = require('assert');
const path = require('path');
const Joi = require('joi');
const sfs = require('smart-fs');
const treeify = require('object-treeify');
const { determineVars } = require('./vars');
const { listTasks } = require('./task');

const startSpoiler = (summary, level) => [
  `<!---${level}--><details>`,
  `<!---${level}--><summary>${summary}</summary>`,
  ''
];
const endSpoiler = level => [
  `<!---${level}--></details>`,
  ''
];

const normalizeRef = input => input
  .trim()
  .toLowerCase()
  .replace(/[^\w\- ]+/g, '')
  .replace(/\s/g, '-')
  .replace(/-+$/, '');
const createRef = (type, content) => `<a name="${normalizeRef(`${type}-ref-${content}`)}">${content}</a>`;
const linkRef = (type, content) => `[${content}](#${normalizeRef(`${type}-ref-${content}`)})`;

const documentFiles = (root, files) => {
  const result = [];
  result.push('```');
  result.push(root);

  const fileTree = files
    .reduce((prev, file) => {
      file.split('/').reduce((p, c) => Object.assign(p, { [c]: p[c] || {} })[c], prev);
      return prev;
    }, {});

  result.push(...treeify(fileTree, { joined: false, sortFn: (a, b) => a.localeCompare(b) }));
  result.push('```');
  result.push('');

  return result;
};
module.exports.documentFiles = documentFiles;

const documentSection = (plName, baseLevel, {
  level, taskName, task, targets, requires, variables
}) => {
  assert(Number.isInteger(level), 'Invalid "level" parameter format.');
  assert(typeof taskName === 'string', 'Invalid "taskName" parameter format.');
  assert(task instanceof Object && !Array.isArray(task), 'Invalid "task" parameter format.');

  const result = [];
  if (typeof task.target === 'string') {
    result.push(`${'#'.repeat(level + 1)} ${'>'.repeat(level)} ${taskName}`, '');
    result.push(`_Updating \`${task.target}\` using \`${task.strategy}\`._`);
    result.push('');
    result.push(...task.purpose.map(d => `- ${d}`));
    result.push('');
  } else {
    result.push(`${'#'.repeat(level + 1)} ${'>'.repeat(level)} \`${taskName}\``, '');
    result.push(task.description);
    result.push('');
  }

  result.push(...startSpoiler('Targets', level - baseLevel));
  result.push(...documentFiles('project', targets));
  result.push(...endSpoiler(level - baseLevel));

  if (requires.length !== 0) {
    result.push(...startSpoiler('Requires', level - baseLevel));
    result.push(...requires.map(r => `- ${linkRef(`${plName}-req`, r)}`));
    result.push('');
    result.push(...endSpoiler(level - baseLevel));
  }

  if (variables.length !== 0) {
    result.push(...startSpoiler('Variables', level - baseLevel));
    result.push(...variables.map(v => `- ${linkRef(`${plName}-var`, v)}`));
    result.push('');
    result.push(...endSpoiler(level - baseLevel));
  }

  return result;
};

const generateDocs = (plName, taskDir, reqDir, varDir, taskNames, baseLevel) => {
  assert(
    Array.isArray(taskNames) && taskNames.every(e => typeof e === 'string'),
    'Invalid "taskNames" parameter format.'
  );
  assert(Number.isInteger(baseLevel), 'Invalid "baseLevel" parameter format.');

  const sections = taskNames.map(taskName => ({ level: baseLevel, taskName }));

  // expand tasks with subtasks
  for (let idx = 0; idx < sections.length; idx += 1) {
    const { level, taskName } = sections[idx];
    const task = sfs.smartRead(sfs.guessFile(path.join(taskDir, taskName)));
    sections[idx].task = task;
    sections.splice(idx + 1, 0, ...(task.tasks || [])
      .sort((a, b) => b.includes('/@') - a.includes('/@'))
      .map(stn => (stn.includes('/') ? stn : `${taskName.split('/')[0]}/${stn}`))
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
      result.push('');
      result.push(...endSpoiler(section.level - baseLevel));
    }
    result.push(...documentSection(plName, baseLevel, section));
    lastLevel = section.level;
  });
  result.push('</details>');
  result.push('');

  // append docs for requires and variables
  [
    {
      name: 'Requires',
      source: 'requires',
      dir: reqDir,
      schema: Joi.object().keys({
        description: Joi.string().required(),
        details: Joi.array().items(Joi.string()),
        website: Joi.string().required()
      })
        .unknown(false)
        .required()
    },
    {
      name: 'Variables',
      source: 'variables',
      dir: varDir,
      schema: Joi.object().keys({
        description: Joi.string().required(),
        details: Joi.array().items(Joi.string()),
        type: Joi.string().required()
      })
        .unknown(false)
        .required()
    }
  ].forEach((def) => {
    const toDocument = [...new Set(sections.reduce((p, c) => p.concat(c[def.source]), []))];
    if (toDocument.length !== 0) {
      result.push('------');
      result.push('------');
      result.push('');
      result.push(`## ${def.name}`);
      result.push('');
      toDocument.forEach((e) => {
        result.push(`### ${createRef(`${plName}-${def.name.slice(0, 3)}`, e)}`);
        result.push('');
        const f = sfs.guessFile(path.join(def.dir, e));
        assert(typeof f === 'string', `Missing ${def.name} Definition: ${e}`);
        const data = sfs.smartRead(f);
        assert(
          Joi.validate(data, def.schema).error === null,
          `Invalid ${def.name} Definition: ${e}\n\n${JSON
            .stringify(Joi.validate(data, def.schema).error, null, 2)}`
        );
        if (data.type !== undefined) {
          result.push(`Type: \`${data.type}\``);
          result.push('');
        }
        if (data.website !== undefined) {
          result.push(`[Website](${data.website})`);
          result.push('');
        }
        result.push(data.description);
        result.push('');
        if (data.details.length !== 0) {
          result.push(...startSpoiler('Details', 0));
          result.push(...data.details);
          result.push('');
          result.push(...endSpoiler(0));
        }
      });
    }
  });

  return result;
};
module.exports.generateDocs = generateDocs;

const syncDocs = (plName, taskDir, reqDir, varDir, docDir) => {
  const docFiles = [];

  // generate doc files
  const result = [];
  listTasks(taskDir)
    .map(f => [`${f}.json`, `${f}.md`])
    .forEach(([f, docFile]) => {
      docFiles.push(docFile);
      if (sfs.smartWrite(path.join(docDir, docFile), generateDocs(plName, taskDir, reqDir, varDir, [f], 0))) {
        result.push(`Updated: ${docFile}`);
      }
    });

  // delete outdated doc files
  sfs
    .walkDir(docDir)
    .filter(f => f.includes('/@'))
    .filter(f => f.endsWith('.md'))
    .filter(f => !docFiles.includes(f))
    .forEach(f => sfs.cleaningDelete(path.join(docDir, f)));

  if (result.length !== 0) {
    result.push('Documentation Updated. Please commit and re-run.');
  }
  return result;
};
module.exports.syncDocs = syncDocs;
