export const remapPromiseError = async <T>(
  promise: Promise<T>,
  error: Error,
) => {
  try {
    return await promise;
  } catch (_error) {
    throw error;
  }
};
