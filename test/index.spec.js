const expect = require('chai').expect;
const robo = require('../src/index');

it('Executing Configuration', () => {
  expect(robo([
    'gally/two-branch',
    'circleci/npm-release',
    'dependabot/nodejs-instant',
    'semantic-release/commit-convention',
    'editor/two-space'
  ], {
    repoKey: 'blackflux/robo-config',
    owner: 'simlu',
    mergeBot: 'MrsFlux'
  })).to.deep.equal([]);
});
