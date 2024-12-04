import { hash } from 'node:crypto';
import { z } from 'zod';
import { pool } from '../../pool';
import { createRoute } from '../../createRoute';
import { userDao } from '../../daos/users';
import { tokenDao } from '../../daos/tokens';
import { remapPromiseError } from '../../remap-promise-error';
import { UnprocessableEntity } from '../../errors/unprocessable-entity';

export const createToken = createRoute(
  'post',
  '/tokens',
  z.object({ username: z.string(), password: z.string() }),
  async ({ request }) => {
    const { body } = request;
    const user = await remapPromiseError(
      userDao.selectByUsername(pool, { username: body.username }),
      new UnprocessableEntity('User not found'),
    );
    if (user.password !== hash('sha256', body.password)) {
      throw new UnprocessableEntity('Incorrect password');
    }
    return tokenDao.createToken(pool, { user_id: user.id });
  },
);
