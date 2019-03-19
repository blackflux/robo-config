const path = require('path');
const tmp = require('tmp');
const expect = require('chai').expect;
const robo = require('../src/index');

it('Apply Configuration Tasks', () => {
  expect(robo()).to.deep.equal([]);
});

it('Synchronize Tasks Documentation', () => {
  robo.syncTaskDocs(
    path.join(__dirname, '..', 'src', 'tasks'),
    path.join(__dirname, '..', 'src', 'docs')
  );
});

describe('Integration Tests', () => {
  let dir;
  beforeEach(() => {
    dir = tmp.dirSync({ keep: false, unsafeCleanup: true }).name;
  });

  it('Testing Bad Task', () => {
    expect(() => robo({
      tasks: ['unknown/@task'],
      projectRoot: dir,
      taskDir: path.join(__dirname, '..', 'src', 'tasks')
    })).to.throw('Bad Task Name: unknown/@task');
  });

  it('Testing Bad Robo Task', () => {
    expect(() => robo({
      projectRoot: dir,
      taskDir: path.join(__dirname, '..', 'src', 'tasks')
    })).to.throw('ValidationError: child "tasks" fails because ["tasks" is required]');
  });

  it('Testing Configuration File Updated', () => {
    expect(robo({
      tasks: ['editor/@default'],
      projectRoot: dir,
      taskDir: path.join(__dirname, '..', 'src', 'tasks')
    })).to.deep.equal([
      'Updated: .editorconfig',
      'Updated: CONFDOCS.md'
    ]);
  });
});
