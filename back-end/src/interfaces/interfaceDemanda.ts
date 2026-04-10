import { Demanda } from '@prisma/client';

export type DemandaData = {
  id_projeto: string;
  id_empregado: string;
  ds_nome: string;
  ds_descricao: string;
  dt_inicio: Date;
  dt_fim: Date;
};

export interface IDemandaRepo {
  create(data: DemandaData | Omit<Demanda, 'id_demanda'>): Promise<Demanda>;
  update(idDemanda: string, data: Partial<DemandaData>): Promise<Demanda>;
  delete(idDemanda: string): Promise<void>;
  findAll(page: number, limit: number): Promise<Demanda[]>;
  findId(idDemanda: string): Promise<Demanda | null>;
}
