import { createServer, Server } from 'node:http'
import { app } from '../app'
import { PORT } from '../constants'

export const startServer = () => {
  return new Promise<Server>((resolve, reject) => {
    const server = createServer()
    server.on('error', reject)
    server.on('listening', () => {
      console.info(`Listening on ${PORT}.`)
      resolve(server)
    })
    server.on('request', (request, response) => {
      app.lookup(request, response)
    })
    server.listen(PORT)
  })
}
