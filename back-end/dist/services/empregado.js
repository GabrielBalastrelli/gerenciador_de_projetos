"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseEmpregado = void 0;
const prisma_1 = require("../database/prisma");
class UseEmpregado {
    async create(data) {
        return await prisma_1.prisma.empregado.create({
            data: {
                ds_nome: data.ds_nome,
                ds_email: data.ds_email,
                dt_nascimento: data.dt_nascimento,
                ds_profissao: data.ds_profissao,
                vl_salario: data.vl_salario,
                dt_admissao: data.dt_admissao,
            },
        });
    }
    async findAll() {
        return await prisma_1.prisma.empregado.findMany();
    }
    async findById(empregadoId) {
        return await prisma_1.prisma.empregado.findUnique({
            where: { id_empregado: empregadoId },
        });
    }
    async delete(id) {
        await prisma_1.prisma.empregado.delete({
            where: {
                id_empregado: id,
            },
        });
    }
    async update(id, data) {
        return await prisma_1.prisma.empregado.update({
            where: { id_empregado: id },
            data: {
                ds_nome: data.ds_nome,
                dt_nascimento: data.dt_nascimento,
                ds_profissao: data.ds_profissao,
                vl_salario: data.vl_salario,
                dt_admissao: data.dt_admissao,
                id_projeto: data.id_projeto,
            },
        });
    }
}
exports.UseEmpregado = UseEmpregado;
