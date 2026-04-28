"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empregado_controller_1 = __importDefault(require("../controllers/empregado.controller"));
const auth_controller_1 = require("../controllers/auth.controller");
const cors_1 = __importDefault(require("cors"));
const empregadoRouter = (0, express_1.Router)();
const controller = new empregado_controller_1.default();
const authController = new auth_controller_1.ControllerAuth();
empregadoRouter.use((0, cors_1.default)({
    origin: ' "https://gerenciador-de-projetos-1-5b64.onrender.com"',
    credentials: true,
}));
empregadoRouter.post('/', controller.create.bind(controller));
empregadoRouter.use(authController.middlewareValidaToken.bind(authController));
empregadoRouter.get('/', controller.findAll.bind(controller));
empregadoRouter.get('/email/:ds_email', controller.findByEmail.bind(controller));
empregadoRouter.get('/:id', controller.findId.bind(controller));
empregadoRouter.put('/:id', controller.update.bind(controller));
empregadoRouter.delete('/', controller.deleteAll.bind(controller));
empregadoRouter.delete('/:id', controller.delete.bind(controller));
exports.default = empregadoRouter;
