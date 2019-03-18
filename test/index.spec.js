const path = require('path');
const tmp = require('tmp');
const expect = require('chai').expect;
const sfs = require('smart-fs');
const robo = require('../src/index');
const docs = require('../src/util/docs');

it('Executing Tasks', () => {
  expect(robo()).to.deep.equal([]);
});

describe('Integration Tests', () => {
  let dir;
  beforeEach(() => {
    dir = tmp.dirSync({ keep: false, unsafeCleanup: true }).name;
  });

  it('Testing Bad Task', () => {
    expect(() => robo({
      tasks: ['unknown/@task'],
      projectRoot: dir
    })).to.throw('Bad Task Name: unknown/@task');
  });

  it('Testing Bad Robo Task', () => {
    expect(() => robo({
      projectRoot: dir
    })).to.throw('ValidationError: child "tasks" fails because ["tasks" is required]');
  });

  it('Testing Configuration File Updated', () => {
    expect(robo({
      tasks: ['editor/@default'],
      projectRoot: dir
    })).to.deep.equal([
      'Updated: .editorconfig',
      'Updated: CONFDOCS.md'
    ]);
  });
});

describe('Generate Available Tasks Documentation', () => {
  sfs.walkDir(path.join(__dirname, '..', 'src', 'tasks')).forEach((f) => {
    if (f.includes('/@')) {
      it(`Generating Docs for ${f}`, () => {
        expect(f.endsWith('.json')).to.equal(true);
        const target = path.join(__dirname, '..', 'src', 'docs', `${f.slice(0, -5)}.md`);
        expect(
          sfs.smartWrite(target, docs.generateDocs([f], 0)),
          'Updated Documentation. Please commit and re-run.'
        ).to.equal(false);
      });
    }
  });

  it('Validating doc files match task files', () => {
    const taskFiles = sfs.walkDir(path.join(__dirname, '..', 'src', 'tasks'))
      .filter(f => f.includes('/@')).map(f => f.slice(0, -5)).sort();
    const docFiles = sfs.walkDir(path.join(__dirname, '..', 'src', 'docs'))
      .filter(f => f.includes('/@')).map(f => f.slice(0, -3)).sort();
    expect(taskFiles).to.deep.equal(docFiles);
  });
});
