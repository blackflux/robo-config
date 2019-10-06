const path = require('path');
const fs = require('smart-fs');


const readLockFile = (projectRoot) => {
  let result = {};
  if (fs.existsSync(path.join(projectRoot, '.roboconfig.lock'))) {
    result = fs.smartRead(path.join(projectRoot, '.roboconfig.lock'), { treatAs: 'json' });
  }
  return result;
};

module.exports.validatePlugin = (projectRoot, pluginName, targets) => {
  const lockFile = readLockFile(projectRoot);
  const lockedTargets = lockFile[pluginName] || [];
  const notManaged = lockedTargets.filter((lt) => !targets.includes(lt));
  if (notManaged.length !== 0) {
    throw new Error(`File(s) ${notManaged.map((e) => `"${e}"`).join(', ')} not managed by plugin "${pluginName}". `
      + 'Delete file as necessary and remove from lock file.');
  }
  lockFile[pluginName] = targets;
  fs.smartWrite(path.join(projectRoot, '.roboconfig.lock'), lockFile, { treatAs: 'json' });
};

module.exports.validatePlugins = (projectRoot, plugins) => {
  const lockFile = readLockFile(projectRoot);
  const unknownPlugin = Object.keys(lockFile).find((pl) => !plugins.includes(pl));
  if (unknownPlugin !== undefined) {
    throw new Error(`Unknown plugin "${unknownPlugin}". Delete files ${
      Object.keys(lockFile[unknownPlugin]).map((e) => `"${e}"`).join(', ')
    } as necessary and remove from lock file.`);
  }
};
