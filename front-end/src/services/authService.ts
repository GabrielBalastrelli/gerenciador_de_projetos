import axios from "axios";
import type { IAuthValidation } from "../interfaces/interface-auth-validation";

export async function authLogin(
  email: string,
  password: string,
): Promise<IAuthValidation> {
  const URL: string = `http://localhost:3000/auth`;

  try {
    const req = await axios.post(URL, {
      ds_email: email,
      ds_password: password,
    });

    return req.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || error.message);
    }

    throw new Error("Erro desconhecido");
  }
}
