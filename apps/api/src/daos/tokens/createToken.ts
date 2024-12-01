import { sql } from '@ts-safeql/sql-tag'
import { DbClient } from '../../types'
import { getRow } from '../../utils/getRow'

type Values = {
  user_id: string
}
export const createToken = (client: DbClient, values: Values) => {
  return getRow(
    client.query<{ id: string; user_id: string }>(sql`
      insert into tokens (user_id)
      values (${values.user_id}::uuid)
      returning *
  `)
  )
}
