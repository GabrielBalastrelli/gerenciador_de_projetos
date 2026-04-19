import type { IDataEmpregado } from "./interface-empregado";

export interface IAuthValidation {
  status: number;
  sucess: boolean;
  token: string;
  message: string;
  infoEmpregado: IDataEmpregado;
}
