const path = require('path');
const expect = require('chai').expect;
const plugin = require('./mock/plugin');

describe('Testing Test Plugin', () => {
  it('Synchronize Tasks Documentation', () => {
    expect(plugin.syncDocs()).to.deep.equal([]);
  });

  describe('Testing All Public Tasks', () => {
    const result = plugin.test(path.join(__dirname, 'mock', 'project'), {
      repoKey: 'blackflux/robo-config',
      repoName: 'robo-config',
      projectName: 'robo-config',
      owner: 'simlu',
      authorName: 'Lukas Siemon',
      mergeBot: 'MrsFlux'
    });
    expect(result).to.deep.equal([]);
  });
});
