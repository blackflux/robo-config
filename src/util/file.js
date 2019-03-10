const assert = require('assert');
const fs = require('fs');
const path = require('path');
const yaml = require('yaml-boost');


const stringifyContent = (filepath, content) => {
  assert(typeof filepath === 'string');
  assert(content instanceof Object);

  switch (filepath.slice(filepath.lastIndexOf('.') + 1)) {
    case 'yml':
    case 'yaml':
      return yaml.dump(content);
    case 'json':
      return JSON.stringify(content, null, 2);
    default:
      assert(Array.isArray(content));
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

module.exports.loadFile = (filepath) => {
  assert(typeof filepath === 'string');

  switch (filepath.slice(filepath.lastIndexOf('.') + 1)) {
    case 'yml':
    case 'yaml':
      return yaml.load(filepath, {});
    case 'json':
      return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    default:
      return fs.readFileSync(filepath, 'utf8').split('\n');
  }
};
