import { EmpregadoProjeto } from '@prisma/client';

export type EmpregadoProjetoData = {
  id_empregado: string;
  id_projeto: string;
};

export interface IEmpregadoProjetoRepo {
  create(data: EmpregadoProjetoData | Omit<EmpregadoProjeto, 'id'>): Promise<EmpregadoProjeto>;
  update(
    id: string,
    data: EmpregadoProjetoData | Partial<EmpregadoProjeto>,
  ): Promise<EmpregadoProjeto>;
  delete(id: string): Promise<void>;
  findAll(): Promise<EmpregadoProjeto[]>;
  findId(id: string): Promise<EmpregadoProjeto | null>;
}
