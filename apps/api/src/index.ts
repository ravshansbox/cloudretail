import pgMigrate from 'node-pg-migrate';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { app, registerRoute } from './app';
import {
  DATABASE_URL,
  HTTP_PORT,
  MIGRATIONS_DIR,
  MIGRATIONS_TABLE,
} from './constants';
import { seed } from './seed';
import { tokenRouter } from './routers/tokens';
import { HttpError } from './errors/http-error';

(async () => {
  await pgMigrate({
    databaseUrl: DATABASE_URL,
    dir: MIGRATIONS_DIR,
    direction: 'up',
    migrationsTable: MIGRATIONS_TABLE,
  });

  await seed();

  registerRoute(tokenRouter.createToken);

  app.use(
    (
      error: Error,
      _request: Request,
      response: Response,
      _next: NextFunction,
    ) => {
      if (error instanceof HttpError) {
        response.status(error.status).json({ error: error.message });
      } else if (error instanceof ZodError) {
        response.status(422).json({ error: error.errors });
      } else {
        response.status(500).json({ error: error.message });
      }
    },
  );

  app.listen(HTTP_PORT, () => {
    console.info(`Listening on port ${HTTP_PORT}`);
  });
})().catch(console.error);
