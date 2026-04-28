"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseEmpregadoProjeto = void 0;
const prisma_1 = require("../database/prisma");
class UseEmpregadoProjeto {
    async create(data) {
        return await prisma_1.prisma.empregadoProjeto.create({
            data: { id_empregado: data.id_empregado, id_projeto: data.id_projeto },
        });
    }
    async update(id, data) {
        return await prisma_1.prisma.empregadoProjeto.update({
            where: { id: id },
            data: {
                id_empregado: data.id_empregado,
                id_projeto: data.id_projeto,
            },
        });
    }
    async delete(id) {
        await prisma_1.prisma.empregadoProjeto.delete({
            where: { id: id },
        });
    }
    async findAll(data, page, limit) {
        return await prisma_1.prisma.empregadoProjeto.findMany({
            where: {
                id_empregado: data.id_empregado,
                id_projeto: data.id_projeto,
            },
            skip: (page - 1) * limit,
            take: limit,
        });
    }
    async findId(id) {
        return await prisma_1.prisma.empregadoProjeto.findUnique({
            where: { id: id },
        });
    }
}
exports.UseEmpregadoProjeto = UseEmpregadoProjeto;
