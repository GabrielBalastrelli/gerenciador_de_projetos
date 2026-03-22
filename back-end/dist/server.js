"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appError_1 = require("./services/appError");
const demanda_route_1 = __importDefault(require("./routes/demanda.route"));
const projeto_route_1 = __importDefault(require("./routes/projeto.route"));
const empregado_route_1 = __importDefault(require("./routes/empregado.route"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(appError_1.errorHandler);
app.use('/demanda', demanda_route_1.default);
app.use('/projeto', projeto_route_1.default);
app.use('/empregado', empregado_route_1.default);
exports.default = app;
