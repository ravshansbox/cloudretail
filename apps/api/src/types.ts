import { Client, Pool, PoolClient } from 'pg';

export type DbClient = Pool | PoolClient | Client;
