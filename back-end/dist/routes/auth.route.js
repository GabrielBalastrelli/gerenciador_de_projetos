"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authRouter = (0, express_1.Router)();
const controler = new auth_controller_1.ControllerAuth();
authRouter.post('/', controler.login.bind(controler));
exports.default = authRouter;
