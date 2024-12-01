import { z } from 'zod'
import * as userDao from '../../daos/users'
import { pool } from '../../pool'
import { createRoute } from '../../utils/createRoute'

export const createUser = createRoute({
  method: 'POST',
  path: '/users',
  schema: z.object({
    username: z.string(),
    password: z.string()
  }),
  handler: async ({ body }) => {
    const user = await userDao.createUser(pool, body)
    return { status: 200, data: user }
  }
})
