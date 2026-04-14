import axios, { AxiosError, isAxiosError } from "axios";
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
    if (isAxiosError(error)) {
      throw new AxiosError(error.response.data, error.code);
    }

    throw new Error("Erro interno 500");
  }
}
