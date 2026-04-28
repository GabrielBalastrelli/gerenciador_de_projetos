import { Router } from 'express';
import { ControllerAuth } from '../controllers/auth.controller';
import cors from 'cors';

const authRouter = Router();
const controler = new ControllerAuth();

authRouter.use(
  cors({
    origin: ' https://gerenciador-de-projetos-jjum.onrender.com',
    credentials: true,
  }),
);

authRouter.post('/', controler.login.bind(controler));

export default authRouter;
