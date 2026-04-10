import { Request, Response, NextFunction } from 'express';
import { UseProjeto } from '../services/projeto';
import { schemaPaginacao } from '../schema/schemaPaginacao';

export class ControllerProjeto {
  private projeto = new UseProjeto();

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const projeto = await this.projeto.create(req.body);
      return res.status(201).json(projeto);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.projeto.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const projeto = await this.projeto.update(id, req.body);
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

      const demandas = await this.projeto.findAll(limit, page);

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
      const demanda = await this.projeto.findId(id);
      res.status(200).json(demanda);
    } catch (error) {
      next(error);
    }
  }
}
