import { Empregado } from '@prisma/client';

export type EmpregadoData = {
  ds_nome: string;
  ds_email: string;
  dt_nascimento: Date;
  ds_profissao: string;
  vl_salario: number;
  dt_admissao: Date;
  id_projeto: string;
};

export interface IEmpregadoRepo {
  findAll(): Promise<Empregado[]>;
  findById(empregadoId: string): Promise<Empregado | null>;
  create(data: EmpregadoData | Omit<Empregado, 'id_empregado'>): Promise<Empregado>;
  update(empregadoId: string, data: Partial<Empregado>): Promise<Empregado>;
  delete(empregadoId: string): void;
}
