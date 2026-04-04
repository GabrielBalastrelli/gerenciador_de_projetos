import { prisma } from '../database/prisma';
import {
  IEmpregadoProjetoRepo,
  EmpregadoProjetoData,
} from '../interfaces/interfaceEmpregadoProjeto';
import { EmpregadoProjeto } from '@prisma/client';

export class UseEmpregadoProjeto implements IEmpregadoProjetoRepo {
  async create(
    data: EmpregadoProjetoData | Omit<EmpregadoProjeto, 'id'>,
  ): Promise<EmpregadoProjeto> {
    return await prisma.empregadoProjeto.create({
      data: { id_empregado: data.id_empregado, id_projeto: data.id_projeto },
    });
  }

  async update(
    id: string,
    data: EmpregadoProjetoData | Partial<EmpregadoProjeto>,
  ): Promise<EmpregadoProjeto> {
    return await prisma.empregadoProjeto.update({
      where: { id: id },

      data: {
        id_empregado: data.id_empregado,
        id_projeto: data.id_projeto,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.empregadoProjeto.delete({
      where: { id: id },
    });
  }

  async findAll(): Promise<EmpregadoProjeto[]> {
    return await prisma.empregadoProjeto.findMany();
  }

  async findId(id: string): Promise<EmpregadoProjeto | null> {
    return await prisma.empregadoProjeto.findUnique({
      where: { id: id },
    });
  }
}
