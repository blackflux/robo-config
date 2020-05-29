const path = require('path');
const expect = require('chai').expect;
const { describe } = require('node-tdd');
const { load: loadSpec } = require('../src/index');
const plugin = require('./mock/plugin');

describe('Testing Test Plugin', { useTmpDir: true }, () => {
  it('Synchronize Tasks Documentation', () => {
    expect(loadSpec(plugin).syncDocs()).to.deep.equal([]);
  });

  it('Testing All Public Tasks', () => {
    const result = loadSpec(plugin).test(path.join(__dirname, 'mock', 'projects'));
    expect(result).to.deep.equal({
      'xml-merge/@default': [],
      'txt-unique-top/@default': [],
      'txt-overwrite/@default': [],
      'txt-merge-below-title/@default': [],
      'misc/@other': [],
      'misc/@default': [],
      'nested-txt-overwrite/@default': [],
      'txt-create-only/@default': [],
      'json-variable-types/@default': [],
      'json-shallow-merge/@default': [],
      'json-deep-merge/@default': [],
      'json-no-create/@default': [],
      'json-not-pretty/@default': [],
      'json-shallow-default/@default': [],
      'json-deep-default/@default': [],
      'escaped-variable/@default': [],
      'yml-resolved/@default': []
    });
  });

  it('Testing All Public Tasks (Regeneration)', ({ dir }) => {
    expect(loadSpec(plugin).test(dir)).to.deep.equal({
      'xml-merge/@default': [
        'Updated: merge-target.xml',
        'Updated: CONFDOCS.md'
      ],
      'txt-unique-top/@default': [
        'Updated: unique-top.txt',
        'Updated: CONFDOCS.md'
      ],
      'txt-overwrite/@default': [
        'Updated: overwrite-target.txt',
        'Updated: CONFDOCS.md'
      ],
      'txt-merge-below-title/@default': [
        'Updated: merge-below-title.txt',
        'Updated: CONFDOCS.md'
      ],
      'misc/@other': [
        'Updated: misc.yml',
        'Updated: CONFDOCS.md'
      ],
      'misc/@default': [
        'Updated: misc.yml',
        'Updated: CONFDOCS.md'
      ],
      'nested-txt-overwrite/@default': [
        'Updated: nested/overwrite-target.txt',
        'Updated: CONFDOCS.md'
      ],
      'txt-create-only/@default': [
        'Updated: create-only-target.txt',
        'Updated: CONFDOCS.md'
      ],
      'json-variable-types/@default': [
        'Updated: variables-target.json',
        'Updated: CONFDOCS.md'
      ],
      'json-shallow-merge/@default': [
        'Updated: merge-shallow-target.json',
        'Updated: CONFDOCS.md'
      ],
      'json-deep-merge/@default': [
        'Updated: merge-deep-target.json',
        'Updated: CONFDOCS.md'
      ],
      'json-no-create/@default': [
        'Updated: CONFDOCS.md'
      ],
      'json-not-pretty/@default': [
        'Updated: not-pretty-target.json',
        'Updated: CONFDOCS.md'
      ],
      'json-shallow-default/@default': [
        'Updated: default-shallow-target.json',
        'Updated: CONFDOCS.md'
      ],
      'json-deep-default/@default': [
        'Updated: default-deep-target.json',
        'Updated: CONFDOCS.md'
      ],
      'escaped-variable/@default': [
        'Updated: escaped-variable.txt',
        'Updated: CONFDOCS.md'
      ],
      'yml-resolved/@default': [
        'Updated: resolved-target.yml',
        'Updated: CONFDOCS.md'
      ]
    });
    expect(loadSpec(plugin).test(dir, { variable: 'custom' })).to.deep.equal({
      'xml-merge/@default': [],
      'txt-unique-top/@default': [],
      'txt-overwrite/@default': [],
      'txt-merge-below-title/@default': [],
      'misc/@other': [
        'Updated: misc.yml'
      ],
      'misc/@default': [
        'Updated: misc.yml'
      ],
      'nested-txt-overwrite/@default': [],
      'txt-create-only/@default': [],
      'json-variable-types/@default': [],
      'json-shallow-merge/@default': [],
      'json-deep-merge/@default': [],
      'json-no-create/@default': [],
      'json-not-pretty/@default': [],
      'json-shallow-default/@default': [],
      'json-deep-default/@default': [],
      'escaped-variable/@default': [],
      'yml-resolved/@default': []
    });
  });
});
