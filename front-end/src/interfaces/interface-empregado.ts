export interface IDataEmpregado {
  id: string;
  nome: string;
  email: string;
  role: string;
  profissao: string;
  salario: number;
  dataContratacao: string;
}

export interface IEmpregadoAPI {
  id_empregado: string;
  ds_nome: string;
  ds_email: string;
  role: string;
  ds_profissao: string;
  vl_salario: number;
  dt_admissao: string;
}
