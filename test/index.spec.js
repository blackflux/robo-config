const path = require('path');
const expect = require('chai').expect;
const { describe } = require('node-tdd');
const appRoot = require('app-root-path');
const sfs = require('smart-fs');
const robo = require('../src/index');

describe('Robo + Plugin Integration Tests', { useTmpDir: true }, () => {
  let pluginFile;
  beforeEach(() => {
    pluginFile = path.join(__dirname, 'mock', 'plugin.js');
  });

  it('Testing Config From File', ({ dir }) => {
    sfs.smartWrite(path.join(dir, '.roboconfig.json'), {});
    expect(robo(dir)).to.deep.equal([]);
  });

  it('Testing Config From File using appRoot.path', ({ dir }) => {
    const appRootPath = appRoot.path;
    appRoot.path = dir;
    sfs.smartWrite(path.join(dir, '.roboconfig.json'), {});
    expect(robo()).to.deep.equal([]);
    appRoot.path = appRootPath;
  });

  it('Testing Missing Config File', ({ dir }) => {
    expect(() => robo(dir)).to.throw(`Configuration File missing: ${dir}/.roboconfig`);
  });

  it('Testing Bad Task', ({ dir }) => {
    sfs.smartWrite(path.join(dir, '.roboconfig.json'), {
      [pluginFile]: {
        tasks: ['unknown/@task']
      }
    });
    expect(() => robo(dir)).to.throw('Bad Task Name: unknown/@task');
  });

  it('Testing Bad Robo Task', ({ dir }) => {
    sfs.smartWrite(path.join(dir, '.roboconfig.json'), {
      [pluginFile]: {}
    });
    expect(() => robo(dir)).to.throw('[1] "tasks" is required');
  });

  it('Testing Configuration File Updated', ({ dir }) => {
    sfs.smartWrite(path.join(dir, '.roboconfig.json'), {
      [pluginFile]: {
        tasks: ['txt-overwrite/@default']
      }
    });
    expect(robo(dir)).to.deep.equal([
      'Updated: overwrite-target.txt',
      'Updated: CONFDOCS.md'
    ]);
    expect(robo(dir)).to.deep.equal([]);
  });

  it('Testing Target Exclusion', ({ dir }) => {
    sfs.smartWrite(path.join(dir, '.roboconfig.json'), {
      [pluginFile]: {
        tasks: ['txt-overwrite/@default'],
        exclude: ['overwrite-target.txt']
      }
    });
    expect(robo(dir)).to.deep.equal([
      'Updated: CONFDOCS.md'
    ]);
    expect(robo(dir)).to.deep.equal([]);
    expect(sfs.smartRead(path.join(dir, 'CONFDOCS.md'))).to.include(
      '<code>└─&nbsp;<a href="#mock-plugin-target-ref-overwrite-targettxt"><strike>'
      + 'overwrite-target.txt</strike></a></code><br/>'
    );
  });

  it('Testing Unknown Plugin', ({ dir }) => {
    sfs.smartWrite(path.join(dir, '.roboconfig.json'), {});
    sfs.smartWrite(path.join(dir, '.roboconfig.lock'), {
      unknown: {
        'some-file.txt': true
      }
    }, { treatAs: 'json' });
    expect(() => robo(dir)).to.throw(
      'Unknown plugin "unknown". Delete files "some-file.txt" '
      + 'as necessary and remove from lock file.'
    );
  });

  it('Testing Unknown File', ({ dir }) => {
    sfs.smartWrite(path.join(dir, '.roboconfig.json'), {
      [pluginFile]: {
        tasks: ['txt-overwrite/@default']
      }
    });
    sfs.smartWrite(path.join(dir, '.roboconfig.lock'), {
      'mock-plugin': ['unknown-file.txt']
    }, { treatAs: 'json' });
    expect(() => robo(dir)).to.throw(
      'File(s) "unknown-file.txt" not managed by plugin "mock-plugin". '
      + 'Delete file as necessary and remove from lock file.'
    );
  });

  it('Testing Unknown Target Exclusion', ({ dir }) => {
    sfs.smartWrite(path.join(dir, '.roboconfig.json'), {
      [pluginFile]: {
        tasks: ['txt-overwrite/@default'],
        exclude: ['unknown-file.txt']
      }
    });
    expect(() => robo(dir)).to.throw(
      'Excluded file "unknown-file.txt" not managed by plugin "mock-plugin". '
      + 'Delete reference in configuration file.'
    );
  });

  it('Testing Bad Variable Format', ({ dir }) => {
    sfs.smartWrite(path.join(dir, '.roboconfig.json'), {
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
    expect(() => robo(dir)).to.throw('Invalid variable type for "variable". Expected "string".');
  });

  it('Testing Multi Task', ({ dir }) => {
    sfs.smartWrite(path.join(dir, '.roboconfig.json'), {
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
    expect(robo(dir)).to.deep.equal([
      'Updated: target1.yml',
      'Updated: target2.yml',
      'Updated: CONFDOCS.md'
    ]);
    expect(robo(dir)).to.deep.equal([]);
    const data = [
      'var', 'VAR', 'Var', 'var',
      'Some Words', 'someWords', 'some-words', 'some_words',
      'somewords', 'SomeWords', 'SOME_WORDS', 'some-words',
      'string', true, {}, [], 123.1, 113
    ];
    expect(sfs.smartRead(path.join(dir, 'target1.yml'))).to.deep.equal({ data });
    expect(sfs.smartRead(path.join(dir, 'target2.yml'))).to.deep.equal({ data });
    expect(sfs.smartRead(path.join(dir, '.roboconfig.lock'), { treatAs: 'json' }))
      .to.deep.equal({ 'mock-plugin': ['target1.yml', 'target2.yml'] });
  });
});
