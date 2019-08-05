const assert = require('assert');
const deepmerge = require('deepmerge');
const deepContains = require('object-deep-contain');
const xmlMerge = require('./xml-merge');

const arrayMerge = (target, source) => {
  const destination = target.concat(source);
  for (let idx1 = 0; idx1 < target.length; idx1 += 1) {
    for (let idx2 = destination.length - 1; idx2 >= target.length; idx2 -= 1) {
      if (deepContains(destination[idx1], destination[idx2])) {
        destination.splice(idx2, 1);
      }
    }
  }
  return destination;
};

module.exports = {
  'merge-below-title': (existing, changeset) => {
    assert(Array.isArray(existing), 'Invalid "existing" parameter format.');
    assert(Array.isArray(changeset), 'Invalid "changeset" parameter format.');

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
  'unique-top': (existing, changeset) => {
    changeset.forEach((line) => {
      for (let idx = 0; idx < existing.length; idx += 1) {
        const l = existing[idx];
        if (line === l) {
          existing.splice(idx, 1);
          idx -= 1;
          if (l === '') {
            break; // line has now caused exactly one removal
          }
        }
      }
    });
    return changeset.concat(existing);
  },
  'append-new': (existing, changeset) => existing.concat(changeset.filter(e => !existing.includes(e))),
  'merge-shallow': (existing, changeset) => Object.assign(existing, changeset),
  'merge-deep': (existing, changeset) => deepmerge(existing, changeset, { arrayMerge }),
  'default-shallow': (existing, changeset) => Object.assign(changeset, existing),
  'default-deep': (existing, changeset) => deepmerge(changeset, existing, { arrayMerge }),
  'xml-merge': (existing, changeset) => xmlMerge(existing, changeset),
  overwrite: (existing, changeset) => changeset,
  'create-only': (existing, changeset) => existing
};
