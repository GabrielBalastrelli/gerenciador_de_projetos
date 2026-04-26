// tests/controllerEmpregado.spec.ts

import { Request, Response, NextFunction } from 'express';
import ControllerEmpregado from '../controllers/empregado.controller';
import { UseEmpregado } from '../services/empregado';
import { validate } from 'deep-email-validator';
import { validarSenha } from '../utils/validadorSenha';
import { validarCpf } from '../utils/validadorCPF';
import { schemaCriarEmpregado } from '../schema/shemaEmpregado';
import { schemaPaginacao } from '../schema/schemaPaginacao';

jest.mock('../src/services/empregado');
jest.mock('deep-email-validator', () => ({
  validate: jest.fn(),
}));
jest.mock('../src/utils/validadorSenha', () => ({
  validarSenha: jest.fn(),
}));
jest.mock('../src/utils/validadorCPF', () => ({
  validarCpf: jest.fn(),
}));
jest.mock('../src/schema/shemaEmpregado', () => ({
  schemaCriarEmpregado: {
    safeParse: jest.fn(),
  },
}));
jest.mock('../src/schema/schemaPaginacao', () => ({
  schemaPaginacao: {
    parse: jest.fn(),
  },
}));

describe('ControllerEmpregado', () => {
  let controller: ControllerEmpregado;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    controller = new ControllerEmpregado();

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
    it('deve retornar 400 se schema for inválido', async () => {
      (schemaCriarEmpregado.safeParse as jest.Mock).mockReturnValue({
        success: false,
        error: {
          issues: [{ message: 'erro' }],
        },
      });

      await controller.create(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errors: [{ message: 'erro' }],
      });
    });

    it('deve retornar 400 se CPF inválido', async () => {
      req.body = {
        ds_email: 'teste@email.com',
        ds_password: '123456',
        ds_cpf: '111',
      };

      (schemaCriarEmpregado.safeParse as jest.Mock).mockReturnValue({
        success: true,
      });

      (validate as jest.Mock).mockResolvedValue({ valid: true });
      (validarCpf as jest.Mock).mockReturnValue(false);

      await controller.create(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'cpf_invalid',
        message: 'CPF inválido!',
      });
    });

    it('deve retornar 400 se email inválido', async () => {
      req.body = {
        ds_email: 'email@teste.com',
        ds_password: '123456',
        ds_cpf: '12345678900',
      };

      (schemaCriarEmpregado.safeParse as jest.Mock).mockReturnValue({
        success: true,
      });

      (validate as jest.Mock).mockResolvedValue({ valid: false });
      (validarCpf as jest.Mock).mockReturnValue(true);

      await controller.create(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('deve retornar 400 se senha fraca', async () => {
      req.body = {
        ds_email: 'email@teste.com',
        ds_password: '123',
        ds_cpf: '12345678900',
      };

      (schemaCriarEmpregado.safeParse as jest.Mock).mockReturnValue({
        success: true,
      });

      (validate as jest.Mock).mockResolvedValue({ valid: true });
      (validarCpf as jest.Mock).mockReturnValue(true);
      (validarSenha as jest.Mock).mockReturnValue(false);

      await controller.create(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'weak_password',
        message: 'A senha não atende aos requisitos de segurança.',
      });
    });

    it('deve criar empregado e retornar 201', async () => {
      const empregadoMock = { id_empregado: '1' };

      req.body = {
        ds_email: 'email@teste.com',
        ds_password: 'Senha123@',
        ds_cpf: '12345678900',
      };

      (schemaCriarEmpregado.safeParse as jest.Mock).mockReturnValue({
        success: true,
      });

      (validate as jest.Mock).mockResolvedValue({ valid: true });
      (validarCpf as jest.Mock).mockReturnValue(true);
      (validarSenha as jest.Mock).mockReturnValue(true);

      (UseEmpregado.prototype.create as jest.Mock).mockResolvedValue(empregadoMock);

      await controller.create(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(empregadoMock);
    });
  });

  describe('delete', () => {
    it('deve deletar empregado', async () => {
      req.params = { id: '1' };

      (UseEmpregado.prototype.delete as jest.Mock).mockResolvedValue(undefined);

      await controller.delete(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('deve atualizar empregado', async () => {
      req.params = { id: '1' };

      const empregadoMock = { id_empregado: '1' };

      (UseEmpregado.prototype.update as jest.Mock).mockResolvedValue(empregadoMock);

      await controller.update(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(empregadoMock);
    });
  });

  describe('findAll', () => {
    it('deve listar empregados com paginação', async () => {
      const empregados = [{ id: '1' }];

      req.query = { page: '1', limit: '10' };

      (schemaPaginacao.parse as jest.Mock).mockReturnValue({
        page: 1,
        limit: 10,
      });

      (UseEmpregado.prototype.findAll as jest.Mock).mockResolvedValue(empregados);

      await controller.findAll(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: empregados,
        paginacao: {
          page: 1,
          limit: 10,
        },
      });
    });
  });

  describe('findId', () => {
    it('deve retornar empregado por id', async () => {
      req.params = { id: '1' };

      const empregado = { id_empregado: '1' };

      (UseEmpregado.prototype.findById as jest.Mock).mockResolvedValue(empregado);

      await controller.findId(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('deve retornar 401 se não encontrar', async () => {
      req.params = { id: '1' };

      (UseEmpregado.prototype.findById as jest.Mock).mockResolvedValue(null);

      await controller.findId(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Não foi encontrado empregado com id!',
      });
    });
  });

  describe('findByEmail', () => {
    it('deve retornar empregado por email', async () => {
      req.params = { ds_email: 'teste@email.com' };

      const empregado = { id_empregado: '1' };

      (UseEmpregado.prototype.findByEmail as jest.Mock).mockResolvedValue(empregado);

      await controller.findByEmail(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('deve retornar 404 se não encontrar', async () => {
      req.params = { ds_email: 'teste@email.com' };

      (UseEmpregado.prototype.findByEmail as jest.Mock).mockResolvedValue(null);

      await controller.findByEmail(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('deleteAll', () => {
    it('deve deletar todos empregados', async () => {
      (UseEmpregado.prototype.deleteAll as jest.Mock).mockResolvedValue(undefined);

      await controller.deleteAll(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Todos os empregados foram deletados com sucesso!',
      });
    });
  });
});
