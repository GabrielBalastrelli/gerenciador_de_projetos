// tests/controllerProjeto.spec.ts

import { Request, Response, NextFunction } from 'express';
import { ControllerProjeto } from '../controllers/projeto.controller';
import { UseProjeto } from '../services/projeto';
import { schemaPaginacao } from '../schema/schemaPaginacao';

jest.mock('../src/services/projeto');
jest.mock('../src/schema/schemaPaginacao', () => ({
  schemaPaginacao: {
    parse: jest.fn(),
  },
}));

describe('ControllerProjeto', () => {
  let controller: ControllerProjeto;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    controller = new ControllerProjeto();

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
    it('deve criar projeto e retornar 201', async () => {
      const mockProjeto = {
        id_projeto: '1',
        ds_nome: 'Projeto Teste',
      };

      req.body = {
        ds_nome: 'Projeto Teste',
      };

      (UseProjeto.prototype.create as jest.Mock).mockResolvedValue(mockProjeto);

      await controller.create(req as Request, res as Response, next);

      expect(UseProjeto.prototype.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockProjeto);
    });

    it('deve chamar next em caso de erro', async () => {
      const error = new Error('Erro interno');

      (UseProjeto.prototype.create as jest.Mock).mockRejectedValue(error);

      await controller.create(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('delete', () => {
    it('deve deletar projeto e retornar 204', async () => {
      req.params = { id: '1' };

      (UseProjeto.prototype.delete as jest.Mock).mockResolvedValue(undefined);

      await controller.delete(req as Request, res as Response, next);

      expect(UseProjeto.prototype.delete).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('deve atualizar projeto e retornar 200', async () => {
      const mockProjeto = {
        id_projeto: '1',
        ds_nome: 'Projeto Atualizado',
      };

      req.params = { id: '1' };
      req.body = { ds_nome: 'Projeto Atualizado' };

      (UseProjeto.prototype.update as jest.Mock).mockResolvedValue(mockProjeto);

      await controller.update(req as Request, res as Response, next);

      expect(UseProjeto.prototype.update).toHaveBeenCalledWith('1', req.body);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProjeto);
    });
  });

  describe('findAll', () => {
    it('deve listar projetos com paginação', async () => {
      const mockList = [{ id_projeto: '1' }, { id_projeto: '2' }];

      req.query = {
        page: '1',
        limit: '10',
      };

      (schemaPaginacao.parse as jest.Mock).mockReturnValue({
        page: 1,
        limit: 10,
      });

      (UseProjeto.prototype.findAll as jest.Mock).mockResolvedValue(mockList);

      await controller.findAll(req as Request, res as Response, next);

      expect(schemaPaginacao.parse).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
      });

      expect(UseProjeto.prototype.findAll).toHaveBeenCalledWith(10, 1);

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
    it('deve buscar projeto por id e retornar 200', async () => {
      const mockProjeto = {
        id_projeto: '1',
        ds_nome: 'Projeto Teste',
      };

      req.params = { id: '1' };

      (UseProjeto.prototype.findId as jest.Mock).mockResolvedValue(mockProjeto);

      await controller.findId(req as Request, res as Response, next);

      expect(UseProjeto.prototype.findId).toHaveBeenCalledWith('1');

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProjeto);
    });

    it('deve chamar next em caso de erro', async () => {
      const error = new Error('Erro');

      req.params = { id: '1' };

      (UseProjeto.prototype.findId as jest.Mock).mockRejectedValue(error);

      await controller.findId(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
