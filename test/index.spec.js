const expect = require('chai').expect;
const robo = require('../src/index');

it('Executing Configuration', () => {
  expect(robo([
    'circleci/npm-release',
    'dependabot/nodejs-instant',
    'gally/two-branch',
    'editor/two-space'
  ], {
    repoKey: 'blackflux/robo-config',
    owner: 'simlu',
    mergeBot: 'MrsFlux'
  })).to.deep.equal([]);
});
