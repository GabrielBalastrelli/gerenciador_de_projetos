import app from './server';
import 'dotenv/config';
import cors from 'cors';

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://gerenciador-de-projetos-1-5b64.onrender.com'
  ],
  credentials: true
}));

app.get('/', (req: any, res: any) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
