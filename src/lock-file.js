const path = require('path');
const fs = require('smart-fs');
const deepmerge = require('deepmerge');


const readLockFile = (projectRoot, pluginName = undefined) => {
  let result = {};
  if (fs.existsSync(path.join(projectRoot, '.roboconfig.lock'))) {
    result = fs.smartRead(path.join(projectRoot, '.roboconfig.lock'), { treatAs: 'json' });
  }
  if (pluginName !== undefined) {
    result[pluginName] = result[pluginName] || {};
  }
  return result;
};

module.exports.resetPlugin = (projectRoot, pluginName) => {
  const lockFile = readLockFile(projectRoot, pluginName);
  lockFile[pluginName] = Object
    .keys(lockFile[pluginName])
    .reduce((p, k) => Object.assign(p, { [k]: false }), {});
  fs.smartWrite(path.join(projectRoot, '.roboconfig.lock'), lockFile, { treatAs: 'json' });
};

module.exports.validatePlugin = (projectRoot, pluginName) => {
  Object
    .entries(readLockFile(projectRoot, pluginName)[pluginName])
    .filter(([k, v]) => v !== true)
    .forEach(([k, v]) => {
      throw new Error(`File "${k}" not managed by plugin "${pluginName}". `
        + 'Delete file as necessary and remove from lock file.');
    });
};

module.exports.markPluginFile = (projectRoot, pluginName, fileName) => {
  fs.smartWrite(
    path.join(projectRoot, '.roboconfig.lock'),
    { [pluginName]: { [fileName]: true } },
    {
      treatAs: 'json',
      mergeStrategy: (existing, changeset) => deepmerge(existing, changeset)
    }
  );
};

module.exports.validateConfig = (projectRoot, plugins) => {
  const lockFile = readLockFile(projectRoot);
  const unknownPlugin = Object.keys(lockFile).find((pl) => !plugins.includes(pl));
  if (unknownPlugin !== undefined) {
    throw new Error(`Unknown plugin "${unknownPlugin}". Delete files ${
      Object.keys(lockFile[unknownPlugin]).map((e) => `"${e}"`).join(', ')
    } as necessary and remove from lock file.`);
  }
};
