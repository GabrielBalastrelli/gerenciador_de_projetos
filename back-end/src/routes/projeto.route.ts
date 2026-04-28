import { Router } from 'express';
import { ControllerProjeto } from '../controllers/projeto.controller';
import { ControllerAuth } from '../controllers/auth.controller';
import cors from 'cors';

const projetoRouter = Router();
const controller = new ControllerProjeto();
const authController = new ControllerAuth();

projetoRouter.use(
  cors({
    origin: ' "https://gerenciador-de-projetos-1-5b64.onrender.com"',
    credentials: true,
  }),
);

projetoRouter.use(authController.middlewareValidaToken.bind(authController));
projetoRouter.post('/', controller.create.bind(controller));
projetoRouter.delete('/:id', controller.create.bind(controller));
projetoRouter.put('/:id', controller.update.bind(controller));
projetoRouter.get('/', controller.findAll.bind(controller));
projetoRouter.get('/:id', controller.findId.bind(controller));

export default projetoRouter;
