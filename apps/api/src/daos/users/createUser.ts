import { sql } from '@ts-safeql/sql-tag'
import { DbClient } from '../../types'
import { getRow } from '../../utils/getRow'

type Values = {
  username: string
  password: string
}
export const createUser = (client: DbClient, values: Values) => {
  return getRow(
    client.query<{ id: string; username: string; password: string }>(sql`
      insert into users (username, password)
      values (${values.username}, ${values.password})
      returning *
  `)
  )
}
