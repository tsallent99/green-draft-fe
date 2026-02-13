import { ConvertToSnakeCase } from './types';

export function convertKeys<T>(
  obj: T,
  convertFn: (key: string) => string
): ConvertToSnakeCase<T> | ConvertToSnakeCase<T>[] {
  if (typeof obj !== 'object' || obj === null) {
    return obj as ConvertToSnakeCase<T>;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) =>
      convertKeys<T>(item, convertFn)
    ) as ConvertToSnakeCase<T>[];
  }

  const convertedObj: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const convertedKey = convertFn(key);
      const value = obj[key as keyof typeof obj];

      if (typeof value === 'object' && value !== null) {
        // Recursively convert nested objects
        convertedObj[convertedKey as keyof typeof convertedObj] = convertKeys(
          value,
          convertFn
        );
      } else {
        convertedObj[convertedKey as keyof typeof convertedObj] = value;
      }
    }
  }

  return convertedObj as ConvertToSnakeCase<T>;
}
