"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const demanda_1 = require("../services/demanda");
class ControllerDemanda {
    constructor() {
        this.demandaService = new demanda_1.UseDemanda();
    }
    async create(req, res, next) {
        try {
            const demanda = await this.demandaService.create(req.body);
            res.status(201).json(demanda);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await this.demandaService.delete(id);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const demanda = await this.demandaService.update(id, req.body);
            res.status(200).json(demanda);
        }
        catch (error) {
            next(error);
        }
    }
    async findAll(req, res, next) {
        try {
            const demandas = await this.demandaService.findAll();
            res.status(200).json(demandas);
        }
        catch (error) {
            next(error);
        }
    }
    async findId(req, res, next) {
        try {
            const { id } = req.params;
            const demanda = await this.demandaService.findId(id);
            if (!demanda) {
                return res.status(404).json({ message: 'Demanda não encontrada' });
            }
            res.status(200).json(demanda);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = ControllerDemanda;
