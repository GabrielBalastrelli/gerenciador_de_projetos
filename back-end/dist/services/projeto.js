"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseProjeto = void 0;
const prisma_1 = require("../database/prisma");
class UseProjeto {
    async create(data) {
        return await prisma_1.prisma.projeto.create({
            data: {
                ds_nome: data.ds_nome,
                ds_descricao: data.ds_descricao,
                orcamento: data.orcamento,
                dt_inicio: new Date(data.dt_inicio),
                dt_fim: new Date(data.dt_fim),
            },
        });
    }
    async update(idProjeto, data) {
        return await prisma_1.prisma.projeto.update({
            where: {
                id_projeto: idProjeto,
            },
            data: {
                ds_nome: data.ds_nome,
                ds_descricao: data.ds_descricao,
                orcamento: data.orcamento,
                dt_inicio: new Date(data.dt_inicio),
                dt_fim: new Date(data.dt_fim),
            },
        });
    }
    async delete(idProjeto) {
        await prisma_1.prisma.projeto.delete({
            where: {
                id_projeto: idProjeto,
            },
        });
    }
    async findAll(limit, page) {
        return await prisma_1.prisma.projeto.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });
    }
    async findId(idProjeto) {
        return await prisma_1.prisma.projeto.findUnique({
            where: { id_projeto: idProjeto },
        });
    }
}
exports.UseProjeto = UseProjeto;
