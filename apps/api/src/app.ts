import express, { Request } from 'express';
import bodyParser from 'body-parser';
import { Route } from './createRoute';

export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export const registerRoute = <T, U>({
  method,
  path,
  inputSchema,
  handler,
}: Route<T, U>) => {
  app[method](
    path,
    (request: Request<Record<string, string>, unknown, T>, response, next) => {
      if (inputSchema !== undefined) {
        try {
          request.body = inputSchema.parse(request.body);
        } catch (error) {
          next(error);
          return;
        }
      }
      handler({ request, response })
        .then((result) => {
          response.json(result);
        })
        .catch(next);
    },
  );
};

app.get('/', (_request, response) => {
  response.json({ status: 'ok' });
});
