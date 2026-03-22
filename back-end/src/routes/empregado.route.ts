import { Router } from 'express';
import ControllerEmpregado from '../controllers/empregado.controller';

const empregadoRouter = Router();
const controller = new ControllerEmpregado();

empregadoRouter.post('/', controller.create.bind(controller));
empregadoRouter.delete('/:id', controller.delete.bind(controller));
empregadoRouter.put('/:id', controller.update.bind(controller));
empregadoRouter.get('/', controller.findAll.bind(controller));
empregadoRouter.get('/:id', controller.findId.bind(controller));

export default empregadoRouter;
