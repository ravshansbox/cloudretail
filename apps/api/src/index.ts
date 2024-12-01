import { migrateDatabase } from './utils/migrateDatabase'
import { startServer } from './utils/startServer'

migrateDatabase('up')
  .then(() => startServer())
  .then(() => {
    console.info('App started.')
  })
  .catch(() => {
    console.error('Something went wrong.')
  })
