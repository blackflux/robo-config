const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const tmp = require('tmp');
const sfs = require('smart-fs');
const xmlMerge = require('../../src/util/xml-merge');

describe('Integration xml-merge.js', () => {
  fs.readdirSync(path.join(__dirname, 'xml-merge'))
    .forEach((f) => {
      it(`Testing '${f}'`, () => {
        const target = sfs.smartRead(path.join(__dirname, 'xml-merge', f, 'target.xml'));
        const changeset = sfs.smartRead(path.join(__dirname, 'xml-merge', f, 'changeset.xml'));
        const result = sfs.smartRead(path.join(__dirname, 'xml-merge', f, 'result.xml'));
        const merged = xmlMerge(target, changeset);
        expect(result).to.deep.equal(merged);
      });
    });
});

describe('Unit xml-merge.js', () => {
  let dir;
  beforeEach(() => {
    dir = tmp.dirSync({ keep: false, unsafeCleanup: true }).name;
  });

  const executeTest = (target, changeset, result) => {
    fs.writeFileSync(path.join(dir, 'target.xml'), target);
    fs.writeFileSync(path.join(dir, 'changeset.xml'), changeset);
    fs.writeFileSync(path.join(dir, 'result.xml'), result);

    const merged = xmlMerge(
      sfs.smartRead(path.join(dir, 'target.xml')),
      sfs.smartRead(path.join(dir, 'changeset.xml'))
    );
    expect(merged).to.deep.equal(sfs.smartRead(path.join(dir, 'result.xml')));
  };

  it('Test Simple Merge', () => {
    executeTest('<a/>', '<b/>', '<a/><b/>');
    executeTest('<r><a/></r>', '<r><b/></r>', '<r><a/><b/></r>');
  });

  it('Test Header Merge', () => {
    executeTest(
      '<?xml version="1.0" ?>',
      '<?xml encoding="UTF-8" ?>',
      '<?xml version="1.0" encoding="UTF-8" ?>'
    );
  });
});
