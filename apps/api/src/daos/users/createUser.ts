import { pool } from '../../pool';

export const createUser = async (values: {
  username: string;
  password: string;
}) => {
  const { rows } = await pool.query<{
    id: number;
    username: string;
    password: string;
  }>(`insert into users (username, password) values ($1, $2) returning *`, [
    values.username,
    values.password,
  ]);
  return rows[0];
};
