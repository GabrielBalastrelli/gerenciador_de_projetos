import { Demanda } from '@prisma/client';
import { DemandaData, IDemandaRepo } from '../interfaces/interfaceDemanda';
import { prisma } from '../database/prisma';

export class UseDemanda implements IDemandaRepo {
  async create(data: DemandaData | Omit<Demanda, 'id_demanda'>): Promise<Demanda> {
    return await prisma.demanda.create({
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

  async update(idDemanda: string, data: Partial<DemandaData>): Promise<Demanda> {
    return await prisma.demanda.update({
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

  async delete(idDemanda: string): Promise<void> {
    await prisma.demanda.delete({
      where: { id_demanda: idDemanda },
    });
  }

  async findAll(): Promise<Demanda[]> {
    return await prisma.demanda.findMany();
  }

  async findId(idDemanda: string): Promise<Demanda | null> {
    return await prisma.demanda.findUnique({
      where: { id_demanda: idDemanda },
    });
  }
}
