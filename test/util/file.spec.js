const path = require('path');
const tmp = require('tmp');
const expect = require('chai').expect;
const { mkdirSync } = require('../../src/util/file');


describe('Integration util/file.js', () => {
  let dir;
  beforeEach(() => {
    dir = tmp.dirSync({ keep: false, unsafeCleanup: true }).name;
  });

  it('Testing Create New Folder Twice', () => {
    expect(mkdirSync(path.join(dir, 'dir'))).to.equal(true);
    expect(mkdirSync(path.join(dir, 'dir'))).to.equal(false);
  });

  it('Testing Create Nested Folder (Error)', () => {
    try {
      mkdirSync(path.join(dir, 'dir', 'dir'))
    } catch (e) {
      expect(e.code).to.equal('ENOENT');
    }
  });
});
