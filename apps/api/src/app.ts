import express from 'express';
import { HttpError } from './http';
import { tokensRouter } from './routers';

export const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

app.get('/', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

app.use('/tokens', tokensRouter);

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
