export const getRows = async <T>(promise: Promise<{ rows: T[] }>) => {
  const { rows } = await promise;
  return rows;
};
