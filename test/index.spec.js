const path = require('path');
const tmp = require('tmp');
const expect = require('chai').expect;
const appRoot = require('app-root-path');
const sfs = require('smart-fs');
const robo = require('../src/index');

it('Apply Robo Configuration', () => {
  expect(robo()).to.deep.equal([]);
});

describe('Robo + Plugin Integration Tests', () => {
  const pluginFile = path.join(__dirname, 'mock', 'plugin.js');

  let dir;
  beforeEach(() => {
    dir = tmp.dirSync({ keep: false, unsafeCleanup: true }).name;
  });

  it('Testing Config From File', () => {
    sfs.smartWrite(path.join(dir, '.roboconfig.json'), {});

    const prevAppRootPath = appRoot.path;
    appRoot.path = dir;
    expect(robo()).to.deep.equal([]);
    appRoot.path = prevAppRootPath;
  });

  it('Testing Missing Config File', () => {
    const prevAppRootPath = appRoot.path;
    appRoot.path = dir;
    expect(() => robo()).to.throw(`Configuration File missing: ${dir}/.roboconfig`);
    appRoot.path = prevAppRootPath;
  });

  it('Testing Bad Task', () => {
    expect(() => robo(null, {
      [pluginFile]: {
        tasks: ['unknown/@task'],
        projectRoot: dir
      }
    })).to.throw('Bad Task Name: unknown/@task');
  });

  it('Testing Bad Robo Task', () => {
    expect(() => robo(null, {
      [pluginFile]: {
        projectRoot: dir
      }
    })).to.throw('ValidationError: child "tasks" fails because ["tasks" is required]');
  });

  it('Testing Configuration File Updated', () => {
    const cfg = {
      [pluginFile]: {
        tasks: ['txt-overwrite/@default'],
        projectRoot: dir
      }
    };
    expect(robo(null, cfg)).to.deep.equal([
      'Updated: overwrite-target.txt',
      'Updated: CONFDOCS.md'
    ]);
    expect(robo(null, cfg)).to.deep.equal([]);
  });
});
