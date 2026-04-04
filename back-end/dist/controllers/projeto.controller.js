"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerProjeto = void 0;
const projeto_1 = require("../services/projeto");
class ControllerProjeto {
    constructor() {
        this.projeto = new projeto_1.UseProjeto();
    }
    async create(req, res, next) {
        try {
            const projeto = await this.projeto.create(req.body);
            res.status(201).json(projeto);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await this.projeto.delete(id);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const projeto = await this.projeto.update(id, req.body);
            res.status(200).json(projeto);
        }
        catch (error) {
            next(error);
        }
    }
    async findAll(req, res, next) {
        try {
            const demandas = await this.projeto.findAll();
            res.status(200).json(demandas);
        }
        catch (error) {
            next(error);
        }
    }
    async findId(req, res, next) {
        try {
            const { id } = req.params;
            const demanda = await this.projeto.findId(id);
            res.status(200).json(demanda);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ControllerProjeto = ControllerProjeto;
