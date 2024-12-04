import express from 'express';
import zod from 'zod';
import { HttpResponse, Path, registerRoute } from '../http';

export const tokenRouter = express.Router();

registerRoute(tokenRouter, {
  method: 'get',
  path: new Path(''),
  querySchema: zod.object({
    id: zod.string(),
  }),
  handler: ({ params, query, body }) => {
    console.log(params, query, body);
    return new HttpResponse(200, { status: 'ok' });
  },
});

registerRoute(tokenRouter, {
  method: 'get',
  path: new Path(':id'),
  handler: ({ params, query, body }) => {
    console.log(params, query, body);
    return new HttpResponse(200, { status: 'ok' });
  },
});

registerRoute(tokenRouter, {
  method: 'post',
  path: new Path(''),
  bodySchema: zod.object({
    username: zod.string(),
    password: zod.string(),
  }),
  handler: ({ params, query, body }) => {
    console.log(params, query, body);
    return new HttpResponse(200, { status: 'ok' });
  },
});
