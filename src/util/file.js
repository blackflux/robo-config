const assert = require('assert');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');


const stringifyContent = (filepath, content) => {
  assert(typeof filepath === 'string');
  assert(content instanceof Object);

  switch (filepath.slice(filepath.lastIndexOf('.') + 1)) {
    case 'json':
      return JSON.stringify(content, null, 2);
    case 'yml':
    case 'yaml':
      return yaml.safeDump(content);
    default:
      return content.join('\n');
  }
};

module.exports.writeFile = (filepath, content) => {
  assert(typeof filepath === 'string');
  assert(content instanceof Object);

  const currentContent = fs.existsSync(filepath) ? fs.readFileSync(filepath, 'utf8') : null;
  const contentString = stringifyContent(filepath, content);

  if (currentContent !== contentString) {
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, contentString);
    return true;
  }
  return false;
};

const parseContent = (filepath, content) => {
  assert(typeof filepath === 'string');
  assert(typeof content === 'string');

  switch (filepath.slice(filepath.lastIndexOf('.') + 1)) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
    case 'yaml':
      return yaml.safeLoad(content);
    default:
      return content.split('\n');
  }
};

module.exports.loadFile = (filepath) => {
  assert(typeof filepath === 'string');

  const content = fs.readFileSync(filepath, 'utf8');
  return parseContent(filepath, content);
};
