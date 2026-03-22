import app from './server';

const PORT = 3000;

app.get('/', (req: any, res: any) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
