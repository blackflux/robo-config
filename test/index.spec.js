const path = require('path');
const tmp = require('tmp');
const expect = require('chai').expect;
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
    expect(robo(dir)).to.deep.equal([]);
  });

  it('Testing Missing Config File', () => {
    expect(() => robo(dir)).to.throw(`Configuration File missing: ${dir}/.roboconfig`);
  });

  it('Testing Bad Task', () => {
    sfs.smartWrite(path.join(dir, '.roboconfig.json'), {
      [pluginFile]: {
        tasks: ['unknown/@task'],
        projectRoot: dir
      }
    });
    expect(() => robo(dir)).to.throw('Bad Task Name: unknown/@task');
  });

  it('Testing Bad Robo Task', () => {
    sfs.smartWrite(path.join(dir, '.roboconfig.json'), {
      [pluginFile]: {
        projectRoot: dir
      }
    });
    expect(() => robo(dir)).to.throw('ValidationError: child "tasks" fails because ["tasks" is required]');
  });

  it('Testing Configuration File Updated', () => {
    sfs.smartWrite(path.join(dir, '.roboconfig.json'), {
      [pluginFile]: {
        tasks: ['txt-overwrite/@default'],
        projectRoot: dir
      }
    });
    expect(robo(dir)).to.deep.equal([
      'Updated: overwrite-target.txt',
      'Updated: CONFDOCS.md'
    ]);
    expect(robo(dir)).to.deep.equal([]);
  });
});
