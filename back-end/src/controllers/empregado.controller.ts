import { Request, Response, NextFunction } from 'express';
import { UseEmpregado } from '../services/empregado';
import { validate } from 'deep-email-validator';

export default class ControllerEmpregado {
  private empregado = new UseEmpregado();

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);

      const emailValido = validate(req.body.ds_email);
      if (!emailValido) {
        res.status(400).json({ error: 'E-mail inválido'! });
      }

      const empregado = await this.empregado.create(req.body);
      res.status(201).json(empregado);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      console.log('aaa');
      const { id } = req.params;
      await this.empregado.delete(id);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const empregado = await this.empregado.update(id, req.body);
      res.status(200).json(empregado);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const empregados = await this.empregado.findAll();
      res.status(200).json(empregados);
    } catch (error) {
      next(error);
    }
  }

  async findId(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const empregados = await this.empregado.findById(id);
      if (!empregados) {
        return res.status(401).json({ message: 'Não foi encontrado empregado com id!' });
      }
      res.status(200).json(empregados);
    } catch (error) {
      next(error);
    }
  }

  async findByEmail(req: Request<{ ds_email: string }>, res: Response, next: NextFunction) {
    try {
      const { ds_email } = req.params;

      const empregado = await this.empregado.findByEmail(ds_email);

      res.status(200).json(empregado);
    } catch (error) {
      next(error);
    }
  }

  async deleteAll(req: Request, res: Response, next: NextFunction) {
    try {
      await this.empregado.deleteAll();

      res.status(200).json({ message: 'Todos os empregados foram deletados com sucesso!' });
    } catch (error) {
      next(error);
    }
  }
}
