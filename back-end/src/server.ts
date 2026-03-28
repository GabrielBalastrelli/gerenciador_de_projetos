import express from 'express';
import { errorHandler } from './services/appError';
import demandaRouter from './routes/demanda.route';
import projetoRouter from './routes/projeto.route';
import empregadoRouter from './routes/empregado.route';
import authRouter from './routes/auth.route';

const app = express();

app.use(express.json());
app.use(errorHandler);
app.use('/demanda', demandaRouter);
app.use('/projeto', projetoRouter);
app.use('/empregado', empregadoRouter);
app.use('/auth', authRouter);

export default app;
