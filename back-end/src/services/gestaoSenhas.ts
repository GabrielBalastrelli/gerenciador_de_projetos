import bcrypt from 'bcrypt';
import { IGestaoSenha } from '../interfaces/interfaceGestaoSenha';

export class GestaoSenha implements IGestaoSenha {
  async criptografarSenha(password: string): Promise<string> {
    const salt = 10;

    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  async compararSenha(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
