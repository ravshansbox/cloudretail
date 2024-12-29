import zod from 'zod';
import { createEndpoint, createRoute, HttpResponse } from '../../http';

export const getAllTokens = createRoute({
  endpoint: createEndpoint({ method: 'get', path: '/tokens' }),
  querySchema: zod.object({
    id: zod.string(),
  }),
  handler: ({ params, query, body }) => {
    console.log(params, query, body);
    return new HttpResponse(200, { status: 'ok' });
  },
});
