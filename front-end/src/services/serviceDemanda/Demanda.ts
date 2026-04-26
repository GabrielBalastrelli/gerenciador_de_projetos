import axios from "axios";
import type {
  IDataPostDemanda,
  IDataResponse,
  IDataConvertPostResponse,
  IDataMappingFront,
} from "../../interfaces/interface-demanda";

export class Demanda {
  private readonly URL_BASE: string = `http://localhost:3000/demanda`;
  private readonly TOKEN = sessionStorage.getItem("userToken");

  async postDemanda(
    data: IDataConvertPostResponse,
  ): Promise<IDataMappingFront> {
    try {
      const dataPost = this.convertForDataApi(data);
      const res = await axios.post(`${this.URL_BASE}`, dataPost, {
        headers: {
          Authorization: `Bearer ${this.TOKEN}`,
        },
      });

      return this.convertForFrontEndData(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw new Error("Erro desconhecido");
    }
  }

  async findAllDemandas(): Promise<IDataMappingFront[]> {
    try {
      const res = await axios.get(`${this.URL_BASE}`, {
        headers: {
          Authorization: `Bearer ${this.TOKEN}`,
        },
      });

      return res.data.map(this.convertForFrontEndData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw new Error("Erro desconhecido");
    }
  }

  async findIdDemandas(idProjeto: string): Promise<IDataMappingFront[]> {
    try {
      const res = await axios.get(
        `http://localhost:3000/demanda/projeto/${idProjeto}`,
        {
          headers: {
            Authorization: `Bearer ${this.TOKEN}`,
          },
        },
      );

      return res.data.map(this.convertForFrontEndData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }

      throw new Error("Erro desconhecido");
    }
  }

  convertForFrontEndData(data: IDataResponse): IDataMappingFront {
    return {
      idDemanda: data.id_demanda,
      idProjeto: data.id_projeto,
      idEmpregado: data.id_empregado,
      nomeDemanda: data.ds_nome,
      descricao: data.ds_descricao,
      dataInicio: data.dt_inicio,
      dataFim: data.dt_fim,
      dataTransacao: data.dt_transacao,
    };
  }

  convertForDataApi(data: IDataConvertPostResponse): IDataPostDemanda {
    return {
      id_projeto: data.idProjeto,
      id_empregado: data.idEmpregado,
      ds_nome: data.nomeDemanda,
      ds_descricao: data.descricao,
      dt_inicio: new Date(data.dataInicio),
      dt_fim: new Date(data.dataFim),
    };
  }
}
