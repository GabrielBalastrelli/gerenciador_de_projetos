import bcrypt from 'bcrypt';
import { GestaoSenha } from '../services/gestaoSenhas';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('GestaoSenha Service', () => {
  let service: GestaoSenha;

  beforeEach(() => {
    service = new GestaoSenha();
    jest.clearAllMocks();
  });

  describe('criptografarSenha', () => {
    it('deve criptografar a senha com salt 10', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('$2b$10$hashfake123456789');

      const result = await service.criptografarSenha('123456');

      expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
      expect(result).toBe('$2b$10$hashfake123456789');
    });

    it('deve lançar erro se bcrypt falhar', async () => {
      (bcrypt.hash as jest.Mock).mockRejectedValue(new Error('Erro ao criptografar'));

      await expect(service.criptografarSenha('123456')).rejects.toThrow('Erro ao criptografar');
    });
  });

  describe('compararSenha', () => {
    it('deve retornar true quando senha estiver correta', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.compararSenha('$2b$10$hashfake123456789', '123456');

      expect(bcrypt.compare).toHaveBeenCalledWith('123456', '$2b$10$hashfake123456789');

      expect(result).toBe(true);
    });

    it('deve retornar false quando senha estiver incorreta', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.compararSenha('$2b$10$hashfake123456789', 'senhaerrada');

      expect(result).toBe(false);
    });

    it('deve lançar erro se bcrypt.compare falhar', async () => {
      (bcrypt.compare as jest.Mock).mockRejectedValue(new Error('Erro ao comparar senha'));

      await expect(service.compararSenha('$2b$10$hashfake123456789', '123456')).rejects.toThrow(
        'Erro ao comparar senha',
      );
    });
  });
});
