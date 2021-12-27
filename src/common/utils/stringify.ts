export function stringify(obj: Record<string, any>) {
  return JSON.stringify(obj, null, 2);
}
