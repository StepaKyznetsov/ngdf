export type NonNullable<T> = T extends null | undefined ? never : T;

export type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T;
