import { DbClient } from '../../types';
import { sql } from '@ts-safeql/sql-tag';

export const selectByUsername = async (client: DbClient, username: string) => {
  const { rows } = await client.query<{
    id: number;
    username: string;
    password: string;
  }>(sql`select * from users where username = ${username}`);
  return rows[0];
};
