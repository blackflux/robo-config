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

  it('Testing Multi Task', ({ dir }) => {
    sfs.smartWrite(path.join(dir, '.roboconfig.json'), {
      [pluginFile]: {
        tasks: {
          'misc/@default~target1': {
            // eslint-disable-next-line no-template-curly-in-string
            misc: '${ref}'
          },
          'misc/@default~target2': {
            // eslint-disable-next-line no-template-curly-in-string
            misc: '${ref}'
          }
        },
        variables: {
          variable: 'var'
        }
      }
    });
    expect(robo(dir)).to.deep.equal([
      'Updated: target1.txt',
      'Updated: target2.txt',
      'Updated: CONFDOCS.md'
    ]);
    expect(robo(dir)).to.deep.equal([]);
    expect(sfs.smartRead(path.join(dir, 'target1.txt'))).to.deep.equal(['var']);
    expect(sfs.smartRead(path.join(dir, 'target2.txt'))).to.deep.equal(['var']);
  });
});
