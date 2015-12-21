export function DataToArray(vars) {
  if (!vars && vars !== 0) {
    return []
  }
  if (Array.isArray(vars)) {
    return vars;
  }
  return [vars];
}
