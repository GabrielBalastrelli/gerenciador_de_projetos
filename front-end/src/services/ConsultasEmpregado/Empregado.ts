import axios, { AxiosError, isAxiosError } from "axios";

import { useEmpregadoStore } from "../../store/useEmpregadoStore";

import type {
  IDataEmpregado,
  IEmpregadoAPI,
} from "../../interfaces/interface-empregado";

export class Empregado {
  private readonly URL = `http://localhost:3000/empregado/email/`;
  private readonly TOKEN = sessionStorage.getItem("userToken");

  private readonly email: string = useEmpregadoStore((set) => set.email);

  async findEmpregadoEmail(): Promise<IDataEmpregado> {
    try {
      const res = await axios.get(`${this.URL}${this.email}`, {
        headers: {
          Authorization: `Bearer ${this.TOKEN}`,
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
