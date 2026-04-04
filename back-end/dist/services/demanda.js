"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseDemanda = void 0;
const prisma_1 = require("../database/prisma");
class UseDemanda {
    async create(data) {
        return await prisma_1.prisma.demanda.create({
            data: {
                id_projeto: data.id_projeto,
                id_empregado: data.id_empregado,
                ds_nome: data.ds_nome,
                ds_descricao: data.ds_descricao,
                dt_inicio: data.dt_inicio,
                dt_fim: data.dt_fim,
            },
        });
    }
    async update(idDemanda, data) {
        return await prisma_1.prisma.demanda.update({
            where: { id_demanda: idDemanda },
            data: {
                id_projeto: data.id_projeto,
                id_empregado: data.id_empregado,
                ds_nome: data.ds_nome,
                ds_descricao: data.ds_descricao,
                dt_inicio: data.dt_inicio,
                dt_fim: data.dt_fim,
            },
        });
    }
    async delete(idDemanda) {
        await prisma_1.prisma.demanda.delete({
            where: { id_demanda: idDemanda },
        });
    }
    async findAll() {
        return await prisma_1.prisma.demanda.findMany();
    }
    async findId(idDemanda) {
        return await prisma_1.prisma.demanda.findUnique({
            where: { id_demanda: idDemanda },
        });
    }
}
exports.UseDemanda = UseDemanda;
