// tests/controllerEmpregadoProjeto.spec.ts

import { Request, Response, NextFunction } from 'express';
import { ControllerEmpregadoProjeto } from '../controllers/empregadoProjeto.controller';
import { UseEmpregadoProjeto } from '../services/empregadoProjeto';
import { schemaPaginacao } from '../schema/schemaPaginacao';
import { schemaEmpregadoProjeto } from '../schema/schemaEmpregadoProjeto';

jest.mock('../src/services/empregadoProjeto');
jest.mock('../src/schema/schemaPaginacao', () => ({
  schemaPaginacao: {
    parse: jest.fn(),
  },
}));
jest.mock('../src/schema/schemaEmpregadoProjeto', () => ({
  schemaEmpregadoProjeto: {
    parse: jest.fn(),
  },
}));

describe('ControllerEmpregadoProjeto', () => {
  let controller: ControllerEmpregadoProjeto;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    controller = new ControllerEmpregadoProjeto();

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
    it('deve criar vínculo empregado/projeto e retornar 201', async () => {
      const mockData = {
        id: '1',
        id_empregado: 'emp1',
        id_projeto: 'proj1',
      };

      (UseEmpregadoProjeto.prototype.create as jest.Mock).mockResolvedValue(mockData);

      req.body = {
        id_empregado: 'emp1',
        id_projeto: 'proj1',
      };

      await controller.create(req as Request, res as Response, next);

      expect(UseEmpregadoProjeto.prototype.create).toHaveBeenCalledWith(req.body);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('deve chamar next em caso de erro', async () => {
      const error = new Error('Erro interno');

      (UseEmpregadoProjeto.prototype.create as jest.Mock).mockRejectedValue(error);

      await controller.create(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('delete', () => {
    it('deve deletar vínculo e retornar 204', async () => {
      req.params = { id: '1' };

      (UseEmpregadoProjeto.prototype.delete as jest.Mock).mockResolvedValue(undefined);

      await controller.delete(req as Request, res as Response, next);

      expect(UseEmpregadoProjeto.prototype.delete).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('deve atualizar vínculo e retornar 200', async () => {
      const mockData = {
        id: '1',
        id_empregado: 'emp2',
        id_projeto: 'proj2',
      };

      req.params = { id: '1' };
      req.body = {
        id_empregado: 'emp2',
        id_projeto: 'proj2',
      };

      (UseEmpregadoProjeto.prototype.update as jest.Mock).mockResolvedValue(mockData);

      await controller.update(req as Request, res as Response, next);

      expect(UseEmpregadoProjeto.prototype.update).toHaveBeenCalledWith('1', req.body);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });
  });

  describe('findAll', () => {
    it('deve listar vínculos com filtros e paginação', async () => {
      const mockList = [{ id: '1', id_empregado: 'emp1', id_projeto: 'proj1' }];

      req.query = {
        page: '1',
        limit: '10',
        id_empregado: 'emp1',
        id_projeto: 'proj1',
      };

      (schemaPaginacao.parse as jest.Mock).mockReturnValue({
        page: 1,
        limit: 10,
      });

      (schemaEmpregadoProjeto.parse as jest.Mock).mockReturnValue({
        id_empregado: 'emp1',
        id_projeto: 'proj1',
      });

      (UseEmpregadoProjeto.prototype.findAll as jest.Mock).mockResolvedValue(mockList);

      await controller.findAll(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        data: mockList,
        paginacao: {
          page: 1,
          limit: 10,
        },
      });
    });
  });

  describe('findId', () => {
    it('deve buscar vínculo por id e retornar 200', async () => {
      const mockData = {
        id: '1',
        id_empregado: 'emp1',
        id_projeto: 'proj1',
      };

      req.params = { id: '1' };

      (UseEmpregadoProjeto.prototype.findId as jest.Mock).mockResolvedValue(mockData);

      await controller.findId(req as Request, res as Response, next);

      expect(UseEmpregadoProjeto.prototype.findId).toHaveBeenCalledWith('1');

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });
  });
});
