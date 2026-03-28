import { Router } from 'express';
import ControllerEmpregado from '../controllers/empregado.controller';

const empregadoRouter = Router();
const controller = new ControllerEmpregado();
console.log('aaaaa');

empregadoRouter.post('/', controller.create.bind(controller));
empregadoRouter.delete('/:id', controller.delete.bind(controller));
empregadoRouter.put('/:id', controller.update.bind(controller));
empregadoRouter.get('/', controller.findAll.bind(controller));
empregadoRouter.get('/:id', controller.findId.bind(controller));
empregadoRouter.get('/:email', controller.findByEmail.bind(controller));
empregadoRouter.delete('/', controller.deleteAll.bind(controller));

export default empregadoRouter;
