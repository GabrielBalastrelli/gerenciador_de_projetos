import { Router } from 'express';
import ControllerDemanda from '../controllers/demanda.controller';
import { ControllerAuth } from '../controllers/auth.controller';

const demandaRouter = Router();
const controller = new ControllerDemanda();
const authController = new ControllerAuth();

demandaRouter.use(authController.middlewareValidaToken.bind(authController));
demandaRouter.post('/', controller.create.bind(controller));

demandaRouter.delete('/:id', controller.delete.bind(controller));

demandaRouter.put('/:id', controller.update.bind(controller));

demandaRouter.get('/', controller.findAll.bind(controller));

demandaRouter.get('/:id', controller.findId.bind(controller));

export default demandaRouter;
