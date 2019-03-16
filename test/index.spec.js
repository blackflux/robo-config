const tmp = require('tmp');
const expect = require('chai').expect;
const robo = require('../src/index');

it('Executing Configuration', () => {
  expect(robo({
    configs: [
      'assorted/@npm-opensource',
      'jetbrains/@default'
    ],
    variables: {
      repoKey: 'blackflux/robo-config',
      repoName: 'robo-config',
      projectName: 'robo-config',
      owner: 'simlu',
      authorName: 'Lukas Siemon',
      mergeBot: 'MrsFlux'
    }
  })).to.deep.equal([]);
});

describe('Integration Tests', () => {
  let dir;
  beforeEach(() => {
    dir = tmp.dirSync({ keep: false, unsafeCleanup: true }).name;
  });

  it('Testing Bad Config', () => {
    expect(robo({
      configs: ['unknown/config'],
      projectRoot: dir
    })).to.deep.equal(['unknown/config: Error! Bad Name!']);
  });

  it('Testing Configuration File Updated', () => {
    expect(robo({
      configs: ['editor/two-space'],
      projectRoot: dir
    })).to.deep.equal(['editor/two-space: Configuration File Updated']);
  });
});
