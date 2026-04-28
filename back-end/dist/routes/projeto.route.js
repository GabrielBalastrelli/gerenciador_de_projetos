"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projeto_controller_1 = require("../controllers/projeto.controller");
const auth_controller_1 = require("../controllers/auth.controller");
const cors_1 = __importDefault(require("cors"));
const projetoRouter = (0, express_1.Router)();
const controller = new projeto_controller_1.ControllerProjeto();
const authController = new auth_controller_1.ControllerAuth();
projetoRouter.use((0, cors_1.default)({
    origin: ' "https://gerenciador-de-projetos-1-5b64.onrender.com"',
    credentials: true,
}));
projetoRouter.use(authController.middlewareValidaToken.bind(authController));
projetoRouter.post('/', controller.create.bind(controller));
projetoRouter.delete('/:id', controller.create.bind(controller));
projetoRouter.put('/:id', controller.update.bind(controller));
projetoRouter.get('/', controller.findAll.bind(controller));
projetoRouter.get('/:id', controller.findId.bind(controller));
exports.default = projetoRouter;
