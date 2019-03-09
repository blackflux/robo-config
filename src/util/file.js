const assert = require('assert');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');


const convertContent = (filepath, content) => {
  const isStringInput = typeof content === 'string';

  assert(typeof filepath === 'string');
  assert(isStringInput || content instanceof Object);

  switch (filepath.slice(filepath.lastIndexOf('.') + 1)) {
    case 'json':
      return isStringInput
        ? JSON.parse(content)
        : JSON.stringify(content, null, 2);
    case 'yml':
    case 'yaml':
      return yaml[isStringInput ? 'safeLoad' : 'safeDump'](content);
    default:
      return content[isStringInput ? 'split' : 'join']('\n');
  }
};

module.exports.writeFile = (filepath, content) => {
  assert(typeof filepath === 'string');
  assert(content instanceof Object);

  const currentContent = fs.existsSync(filepath) ? fs.readFileSync(filepath, 'utf8') : null;
  const contentString = convertContent(filepath, content);

  if (currentContent !== contentString) {
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, contentString);
    return true;
  }
  return false;
};

module.exports.loadFile = (filepath) => {
  assert(typeof filepath === 'string');

  const content = fs.readFileSync(filepath, 'utf8');
  return convertContent(filepath, content);
};
