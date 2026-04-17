export interface IDataEmpregado {
  nome: string;
  role: string;
  profissao: string;
  email: string;
  dataContratacao: string;
}

export interface IAuthValidation {
  status: number;
  sucess: boolean;
  token: string;
  message: string;
  infoEmpregado: IDataEmpregado;
}
