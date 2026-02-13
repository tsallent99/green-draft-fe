import { convertKeys } from './convertKeys';

// Function to convert snake_case to camelCase
function snakeToCamelCase(key: string) {
  return key.replace(/_([a-z])/g, function (_, group1) {
    return group1.toUpperCase();
  });
}

export function convertToCamelCase(obj: object): object {
  return convertKeys(obj, snakeToCamelCase);
}
