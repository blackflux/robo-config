const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const { describe } = require('node-tdd');
const sfs = require('smart-fs');
const { documentFiles, syncDocs } = require('../../src/plugin/docs');

describe('Integration docs.js', { useTmpDir: true }, () => {
  it('Testing documentFiles', () => {
    expect(documentFiles('root', 'plName', [
      'vendor',
      'vendor/index.js',
      'page',
      'page/hello',
      'page/hello/index.css',
      'page/world',
      'page/world/index.css',
      'page/world/index.js'
    ], [])).to.deep.equal([
      'root',
      '├─&nbsp;<a href="#plname-target-ref-page">page</a>',
      '├─&nbsp;<a href="#plname-target-ref-vendor">vendor</a>',
      '├─&nbsp;page',
      '│&nbsp;&nbsp;├─&nbsp;<a href="#plname-target-ref-pagehello">hello</a>',
      '│&nbsp;&nbsp;├─&nbsp;<a href="#plname-target-ref-pageworld">world</a>',
      '│&nbsp;&nbsp;├─&nbsp;hello',
      '│&nbsp;&nbsp;│&nbsp;&nbsp;└─&nbsp;<a href="#plname-target-ref-pagehelloindexcss">index.css</a>',
      '│&nbsp;&nbsp;└─&nbsp;world',
      '│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─&nbsp;<a href="#plname-target-ref-pageworldindexcss">index.css</a>',
      '│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─&nbsp;<a href="#plname-target-ref-pageworldindexjs">index.js</a>',
      '└─&nbsp;vendor',
      '&nbsp;&nbsp;&nbsp;└─&nbsp;<a href="#plname-target-ref-vendorindexjs">index.js</a>'
    ]);
  });

  it('Testing documentFolder (delete and write)', ({ dir }) => {
    const taskDir = path.join(dir, 'tasks');
    fs.mkdirSync(taskDir);
    fs.mkdirSync(path.join(taskDir, 'scope'));
    fs.writeFileSync(path.join(dir, 'tasks', 'scope', '@task.json'), JSON.stringify({
      tasks: [],
      description: 'This is a task.'
    }));

    const reqDir = path.join(dir, 'reqs');
    const varDir = path.join(dir, 'vars');
    const targetDir = path.join(dir, 'targets');

    const docDir = path.join(dir, 'docs');
    fs.mkdirSync(docDir);
    fs.mkdirSync(path.join(docDir, 'scope'));
    fs.writeFileSync(path.join(docDir, 'scope', '@unknown.md'), '');

    expect(sfs.walkDir(dir)).to.deep.equal(['tasks/scope/@task.json', 'docs/scope/@unknown.md']);
    expect(syncDocs('plugin-name', taskDir, reqDir, varDir, targetDir, docDir)).to.deep.equal([
      'Updated: scope/@task.md',
      'Documentation Updated. Please commit and re-run.'
    ]);
    expect(sfs.walkDir(dir)).to.deep.equal(['tasks/scope/@task.json', 'docs/scope/@task.md']);
  });
});
