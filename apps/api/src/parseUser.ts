import { tokenDao } from './daos/tokens';
import { pool } from './pool';
import { userDao } from './daos/users';
import { HttpError } from './exceptions';

export const parseUser = async (authorizationHeader?: string) => {
  if (!authorizationHeader)
    throw new HttpError(401, 'Invalid Authentication header');
  const parsed = /^Bearer (.*)$/.exec(authorizationHeader);
  if (parsed === null)
    throw new HttpError(401, 'Invalid Authentication header');
  const tokenId = parsed[1];
  if (!tokenId) throw new HttpError(401, 'Invalid bearer token');
  const token = await tokenDao.selectById(pool, { id: tokenId });
  return userDao.selectById(pool, { id: token.user_id });
};
