import { sql } from '@ts-safeql/sql-tag'
import { DbClient } from '../../types'
import { getRow } from '../../utils/getRow'

export const getUserByUsername = (client: DbClient, username: string) => {
  return getRow(
    client.query<{ id: string; username: string; password: string }>(
      sql`select * from users where username = ${username}`
    )
  )
}
