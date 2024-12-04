import express from 'express';
import zod from 'zod';

export class HttpResponse<ResponseBody> {
  constructor(
    public readonly status: number,
    public readonly body: ResponseBody,
  ) {}
}

type Method = 'get' | 'post' | 'put' | 'delete';

export class Path<_RequestParams> {
  constructor(public readonly value: string) {}
}

type Context<RequestParams, RequestQuery, RequestBody> = {
  params: RequestParams;
  query: RequestQuery;
  body: RequestBody;
};

type Handler<RequestParams, RequestQuery, RequestBody, ResponseBody> = (
  context: Context<RequestParams, RequestQuery, RequestBody>,
) => HttpResponse<ResponseBody> | Promise<HttpResponse<ResponseBody>>;

type Route<RequestParams, RequestQuery, RequestBody, ResponseBody> = {
  method: Method;
  path: Path<RequestParams>;
  querySchema?: zod.ZodType<RequestQuery>;
  bodySchema?: zod.ZodType<RequestBody>;
  handler: Handler<RequestParams, RequestQuery, RequestBody, ResponseBody>;
};

export const registerRoute = <
  RequestParams = unknown,
  RequestQuery = unknown,
  RequestBody = unknown,
  ResponseBody = unknown,
>(
  router: express.Router,
  {
    method,
    path,
    querySchema,
    bodySchema,
    handler,
  }: Route<RequestParams, RequestQuery, RequestBody, ResponseBody>,
) => {
  router[method](
    path.value,
    async (
      request: express.Request<
        RequestParams,
        ResponseBody,
        RequestBody,
        RequestQuery
      >,
      response,
    ) => {
      const { status, body } = await handler({
        params: request.params,
        query: querySchema ? querySchema.parse(request.query) : request.query,
        body: bodySchema ? bodySchema.parse(request.body) : request.body,
      });
      response.status(status).json(body);
    },
  );
};
