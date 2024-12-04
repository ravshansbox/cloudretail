import { DbClient } from '../../types';
import { sql } from '@ts-safeql/sql-tag';
import { getRow } from '../../getRow';

export const selectByUsername = (
  client: DbClient,
  values: { username: string },
) => {
  return getRow(
    client.query<{
      id: number;
      username: string;
      password: string;
    }>(sql`select * from users where username = ${values.username}`),
  );
};
