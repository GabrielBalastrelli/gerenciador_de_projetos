import { Router } from 'express';
import { ControllerProjeto } from '../controllers/projeto.controller';
import { ControllerAuth } from '../controllers/auth.controller';

const projetoRouter = Router();
const controller = new ControllerProjeto();
const authController = new ControllerAuth();

projetoRouter.use(authController.middlewareValidaToken.bind(authController));
projetoRouter.post('/', controller.create.bind(controller));
projetoRouter.delete('/:id', controller.create.bind(controller));
projetoRouter.put('/:id', controller.update.bind(controller));
projetoRouter.get('/', controller.findAll.bind(controller));
projetoRouter.get('/:id', controller.findId.bind(controller));

export default projetoRouter;
