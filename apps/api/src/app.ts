import express from 'express';
import bodyParser from 'body-parser';

export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.json({ message: 'Hello World!' });
});
