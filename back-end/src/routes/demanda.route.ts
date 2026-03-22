import { Router } from 'express';
import ControllerDemanda from '../controllers/demandaController';

const router = Router();
const controller = new ControllerDemanda();

router.post('/', controller.create.bind(controller));

router.delete('/:id', controller.delete.bind(controller));

router.put('/:id', controller.update.bind(controller));

router.get('/', controller.findAll.bind(controller));

router.get('/:id', controller.findId.bind(controller));

export default router;
