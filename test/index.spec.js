const path = require('path');
const tmp = require('tmp');
const expect = require('chai').expect;
const robo = require('../src/index');

it('Apply Configuration Tasks', () => {
  expect(robo()).to.deep.equal([]);
});

describe('Integration Tests', () => {
  const pluginFile = path.join(__dirname, 'mock', 'plugin.js');

  let dir;
  beforeEach(() => {
    dir = tmp.dirSync({ keep: false, unsafeCleanup: true }).name;
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
    expect(robo(null, {
      [pluginFile]: {
        tasks: ['editor/@default'],
        projectRoot: dir
      }
    })).to.deep.equal([
      'Updated: .editorconfig',
      'Updated: CONFDOCS.md'
    ]);
  });
});
