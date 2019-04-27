const path = require('path');
const tmp = require('tmp');
const expect = require('chai').expect;
const appRoot = require('app-root-path');
const sfs = require('smart-fs');
const robo = require('../src/index');

describe('Robo + Plugin Integration Tests', () => {
  const pluginFile = path.join(__dirname, 'mock', 'plugin.js');

  let dir;
  beforeEach(() => {
    dir = tmp.dirSync({ keep: false, unsafeCleanup: true }).name;
  });

  it('Testing Config From File', () => {
    sfs.smartWrite(path.join(dir, '.roboconfig.json'), {});
    expect(robo(dir)).to.deep.equal([]);
  });

  it('Testing Config From File using appRoot.path', () => {
    const appRootPath = appRoot.path;
    appRoot.path = dir;
    sfs.smartWrite(path.join(dir, '.roboconfig.json'), {});
    expect(robo()).to.deep.equal([]);
    appRoot.path = appRootPath;
  });

  it('Testing Missing Config File', () => {
    expect(() => robo(dir)).to.throw(`Configuration File missing: ${dir}/.roboconfig`);
  });

  it('Testing Bad Task', () => {
    sfs.smartWrite(path.join(dir, '.roboconfig.json'), {
      [pluginFile]: {
        tasks: ['unknown/@task']
      }
    });
    expect(() => robo(dir)).to.throw('Bad Task Name: unknown/@task');
  });

  it('Testing Bad Robo Task', () => {
    sfs.smartWrite(path.join(dir, '.roboconfig.json'), {
      [pluginFile]: {}
    });
    expect(() => robo(dir)).to.throw('ValidationError: child "tasks" fails because ["tasks" is required]');
  });

  it('Testing Configuration File Updated', () => {
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

  it('Testing Target Exclusion', () => {
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
      '<code>└─&nbsp;<strike><a href="#mock-plugin-target-ref-overwrite-targettxt">'
      + 'overwrite-target.txt</a></strike></code><br/>'
    );
  });
});
