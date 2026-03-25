"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const empregado_1 = require("../services/empregado");
class ControllerEmpregado {
    constructor() {
        this.empregado = new empregado_1.UseEmpregado();
    }
    async create(req, res, next) {
        try {
            console.log(req.body);
            const empregado = await this.empregado.create(req.body);
            res.status(201).json(empregado);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
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
            const empregados = await this.empregado.findById(id);
            if (!empregados) {
                return res.status(401).json({ message: 'Não foi encontrado empregado com id!' });
            }
            res.status(200).json(empregados);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = ControllerEmpregado;
