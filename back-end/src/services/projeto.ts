import { Projeto, Empregado } from '@prisma/client';
import { ProjetoData, IProjetoRepo } from '../interfaces/interfaceProjeto';

import { prisma } from '../database/prisma';

export class UseProjeto implements IProjetoRepo {
  async create(data: ProjetoData | Omit<Projeto, 'id_projeto'>): Promise<Projeto> {
    return await prisma.projeto.create({
      data: {
        ds_nome: data.ds_nome,
        ds_descricao: data.ds_descricao,
        orcamento: data.orcamento,
        dt_inicio: new Date(data.dt_inicio),
        dt_fim: new Date(data.dt_fim),
      },
    });
  }

  async update(idProjeto: string, data: ProjetoData): Promise<Projeto> {
    return await prisma.projeto.update({
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

  async delete(idProjeto: string): Promise<void> {
    await prisma.projeto.delete({
      where: {
        id_projeto: idProjeto,
      },
    });
  }

  async findAll(limit: number, page: number): Promise<Projeto[]> {
    return await prisma.projeto.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findId(idProjeto: string): Promise<Projeto | null> {
    return await prisma.projeto.findUnique({
      where: { id_projeto: idProjeto },
    });
  }
}
