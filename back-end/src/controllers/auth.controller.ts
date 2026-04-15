import { Empregado } from '@prisma/client';
import { AuthService } from '../services/authService';
import { Request, Response, NextFunction } from 'express';
import { PayloadJwt } from '../interfaces/interfaceAuthService';
import { IInterfaceResponseEmpregado } from '../interfaces/interfaceEmpregadoRes';

declare global {
  namespace Express {
    interface Request {
      empregado?: PayloadJwt;
    }
  }
}

export class ControllerAuth {
  private authService = new AuthService();

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { ds_password, ds_email } = req.body;

      if (typeof ds_email !== 'string' || typeof ds_password !== 'string') {
        res.status(400).json({ sucess: false, error: 'Parâmetros inválidos' });
        return;
      }

      const empregado: Empregado | null = await this.authService.login(ds_email, ds_password);

      if (!empregado) {
        res.status(401).json({ sucess: false, error: 'E-mail ou senha inválidos!' });
        return;
      }

      const token: string = this.authService.gerarToken(
        empregado.id_empregado,
        empregado.ds_email,
        empregado.role,
      );

      const infoEmpregado: IInterfaceResponseEmpregado = {
        nome: empregado.ds_nome,
        role: empregado.role,
        profissao: empregado.ds_profissao,
        email: empregado.ds_email,
        dataContratacao: empregado.dt_admissao,
      };

      res.status(200).json({
        status: 200,
        success: true,
        token,
        infoEmpregado,
        message: 'Login Realizado com Sucesso!',
      });

      return;
    } catch (error) {
      next(error);
    }
  }

  middlewareValidaToken(req: Request, res: Response, next: NextFunction) {
    const auth: string | undefined = req.headers.authorization;
    if (auth === undefined) {
      res.status(401).json({ error: 'Token não enviado!' });
      return;
    }

    const token: string = auth.split(' ')[1];
    try {
      const empregado = this.authService.validarToken(token);

      req.empregado = empregado;

      return next();
    } catch {
      return res.status(401).json({ error: 'Token inválido!' });
    }
  }
}
