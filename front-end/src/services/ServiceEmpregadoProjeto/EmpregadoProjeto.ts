import axios from "axios";
import type {
  IDataEmpregadoProjeto,
  IdataEmpregadoProjetoFind,
  IdataEmpregadoProjetoResponseFInd,
  IDataEmpregadoProjetoResponsePost,
} from "../../interfaces/interface-empregado-projeto";

export class EmpregadoProjeto {
  private readonly URL: string = `http://localhost:3000/empregadoProjeto`;

  private readonly TOKEN: string | null = sessionStorage.getItem("userToken");

  async postEmpregadoProjeto(
    data: IDataEmpregadoProjeto,
  ): Promise<IDataEmpregadoProjetoResponsePost> {
    try {
      const res = await axios.post(this.URL, data, {
        headers: {
          Authorization: `Bearer ${this.TOKEN}`,
        },
      });

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }
      throw new Error("ERRO DESCONHECIDO");
    }
  }

  async findEmpregadoProjeto(
    data: IdataEmpregadoProjetoFind,
  ): Promise<IdataEmpregadoProjetoResponseFInd> {
    try {
      const res = await axios.get(
        `http://localhost:3000/empregadoProjeto?page=${data.page}&limit=${data.limit}`,
        {
          headers: {
            Authorization: `Bearer ${this.TOKEN}`,
          },
        },
      );

      return {
        data: res.data.data.map((item: any) => ({
          id: item.id,
          idEmpregado: item.id_empregado,
          idProjeto: item.id_projeto,
        })),
        paginacao: res.data.paginacao,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }

      throw new Error("ERRO DESCONHECIDO");
    }
  }

  async deleteEmpregado(id: string): Promise<void> {
    try {
      await axios.delete(`${this.URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${this.TOKEN}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }

      throw new Error("ERRO DESCONHECIDO");
    }
  }
}
