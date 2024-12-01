import { z } from 'zod'
import * as tokenDao from '../../daos/tokens'
import * as userDao from '../../daos/users'
import { pool } from '../../pool'
import { createRoute } from '../../utils/createRoute'

export const createToken = createRoute({
  method: 'POST',
  path: '/tokens',
  schema: z.object({
    username: z.string(),
    password: z.string()
  }),
  handler: async ({ body }) => {
    const user = await userDao.getUserByUsername(pool, body.username)
    if (user.password !== body.password) {
      throw new Error('Invalid credentials')
    }
    const token = await tokenDao.createToken(pool, { user_id: user.id })
    return { status: 200, data: token }
  }
})
