import { IncomingMessage } from 'node:http'

export const parseBody = (request: IncomingMessage) => {
  return new Promise<unknown>((resolve, reject) => {
    const body = [] as Buffer[]
    request.on('data', (chunk: Buffer) => {
      body.push(chunk)
    })
    request.on('end', () => {
      resolve(JSON.parse(Buffer.concat(body).toString()))
    })
    request.on('error', reject)
  })
}
