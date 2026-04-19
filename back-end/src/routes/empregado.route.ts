import { Router } from 'express';
import ControllerEmpregado from '../controllers/empregado.controller';
import { ControllerAuth } from '../controllers/auth.controller';
import cors from 'cors';

const empregadoRouter = Router();
const controller = new ControllerEmpregado();
const authController = new ControllerAuth();

empregadoRouter.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

empregadoRouter.post('/', controller.create.bind(controller));

empregadoRouter.use(authController.middlewareValidaToken.bind(authController));

empregadoRouter.get('/', controller.findAll.bind(controller));
empregadoRouter.get('/email/:ds_email', controller.findByEmail.bind(controller));
empregadoRouter.get('/:id', controller.findId.bind(controller));

empregadoRouter.put('/:id', controller.update.bind(controller));

empregadoRouter.delete('/', controller.deleteAll.bind(controller));
empregadoRouter.delete('/:id', controller.delete.bind(controller));

export default empregadoRouter;
