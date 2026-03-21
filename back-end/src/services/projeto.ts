import { Projeto, PrismaClient } from '@prisma/client';
import { ProjetoData, IProjetoRepo } from '../interfaces/interfaceProjeto';

const prisma = new PrismaClient();

export class useProjeto implements IProjetoRepo {
  async create(data: ProjetoData | Omit<Projeto, 'id_projeto'>): Promise<Projeto> {
    return await prisma.projeto.create({
      data: {
        ds_nome: data.ds_nome,
        ds_descricao: data.ds_descricao,
        orcamento: data.orcamento,
        dt_inicio: data.dt_inicio,
        dt_fim: data.dt_fim,
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
        dt_inicio: data.dt_inicio,
        dt_fim: data.dt_fim,
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
}
