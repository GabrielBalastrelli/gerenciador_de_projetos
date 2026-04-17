import axios, { AxiosError, isAxiosError } from "axios";
import type {
  IGetProjetoParams,
  IGetProjetoResponse,
} from "../../interfaces/interface-get-projeto";

export class Projeto {
  private readonly URL = `http://localhost:3000/projeto/`;

  async getProjeto(data: IGetProjetoParams): Promise<IGetProjetoResponse[]> {
    try {
      const res = await axios.get(
        `${this.URL}?page=${data.page}&limit=${data.limit}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        },
      );

      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new AxiosError(error.response.data, error.code);
      }

      throw new Error("Erro interno 500");
    }
  }
}
