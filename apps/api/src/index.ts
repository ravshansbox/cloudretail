import http from 'node:http';
import pgMigrate from 'node-pg-migrate';
import {
  DATABASE_URL,
  HTTP_PORT,
  MIGRATIONS_DIR,
  MIGRATIONS_TABLE,
} from './constants';
import { pool } from './pool';
import { seed } from './seed';
import { registry } from './http';

(async () => {
  await pgMigrate({
    databaseUrl: DATABASE_URL,
    dir: MIGRATIONS_DIR,
    direction: 'up',
    migrationsTable: MIGRATIONS_TABLE,
  });

  await seed(pool);

  const server = http.createServer();
  server.on('request', (request, response) => {
    registry.lookup(request, response);
  });
  server.on('listening', () => {
    console.info(`Listening on port ${HTTP_PORT}`);
  });
  server.listen(HTTP_PORT);
})().catch(console.error);
