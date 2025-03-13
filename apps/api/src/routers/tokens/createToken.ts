import crypto from 'node:crypto';
import zod from 'zod';
import { tokenDao } from '../../daos/tokens';
import { userDao } from '../../daos/users';
import { pool } from '../../pool';
import { HttpError } from '../../exceptions';
import { createHandler, Fetcher, HttpResponse } from '../../http';

export const createToken = {
  method: 'post' as const,
  path: '/tokens',
  handler: createHandler({
    bodySchema: zod.object({
      username: zod.string(),
      password: zod.string(),
    }),
    process: async ({ body }) => {
      const user = await userDao.selectByUsername(pool, {
        username: body.username,
      });
      if (user.password !== crypto.hash('sha256', body.password)) {
        throw new HttpError(401, 'Invalid username or password');
      }
      const token = await tokenDao.createToken(pool, { userId: user.id });
      return new HttpResponse(201, token);
    },
  }),
};

export type CreateTokenFetcher = Fetcher<typeof createToken.handler>;
