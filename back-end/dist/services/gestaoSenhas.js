"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestaoSenha = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class GestaoSenha {
    async criptografarSenha(senha) {
        const salt = 10;
        const hash = await bcrypt_1.default.hash(senha, salt);
        return hash;
    }
    async compararSenha(senha, senhaLogin) {
        return await bcrypt_1.default.compare(senhaLogin, senha);
    }
}
exports.GestaoSenha = GestaoSenha;
