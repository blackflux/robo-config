const expect = require('chai').expect;
const robo = require('../src/index');

describe('Testing Functionality', () => {
  it('Basic Init', () => {
    expect(robo()).to.equal(undefined);
  });
});
