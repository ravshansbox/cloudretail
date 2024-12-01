import { HTTPMethod } from 'find-my-way'
import { IncomingMessage, ServerResponse } from 'node:http'
import { ZodType } from 'zod'
import { parseBody } from './parseBody'
import { sendJson } from './sendJson'

type Context<Body> = {
  request: IncomingMessage
  response: ServerResponse
  body: Body
}

type HandlerResult = {
  status: number
  data?: unknown
  error?: unknown
}

type Handler<Body> = (context: Context<Body>) => Promise<HandlerResult>

type Params<Body> = {
  method: HTTPMethod
  path: string
  schema: ZodType<Body>
  handler: Handler<Body>
}

export const createRoute = <Body>({
  method,
  path,
  schema,
  handler
}: Params<Body>) => {
  return [
    method,
    path,
    async (request: IncomingMessage, response: ServerResponse) => {
      try {
        const rawBody = await parseBody(request)
        const body = schema.parse(rawBody)
        const { status, data, error } = await handler({
          request,
          response,
          body
        })
        if (error) {
          sendJson(response, status, { error })
        } else {
          sendJson(response, status, { data })
        }
      } catch (error) {
        sendJson(response, 500, { error })
      }
    }
  ] as const
}
