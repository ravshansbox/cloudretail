import { sql } from '@ts-safeql/sql-tag';
import { DbClient, getRow } from '../../pool.js';

export const selectByConfirmationCode = (
  client: DbClient,
  values: { confirmation_code: string },
) => {
  return getRow(
    client.query<{
      id: number;
      user_id: number;
      confirmation_code: string;
      valid_until: Date;
      is_confirmed: boolean;
    }>(sql`
      select * from user_registrations where confirmation_code = ${values.confirmation_code}::uuid
    `),
  );
};
