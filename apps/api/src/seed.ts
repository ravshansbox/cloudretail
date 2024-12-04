import * as userDao from './daos/users';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from './constants';
import { hash } from 'node:crypto';
import { pool } from './pool';

export const seed = async () => {
  const admin = await userDao.selectByUsername(pool, ADMIN_USERNAME);
  if (!admin) {
    await userDao.createUser(pool, {
      username: ADMIN_USERNAME,
      password: hash('sha256', ADMIN_PASSWORD),
    });
    console.info('Admin user created');
  }
  console.info('Seed complete');
};
