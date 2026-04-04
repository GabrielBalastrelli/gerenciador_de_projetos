"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const empregado_1 = require("../services/empregado");
const deep_email_validator_1 = require("deep-email-validator");
class ControllerEmpregado {
    constructor() {
        this.empregado = new empregado_1.UseEmpregado();
    }
    async create(req, res, next) {
        try {
            const email = req.body.ds_email;
            console.log(email);
            const emailValido = await (0, deep_email_validator_1.validate)({
                email: email,
                validateSMTP: false,
            });
            if (!emailValido.valid) {
                res.status(400).json({ error: 'E-mail inválido' });
            }
            const empregado = await this.empregado.create(req.body);
            res.status(201).json(empregado);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            console.log('aaa');
            const { id } = req.params;
            await this.empregado.delete(id);
            res.status(200).send();
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const empregado = await this.empregado.update(id, req.body);
            res.status(200).json(empregado);
        }
        catch (error) {
            next(error);
        }
    }
    async findAll(req, res, next) {
        try {
            const empregados = await this.empregado.findAll();
            res.status(200).json(empregados);
        }
        catch (error) {
            next(error);
        }
    }
    async findId(req, res, next) {
        try {
            const { id } = req.params;
            const empregado = await this.empregado.findById(id);
            if (!empregado) {
                return res.status(401).json({ message: 'Não foi encontrado empregado com id!' });
            }
            res.status(200).json(empregado);
        }
        catch (error) {
            next(error);
        }
    }
    async findByEmail(req, res, next) {
        try {
            const { ds_email } = req.params;
            const empregado = await this.empregado.findByEmail(ds_email);
            if (!empregado) {
                res.status(401).json({ message: 'Não foi encontrado empregado com esse e-mail.' });
            }
            res.status(200).json(empregado);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteAll(req, res, next) {
        try {
            await this.empregado.deleteAll();
            res.status(200).json({ message: 'Todos os empregados foram deletados com sucesso!' });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = ControllerEmpregado;
