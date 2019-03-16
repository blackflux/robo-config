const objectDeepContain = require('object-deep-contain');

const mergeRec = (target, changeset) => {
  if (changeset === undefined) {
    return target;
  }

  const isArray = Array.isArray(target);
  if (isArray !== Array.isArray(changeset)) {
    return changeset;
  }

  if (isArray) {
    let next = 0;
    for (let idx = 0; idx < target.length && next < changeset.length; idx += 1) {
      const targetElement = target[idx];
      const toInsert = changeset[next];

      if (objectDeepContain(
        targetElement,
        Object
          .entries(toInsert)
          .reduce((p, [k, v]) => Object.assign(p, k === 'elements' ? {} : { [k]: v }), {})
      )) {
        // eslint-disable-next-line no-param-reassign
        target[idx] = mergeRec(targetElement, toInsert);
        next += 1;
      }
    }
    target.push(...changeset.slice(next));
    return target;
  }

  if (target instanceof Object && changeset instanceof Object) {
    return [...new Set(Object.keys(target).concat(Object.keys(changeset)))]
      .reduce((p, k) => Object.assign(p, { [k]: mergeRec(target[k], changeset[k]) }), {});
  }

  return changeset;
};

module.exports = (target, changeset) => Object.assign(target, { data: mergeRec(target.data, changeset.data) });
