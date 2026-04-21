import { ControllerEmpregadoProjeto } from '../controllers/empregadoProjeto.controller';
import cors from 'cors';

import { Router } from 'express';
import { ControllerAuth } from '../controllers/auth.controller';

const empregadoProjetoRouter = Router();
const controller = new ControllerEmpregadoProjeto();
const authController = new ControllerAuth();

empregadoProjetoRouter.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

empregadoProjetoRouter.use(authController.middlewareValidaToken.bind(authController));
empregadoProjetoRouter.post('/', controller.create.bind(controller));
empregadoProjetoRouter.delete('/:id', controller.create.bind(controller));
empregadoProjetoRouter.put('/:id', controller.update.bind(controller));
empregadoProjetoRouter.get('/', controller.findAll.bind(controller));
empregadoProjetoRouter.get('/:id', controller.findId.bind(controller));

export default empregadoProjetoRouter;
