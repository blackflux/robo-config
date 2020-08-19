const path = require('path');
const fs = require('smart-fs');
const { populateVars } = require('./plugin/vars');

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
    const targets = (() => {
      const result = new Set();
      plugin.tasks.forEach((task) => {
        const taskTargets = plugin.plugin.getTargets([task]).target;
        const vars = { ...plugin.variables, ...task.variables };
        populateVars(taskTargets, vars, true)
          .forEach((target) => {
            result.add(target);
          });
      });
      return [...result].sort();
    })();
    const lockedTargets = lockFile[pluginName] || [];
    const notManaged = lockedTargets.filter((lt) => !targets.includes(lt));
    if (notManaged.length !== 0) {
      throw new Error(`File(s) ${notManaged.map((e) => `"${e}"`).join(', ')} not managed by plugin "${pluginName}". `
        + 'Delete file as necessary and remove from lock file.');
    }
    plugin.exclude.forEach((ex) => {
      if (!targets.includes(ex)) {
        throw new Error(`Excluded file "${ex}" not managed by plugin "${pluginName}". `
        + 'Delete reference in configuration file or add missing task.');
      }
    });
    lockFile[pluginName] = targets;
  });
  fs.smartWrite(
    path.join(projectRoot, '.roboconfig.lock'),
    Object.keys(lockFile).sort()
      .reduce((p, k) => Object.assign(p, {
        [k]: lockFile[k]
      }), {}),
    { treatAs: 'json' }
  );
};
