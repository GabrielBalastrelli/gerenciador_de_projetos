import { Empregado } from '@prisma/client';
import { IEmpregadoRepo, EmpregadoData } from '../interfaces/interfaceEmpregado';

import { prisma } from '../database/prisma';

export class UseEmpregado implements IEmpregadoRepo {
  async create(data: EmpregadoData | Omit<Empregado, 'id_empregado'>): Promise<Empregado> {
    return await prisma.empregado.create({
      data: {
        ds_nome: data.ds_nome,
        ds_email: data.ds_email,
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

  async findAll(): Promise<Empregado[]> {
    return await prisma.empregado.findMany();
  }

  async findById(empregadoId: string): Promise<Empregado | null> {
    return await prisma.empregado.findUnique({
      where: { id_empregado: empregadoId },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.empregado.delete({
      where: {
        id_empregado: id,
      },
    });
  }

  async update(id: string, data: Partial<Empregado>): Promise<Empregado> {
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
}
