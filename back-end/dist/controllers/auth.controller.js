"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerAuth = void 0;
const authService_1 = require("../services/authService");
class ControllerAuth {
    constructor() {
        this.authService = new authService_1.AuthService();
    }
    async login(req, res, next) {
        try {
            const { ds_password, ds_email } = req.body;
            if (typeof ds_email !== 'string' || typeof ds_password !== 'string') {
                res.status(400).json({ sucess: false, error: 'Parâmetros inválidos' });
                return;
            }
            const empregado = await this.authService.login(ds_email, ds_password);
            if (!empregado) {
                res.status(401).json({ sucess: false, error: 'E-mail ou senha inválidos!' });
                return;
            }
            const token = this.authService.gerarToken(empregado.id_empregado, empregado.ds_email, empregado.role);
            res
                .status(200)
                .json({ status: 200, success: true, token, message: 'Login Realizado com Sucesso!' });
            return;
        }
        catch (error) {
            next(error);
        }
    }
    middlewareValidaToken(req, res, next) {
        const auth = req.headers.authorization;
        if (auth === undefined) {
            res.status(401).json({ error: 'Token não enviado!' });
            return;
        }
        const token = auth.split(' ')[1];
        try {
            const empregado = this.authService.validarToken(token);
            req.empregado = empregado;
            return next();
        }
        catch {
            return res.status(401).json({ error: 'Token inválido!' });
        }
    }
}
exports.ControllerAuth = ControllerAuth;
