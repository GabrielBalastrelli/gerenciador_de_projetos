import axios from "axios";
import type {
  IDataProjetoParams,
  IFindProjetoResponse,
  IGetProjetoParams,
  IGetProjetoResponse,
  IGetProjetoResponseConvert,
} from "../../interfaces/interface-projeto";

export class Projeto {
  private readonly URL = "http://localhost:3000/projeto";
  private readonly TOKEN = sessionStorage.getItem("userToken");

  async findProjeto(data: IGetProjetoParams): Promise<IFindProjetoResponse> {
    try {
      const res = await axios.get(
        `${this.URL}?page=${data.page}&limit=${data.limit}`,
        {
          headers: {
            Authorization: `Bearer ${this.TOKEN}`,
          },
        },
      );

      return {
        data: res.data.data,
        total: res.data.total,
        page: res.data.page,
        limit: res.data.limit,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message);
      }

      throw new Error("Erro interno 500");
    }
  }

  async postProjeto(
    data: IDataProjetoParams,
  ): Promise<IGetProjetoResponseConvert> {
    try {
      const res = await axios.post(this.URL, data, {
        headers: {
          Authorization: `Bearer ${this.TOKEN}`,
        },
      });

      return this.mapFieldsConvert(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Erro ao criar projeto",
        );
      }

      throw new Error("Erro interno 500");
    }
  }

  async getProjeto(idProjeto: string): Promise<IGetProjetoResponseConvert> {
    try {
      const res = await axios.get(`${this.URL}/${idProjeto}`, {
        headers: {
          Authorization: `Bearer ${this.TOKEN}`,
        },
      });

      return this.mapFieldsConvert(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Erro ao buscar projeto",
        );
      }

      throw new Error("Erro interno 500");
    }
  }

  mapFieldsConvert(data: IGetProjetoResponse): IGetProjetoResponseConvert {
    return {
      idProjeto: data.id_projeto,
      nomeProjeto: data.ds_nome,
      descricao: data.ds_descricao,
      orcamento: data.orcamento,
      dataInicio: data.dt_inicio,
      dataFim: data.dt_fim,
      dataTransacao: data.dt_transacao,
    };
  }
}
