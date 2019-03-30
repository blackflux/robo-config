const path = require('path');
const expect = require('chai').expect;
const { init } = require('../src/index');
const plugin = require('./mock/plugin');

describe('Testing Test Plugin', () => {
  it('Synchronize Tasks Documentation', () => {
    expect(init(plugin).syncDocs()).to.deep.equal([]);
  });

  describe('Testing All Public Tasks', () => {
    const result = init(plugin).test(path.join(__dirname, 'mock', 'project'), {
      // todo: generate variables
      variable: 'variable'
    });
    expect(result).to.deep.equal([]);
  });
});
