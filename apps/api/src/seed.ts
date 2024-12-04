import { hash } from 'node:crypto';
import { userDao } from './daos/users';
import { pool } from './pool';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from './constants';

export const seed = async () => {
  const admin = await userDao.selectByUsername(pool, {
    username: ADMIN_USERNAME,
  });
  if (!admin) {
    await userDao.createUser(pool, {
      username: ADMIN_USERNAME,
      password: hash('sha256', ADMIN_PASSWORD),
    });
    console.info('Admin user created');
  }
  console.info('Seed complete');
};
