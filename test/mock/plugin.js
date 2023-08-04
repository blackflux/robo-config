import path from 'path';
import fs from 'smart-fs';

export default ({
  name: 'mock-plugin',
  taskDir: path.join(fs.dirname(import.meta.url), 'plugin', 'tasks'),
  docDir: path.join(fs.dirname(import.meta.url), 'plugin', 'docs'),
  reqDir: path.join(fs.dirname(import.meta.url), 'plugin', 'reqs'),
  varDir: path.join(fs.dirname(import.meta.url), 'plugin', 'vars'),
  targetDir: path.join(fs.dirname(import.meta.url), 'plugin', 'targets')
});
