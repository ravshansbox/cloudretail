import { getRows } from './getRows';

export const getRow = async <T>(
  promise: Promise<{ rows: T[] }>,
  strict = true,
) => {
  const rows = await getRows(promise);
  if (strict) {
    if (rows.length === 0) {
      throw new Error(`No rows found`);
    }
    if (rows.length > 1) {
      throw new Error(`Multiple rows found`);
    }
  }
  return rows[0];
};
