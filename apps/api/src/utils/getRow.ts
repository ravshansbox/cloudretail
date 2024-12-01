export const getRow = async <T>(query: Promise<{ rows: T[] }>) => {
  const { rows } = await query
  const [row] = rows
  if (!row) {
    throw new Error('No row found')
  }
  return row
}
