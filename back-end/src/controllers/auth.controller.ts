import { AuthService } from '../services/authService';
import { Request, Response, NextFunction } from 'express';

export class ControllerAuth {
  private authService = new AuthService();

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { ds_password, ds_email } = req.body;

      if (typeof ds_email !== 'string' || typeof ds_password !== 'string') {
        res.status(400).json({ sucess: false, error: 'Parâmetros inválidos' });
        return;
      }

      const login: boolean = await this.authService.login(ds_email, ds_password);

      if (!login) {
        res.status(401).json({ sucess: false, error: 'E-mail ou senha inválidos!' });
        return;
      }

      res.status(200).json({ sucess: 200, message: 'Login realizado com sucesso!' });

      return;
    } catch (error) {
      next(error);
    }
  }
}
