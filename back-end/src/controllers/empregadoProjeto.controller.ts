import { UseEmpregadoProjeto } from '../../src/services/empregadoProjeto';
import { Request, Response, NextFunction } from 'express';
import { schemaPaginacao } from '../schema/schemaPaginacao';

export class ControllerEmpregadoProjeto {
  private readonly useEmpregadoProjeto = new UseEmpregadoProjeto();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const empregadoProjeto = await this.useEmpregadoProjeto.create(req.body);

      return res.status(201).json(empregadoProjeto);
    } catch (error) {
      next(error);
    }
  };

  async delete(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.useEmpregadoProjeto.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const projeto = await this.useEmpregadoProjeto.update(id, req.body);
      res.status(200).json(projeto);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = schemaPaginacao.parse({
        page: Number(req.query.page),
        limit: Number(req.query.limit),
      });

      const demandas = await this.useEmpregadoProjeto.findAll(page, limit);

      const paginacao = {
        page,
        limit,
      };

      return res.status(200).json({ data: demandas, paginacao });
    } catch (error) {
      next(error);
    }
  }

  async findId(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const demanda = await this.useEmpregadoProjeto.findId(id);
      res.status(200).json(demanda);
    } catch (error) {
      next(error);
    }
  }
}
