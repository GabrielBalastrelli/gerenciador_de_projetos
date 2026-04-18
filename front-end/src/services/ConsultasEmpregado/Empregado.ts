import axios, { AxiosError, isAxiosError } from "axios";
import type { IDataEmpregado } from "../../interfaces/interface-empregado";

export class Empregado {
  private readonly URL = `http://localhost:3000/empregado`;

  async findEmpregadoEmail(
    email: string,
    token: string,
  ): Promise<IDataEmpregado> {
    try {
      console.log(email);
      const res = await axios.get(
        `${this.URL}?ds_email=${email}?page=1&limit=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new AxiosError(error.message, error.code);
      }
    }
  }
}
