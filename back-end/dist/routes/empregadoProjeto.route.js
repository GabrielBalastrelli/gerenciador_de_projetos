"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const empregadoProjeto_controller_1 = require("../controllers/empregadoProjeto.controller");
const cors_1 = __importDefault(require("cors"));
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const empregadoProjetoRouter = (0, express_1.Router)();
const controller = new empregadoProjeto_controller_1.ControllerEmpregadoProjeto();
const authController = new auth_controller_1.ControllerAuth();
empregadoProjetoRouter.use((0, cors_1.default)({
    origin: ' "https://gerenciador-de-projetos-1-5b64.onrender.com"',
    credentials: true,
}));
empregadoProjetoRouter.use(authController.middlewareValidaToken.bind(authController));
empregadoProjetoRouter.post('/', controller.create.bind(controller));
empregadoProjetoRouter.delete('/:id', controller.delete.bind(controller));
empregadoProjetoRouter.put('/:id', controller.update.bind(controller));
empregadoProjetoRouter.get('/', controller.findAll.bind(controller));
empregadoProjetoRouter.get('/:id', controller.findId.bind(controller));
exports.default = empregadoProjetoRouter;
