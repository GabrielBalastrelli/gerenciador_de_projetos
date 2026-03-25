"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseProjeto = void 0;
const prisma_1 = require("../database/prisma");
class UseProjeto {
    async create(data) {
        console.log(data);
        return await prisma_1.prisma.projeto.create({
            data: {
                ds_nome: data.ds_nome,
                ds_descricao: data.ds_descricao,
                orcamento: data.orcamento,
                dt_inicio: data.dt_inicio,
                dt_fim: data.dt_fim,
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
                dt_inicio: data.dt_inicio,
                dt_fim: data.dt_fim,
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
    async findAll() {
        return await prisma_1.prisma.projeto.findMany();
    }
    async findId(idProjeto) {
        return await prisma_1.prisma.projeto.findUnique({
            where: { id_projeto: idProjeto },
        });
    }
}
exports.UseProjeto = UseProjeto;
