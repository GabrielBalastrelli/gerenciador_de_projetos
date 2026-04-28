import { IAuthService, PayloadJwt } from '../interfaces/interfaceAuthService';
import { UseEmpregado } from './empregado';
import { GestaoSenha } from '../services/gestaoSenhas';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
import { Empregado } from '@prisma/client';

export class AuthService implements IAuthService {
  private readonly Empregado = new UseEmpregado();
  private readonly GestaoSenhas = new GestaoSenha();
  private readonly privateKey: string = process.env.PRIVATE_KEY as string;

  validarToken(token: string): PayloadJwt {
    try {
      return jwt.verify(token, this.privateKey) as PayloadJwt;
    } catch (error) {
      throw new Error('Token Inválido!');
    }
  }

  gerarToken(id: string, email: string, role: string): string {
    return jwt.sign({ id, email, role }, this.privateKey, {
      expiresIn: '2h',
    });
  }

  async login(email: string, senhaLogin: string): Promise<Empregado | null> {
    const empregado = await this.Empregado.findByEmail(email);

    if (empregado === null) return null;

    const senhaEmpregado = empregado.ds_password;

    const valido = await this.GestaoSenhas.compararSenha(senhaEmpregado, senhaLogin);

    return valido === true ? empregado : null;
  }
}
