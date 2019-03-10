const expect = require('chai').expect;
const robo = require('../src/index');

it('Executing Configuration', () => {
  expect(robo([
    'circleci/npm-release',
    'dependabot/nodejs-instant'
  ])).to.deep.equal([]);
});
