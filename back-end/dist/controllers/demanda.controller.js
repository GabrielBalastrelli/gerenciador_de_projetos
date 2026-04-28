"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const demanda_1 = require("../services/demanda");
const schemaPaginacao_1 = require("../schema/schemaPaginacao");
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
            const { page, limit } = schemaPaginacao_1.schemaPaginacao.parse({
                page: Number(req.query.page),
                limit: Number(req.query.limit),
            });
            const demandas = await this.demandaService.findAll(page, limit);
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
    async findIProjeto(req, res, next) {
        try {
            const { idProjeto } = req.params;
            const demandas = await this.demandaService.findIProjeto(idProjeto);
            if (!demandas || demandas.length === 0) {
                return res.status(404).json({
                    message: 'Nenhuma demanda encontrada para este projeto',
                });
            }
            res.status(200).json(demandas);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = ControllerDemanda;
