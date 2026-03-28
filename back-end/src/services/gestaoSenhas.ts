import bcrypt from 'bcrypt';
import { IGestaoSenha } from '../interfaces/interfaceGestaoSenha';

export class GestaoSenha implements IGestaoSenha {
  async criptografarSenha(senha: string): Promise<string> {
    const salt = 10;

    const hash = await bcrypt.hash(senha, salt);

    return hash;
  }

  async compararSenha(senha: string, senhaLogin: string): Promise<boolean> {
    return await bcrypt.compare(senha, senhaLogin);
  }
}
