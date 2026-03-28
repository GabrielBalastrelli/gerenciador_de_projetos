import { AuthService } from '../services/authService';
import { Request, Response, NextFunction } from 'express';

export class ControllerAuth {
  private authService = new AuthService();

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { ds_password, ds_email } = req.body;

      if (typeof ds_email !== 'string' || typeof ds_password !== 'string') {
        res.status(400).json({ error: 'Parâmetros inválidos' });
        return false;
      }

      const login: boolean = await this.authService.login(ds_email, ds_password);

      if (!login) {
        res.status(401).json({ error: 'E-mail ou senha inválidos!' });
        return false;
      }

      res.status(200).json({ message: 'Login realizado com sucesso!' });

      return true;
    } catch (error) {
      next(error);
    }
  }
}
