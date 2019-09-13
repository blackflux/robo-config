const assert = require('assert');
const path = require('path');
const Joi = require('joi-strict');
const sfs = require('smart-fs');
const treeify = require('object-treeify');
const { determineVars } = require('./vars');
const { listPublicTasks } = require('./task');

const normalizeRef = (input) => input
  .trim()
  .toLowerCase()
  .replace(/[^\w\- ]+/g, '')
  .replace(/\s/g, '-')
  .replace(/-+$/, '');
const anchorRef = (type, c, ident = null) => `<a name="${normalizeRef(`${type}-ref-${ident || c}`)}">${c}</a>`;
const linkRef = (type, c, ident = null) => `<a href="#${normalizeRef(`${type}-ref-${ident || c}`)}">${c}</a>`;

const getTaskIcon = (task) => (task.target !== undefined ? ':clipboard:' : ':open_file_folder:');

const documentFiles = (root, plName, files, exclude) => {
  const result = [];
  result.push(root);

  const fileTree = files
    .reduce((prev, file) => {
      const append = file.split('/');
      if (exclude.includes(file)) {
        append[append.length - 1] = `<strike>${append[append.length - 1]}</strike>`;
      }
      append[append.length - 1] = linkRef(`${plName}-target`, append[append.length - 1], file);
      append.reduce((p, c) => Object.assign(p, { [c]: p[c] || {} })[c], prev);
      return prev;
    }, {});

  result.push(...treeify(fileTree, {
    joined: false,
    spacerNoNeighbour: '&nbsp;&nbsp;&nbsp;',
    spacerNeighbour: '│&nbsp;&nbsp;',
    keyNoNeighbour: '└─&nbsp;',
    keyNeighbour: '├─&nbsp;',
    sortFn: (a, b) => a.localeCompare(b)
  }));

  return result;
};
module.exports.documentFiles = documentFiles;

const documentSection = (plName, baseLevel, exclude, {
  level, taskName, task, targets, requires, variables
}) => {
  assert(Number.isInteger(level), 'Invalid "level" parameter format.');
  assert(typeof taskName === 'string', 'Invalid "taskName" parameter format.');
  assert(task instanceof Object && !Array.isArray(task), 'Invalid "task" parameter format.');

  const result = [];
  result.push(`${'#'.repeat(level + 1)} ${getTaskIcon(task)} ${
    anchorRef(`${plName}-task`, taskName)
  } (${
    linkRef(`${plName}-task-idx`, '`index`', taskName)
  })`, '');
  if (typeof task.target === 'string') {
    result.push(`_Updating ${
      linkRef(`${plName}-target`, task.target)
    }${
      task.create === false ? ' (if exists)' : ''
    } using ${
      linkRef(`${plName}-strat`, task.strategy)
    }._`);
    result.push('');
    result.push(...task.purpose.map((d) => `- ${d}`));
    result.push('');
  } else {
    result.push(task.description);
    result.push('');
  }

  result.push('<table>');
  result.push('  <tbody>');
  result.push('    <tr>');

  result.push('      <th>Targets</th>');
  if (requires.length !== 0) {
    result.push('      <th>Requires</th>');
  }
  if (variables.length !== 0) {
    result.push('      <th>Variables</th>');
  }

  result.push('    </tr>');
  result.push('    <tr>');

  result.push('      <td align="left" valign="top">');
  result.push('        <ul>');
  result.push(...documentFiles('project', plName, targets, exclude)
    .map((l) => `<code>${l}</code><br/>`));
  result.push('        </ul>');
  result.push('      </td>');
  if (requires.length !== 0) {
    result.push('      <td align="left" valign="top">');
    result.push('        <ul>');
    result.push(...requires.map((r) => `          <li>${linkRef(`${plName}-req`, r)}</li>`));
    result.push('        </ul>');
    result.push('      </td>');
  }
  if (variables.length !== 0) {
    result.push('      <td align="left" valign="top">');
    result.push('        <ul>');
    result.push(...variables.map((v) => `          <li>${linkRef(`${plName}-var`, v)}</li>`));
    result.push('        </ul>');
    result.push('      </td>');
  }

  result.push('    </tr>');
  result.push('  </tbody>');
  result.push('</table>');
  result.push('');

  return result;
};

const generateDocs = (plName, taskDir, reqDir, varDir, targetDir, taskNames, exclude, baseLevel) => {
  assert(
    Array.isArray(taskNames) && taskNames.every((e) => typeof e === 'string'),
    'Invalid "taskNames" parameter format.'
  );
  assert(
    Array.isArray(exclude) && exclude.every((e) => typeof e === 'string'),
    'Invalid "exclude" parameter format.'
  );
  assert(Number.isInteger(baseLevel), 'Invalid "baseLevel" parameter format.');

  const sections = taskNames.map((taskName) => ({ level: baseLevel, taskName }));

  // expand tasks with subtasks
  for (let idx = 0; idx < sections.length; idx += 1) {
    const { level, taskName } = sections[idx];
    const task = sfs.smartRead(sfs.guessFile(path.join(taskDir, taskName)));
    sections[idx].task = task;
    sections.splice(idx + 1, 0, ...(task.tasks || [])
      .sort((a, b) => (
        b.includes('/@') - a.includes('/@')
        || b.includes('/#') - a.includes('/#')
        || b.localeCompare(a)
      ))
      .map((stn) => (stn.includes('/') ? stn : `${taskName.split('/')[0]}/${stn}`))
      .map((subtaskName) => ({ level: level + 1, taskName: subtaskName })));
  }

  const index = [];
  const content = [];

  // pull information into upper sections
  sections.forEach((section, idx) => {
    const targets = [section.task.target];
    const requires = section.task.requires || [];
    const variables = (section.task.snippets || [])
      .filter((s) => typeof s !== 'string')
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
        .filter((s) => typeof s !== 'string')
        .reduce(
          (p, s) => p.concat(...determineVars(s.variables)),
          determineVars({ target: subSection.task.target })
        ));
      strategies.push(subSection.task.strategy);
    }
    Object.assign(section, {
      targets: [...new Set(targets.filter((e) => !!e))],
      requires: [...new Set(requires)],
      variables: [...new Set(variables)],
      strategies: [...new Set(strategies.filter((e) => !!e))]
    });
  });

  // generate docs for tasks
  sections.forEach((section) => {
    index.push(`${'  '.repeat(section.level - baseLevel)}- ${
      anchorRef(`${plName}-task-idx`, getTaskIcon(section.task), section.taskName)
    } ${
      linkRef(`${plName}-task`, `\`${section.taskName}\``)
    }`);
    content.push(...documentSection(plName, baseLevel, exclude, section));
  });

  // append docs for requires, variables and strategies
  [
    {
      name: 'Requires',
      source: 'requires',
      short: 'req',
      dir: reqDir,
      schema: Joi.object().keys({
        description: Joi.string(),
        details: Joi.array().items(Joi.string()).optional(),
        website: Joi.string()
      })
    },
    {
      name: 'Variables',
      source: 'variables',
      short: 'var',
      dir: varDir,
      schema: Joi.object().keys({
        description: Joi.string(),
        details: Joi.array().items(Joi.string()).optional(),
        type: Joi.string().valid('string', 'boolean', 'object', 'array', 'number', 'integer')
      })
    },
    {
      name: 'Targets',
      source: 'targets',
      short: 'target',
      dir: targetDir,
      schema: Joi.object().keys({
        formats: Joi.array()
          .items(Joi.string().valid('nostruct', 'list', 'xml', 'json', 'yml', 'other'))
          .unique()
          .min(1),
        requires: Joi.array().items(Joi.string()).unique(),
        website: Joi.string().allow(null),
        description: Joi.string(),
        details: Joi.array().items(Joi.string()).optional()
      })
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
          .min(1),
        description: Joi.string(),
        details: Joi.array().items(Joi.string()).optional()
      })
    }
  ].forEach((def) => {
    const toDocument = [...new Set(sections.reduce((p, c) => p.concat(c[def.source]), []))];
    if (toDocument.length !== 0) {
      content.push('------');
      content.push('');
      content.push(`## ${def.name}`);
      content.push('');
      toDocument.forEach((e) => {
        const f = sfs.guessFile(path.join(def.dir, e));
        assert(typeof f === 'string', `Missing ${def.name} Definition: ${e}`);
        const data = sfs.smartRead(f);

        content.push(`### ${anchorRef(`${plName}-${def.short}`, e)} ${
          typeof data.website === 'string' ? `([\`link\`](${data.website}))` : ''
        } ${
          data.type !== undefined ? `: \`${data.type}\`` : ''
        }`);
        content.push('');
        assert(
          def.schema.validate(data).error === undefined,
          `Invalid ${def.name} Definition: ${e}\n\n${JSON
            .stringify(def.schema.validate(data).error, null, 2)}`
        );
        [[
          'validFor', ':small_blue_diamond:'
        ], [
          'requires', ':small_red_triangle:'
        ], [
          'formats', ':small_blue_diamond:'
        ]]
          .filter(([type, _]) => data[type] !== undefined && data[type].length !== 0)
          .forEach(([type, icon]) => {
            if (type === 'requires') {
              data[type].forEach((r) => {
                assert(
                  typeof sfs.guessFile(path.join(reqDir, r)) === 'string',
                  `Missing ${def.name} Definition (required): ${r}`
                );
                assert(
                  data.requires.includes(r),
                  `Requires ${r} must be declared by at least one corresponding task.`
                );
              });
            }
            content.push(`${icon} ${data[type]
              .map((v) => (type === 'requires' ? linkRef(`${plName}-req`, v) : `\`${v}\``))
              .join(', ')}`);
            content.push('');
          });

        content.push(`*${data.description}*`);
        content.push('');
        if (data.details.length !== 0) {
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

const syncDocs = (plName, taskDir, reqDir, varDir, targetDir, docDir) => {
  const docFiles = [];

  // generate doc files
  const result = [];
  listPublicTasks(taskDir)
    .map((f) => [`${f}.json`, `${f}.md`])
    .forEach(([f, docFile]) => {
      docFiles.push(docFile);
      if (sfs.smartWrite(
        path.join(docDir, docFile),
        generateDocs(plName, taskDir, reqDir, varDir, targetDir, [f], [], 0)
      )) {
        result.push(`Updated: ${docFile}`);
      }
    });

  // delete outdated doc files
  sfs
    .walkDir(docDir)
    .filter((f) => f.includes('/@'))
    .filter((f) => f.endsWith('.md'))
    .filter((f) => !docFiles.includes(f))
    .forEach((f) => sfs.cleaningDelete(path.join(docDir, f)));

  if (result.length !== 0) {
    result.push('Documentation Updated. Please commit and re-run.');
  }
  return result;
};
module.exports.syncDocs = syncDocs;
