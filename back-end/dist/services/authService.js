"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const empregado_1 = require("./empregado");
const gestaoSenhas_1 = require("../services/gestaoSenhas");
class AuthService {
    constructor() {
        this.Empregado = new empregado_1.UseEmpregado();
        this.GestaoSenhas = new gestaoSenhas_1.GestaoSenha();
    }
    async login(email, senhaLogin) {
        const empregado = await this.Empregado.findByEmail(email);
        if (empregado === null)
            return false;
        const senhaEmpregado = empregado.ds_password;
        return await this.GestaoSenhas.compararSenha(senhaEmpregado, senhaLogin);
    }
}
exports.AuthService = AuthService;
