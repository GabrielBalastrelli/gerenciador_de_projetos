import { Empregado } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

export interface PayloadJwt extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

export interface IAuthService {
  login(senhaLogin: string, email: string): Promise<Empregado | null>;
  gerarToken(id: string, email: string, role: string): string;
  validarToken(token: string): PayloadJwt;
}
