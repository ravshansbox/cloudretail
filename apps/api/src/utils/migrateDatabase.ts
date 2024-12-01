import migrate from 'node-pg-migrate'
import {
  DATABASE_URL,
  MIGRATIONS_DIRECTORY,
  MIGRATIONS_TABLE
} from '../constants'

export const migrateDatabase = (direction: 'up' | 'down') => {
  return migrate({
    databaseUrl: DATABASE_URL,
    dir: MIGRATIONS_DIRECTORY,
    migrationsTable: MIGRATIONS_TABLE,
    direction
  })
}
