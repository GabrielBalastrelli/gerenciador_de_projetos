import { Empregado } from '@prisma/client';

export type EmpregadoData = {
  ds_nome: string;
  ds_email: string;
  dt_nascimento: Date;
  ds_profissao: string;
  vl_salario: number;
  dt_admissao: Date;
  role: string;
  ds_password: string;
  ds_cpf: string;
};

export interface IEmpregadoRepo {
  findAll(): Promise<Empregado[]>;
  findById(id: string): Promise<Empregado | null>;
  findByEmail(email: string): Promise<Empregado | null>;
  create(data: EmpregadoData | Omit<Empregado, 'id_empregado'>): Promise<Empregado>;
  update(id: string, data: Partial<EmpregadoData>): Promise<Empregado>;
  delete(id: string): Promise<void>;
}
