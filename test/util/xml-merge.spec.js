const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const sfs = require('smart-fs');
const xmlMerge = require('../../src/util/xml-merge');

describe('Integration xml-merge.js', () => {
  fs.readdirSync(path.join(__dirname, 'xml-merge'))
    .forEach((f) => {
      it(`Testing '${f}'`, () => {
        const result = sfs.smartRead(path.join(__dirname, 'xml-merge', f, 'result.xml'));
        const target = sfs.smartRead(path.join(__dirname, 'xml-merge', f, 'target.xml'));
        const changeset = sfs.smartRead(path.join(__dirname, 'xml-merge', f, 'changeset.xml'));
        const merged = xmlMerge(target, changeset);
        expect(result).to.deep.equal(merged);
      });
    });
});
