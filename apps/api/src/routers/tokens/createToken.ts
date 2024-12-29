import zod from 'zod';
import { createRoute, HttpResponse, createEndpoint } from '../../http';

export const createToken = createRoute({
  endpoint: createEndpoint({ method: 'post', path: '/tokens' }),
  bodySchema: zod.object({
    username: zod.string(),
    password: zod.string(),
  }),
  handler: ({ params, query, body }) => {
    console.log(params, query, body);
    return new HttpResponse(200, { status: 'ok' });
  },
});
