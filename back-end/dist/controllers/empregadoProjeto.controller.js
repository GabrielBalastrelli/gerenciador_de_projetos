"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerEmpregadoProjeto = void 0;
const empregadoProjeto_1 = require("../services/empregadoProjeto");
const schemaPaginacao_1 = require("../schema/schemaPaginacao");
const schemaEmpregadoProjeto_1 = require("../schema/schemaEmpregadoProjeto");
class ControllerEmpregadoProjeto {
    constructor() {
        this.useEmpregadoProjeto = new empregadoProjeto_1.UseEmpregadoProjeto();
        this.create = async (req, res, next) => {
            try {
                const empregadoProjeto = await this.useEmpregadoProjeto.create(req.body);
                return res.status(201).json(empregadoProjeto);
            }
            catch (error) {
                next(error);
            }
        };
    }
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await this.useEmpregadoProjeto.delete(id);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const projeto = await this.useEmpregadoProjeto.update(id, req.body);
            res.status(200).json(projeto);
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
            const { id_empregado, id_projeto } = schemaEmpregadoProjeto_1.schemaEmpregadoProjeto.parse({
                id_empregado: req.query.id_empregado,
                id_projeto: req.query.id_projeto,
            });
            const data = { id_empregado, id_projeto };
            const demandas = await this.useEmpregadoProjeto.findAll(data, page, limit);
            const paginacao = {
                page,
                limit,
            };
            return res.status(200).json({ data: demandas, paginacao });
        }
        catch (error) {
            next(error);
        }
    }
    async findId(req, res, next) {
        try {
            const { id } = req.params;
            const demanda = await this.useEmpregadoProjeto.findId(id);
            res.status(200).json(demanda);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ControllerEmpregadoProjeto = ControllerEmpregadoProjeto;
