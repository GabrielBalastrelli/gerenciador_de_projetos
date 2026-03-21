import express from 'express';

import Controllers from './controllers/controller';

const app = express();
const PORT = 3000;

app.get('/', (req: any, res: any) => {
  res.send('Hello World!');
});

app.get('/cadastarUsuario', (req: any, res: any) => {
  const controllers = new Controllers("cadastarUsuario");
  res.send(controllers->);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
