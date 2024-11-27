export const setNestedValue = (target: any, key: string, value: any) => {
  const keys = key.split('.');
  let currentTarget = target;
  for (let index = 0; index < keys.length - 1; index++) {
    const nestedKey = keys[index];
    if (!currentTarget[nestedKey] || typeof currentTarget[nestedKey] !== 'object') {
      currentTarget[nestedKey] = {};
    }
    currentTarget = currentTarget[nestedKey];
  }
  currentTarget[keys[keys.length - 1]] = value;
  return target;
}