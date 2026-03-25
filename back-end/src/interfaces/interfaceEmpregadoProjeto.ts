import { EmpregadoProjeto } from '@prisma/client';

export type EmpregadoProjetoData = {
  id_empregado: String;
  id_projeto: String;
};

export interface IEmpregadoProjetoRepo {
  create(data: EmpregadoProjetoData | Omit<EmpregadoProjeto, 'id'>): Promise<EmpregadoProjeto>;
  update(data: EmpregadoProjetoData | Partial<EmpregadoProjeto>): Promise<EmpregadoProjeto>;
  delete(id: string): Promise<void>;
  findAll(): Promise<EmpregadoProjeto[]>;
  findId(id: string): Promise<EmpregadoProjeto | null>;
}
