import http from 'node:http';
import findMyWay from 'find-my-way';
import { HttpError } from './exceptions';
import { routes } from './routes';

export const registry = findMyWay();

export class HttpResponse {
  constructor(
    public readonly statusCode: number,
    public readonly body: unknown,
  ) {}
}

type Context = {
  request: http.IncomingMessage;
  response: http.ServerResponse;
};

type Handler = (context: Context) => HttpResponse | Promise<HttpResponse>;

type Method = 'get' | 'post' | 'put' | 'delete';

export type Route = {
  method: Method;
  path: string;
  handler: Handler;
};

export const registerRoute = (route: Route) => {
  registry[route.method](route.path, async (request, response) => {
    try {
      const { statusCode, body } = await route.handler({ request, response });
      sendJson(response, statusCode, body);
    } catch (error) {
      console.error(error);
      if (error instanceof HttpError) {
        sendJson(response, error.statusCode, { error: error.message });
      } else {
        sendJson(response, 500, { error: 'Internal server error' });
      }
    }
  });
};

routes.forEach(registerRoute);

export const sendJson = (
  response: http.ServerResponse,
  statusCode: number,
  body: unknown,
) => {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(body));
};
