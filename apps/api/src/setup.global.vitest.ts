import http from 'node:http';
import net from 'node:net';
import { TestProject } from 'vitest/node';
import { app } from './app.js';
import { pool } from './pool.js';

declare module 'vitest' {
  export interface ProvidedContext {
    baseUrl: string;
  }
}

let server: http.Server;

export default async (project: TestProject) => {
  await new Promise<void>((resolve, reject) => {
    server = new http.Server();
    server.on('error', reject);
    server.on('listening', () => {
      const { port } = server.address() as net.AddressInfo;
      project.provide('baseUrl', `http://localhost:${port}`);
      resolve();
    });
    server.on('request', app);
    server.listen();
  });

  return async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        error ? reject(error) : resolve();
      });
    });
    await pool.query('delete from tokens');
    await pool.query('delete from user_registrations');
    await pool.query('delete from users');
  };
};
