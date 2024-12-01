import { ServerResponse } from 'node:http'

export const sendJson = (
  response: ServerResponse,
  status: number,
  data: unknown
) => {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(data))
}
