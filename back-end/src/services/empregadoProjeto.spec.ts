// tests/useEmpregadoProjeto.spec.ts

import { UseEmpregadoProjeto } from '../services/empregadoProjeto';
import { prisma } from '../database/prisma';

jest.mock('../src/database/prisma', () => ({
  prisma: {
    empregadoProjeto: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

describe('UseEmpregadoProjeto Service', () => {
  let service: UseEmpregadoProjeto;

  beforeEach(() => {
    service = new UseEmpregadoProjeto();
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar vínculo empregado/projeto', async () => {
      const mockData = {
        id: '1',
        id_empregado: 'emp1',
        id_projeto: 'proj1',
      };

      (prisma.empregadoProjeto.create as jest.Mock).mockResolvedValue(mockData);

      const result = await service.create({
        id_empregado: 'emp1',
        id_projeto: 'proj1',
      });

      expect(prisma.empregadoProjeto.create).toHaveBeenCalledWith({
        data: {
          id_empregado: 'emp1',
          id_projeto: 'proj1',
        },
      });

      expect(result).toEqual(mockData);
    });
  });

  describe('update', () => {
    it('deve atualizar vínculo empregado/projeto', async () => {
      const mockData = {
        id: '1',
        id_empregado: 'emp2',
        id_projeto: 'proj2',
      };

      (prisma.empregadoProjeto.update as jest.Mock).mockResolvedValue(mockData);

      const result = await service.update('1', {
        id_empregado: 'emp2',
        id_projeto: 'proj2',
      });

      expect(prisma.empregadoProjeto.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          id_empregado: 'emp2',
          id_projeto: 'proj2',
        },
      });

      expect(result).toEqual(mockData);
    });
  });

  describe('delete', () => {
    it('deve deletar vínculo empregado/projeto', async () => {
      (prisma.empregadoProjeto.delete as jest.Mock).mockResolvedValue(undefined);

      await service.delete('1');

      expect(prisma.empregadoProjeto.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('findAll', () => {
    it('deve listar vínculos com paginação e filtros', async () => {
      const mockList = [
        { id: '1', id_empregado: 'emp1', id_projeto: 'proj1' },
        { id: '2', id_empregado: 'emp1', id_projeto: 'proj1' },
      ];

      (prisma.empregadoProjeto.findMany as jest.Mock).mockResolvedValue(mockList);

      const result = await service.findAll(
        {
          id_empregado: 'emp1',
          id_projeto: 'proj1',
        },
        2,
        10,
      );

      expect(prisma.empregadoProjeto.findMany).toHaveBeenCalledWith({
        where: {
          id_empregado: 'emp1',
          id_projeto: 'proj1',
        },
        skip: 10,
        take: 10,
      });

      expect(result).toEqual(mockList);
    });
  });

  describe('findId', () => {
    it('deve buscar vínculo por id', async () => {
      const mockData = {
        id: '1',
        id_empregado: 'emp1',
        id_projeto: 'proj1',
      };

      (prisma.empregadoProjeto.findUnique as jest.Mock).mockResolvedValue(mockData);

      const result = await service.findId('1');

      expect(prisma.empregadoProjeto.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });

      expect(result).toEqual(mockData);
    });

    it('deve retornar null se não encontrar', async () => {
      (prisma.empregadoProjeto.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await service.findId('999');

      expect(result).toBeNull();
    });
  });
});
