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
    expect(() => robo(dir)).to.throw('ValidationError: child "tasks" fails because ["tasks" is required]');
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
});
