import express from 'express';
import cors from 'cors';

import { errorHandler } from './services/appError';
import demandaRouter from './routes/demanda.route';
import projetoRouter from './routes/projeto.route';
import empregadoRouter from './routes/empregado.route';
import authRouter from './routes/auth.route';
import empregadoProjetoRouter from './routes/empregadoProjeto.route';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://gerenciador-de-projetos-1-5b64.onrender.com'],
    credentials: true,
  }),
);

app.use(express.json());

app.use('/demanda', demandaRouter);
app.use('/projeto', projetoRouter);
app.use('/empregado', empregadoRouter);
app.use('/auth', authRouter);
app.use('/empregadoProjeto', empregadoProjetoRouter);

app.use(errorHandler);

export default app;
