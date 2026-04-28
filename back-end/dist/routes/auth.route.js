"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const cors_1 = __importDefault(require("cors"));
const authRouter = (0, express_1.Router)();
const controler = new auth_controller_1.ControllerAuth();
authRouter.use((0, cors_1.default)({
    origin: ' "https://gerenciador-de-projetos-1-5b64.onrender.com"',
    credentials: true,
}));
authRouter.post('/', controler.login.bind(controler));
exports.default = authRouter;
