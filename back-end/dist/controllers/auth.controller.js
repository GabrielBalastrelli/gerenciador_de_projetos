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
                return res.status(400).json({ error: 'Parâmetros inválidos' });
            }
            const login = await this.authService.login(ds_email, ds_password);
            if (!login) {
                return res.status(401).json({ error: 'E-mail ou senha inválidos!' });
            }
            return res.status(200).json({ error: 'Login realizado com sucesso!' });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ControllerAuth = ControllerAuth;
