const assert = require('assert');

const getMergeStrategy = (strategy) => {
  switch (strategy) {
    case 'merge-below-title':
      return (existing, changeset) => {
        assert(Array.isArray(existing));
        assert(Array.isArray(changeset));

        let injectAt = 0;
        for (let idx = 0; idx < existing.length - 2; idx += 1) {
          if (existing[idx].trim() !== '' && existing[idx + 1].trim() === '') {
            injectAt = idx + 2;
            break;
          }
        }

        existing.splice(injectAt, 0, ...changeset.filter(line => !existing.includes(line)));
        return existing;
      };
    case 'overwrite':
    default:
      return (existing, changeset) => changeset;
  }
};
module.exports.getMergeStrategy = getMergeStrategy;
