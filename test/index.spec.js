import path from 'path';
import { expect } from 'chai';
import { describe } from 'node-tdd';
import appRoot from 'app-root-path';
import fs from 'smart-fs';
import robo from '../src/index.js';

describe('Robo + Plugin Integration Tests', { useTmpDir: true }, () => {
  let pluginFile;
  beforeEach(() => {
    pluginFile = path.join(fs.dirname(import.meta.url), 'mock', 'plugin.js');
  });

  it('Testing Config From File', async ({ dir }) => {
    fs.smartWrite(path.join(dir, '.roboconfig.json'), {});
    expect(await robo(dir)).to.deep.equal([]);
  });

  it('Testing Config From File using appRoot.path', async ({ dir }) => {
    const appRootPath = appRoot.path;
    appRoot.path = dir;
    fs.smartWrite(path.join(dir, '.roboconfig.json'), {});
    expect(await robo()).to.deep.equal([]);
    appRoot.path = appRootPath;
  });

  it('Testing Missing Config File', async ({ dir, capture }) => {
    const err = await capture(() => robo(dir));
    expect(err.message).to.equal(`Configuration File missing: ${dir}/.roboconfig`);
  });

  it('Testing Bad Task', async ({ dir, capture }) => {
    fs.smartWrite(path.join(dir, '.roboconfig.json'), {
      [pluginFile]: {
        tasks: ['unknown/@task']
      }
    });
    const err = await capture(() => robo(dir));
    expect(err.message).to.equal('Bad Task Name: unknown/@task');
  });

  it('Testing Bad Robo Task', async ({ dir, capture }) => {
    fs.smartWrite(path.join(dir, '.roboconfig.json'), {
      [pluginFile]: {}
    });
    const err = await capture(() => robo(dir));
    expect(err.message).to.include('[1] "tasks" is required');
  });

  it('Testing Configuration File Updated', async ({ dir }) => {
    fs.smartWrite(path.join(dir, '.roboconfig.json'), {
      [pluginFile]: {
        tasks: ['txt-overwrite/@default']
      }
    });
    expect(await robo(dir)).to.deep.equal([
      'Updated: overwrite-target.txt',
      'Updated: CONFDOCS.md'
    ]);
    expect(await robo(dir)).to.deep.equal([]);
  });

  it('Testing Target Exclusion', async ({ dir }) => {
    fs.smartWrite(path.join(dir, '.roboconfig.json'), {
      [pluginFile]: {
        tasks: ['txt-overwrite/@default'],
        exclude: ['overwrite-target.txt']
      }
    });
    expect(await robo(dir)).to.deep.equal([
      'Updated: CONFDOCS.md'
    ]);
    expect(await robo(dir)).to.deep.equal([]);
    expect(fs.smartRead(path.join(dir, 'CONFDOCS.md'))).to.include(
      '<code>└─&nbsp;<a href="#mock-plugin-target-ref-overwrite-targettxt"><strike>'
      + 'overwrite-target.txt</strike></a></code><br/>'
    );
  });

  it('Testing Unknown Plugin', async ({ dir, capture }) => {
    fs.smartWrite(path.join(dir, '.roboconfig.json'), {});
    fs.smartWrite(path.join(dir, '.roboconfig.lock'), {
      unknown: {
        'some-file.txt': true
      }
    }, { treatAs: 'json' });
    const err = await capture(() => robo(dir));
    expect(err.message).to.equal(
      'Unknown plugin "unknown". Delete files "some-file.txt" '
      + 'as necessary and remove from lock file.'
    );
  });

  it('Testing Unknown File', async ({ dir, capture }) => {
    fs.smartWrite(path.join(dir, '.roboconfig.json'), {
      [pluginFile]: {
        tasks: ['txt-overwrite/@default']
      }
    });
    fs.smartWrite(path.join(dir, '.roboconfig.lock'), {
      'mock-plugin': ['unknown-file.txt']
    }, { treatAs: 'json' });
    const err = await capture(() => robo(dir));
    expect(err.message).to.equal(
      'File(s) "unknown-file.txt" not managed by plugin "mock-plugin". '
      + 'Delete file as necessary and remove from lock file.'
    );
  });

  it('Testing Unknown Target Exclusion', async ({ dir, capture }) => {
    fs.smartWrite(path.join(dir, '.roboconfig.json'), {
      [pluginFile]: {
        tasks: ['txt-overwrite/@default'],
        exclude: ['unknown-file.txt']
      }
    });
    const err = await capture(() => robo(dir));
    expect(err.message).to.equal(
      'Excluded file "unknown-file.txt" not managed by plugin "mock-plugin" task(s). '
      + 'Delete reference in configuration file or add missing task.'
    );
  });

  it('Testing Bad Variable Format', async ({ dir, capture }) => {
    fs.smartWrite(path.join(dir, '.roboconfig.json'), {
      [pluginFile]: {
        tasks: [
          {
            name: 'misc/@default',
            variables: {
              misc: 'target1'
            }
          }
        ],
        variables: {
          variable: 123,
          string: 'string',
          boolean: true,
          object: {},
          array: [],
          number: 123.1,
          integer: 113
        }
      }
    });
    const err = await capture(() => robo(dir));
    expect(err.message).to.equal('Invalid variable type for "variable". Expected "string".');
  });

  it('Testing Multi Task', async ({ dir }) => {
    fs.smartWrite(path.join(dir, '.roboconfig.json'), {
      [pluginFile]: {
        tasks: [
          {
            name: 'misc/@default',
            variables: {
              misc: 'target1'
            }
          },
          {
            name: 'misc/@default',
            variables: {
              misc: 'target2'
            }
          }
        ],
        variables: {
          variable: 'var',
          string: 'string',
          boolean: true,
          object: {},
          array: [],
          number: 123.1,
          integer: 113
        }
      }
    });
    expect(await robo(dir)).to.deep.equal([
      'Updated: target1.yml',
      'Updated: target2.yml',
      'Updated: CONFDOCS.md'
    ]);
    expect(await robo(dir)).to.deep.equal([]);
    const data = [
      'var', 'VAR', 'Var', 'var',
      'Some Words', 'someWords', 'some-words', 'some_words',
      'somewords', 'SomeWords', 'SOME_WORDS', 'some-words',
      'string', true, {}, [], 123.1, 113, 'default-value'
    ];
    expect(fs.smartRead(path.join(dir, 'target1.yml'))).to.deep.equal({ data });
    expect(fs.smartRead(path.join(dir, 'target2.yml'))).to.deep.equal({ data });
    expect(fs.smartRead(path.join(dir, '.roboconfig.lock'), { treatAs: 'json' }))
      .to.deep.equal({ 'mock-plugin': ['target1.yml', 'target2.yml'] });
  });
});
