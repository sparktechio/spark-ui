export const setNestedValue = (target: any, key: string, value: any) => {
  const keys = key.split('.');
  let currentTarget = target;
  for (let index = 0; index < keys.length; index++) {
    const nestedKey = keys[index];
    const matches = nestedKey.match(/(.*)\[(\d+)]$/);
    if (matches) {
      const arrayParent = matches[1];
      const arrayIndex = Number(matches[2]);
      if (!Array.isArray(currentTarget[arrayParent])) {
        currentTarget[arrayParent] = [];
      }
      currentTarget = currentTarget[arrayParent];
      if (index === keys.length - 1) {
        currentTarget[arrayIndex] = value;
      } else {
        if (!currentTarget[arrayIndex] || typeof currentTarget[nestedKey] !== 'object') {
          currentTarget[arrayIndex] = {};
        }
        currentTarget = currentTarget[arrayIndex];
      }
    } else {
      if (!currentTarget[nestedKey] || typeof currentTarget[nestedKey] !== 'object') {
        currentTarget[nestedKey] = {};
      }
      if (index === keys.length - 1) {
        currentTarget[nestedKey] = value;
      } else {
        currentTarget = currentTarget[nestedKey];
      }
    }
  }
  return target;
}