"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empregado_controller_1 = __importDefault(require("../controllers/empregado.controller"));
const empregadoRouter = (0, express_1.Router)();
const controller = new empregado_controller_1.default();
empregadoRouter.post('/', controller.create.bind(controller));
empregadoRouter.delete('/:id', controller.delete.bind(controller));
empregadoRouter.put('/:id', controller.update.bind(controller));
empregadoRouter.get('/', controller.findAll.bind(controller));
empregadoRouter.get('/:id', controller.findId.bind(controller));
exports.default = empregadoRouter;
