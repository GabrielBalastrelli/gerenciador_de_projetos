import { AuthService } from '../services/authService';
import { Request, Response, NextFunction } from 'express';

export class ControllerAuth {
  private authService = new AuthService();

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { ds_password, ds_email } = req.body;

      if (typeof ds_email !== 'string' || typeof ds_password !== 'string') {
        return res.status(400).json({ error: 'Parâmetros inválidos' });
      }

      const login: boolean = await this.authService.login(ds_email, ds_password);

      if (!login) {
        return res.status(401).json({ error: 'E-mail ou senha inválidos!' });
      }

      return res.status(200).json({ error: 'Login realizado com sucesso!' });
    } catch (error) {
      next(error);
    }
  }
}
