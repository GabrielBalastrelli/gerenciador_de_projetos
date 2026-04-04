"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const promises_1 = __importDefault(require("fs/promises"));
function errorHandler(erro, req, res, next) {
    const status = erro.statusCode || 500;
    const message = erro.message || 'Erro Interno do Servidor!';
    promises_1.default.writeFile('./log/logtxt', erro);
    res.status(status).json({ error: message });
}
