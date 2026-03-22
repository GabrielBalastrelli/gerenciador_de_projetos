import express from 'express';
import { errorHandler } from './services/appError';

const app = express();
const PORT = 3000;

app.use(errorHandler);

app.get('/', (req: any, res: any) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
