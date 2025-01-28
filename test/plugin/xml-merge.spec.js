import path from 'path';
import fs from 'smart-fs';
import { expect } from 'chai';
import { describe } from 'node-tdd';
import xmlMerge from '../../src/plugin/xml-merge.js';

describe('Testing xml-merge.js', () => {
  describe('Integration Tests', () => {
    // eslint-disable-next-line mocha/no-setup-in-describe
    fs.readdirSync(path.join(fs.dirname(import.meta.url), 'xml-merge'))
      .forEach((f) => {
        it(`Testing '${f}'`, () => {
          const target = fs.smartRead(path.join(fs.dirname(import.meta.url), 'xml-merge', f, 'target.xml'));
          const changeset = fs.smartRead(path.join(fs.dirname(import.meta.url), 'xml-merge', f, 'changeset.xml'));
          const result = fs.smartRead(path.join(fs.dirname(import.meta.url), 'xml-merge', f, 'result.xml'));
          const merged = xmlMerge(target, changeset);
          expect(result).to.deep.equal(merged);
        });
      });
  });

  describe('Unit tests', { useTmpDir: true }, () => {
    let executeTest;

    beforeEach(({ dir }) => {
      executeTest = (target, changeset, result) => {
        fs.writeFileSync(path.join(dir, 'target.xml'), target);
        fs.writeFileSync(path.join(dir, 'changeset.xml'), changeset);
        fs.writeFileSync(path.join(dir, 'result.xml'), result);

        const merged = xmlMerge(
          fs.smartRead(path.join(dir, 'target.xml')),
          fs.smartRead(path.join(dir, 'changeset.xml'))
        );
        expect(merged).to.deep.equal(fs.smartRead(path.join(dir, 'result.xml')));
      };
    });

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
});
