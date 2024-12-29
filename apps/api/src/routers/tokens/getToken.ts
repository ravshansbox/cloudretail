import { createEndpoint, createRoute, HttpResponse } from '../../http';

export const getToken = createRoute({
  endpoint: createEndpoint<{ id: string }>({
    method: 'get',
    path: '/tokens/:id',
  }),
  handler: ({ params, query, body }) => {
    console.log(params, query, body);
    return new HttpResponse(200, { status: 'ok' });
  },
});
