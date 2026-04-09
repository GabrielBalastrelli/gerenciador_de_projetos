"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const empregado_1 = require("./empregado");
const gestaoSenhas_1 = require("../services/gestaoSenhas");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
class AuthService {
    constructor() {
        this.Empregado = new empregado_1.UseEmpregado();
        this.GestaoSenhas = new gestaoSenhas_1.GestaoSenha();
        this.privateKey = process.env.PRIVATE_KEY;
    }
    validarToken(token) {
        console.log('token)');
        try {
            return jsonwebtoken_1.default.verify(token, this.privateKey);
        }
        catch (error) {
            throw new Error('Token Inválido!');
        }
    }
    gerarToken(id, email, role) {
        return jsonwebtoken_1.default.sign({ id, email, role }, this.privateKey, {
            expiresIn: '2h',
        });
    }
    async login(email, senhaLogin) {
        const empregado = await this.Empregado.findByEmail(email);
        if (empregado === null)
            return null;
        const senhaEmpregado = empregado.ds_password;
        const valido = await this.GestaoSenhas.compararSenha(senhaEmpregado, senhaLogin);
        return valido === true ? empregado : null;
    }
}
exports.AuthService = AuthService;
