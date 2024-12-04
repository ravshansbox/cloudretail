import { sql } from '@ts-safeql/sql-tag';
import { DbClient } from '../../types';

export const createUser = async (
  client: DbClient,
  values: {
    username: string;
    password: string;
  },
) => {
  const { rows } = await client.query<{
    id: number;
    username: string;
    password: string;
  }>(
    sql`
      insert into users (username, password)
      values (${values.username}, ${values.password})
      returning *
    `,
  );
  return rows[0];
};
