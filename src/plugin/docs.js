const assert = require('assert');
const path = require('path');
const Joi = require('joi');
const sfs = require('smart-fs');
const treeify = require('object-treeify');
const { determineVars } = require('./vars');
const { listTasks } = require('./task');

const normalizeRef = input => input
  .trim()
  .toLowerCase()
  .replace(/[^\w\- ]+/g, '')
  .replace(/\s/g, '-')
  .replace(/-+$/, '');
const createRef = (type, content) => `<a name="${normalizeRef(`${type}-ref-${content}`)}">${content}</a>`;
const linkRef = (type, content) => `<a href="#${normalizeRef(`${type}-ref-${content}`)}">${content}</a>`;

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
  result.push(`${
    '#'.repeat(level + 1)
  } ${
    task.target !== undefined ? ':clipboard:' : ':open_file_folder:'
  } ${
    createRef(`${plName}-task`, taskName)
  }`, '');
  if (typeof task.target === 'string') {
    result.push(`_Updating \`${task.target}\` using ${linkRef(`${plName}-strat`, task.strategy)}._`);
    result.push('');
    result.push(...task.purpose.map(d => `- ${d}`));
    result.push('');
  } else {
    result.push(task.description);
    result.push('');
  }

  result.push('*Targets:*');
  result.push(...documentFiles('project', targets));

  if (requires.length !== 0 && variables.length !== 0) {
    result.push('<table>');
    result.push('  <tbody>');
    result.push('    <tr>');
    result.push('      <th>Requires</th>');
    result.push('      <th>Variables</th>');
    result.push('    </tr>');
    result.push('    <tr>');
    result.push('      <td>');
    result.push('        <ul>');
    result.push(...requires.map(r => `          <li>${linkRef(`${plName}-req`, r)}</li>`));
    result.push('        </ul>');
    result.push('      </td>');
    result.push('      <td>');
    result.push('        <ul>');
    result.push(...variables.map(v => `          <li>${linkRef(`${plName}-var`, v)}</li>`));
    result.push('        </ul>');
    result.push('      </td>');
    result.push('    </tr>');
    result.push('  </tbody>');
    result.push('</table>');
    result.push('');
  } else {
    if (requires.length !== 0) {
      result.push('*Requires:*');
      result.push(...requires.map(r => `- ${linkRef(`${plName}-req`, r)}`));
      result.push('');
    }

    if (variables.length !== 0) {
      result.push('*Variables:*');
      result.push(...variables.map(v => `- ${linkRef(`${plName}-var`, v)}`));
      result.push('');
    }
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

  const index = [];
  const content = [];

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
    const strategies = [];
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
      strategies.push(subSection.task.strategy);
    }
    Object.assign(section, {
      targets: [...new Set(targets.filter(e => !!e))],
      requires: [...new Set(requires)],
      variables: [...new Set(variables)],
      strategies: [...new Set(strategies.filter(e => !!e))]
    });
  });

  // generate docs for tasks
  sections.forEach((section) => {
    index.push(`${
      '  '.repeat(section.level - baseLevel)
    }- ${
      section.task.target !== undefined ? ':clipboard:' : ':open_file_folder:'
    } ${
      linkRef(`${plName}-task`, `\`${section.taskName}\``)
    }`);
    content.push(...documentSection(plName, baseLevel, section));
  });

  // append docs for requires, variables and strategies
  [
    {
      name: 'Requires',
      source: 'requires',
      short: 'req',
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
      short: 'var',
      dir: varDir,
      schema: Joi.object().keys({
        description: Joi.string().required(),
        details: Joi.array().items(Joi.string()),
        type: Joi.string().valid('string', 'boolean', 'object', 'array', 'number', 'integer').required()
      })
        .unknown(false)
        .required()
    },
    {
      name: 'Strategies',
      source: 'strategies',
      short: 'strat',
      dir: path.join(__dirname, 'strategies'),
      schema: Joi.object().keys({
        validFor: Joi.array()
          .items(Joi.string().valid('nostruct', 'list', 'xml', 'json', 'yml', 'any'))
          .unique()
          .min(1)
          .required(),
        description: Joi.string().required(),
        details: Joi.array().items(Joi.string())
      })
        .unknown(false)
        .required()
    }
  ].forEach((def) => {
    const toDocument = [...new Set(sections.reduce((p, c) => p.concat(c[def.source]), []))];
    if (toDocument.length !== 0) {
      content.push('------');
      content.push('------');
      content.push('');
      content.push(`## ${def.name}`);
      content.push('');
      toDocument.forEach((e) => {
        content.push(`### ${createRef(`${plName}-${def.short}`, e)}`);
        content.push('');
        const f = sfs.guessFile(path.join(def.dir, e));
        assert(typeof f === 'string', `Missing ${def.name} Definition: ${e}`);
        const data = sfs.smartRead(f);
        assert(
          Joi.validate(data, def.schema).error === null,
          `Invalid ${def.name} Definition: ${e}\n\n${JSON
            .stringify(Joi.validate(data, def.schema).error, null, 2)}`
        );
        if (data.type !== undefined) {
          content.push(`Type: \`${data.type}\``);
          content.push('');
        }
        if (data.website !== undefined) {
          content.push(`[Website](${data.website})`);
          content.push('');
        }
        if (data.validFor !== undefined) {
          content.push(`Valid for: ${data.validFor.map(v => `\`${v}\``).join(', ')}`);
          content.push('');
        }
        content.push(data.description);
        content.push('');
        if (data.details.length !== 0) {
          content.push('*Details:*');
          content.push(...data.details);
          content.push('');
        }
      });
    }
  });

  return [
    ...index,
    '',
    ...content
  ];
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
