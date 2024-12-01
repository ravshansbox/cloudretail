import { Client, Pool, PoolClient } from 'pg'

export type DbClient = Client | PoolClient | Pool
