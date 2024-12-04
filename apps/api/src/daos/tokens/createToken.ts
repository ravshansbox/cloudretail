import { sql } from '@ts-safeql/sql-tag';
import { DbClient } from '../../types';
import { getRow } from '../../getRow';

export const createToken = (client: DbClient, values: { user_id: number }) => {
  return getRow(
    client.query<{ id: number; token: string; user_id: number }>(
      sql`
        insert into tokens (user_id)
        values (${values.user_id})
        returning *
      `,
    ),
  );
};
