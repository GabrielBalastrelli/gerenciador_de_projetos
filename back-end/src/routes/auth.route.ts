import { Router } from 'express';
import { ControllerAuth } from '../controllers/auth.controller';
import cors from 'cors';

const authRouter = Router();
const controler = new ControllerAuth();

authRouter.use(
  cors({
     origin: [
      'http://localhost:5173',
      'https://gerenciador-de-projetos-1-5b64.onrender.com'
    ],
    credentials: true,
  }),
);

authRouter.post('/', controler.login.bind(controler));

export default authRouter;
