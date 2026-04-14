"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const empregado_1 = require("../services/empregado");
const deep_email_validator_1 = require("deep-email-validator");
const validadorSenha_1 = require("../utils/validadorSenha");
const validadorCPF_1 = require("../utils/validadorCPF");
const shemaEmpregado_1 = require("../schema/shemaEmpregado");
const schemaPaginacao_1 = require("../schema/schemaPaginacao");
class ControllerEmpregado {
    constructor() {
        this.empregado = new empregado_1.UseEmpregado();
    }
    async create(req, res, next) {
        try {
            const email = req.body.ds_email;
            const senha = req.body.ds_password;
            const cpf = req.body.ds_cpf;
            const dadosValidos = shemaEmpregado_1.schemaCriarEmpregado.safeParse(req.body);
            if (!dadosValidos.success) {
                return res.status(400).json({ errors: dadosValidos.error.issues });
            }
            const emailValido = await (0, deep_email_validator_1.validate)({
                email: email,
                validateSMTP: false,
            });
            if (!(0, validadorCPF_1.validarCpf)(cpf)) {
                res.status(400).json({ error: 'cpf_invalid', message: 'CPF inválido!' });
                return;
            }
            if (!emailValido.valid) {
                res.status(400).json({ error: 'invalid_email', message: 'E-mail inválido!' });
                return;
            }
            if (!(0, validadorSenha_1.validarSenha)(senha)) {
                res.status(400).json({
                    error: 'weak_password',
                    message: 'A senha não atende aos requisitos de segurança.',
                });
                return;
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
        console.log('asdasdad');
        try {
            const { page, limit } = schemaPaginacao_1.schemaPaginacao.parse({
                page: Number(req.query.page),
                limit: Number(req.query.limit),
            });
            const paginacao = {
                page,
                limit,
            };
            const empregados = await this.empregado.findAll(page, limit);
            console.log(empregados);
            res.status(200).json({ data: empregados, paginacao });
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
