import { convertKeys } from './convertKeys';
import { ConvertToSnakeCase } from './types';

// Function to convert camelCase to snake_case
export function camelToSnakeCase(key: string) {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase();
}

export function convertToSnakeCase<T>(
  obj: T
): ConvertToSnakeCase<T> | ConvertToSnakeCase<T>[] {
  return convertKeys(obj, camelToSnakeCase);
}
