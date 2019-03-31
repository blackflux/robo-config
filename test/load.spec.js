const path = require('path');
const tmp = require('tmp');
const sfs = require('smart-fs');
const expect = require('chai').expect;
const { load: loadSpec } = require('../src/index');
const plugin = require('./mock/plugin');

describe('Testing Test Plugin', () => {
  let dir;
  beforeEach(() => {
    dir = tmp.dirSync({ keep: false, unsafeCleanup: true }).name;
  });

  it('Synchronize Tasks Documentation', () => {
    expect(loadSpec(plugin).syncDocs()).to.deep.equal([]);
  });

  it('Testing All Public Tasks', () => {
    const result = loadSpec(plugin).test(path.join(__dirname, 'mock', 'project'), {
      // todo: generate variables
      variable: 'variable'
    });
    expect(result).to.deep.equal([]);
  });

  it('Testing All Public Tasks (Regeneration)', () => {
    const result = loadSpec(plugin).test(dir, {
      // todo: generate variables
      variable: 'variable'
    });
    expect(result.sort()).to.deep.equal(sfs.walkDir(dir).map(e => `Updated: ${e}`).sort());
  });
});
