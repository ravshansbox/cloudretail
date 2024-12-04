import express from 'express';
import { HttpResponse, Path, registerRoute } from '../app';
import zod from 'zod';

export const tokenRouter = express.Router();

registerRoute(tokenRouter, {
  method: 'get',
  path: new Path<{ id: string }>('/:id'),
  querySchema: zod.object({
    id: zod.string().optional(),
  }),
  bodySchema: zod.object({
    username: zod.string(),
    password: zod.string(),
  }),
  handler: ({ params, query, body }) => {
    console.log(params, query, body);
    return new HttpResponse(200, { status: 'ok' });
  },
});

registerRoute(tokenRouter, {
  method: 'post',
  path: new Path('/'),
  bodySchema: zod.object({
    username: zod.string(),
    password: zod.string(),
  }),
  handler: ({ params, query, body }) => {
    console.log(params, query, body);
    return new HttpResponse(200, { status: 'ok' });
  },
});
