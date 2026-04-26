// tests/authService.spec.ts

import jwt from 'jsonwebtoken';
import { AuthService } from '../services/authService';
import { UseEmpregado } from '../services/empregado';
import { GestaoSenha } from '../services/gestaoSenhas';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

jest.mock('../src/services/empregado');
jest.mock('../src/services/gestaoSenhas');

describe('AuthService Service', () => {
  let service: AuthService;

  beforeEach(() => {
    process.env.PRIVATE_KEY = 'chave_teste';
    service = new AuthService();
    jest.clearAllMocks();
  });

  describe('gerarToken', () => {
    it('deve gerar token JWT', () => {
      (jwt.sign as jest.Mock).mockReturnValue('token_fake');

      const result = service.gerarToken('1', 'gabriel@email.com', 'ADMIN');

      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: '1',
          email: 'gabriel@email.com',
          role: 'ADMIN',
        },
        'chave_teste',
        {
          expiresIn: '2h',
        },
      );

      expect(result).toBe('token_fake');
    });
  });

  describe('validarToken', () => {
    it('deve validar token com sucesso', () => {
      const payload = {
        id: '1',
        email: 'gabriel@email.com',
        role: 'ADMIN',
      };

      (jwt.verify as jest.Mock).mockReturnValue(payload);

      const result = service.validarToken('token_fake');

      expect(jwt.verify).toHaveBeenCalledWith('token_fake', 'chave_teste');

      expect(result).toEqual(payload);
    });

    it('deve lançar erro para token inválido', () => {
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('erro');
      });

      expect(() => service.validarToken('token_invalido')).toThrow('Token Inválido!');
    });
  });

  describe('login', () => {
    it('deve retornar empregado se login for válido', async () => {
      const empregadoMock = {
        id_empregado: '1',
        ds_email: 'gabriel@email.com',
        ds_password: 'hash123',
      };

      (UseEmpregado.prototype.findByEmail as jest.Mock).mockResolvedValue(empregadoMock);

      (GestaoSenha.prototype.compararSenha as jest.Mock).mockResolvedValue(true);

      const result = await service.login('gabriel@email.com', '123456');

      expect(UseEmpregado.prototype.findByEmail).toHaveBeenCalledWith('gabriel@email.com');

      expect(GestaoSenha.prototype.compararSenha).toHaveBeenCalledWith('hash123', '123456');

      expect(result).toEqual(empregadoMock);
    });

    it('deve retornar null se empregado não existir', async () => {
      (UseEmpregado.prototype.findByEmail as jest.Mock).mockResolvedValue(null);

      const result = await service.login('naoexiste@email.com', '123456');

      expect(result).toBeNull();
    });

    it('deve retornar null se senha estiver incorreta', async () => {
      const empregadoMock = {
        id_empregado: '1',
        ds_email: 'gabriel@email.com',
        ds_password: 'hash123',
      };

      (UseEmpregado.prototype.findByEmail as jest.Mock).mockResolvedValue(empregadoMock);

      (GestaoSenha.prototype.compararSenha as jest.Mock).mockResolvedValue(false);

      const result = await service.login('gabriel@email.com', 'senha_errada');

      expect(result).toBeNull();
    });
  });
});
