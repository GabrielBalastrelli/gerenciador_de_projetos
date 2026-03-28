import { IAuthService } from '../interfaces/interfaceAuthService';
import { UseEmpregado } from './empregado';
import { GestaoSenha } from '../services/gestaoSenhas';

export class AuthService implements IAuthService {
  private Empregado = new UseEmpregado();
  private GestaoSenhas = new GestaoSenha();

  async login(senhaLogin: string, email: string): Promise<boolean> {
    const empregado = await this.Empregado.findByEmail(email);

    if (empregado === null) return false;

    const senhaEmpregado = empregado.ds_password;

    return await this.GestaoSenhas.compararSenha(senhaEmpregado, senhaLogin);
  }
}
