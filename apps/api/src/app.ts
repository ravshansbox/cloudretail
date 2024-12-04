import express from 'express';
import { tokenRouter } from './routers';
import { HttpError } from './exceptions';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/tokens', tokenRouter);

app.use(
  (
    error: unknown,
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction,
  ) => {
    if (error instanceof HttpError) {
      response.status(error.status).json({ error: error.message });
    }

    response.status(500).json({ error: 'Something went wrong' });
  },
);
