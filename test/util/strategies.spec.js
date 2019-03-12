const expect = require('chai').expect;
const strategies = require('../../src/util/strategies');

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

  it('Testing Merge Strategy: merge-top', () => {
    const existing = ['title1', 'title2', '', 'new', 'text'];
    const changeset = ['new'];
    expect(strategies['merge-top'](existing, changeset))
      .to.deep.equal(['new', 'title1', 'title2', '', 'text']);
  });
});
