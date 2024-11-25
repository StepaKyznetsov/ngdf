export function typedEntries<T extends string, U>(
  obj: Partial<Record<T, U>>,
): [T, U][] {
  return Object.entries(obj) as [T, U][];
}
