const tmp = require('tmp');
const expect = require('chai').expect;
const robo = require('../src/index');

it('Executing Configuration', () => {
  expect(robo()).to.deep.equal([]);
});

describe('Integration Tests', () => {
  let dir;
  beforeEach(() => {
    dir = tmp.dirSync({ keep: false, unsafeCleanup: true }).name;
  });

  it('Testing Bad Config', () => {
    expect(() => robo({
      configs: ['unknown/@config'],
      projectRoot: dir
    })).to.throw('Bad Config Name: unknown/@config');
  });

  it('Testing Bad Robo Config', () => {
    expect(() => robo({
      projectRoot: dir
    })).to.throw('ValidationError: child "configs" fails because ["configs" is required]');
  });

  it('Testing Configuration File Updated', () => {
    expect(robo({
      configs: ['editor/@default'],
      projectRoot: dir
    })).to.deep.equal([
      'Updated: .editorconfig',
      'Updated: CONFDOCS.md'
    ]);
  });
});
