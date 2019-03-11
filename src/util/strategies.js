const assert = require('assert');

module.exports = {
  'merge-below-title': (existing, changeset) => {
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
  },
  overwrite: (existing, changeset) => changeset
};
