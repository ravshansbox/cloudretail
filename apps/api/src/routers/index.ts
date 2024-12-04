import { HttpResponse, Route } from '../http';

export const index: Route = {
  method: 'get',
  path: '/',
  handler: () => new HttpResponse(200, { status: 'ok' }),
};
