import { sql } from '@ts-safeql/sql-tag';
import { DbClient, getRow } from '../../pool';

export const selectById = (client: DbClient, values: { id: number }) => {
  return getRow(
    client.query<{ id: number; username: string; password: string }>(
      sql`select * from users where id = ${values.id}`,
    ),
  );
};