"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const demanda_controller_1 = __importDefault(require("../controllers/demanda.controller"));
const auth_controller_1 = require("../controllers/auth.controller");
const demandaRouter = (0, express_1.Router)();
const controller = new demanda_controller_1.default();
const authController = new auth_controller_1.ControllerAuth();
demandaRouter.use(authController.middlewareValidaToken.bind(authController));
demandaRouter.post('/', controller.create.bind(controller));
demandaRouter.delete('/:id', controller.delete.bind(controller));
demandaRouter.put('/:id', controller.update.bind(controller));
demandaRouter.get('/', controller.findAll.bind(controller));
demandaRouter.get('/:id', controller.findId.bind(controller));
exports.default = demandaRouter;
