import { Request, Response, NextFunction } from 'express';
import { UseEmpregado } from '../services/empregado';
import { validate } from 'deep-email-validator';
import { validarSenha } from '../utils/validadorSenha';
import { validarCpf } from '../utils/validadorCPF';
import { schemaCriarEmpregado } from '../schema/shemaEmpregado';

export default class ControllerEmpregado {
  private empregado = new UseEmpregado();

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const email: string = req.body.ds_email;
      const senha: string = req.body.ds_password;
      const cpf: string = req.body.ds_cpf;

      const dadosValidos = schemaCriarEmpregado.safeParse(req.body);

      if (!dadosValidos.success) {
        return res.status(400).json({ errors: dadosValidos.error.issues });
      }

      const emailValido = await validate({
        email: email,
        validateSMTP: false,
      });

      if (!validarCpf(cpf)) {
        res.status(400).json({ error: 'cpf_invalid', message: 'CPF inválido!' });
        return;
      }

      if (!emailValido.valid) {
        res.status(400).json({ error: 'invalid_email'!, message: 'E-mail inválido!' });
        return;
      }

      if (!validarSenha(senha)) {
        res.status(400).json({
          error: 'weak_password',
          message: 'A senha não atende aos requisitos de segurança.',
        });
        return;
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
      const empregado = await this.empregado.findById(id);
      if (!empregado) {
        return res.status(401).json({ message: 'Não foi encontrado empregado com id!' });
      }
      res.status(200).json(empregado);
    } catch (error) {
      next(error);
    }
  }

  async findByEmail(req: Request<{ ds_email: string }>, res: Response, next: NextFunction) {
    try {
      const { ds_email } = req.params;

      const empregado = await this.empregado.findByEmail(ds_email);

      if (!empregado) {
        res.status(401).json({ message: 'Não foi encontrado empregado com esse e-mail.' });
      }

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
