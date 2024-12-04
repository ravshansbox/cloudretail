import { Schema } from 'zod';
import { Request, Response } from 'express';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export type HandlerParams<T> = {
  request: Request<Record<string, string>, unknown, T>;
  response: Response;
};

export type Route<T, U> = {
  method: HttpMethod;
  path: string;
  inputSchema: Schema<T>;
  handler: (params: HandlerParams<T>) => Promise<U>;
};

export const createRoute = <T, U>(
  method: HttpMethod,
  path: string,
  inputSchema: Schema<T>,
  handler: (params: HandlerParams<T>) => Promise<U>,
) => ({ method, path, inputSchema, handler });
