import { Empregado, Projeto } from '@prisma/client';

export type ProjetoData = {
  ds_nome: string;
  ds_descricao: string;
  orcamento: number;
  dt_inicio: Date;
  dt_fim: Date;
};

export interface IProjetoRepo {
  create(data: ProjetoData | Omit<Projeto, 'id_projeto'>): Promise<Projeto>;
  delete(idProjeto: string): Promise<void>;
  update(idProjeto: string, data: ProjetoData): Promise<Projeto>;
  findAll(): Promise<Empregado>;
  findId(idProjeto: string): Promise<Projeto>;
}
