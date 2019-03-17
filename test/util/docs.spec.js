const expect = require('chai').expect;
const { documentFiles } = require('../../src/util/docs');

describe('Integration docs.js', () => {
  it('Testing documentFiles', () => {
    expect(documentFiles('root', [
      'vendor',
      'vendor/index.js',
      'page',
      'page/hello',
      'page/hello/index.css',
      'page/world',
      'page/world/index.css',
      'page/world/index.js'
    ])).to.deep.equal([
      '```',
      'root',
      '├── page',
      '|   ├── hello',
      '|   |   └── index.css',
      '|   └── world',
      '|       ├── index.css',
      '|       └── index.js',
      '└── vendor',
      '    └── index.js',
      '```',
      ''
    ]);
  });
});
