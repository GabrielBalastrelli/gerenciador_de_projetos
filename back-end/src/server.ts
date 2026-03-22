import express from 'express';
import { errorHandler } from './services/appError';
import demandaRouter from './routes/demanda.route';
import projetoRouter from './routes/projeto.route';
import empregadoRouter from './routes/empregado.route';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(errorHandler);
app.use('/demanda', demandaRouter);
app.use('/projeto', projetoRouter);
app.use('/empregado', empregadoRouter);

export default app;
