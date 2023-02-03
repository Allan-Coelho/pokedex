function copyObject<T>(object: T) {
  return JSON.parse(JSON.stringify(object)) as object;
}

export default function exclude<T, Key extends keyof T>(entity: T, ...keys: Key[]): Omit<T, Key> {
  const newEntity = copyObject(entity) as Omit<T, Key> & T;
  for (let i = 0; i < keys.length; i += 1) {
    const key: keyof T = keys[i];
    delete newEntity[key];
  }

  return newEntity;
}
