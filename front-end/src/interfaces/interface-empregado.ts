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

export interface IDataPostApi {
  ds_nome: string;
  dt_nascimento: Date;
  ds_profissao: string;
  ds_email: string;
  vl_salario: number;
  dt_admissao: Date;
  ds_password: string;
  role: string;
  ds_cpf: string;
}

export interface IDataEmpregadoForm {
  nome: string;
  email: string;
  cpf: string;
  profissao: string;
  salario: number;
  role: string;
  password: string;
  dataNascimento: string;
  dataAdmissao: string;
}
