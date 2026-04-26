import { Request, Response, NextFunction } from 'express';
import { UseDemanda } from '../services/demanda';
import { schemaPaginacao } from '../schema/schemaPaginacao';

export default class ControllerDemanda {
  private demandaService = new UseDemanda();

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const demanda = await this.demandaService.create(req.body);
      res.status(201).json(demanda);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.demandaService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const demanda = await this.demandaService.update(id, req.body);
      res.status(200).json(demanda);
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

      const demandas = await this.demandaService.findAll(page, limit);
      res.status(200).json(demandas);
    } catch (error) {
      next(error);
    }
  }

  async findId(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const demanda = await this.demandaService.findId(id);

      if (!demanda) {
        return res.status(404).json({ message: 'Demanda não encontrada' });
      }

      res.status(200).json(demanda);
    } catch (error) {
      next(error);
    }
  }

  async findIProjeto(req: Request<{ idProjeto: string }>, res: Response, next: NextFunction) {
    try {
      const { idProjeto } = req.params;

      const demandas = await this.demandaService.findIProjeto(idProjeto);

      if (!demandas || demandas.length === 0) {
        return res.status(404).json({
          message: 'Nenhuma demanda encontrada para este projeto',
        });
      }

      res.status(200).json(demandas);
    } catch (error) {
      next(error);
    }
  }
}
