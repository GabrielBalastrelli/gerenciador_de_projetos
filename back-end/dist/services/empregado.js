"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseEmpregado = void 0;
const gestaoSenhas_1 = require("../services/gestaoSenhas");
const prisma_1 = require("../database/prisma");
class UseEmpregado {
    constructor() {
        this.Senha = new gestaoSenhas_1.GestaoSenha();
    }
    async create(data) {
        return await prisma_1.prisma.empregado.create({
            data: {
                ds_nome: data.ds_nome,
                ds_email: data.ds_email,
                dt_nascimento: new Date(data.dt_nascimento),
                ds_profissao: data.ds_profissao,
                vl_salario: data.vl_salario,
                dt_admissao: new Date(data.dt_admissao),
                ds_password: await this.Senha.criptografarSenha(data.ds_password),
                role: data.role,
                ds_cpf: data.ds_cpf,
            },
        });
    }
    async findAll() {
        return await prisma_1.prisma.empregado.findMany();
    }
    async findById(id) {
        return await prisma_1.prisma.empregado.findUnique({
            where: { id_empregado: id },
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
                ds_password: data.ds_password,
                role: data.role,
                ds_cpf: data.ds_cpf,
            },
        });
    }
    async findByEmail(email) {
        return await prisma_1.prisma.empregado.findUnique({
            where: { ds_email: email },
        });
    }
    async deleteAll() {
        await prisma_1.prisma.empregado.deleteMany();
    }
}
exports.UseEmpregado = UseEmpregado;
