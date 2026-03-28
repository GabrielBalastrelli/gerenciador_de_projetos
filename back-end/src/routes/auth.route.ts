import { Router } from 'express';
import { ControllerAuth } from '../controllers/auth.controller';

const authRouter = Router();
const controler = new ControllerAuth();

authRouter.post('/login', controler.login.bind(controler));

export default authRouter;
