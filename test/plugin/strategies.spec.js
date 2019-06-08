const expect = require('chai').expect;
const strategies = require('../../src/plugin/strategies');

describe('Integration strategies.js', () => {
  it('Testing Merge Strategy: overwrite', () => {
    const existing = { key1: 'value1' };
    const changeset = { key2: 'value2' };
    expect(strategies.overwrite(existing, changeset))
      .to.deep.equal(changeset);
  });

  it('Testing Merge Strategy: merge-below-title', () => {
    const existing = ['title1', 'title2', '', 'text'];
    const changeset = ['new'];
    expect(strategies['merge-below-title'](existing, changeset))
      .to.deep.equal(['title1', 'title2', '', 'new', 'text']);
  });

  it('Testing Merge Strategy: unique-top', () => {
    const existing = ['title1', 'title2', '', 'new', 'text'];
    const changeset = ['new'];
    expect(strategies['unique-top'](existing, changeset))
      .to.deep.equal(['new', 'title1', 'title2', '', 'text']);
  });

  describe('Testing Deep Merge', () => {
    it('Testing Array Concat', () => {
      const existing = { a: { b: ['c'] } };
      const changeset = { a: { b: ['d'] } };
      expect(strategies['merge-deep'](existing, changeset))
        .to.deep.equal({ a: { b: ['c', 'd'] } });
    });

    it('Testing Array Concat Deduplication', () => {
      const existing = { a: { b: ['c'] } };
      const changeset = { a: { b: ['c', 'd'] } };
      expect(strategies['merge-deep'](existing, changeset))
        .to.deep.equal({ a: { b: ['c', 'd'] } });
    });
  });

  it('Testing order consistent when overwriting', () => {
    const existing = { a: 1, b: 2, c: 3 };
    const changeset = { c: 3, b: 2, a: 0 };
    const result = strategies.overwrite(existing, changeset);
    expect(JSON.stringify(result)).to.deep.equal('{"a":0,"b":2,"c":3}');
  });
});
