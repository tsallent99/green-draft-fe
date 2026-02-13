export type CamelToSnakeCase<S extends string> =
  S extends `${infer T}${infer U}`
    ? `${T extends Capitalize<T>
        ? '_'
        : ''}${Lowercase<T>}${CamelToSnakeCase<U>}`
    : S;

export type ConvertToSnakeCase<T> = {
  [K in keyof T as CamelToSnakeCase<K & string>]: T[K] extends object
    ? ConvertToSnakeCase<T[K]>
    : T[K];
};
