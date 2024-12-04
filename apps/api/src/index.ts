import { app } from './app';
import {
  DATABASE_URL,
  HTTP_PORT,
  MIGRATIONS_DIR,
  MIGRATIONS_TABLE,
} from './constants';
import pgMigrate from 'node-pg-migrate';
import { seed } from './seed';

(async () => {
  await pgMigrate({
    databaseUrl: DATABASE_URL,
    dir: MIGRATIONS_DIR,
    direction: 'up',
    migrationsTable: MIGRATIONS_TABLE,
  });

  await seed();

  app.listen(HTTP_PORT, () => {
    console.info(`Listening on port ${HTTP_PORT}`);
  });
})().catch(console.error);
