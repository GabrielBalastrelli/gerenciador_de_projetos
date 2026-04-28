import axios from "axios";

import { useEmpregadoStore } from "../../store/useEmpregadoStore";

import type {
  IDataEmpregado,
  IDataEmpregadoForm,
  IDataPostApi,
  IEmpregadoAPI,
} from "../../interfaces/interface-empregado";

export class Empregado {
  private readonly URL_BASE = import.meta.env.VITE_API_URL;
  private readonly TOKEN = sessionStorage.getItem("userToken");

  private readonly email: string = useEmpregadoStore((set) => set.email);

  async findEmpregadoEmail(email: string): Promise<IDataEmpregado> {
    try {
      const res = await axios.get(
        `${this.URL_BASE}/email/${this.email ?? email}`,
        {
          headers: {
            Authorization: `Bearer ${this.TOKEN}`,
          },
        },
      );
      return this.mapEmpregado(res?.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw new Error("Erro desconhecido");
    }
  }

  async findEmpregadoId(id: string): Promise<IDataEmpregado> {
    try {
      const res = await axios.get(`${this.URL_BASE}/${id}`, {
        headers: {
          Authorization: `Bearer ${this.TOKEN}`,
        },
      });

      return this.mapEmpregado(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw new Error("Erro desconhecido");
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

  mapEmpregadoPostApi(data: IDataEmpregadoForm): IDataPostApi {
    return {
      ds_nome: data.nome,
      dt_nascimento: new Date(data.dataNascimento),
      ds_profissao: data.profissao,
      ds_email: data.email,
      vl_salario: data.salario,
      dt_admissao: new Date(data.dataAdmissao),
      ds_password: data.password,
      role: data.role,
      ds_cpf: data.cpf,
    };
  }

  async postEmpregado(data: IDataEmpregadoForm): Promise<IDataEmpregado> {
    const dataPost: IDataPostApi = this.mapEmpregadoPostApi(data);
    try {
      const res = await axios.post(this.URL_BASE, dataPost);

      return this.mapEmpregado(res?.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw new Error("Erro desconhecido");
    }
  }

  async findAllEmpregados(): Promise<IDataEmpregado[]> {
    try {
      const res = await axios.get(`${this.URL_BASE}/?page=1&limit=10`, {
        headers: {
          Authorization: `Bearer ${this.TOKEN}`,
        },
      });

      return res.data.data.map(this.mapEmpregado);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Erro ao buscar empregados",
        );
      }

      throw new Error("Erro desconhecido");
    }
  }
}
