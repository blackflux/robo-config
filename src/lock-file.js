const path = require('path');
const fs = require('smart-fs');

module.exports.validate = (projectRoot, plugins) => {
  const lockFile = fs.existsSync(path.join(projectRoot, '.roboconfig.lock'))
    ? fs.smartRead(path.join(projectRoot, '.roboconfig.lock'), { treatAs: 'json' })
    : {};

  const pluginNames = plugins.map((p) => p.plugin.name);
  const unknownPlugin = Object.keys(lockFile).find((pl) => !pluginNames.includes(pl));
  if (unknownPlugin !== undefined) {
    throw new Error(`Unknown plugin "${unknownPlugin}". Delete files ${
      Object.keys(lockFile[unknownPlugin]).map((e) => `"${e}"`).join(', ')
    } as necessary and remove from lock file.`);
  }

  plugins.forEach((plugin) => {
    const pluginName = plugin.plugin.name;
    const targets = plugin.plugin.getTargets(plugin.tasks).target;
    const lockedTargets = lockFile[pluginName] || [];
    const notManaged = lockedTargets.filter((lt) => !targets.includes(lt));
    if (notManaged.length !== 0) {
      throw new Error(`File(s) ${notManaged.map((e) => `"${e}"`).join(', ')} not managed by plugin "${pluginName}". `
        + 'Delete file as necessary and remove from lock file.');
    }
    lockFile[pluginName] = targets;
  });

  fs.smartWrite(path.join(projectRoot, '.roboconfig.lock'), lockFile, { treatAs: 'json' });
};
