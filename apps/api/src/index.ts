import express from 'express';

const app = express();

app.get('/', (request, response) => {
  response.json({ message: 'Hello World' });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
