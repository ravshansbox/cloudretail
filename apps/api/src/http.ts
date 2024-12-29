import express from 'express';
import zod from 'zod';

export class HttpResponse<ResponseBody> {
  constructor(
    public readonly status: number,
    public readonly body: ResponseBody,
  ) {}
}

type Method = 'get' | 'post' | 'put' | 'delete';

export type Endpoint<_Params> = {
  method: Method;
  path: string;
};

export const createEndpoint = <Params>(endpoint: Endpoint<Params>) => endpoint;

type Context<RequestParams, RequestQuery, RequestBody> = {
  params: RequestParams;
  query: RequestQuery;
  body: RequestBody;
};

type Handler<RequestParams, RequestQuery, RequestBody, ResponseBody> = (
  context: Context<RequestParams, RequestQuery, RequestBody>,
) => HttpResponse<ResponseBody> | Promise<HttpResponse<ResponseBody>>;

type Route<RequestParams, RequestQuery, RequestBody, ResponseBody> = {
  endpoint: Endpoint<RequestParams>;
  querySchema?: zod.ZodType<RequestQuery>;
  bodySchema?: zod.ZodType<RequestBody>;
  handler: Handler<RequestParams, RequestQuery, RequestBody, ResponseBody>;
};

export const createRoute = <
  RequestParams = unknown,
  RequestQuery = unknown,
  RequestBody = unknown,
  ResponseBody = unknown,
>(
  route: Route<RequestParams, RequestQuery, RequestBody, ResponseBody>,
) => route;

export const registerRoute = <
  RequestParams = unknown,
  RequestQuery = unknown,
  RequestBody = unknown,
  ResponseBody = unknown,
>(
  router: express.Router,
  {
    endpoint,
    querySchema,
    bodySchema,
    handler,
  }: Route<RequestParams, RequestQuery, RequestBody, ResponseBody>,
) => {
  router[endpoint.method](
    endpoint.path,
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
