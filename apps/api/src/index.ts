import { app } from './app';
import { HTTP_PORT } from './constants';

app.listen(HTTP_PORT, () => {
  console.info(`Listening on port ${HTTP_PORT}`);
});
