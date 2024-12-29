import express from 'express';
import { registerRoute } from './http';
import { createToken } from './routers/tokens/createToken';
import { getAllTokens } from './routers/tokens/getAllTokens';
import { getToken } from './routers/tokens/getToken';
import { HttpError } from './exceptions';
import { ZodError } from 'zod';

export const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

app.get('/', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

registerRoute(app, createToken);
registerRoute(app, getAllTokens);
registerRoute(app, getToken);

app.use(
  (
    error: unknown,
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(error);

    if (error instanceof HttpError) {
      response.status(error.status).json({ error: error.message });
    }

    if (error instanceof ZodError) {
      response.status(422).json({ error: error.errors });
    }

    response.status(500).json({ error: 'Something went wrong' });
  },
);
