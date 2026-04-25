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
        `${this.URL}id_empregado=${data.id_empregado}&id_projeto=${data.id_projeto}&page=${data.page}&limit=${data.limit}`,
        {
          headers: {
            Authorization: this.TOKEN,
          },
        },
      );

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }
      throw new Error("ERRO DESCONHECIDO");
    }
  }
}

//id_empregado=&id_projeto=page=1&limit=1
//,
