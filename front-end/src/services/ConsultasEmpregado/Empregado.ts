import axios, { AxiosError, isAxiosError } from "axios";
import type {
  IDataEmpregado,
  IEmpregadoAPI,
} from "../../interfaces/interface-empregado";

export class Empregado {
  private readonly URL = `http://localhost:3000/empregado/email/`;

  async findEmpregadoEmail(
    email: string,
    token: string,
  ): Promise<IDataEmpregado> {
    try {
      const res = await axios.get(`${this.URL}${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return this.mapEmpregado(res.data);
    } catch (error) {
      if (isAxiosError(error)) {
        throw new AxiosError(error.message, error.code);
      }
    }
  }

  mapEmpregado(data: IEmpregadoAPI): IDataEmpregado {
    return {
      id: data.id_empregado,
      nome: data.ds_nome,
      email: data.ds_email,
      role: data.role,
      profissao: data.ds_profissao,
      salario: data.vl_salario,
      dataContratacao: data.dt_admissao,
    };
  }
}
