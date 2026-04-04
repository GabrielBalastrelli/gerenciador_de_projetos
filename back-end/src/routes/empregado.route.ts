import { Router } from 'express';
import ControllerEmpregado from '../controllers/empregado.controller';
import { ControllerAuth } from '../controllers/auth.controller';

const empregadoRouter = Router();
const controller = new ControllerEmpregado();
const authController = new ControllerAuth();

empregadoRouter.post('/', controller.create.bind(controller));

empregadoRouter.use(authController.middlewareValidaToken.bind(authController)); // ≳ Rotas privadas

empregadoRouter.get('/', controller.findAll.bind(controller));
empregadoRouter.get('/email', controller.findByEmail.bind(controller));
empregadoRouter.get('/:id', controller.findId.bind(controller));

empregadoRouter.put('/:id', controller.update.bind(controller));

empregadoRouter.delete('/', controller.deleteAll.bind(controller));
empregadoRouter.delete('/:id', controller.delete.bind(controller));

export default empregadoRouter;
