import createApp from 'find-my-way'
import { createToken } from './routers/tokens/createToken'
import { createUser } from './routers/users/createUser'

export const app = createApp()

app.on(...createToken)
app.on(...createUser)
