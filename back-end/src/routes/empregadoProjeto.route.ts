import { ControllerEmpregadoProjeto } from '../controllers/empregadoProjeto.controller';
import cors from 'cors';

import { Router } from 'express';
import { ControllerAuth } from '../controllers/auth.controller';

const empregadoProjetoRouter = Router();
const controller = new ControllerEmpregadoProjeto();
const authController = new ControllerAuth();

empregadoProjetoRouter.use(
  cors({
    origin: 'https://gerenciador-de-projetos-1-5b64.onrender.com',
    credentials: true,
  }),
);

empregadoProjetoRouter.use(authController.middlewareValidaToken.bind(authController));
empregadoProjetoRouter.post('/', controller.create.bind(controller));
empregadoProjetoRouter.delete('/:id', controller.delete.bind(controller));
empregadoProjetoRouter.put('/:id', controller.update.bind(controller));
empregadoProjetoRouter.get('/', controller.findAll.bind(controller));
empregadoProjetoRouter.get('/:id', controller.findId.bind(controller));

export default empregadoProjetoRouter;
