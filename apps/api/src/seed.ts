import * as userDao from './daos/users';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from './constants';
import { hash } from 'node:crypto';

export const seed = async () => {
  const admin = await userDao.selectByUsername(ADMIN_USERNAME);
  if (!admin) {
    await userDao.createUser({
      username: ADMIN_USERNAME,
      password: hash('sha256', ADMIN_PASSWORD),
    });
    console.info('Admin user created');
  }
  console.info('Seed complete');
};
