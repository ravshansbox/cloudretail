import { pool } from '../../pool';

export const selectByUsername = async (username: string) => {
  const { rows } = await pool.query<{
    id: number;
    username: string;
    password: string;
  }>(`select * from users where username = $1`, [username]);
  return rows[0];
};
