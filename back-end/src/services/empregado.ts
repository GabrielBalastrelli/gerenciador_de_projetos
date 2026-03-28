import { Empregado } from '@prisma/client';
import { IEmpregadoRepo, EmpregadoData } from '../interfaces/interfaceEmpregado';
import { GestaoSenha } from '../services/gestaoSenhas';
import { prisma } from '../database/prisma';

export class UseEmpregado implements IEmpregadoRepo {
  private Senha = new GestaoSenha();

  async create(data: EmpregadoData | Omit<Empregado, 'id_empregado'>): Promise<Empregado> {
    return await prisma.empregado.create({
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

  async findAll(): Promise<Empregado[]> {
    return await prisma.empregado.findMany();
  }

  async findById(id: string): Promise<Empregado | null> {
    return await prisma.empregado.findUnique({
      where: { id_empregado: id },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.empregado.delete({
      where: {
        id_empregado: id,
      },
    });
  }

  async update(id: string, data: Partial<EmpregadoData>): Promise<Empregado> {
    return await prisma.empregado.update({
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

  async findByEmail(email: string): Promise<Empregado | null> {
    return await prisma.empregado.findUnique({
      where: { ds_email: email },
    });
  }

  async deleteAll(): Promise<void> {
    await prisma.empregado.deleteMany();
  }
}
