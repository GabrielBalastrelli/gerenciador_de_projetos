import { Router } from 'express';
import ControllerDemanda from '../controllers/demanda.controller';

const demandaRouter = Router();
const controller = new ControllerDemanda();

demandaRouter.post('/', controller.create.bind(controller));

demandaRouter.delete('/:id', controller.delete.bind(controller));

demandaRouter.put('/:id', controller.update.bind(controller));

demandaRouter.get('/', controller.findAll.bind(controller));

demandaRouter.get('/:id', controller.findId.bind(controller));

export default demandaRouter;
