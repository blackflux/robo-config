const expect = require('chai').expect;
const { getMergeStrategy } = require('../../src/util/merge');

describe('Integration merge.js', () => {
  it('Testing Merge Strategy: overwrite', () => {
    const existing = { key1: 'value1' };
    const changeset = { key2: 'value2' };
    expect(getMergeStrategy('overwrite')(existing, changeset))
      .to.deep.equal(changeset);
  });

  it('Testing Merge Strategy: merge-below-title', () => {
    const existing = ['title1', 'title2', '', 'text'];
    const changeset = ['new'];
    expect(getMergeStrategy('merge-below-title')(existing, changeset))
      .to.deep.equal(['title1', 'title2', '', 'new', 'text']);
  });
});
