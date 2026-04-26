// tests/controllerDemanda.spec.ts

import { Request, Response, NextFunction } from 'express';
import ControllerDemanda from '../controllers/demanda.controller';
import { UseDemanda } from '../services/demanda';
import { schemaPaginacao } from '../schema/schemaPaginacao';

jest.mock('../src/services/demanda');
jest.mock('../src/schema/schemaPaginacao', () => ({
  schemaPaginacao: {
    parse: jest.fn(),
  },
}));

describe('ControllerDemanda', () => {
  let controller: ControllerDemanda;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    controller = new ControllerDemanda();

    req = {
      body: {},
      params: {},
      query: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    next = jest.fn();

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar demanda e retornar 201', async () => {
      const mockDemanda = { id: '1', titulo: 'Nova demanda' };

      (UseDemanda.prototype.create as jest.Mock).mockResolvedValue(mockDemanda);

      req.body = { titulo: 'Nova demanda' };

      await controller.create(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockDemanda);
    });

    it('deve chamar next em caso de erro', async () => {
      const error = new Error('Erro');

      (UseDemanda.prototype.create as jest.Mock).mockRejectedValue(error);

      await controller.create(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('delete', () => {
    it('deve deletar demanda e retornar 204', async () => {
      req.params = { id: '1' };

      (UseDemanda.prototype.delete as jest.Mock).mockResolvedValue(undefined);

      await controller.delete(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('deve atualizar demanda e retornar 200', async () => {
      const mockDemanda = { id: '1', titulo: 'Atualizada' };

      req.params = { id: '1' };
      req.body = { titulo: 'Atualizada' };

      (UseDemanda.prototype.update as jest.Mock).mockResolvedValue(mockDemanda);

      await controller.update(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockDemanda);
    });
  });

  describe('findAll', () => {
    it('deve listar demandas paginadas', async () => {
      const mockList = [{ id: '1' }, { id: '2' }];

      req.query = {
        page: '1',
        limit: '10',
      };

      (schemaPaginacao.parse as jest.Mock).mockReturnValue({
        page: 1,
        limit: 10,
      });

      (UseDemanda.prototype.findAll as jest.Mock).mockResolvedValue(mockList);

      await controller.findAll(req as Request, res as Response, next);

      expect(schemaPaginacao.parse).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
      });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockList);
    });
  });

  describe('findId', () => {
    it('deve retornar demanda por id', async () => {
      const mockDemanda = { id: '1' };

      req.params = { id: '1' };

      (UseDemanda.prototype.findId as jest.Mock).mockResolvedValue(mockDemanda);

      await controller.findId(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockDemanda);
    });

    it('deve retornar 404 se não encontrar', async () => {
      req.params = { id: '1' };

      (UseDemanda.prototype.findId as jest.Mock).mockResolvedValue(null);

      await controller.findId(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Demanda não encontrada',
      });
    });
  });

  describe('findIProjeto', () => {
    it('deve retornar demandas do projeto', async () => {
      const mockList = [{ id: '1' }];

      req.params = { idProjeto: '10' };

      (UseDemanda.prototype.findIProjeto as jest.Mock).mockResolvedValue(mockList);

      await controller.findIProjeto(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockList);
    });

    it('deve retornar 404 se projeto não tiver demandas', async () => {
      req.params = { idProjeto: '10' };

      (UseDemanda.prototype.findIProjeto as jest.Mock).mockResolvedValue([]);

      await controller.findIProjeto(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Nenhuma demanda encontrada para este projeto',
      });
    });
  });
});
