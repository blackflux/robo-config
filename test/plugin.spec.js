const path = require('path');
const expect = require('chai').expect;
const plugin = require('./mock/plugin');
const { listTasks } = require('../src/plugin/task');

describe('Testing Test Plugin', () => {
  it('Synchronize Tasks Documentation', () => {
    expect(plugin.syncDocs()).to.deep.equal([]);
  });

  describe('Testing All Public Tasks', () => {
    const taskNames = listTasks(path.join(__dirname, 'mock', 'plugin', 'tasks'));
    const variables = {
      repoKey: 'blackflux/robo-config',
      repoName: 'robo-config',
      projectName: 'robo-config',
      owner: 'simlu',
      authorName: 'Lukas Siemon',
      mergeBot: 'MrsFlux'
    };
    const result = plugin.apply(path.join(__dirname, 'mock', 'project'), taskNames, variables);
    expect(result).to.deep.equal([]);
  });
});
