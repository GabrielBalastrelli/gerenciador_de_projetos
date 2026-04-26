import { Request, Response, NextFunction } from 'express';
import { ControllerAuth } from '../controllers/auth.controller';
import { AuthService } from '../services/authService';

jest.mock('../src/services/authService');

describe('ControllerAuth', () => {
  let controller: ControllerAuth;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    controller = new ControllerAuth();

    req = {
      body: {},
      headers: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    jest.clearAllMocks();
  });

  describe('login', () => {
    it('deve retornar 400 se parâmetros forem inválidos', async () => {
      req.body = {
        ds_email: 123,
        ds_password: true,
      };

      await controller.login(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        sucess: false,
        error: 'Parâmetros inválidos',
      });
    });

    it('deve retornar 401 se login falhar', async () => {
      req.body = {
        ds_email: 'teste@email.com',
        ds_password: '123456',
      };

      (AuthService.prototype.login as jest.Mock).mockResolvedValue(null);

      await controller.login(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        sucess: false,
        error: 'E-mail ou senha inválidos!',
      });
    });

    it('deve retornar 200 com token no login válido', async () => {
      const empregadoMock = {
        id_empregado: '1',
        ds_nome: 'Gabriel',
        ds_email: 'gabriel@email.com',
        ds_profissao: 'Dev',
        dt_admissao: new Date('2026-01-01'),
        role: 'ADMIN',
      };

      req.body = {
        ds_email: 'gabriel@email.com',
        ds_password: '123456',
      };

      (AuthService.prototype.login as jest.Mock).mockResolvedValue(empregadoMock);

      (AuthService.prototype.gerarToken as jest.Mock).mockReturnValue('token_fake');

      await controller.login(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        success: true,
        token: 'token_fake',
        infoEmpregado: {
          nome: 'Gabriel',
          role: 'ADMIN',
          profissao: 'Dev',
          email: 'gabriel@email.com',
          dataContratacao: new Date('2026-01-01'),
        },
        message: 'Login Realizado com Sucesso!',
      });
    });

    it('deve chamar next em caso de erro', async () => {
      req.body = {
        ds_email: 'teste@email.com',
        ds_password: '123456',
      };

      const error = new Error('Erro interno');

      (AuthService.prototype.login as jest.Mock).mockRejectedValue(error);

      await controller.login(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('middlewareValidaToken', () => {
    it('deve retornar 401 se token não for enviado', () => {
      req.headers = {};

      controller.middlewareValidaToken(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Token não enviado!',
      });
    });

    it('deve validar token e chamar next', () => {
      req.headers = {
        authorization: 'Bearer token_fake',
      };

      const payload = {
        id: '1',
        email: 'gabriel@email.com',
        role: 'ADMIN',
      };

      (AuthService.prototype.validarToken as jest.Mock).mockReturnValue(payload);

      controller.middlewareValidaToken(req as Request, res as Response, next);

      expect(req.empregado).toEqual(payload);
      expect(next).toHaveBeenCalled();
    });

    it('deve retornar 401 se token for inválido', () => {
      req.headers = {
        authorization: 'Bearer token_invalido',
      };

      (AuthService.prototype.validarToken as jest.Mock).mockImplementation(() => {
        throw new Error();
      });

      controller.middlewareValidaToken(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Token inválido!',
      });
    });
  });
});
