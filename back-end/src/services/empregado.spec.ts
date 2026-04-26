// tests/useEmpregado.spec.ts

import { UseEmpregado } from '../services/empregado';
import { prisma } from '../database/prisma';
import { GestaoSenha } from '../services/gestaoSenhas';

jest.mock('../src/database/prisma', () => ({
  prisma: {
    empregado: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      deleteMany: jest.fn(),
    },
  },
}));

jest.mock('../src/services/gestaoSenhas');

describe('UseEmpregado Service', () => {
  let service: UseEmpregado;

  beforeEach(() => {
    service = new UseEmpregado();
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar empregado com senha criptografada', async () => {
      const senhaHash = '$2b$10$hashfake123';

      (GestaoSenha.prototype.criptografarSenha as jest.Mock).mockResolvedValue(senhaHash);

      const mockEmpregado = {
        id_empregado: '1',
        ds_nome: 'Gabriel',
        ds_email: 'gabriel@email.com',
      };

      (prisma.empregado.create as jest.Mock).mockResolvedValue(mockEmpregado);

      const result = await service.create({
        ds_nome: 'Gabriel',
        ds_email: 'gabriel@email.com',
        dt_nascimento: '2000-01-01',
        ds_profissao: 'Dev',
        vl_salario: 5000,
        dt_admissao: '2026-01-10',
        ds_password: '123456',
        role: 'USER',
        ds_cpf: '12345678900',
      });

      expect(GestaoSenha.prototype.criptografarSenha).toHaveBeenCalledWith('123456');

      expect(prisma.empregado.create).toHaveBeenCalledWith({
        data: {
          ds_nome: 'Gabriel',
          ds_email: 'gabriel@email.com',
          dt_nascimento: new Date('2000-01-01'),
          ds_profissao: 'Dev',
          vl_salario: 5000,
          dt_admissao: new Date('2026-01-10'),
          ds_password: senhaHash,
          role: 'USER',
          ds_cpf: '12345678900',
        },
      });

      expect(result).toEqual(mockEmpregado);
    });
  });

  describe('findAll', () => {
    it('deve listar empregados paginados', async () => {
      const mockList = [{ id_empregado: '1' }, { id_empregado: '2' }];

      (prisma.empregado.findMany as jest.Mock).mockResolvedValue(mockList);

      const result = await service.findAll(2, 10);

      expect(prisma.empregado.findMany).toHaveBeenCalledWith({
        skip: 10,
        take: 10,
      });

      expect(result).toEqual(mockList);
    });
  });

  describe('findById', () => {
    it('deve buscar empregado por id', async () => {
      const mockEmpregado = { id_empregado: '1' };

      (prisma.empregado.findUnique as jest.Mock).mockResolvedValue(mockEmpregado);

      const result = await service.findById('1');

      expect(prisma.empregado.findUnique).toHaveBeenCalledWith({
        where: { id_empregado: '1' },
      });

      expect(result).toEqual(mockEmpregado);
    });

    it('deve retornar null se não encontrar', async () => {
      (prisma.empregado.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await service.findById('999');

      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('deve deletar empregado', async () => {
      (prisma.empregado.delete as jest.Mock).mockResolvedValue(undefined);

      await service.delete('1');

      expect(prisma.empregado.delete).toHaveBeenCalledWith({
        where: { id_empregado: '1' },
      });
    });
  });

  describe('update', () => {
    it('deve atualizar empregado', async () => {
      const mockEmpregado = {
        id_empregado: '1',
        ds_nome: 'Novo Nome',
      };

      (prisma.empregado.update as jest.Mock).mockResolvedValue(mockEmpregado);

      const result = await service.update('1', {
        ds_nome: 'Novo Nome',
        ds_profissao: 'Senior Dev',
      });

      expect(prisma.empregado.update).toHaveBeenCalledWith({
        where: { id_empregado: '1' },
        data: {
          ds_nome: 'Novo Nome',
          dt_nascimento: undefined,
          ds_profissao: 'Senior Dev',
          vl_salario: undefined,
          dt_admissao: undefined,
          ds_password: undefined,
          role: undefined,
          ds_cpf: undefined,
        },
      });

      expect(result).toEqual(mockEmpregado);
    });
  });

  describe('findByEmail', () => {
    it('deve buscar empregado por email', async () => {
      const mockEmpregado = {
        id_empregado: '1',
        ds_email: 'gabriel@email.com',
      };

      (prisma.empregado.findUnique as jest.Mock).mockResolvedValue(mockEmpregado);

      const result = await service.findByEmail('gabriel@email.com');

      expect(prisma.empregado.findUnique).toHaveBeenCalledWith({
        where: { ds_email: 'gabriel@email.com' },
      });

      expect(result).toEqual(mockEmpregado);
    });
  });

  describe('deleteAll', () => {
    it('deve deletar todos empregados', async () => {
      (prisma.empregado.deleteMany as jest.Mock).mockResolvedValue(undefined);

      await service.deleteAll();

      expect(prisma.empregado.deleteMany).toHaveBeenCalled();
    });
  });
});
