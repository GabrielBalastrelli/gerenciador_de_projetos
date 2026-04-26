import { UseProjeto } from '../services/projeto';
import { prisma } from '../database/prisma';

jest.mock('../src/database/prisma', () => ({
  prisma: {
    projeto: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

describe('UseProjeto Service', () => {
  let service: UseProjeto;

  beforeEach(() => {
    service = new UseProjeto();
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar um projeto', async () => {
      const mockProjeto = {
        id_projeto: '1',
        ds_nome: 'Projeto Teste',
        ds_descricao: 'Descrição teste',
        orcamento: 5000,
        dt_inicio: new Date('2026-01-01'),
        dt_fim: new Date('2026-12-31'),
      };

      (prisma.projeto.create as jest.Mock).mockResolvedValue(mockProjeto);

      const result = await service.create({
        ds_nome: 'Projeto Teste',
        ds_descricao: 'Descrição teste',
        orcamento: 5000,
        dt_inicio: new Date('2026-01-01'),
        dt_fim: new Date('2026-12-31'),
      });

      expect(prisma.projeto.create).toHaveBeenCalledWith({
        data: {
          ds_nome: 'Projeto Teste',
          ds_descricao: 'Descrição teste',
          orcamento: 5000,
          dt_inicio: new Date('2026-01-01'),
          dt_fim: new Date('2026-12-31'),
        },
      });

      expect(result).toEqual(mockProjeto);
    });
  });

  describe('update', () => {
    it('deve atualizar um projeto', async () => {
      const mockProjeto = {
        id_projeto: '1',
        ds_nome: 'Projeto Atualizado',
        ds_descricao: 'Nova descrição',
        orcamento: 7000,
        dt_inicio: new Date('2026-01-01'),
        dt_fim: new Date('2026-12-31'),
      };

      (prisma.projeto.update as jest.Mock).mockResolvedValue(mockProjeto);

      const result = await service.update('1', {
        ds_nome: 'Projeto Atualizado',
        ds_descricao: 'Nova descrição',
        orcamento: 7000,
        dt_inicio: new Date('2026-01-01'),
        dt_fim: new Date('2026-12-31'),
      });

      expect(prisma.projeto.update).toHaveBeenCalledWith({
        where: {
          id_projeto: '1',
        },
        data: {
          ds_nome: 'Projeto Atualizado',
          ds_descricao: 'Nova descrição',
          orcamento: 7000,
          dt_inicio: new Date('2026-01-01'),
          dt_fim: new Date('2026-12-31'),
        },
      });

      expect(result).toEqual(mockProjeto);
    });
  });

  describe('delete', () => {
    it('deve deletar um projeto', async () => {
      (prisma.projeto.delete as jest.Mock).mockResolvedValue(undefined);

      await service.delete('1');

      expect(prisma.projeto.delete).toHaveBeenCalledWith({
        where: {
          id_projeto: '1',
        },
      });
    });
  });

  describe('findAll', () => {
    it('deve listar projetos paginados', async () => {
      const mockProjetos = [
        { id_projeto: '1', ds_nome: 'Projeto 1' },
        { id_projeto: '2', ds_nome: 'Projeto 2' },
      ];

      (prisma.projeto.findMany as jest.Mock).mockResolvedValue(mockProjetos);

      const result = await service.findAll(10, 2);

      expect(prisma.projeto.findMany).toHaveBeenCalledWith({
        skip: 10,
        take: 10,
      });

      expect(result).toEqual(mockProjetos);
    });
  });

  describe('findId', () => {
    it('deve buscar projeto por id', async () => {
      const mockProjeto = {
        id_projeto: '1',
        ds_nome: 'Projeto Teste',
      };

      (prisma.projeto.findUnique as jest.Mock).mockResolvedValue(mockProjeto);

      const result = await service.findId('1');

      expect(prisma.projeto.findUnique).toHaveBeenCalledWith({
        where: {
          id_projeto: '1',
        },
      });

      expect(result).toEqual(mockProjeto);
    });

    it('deve retornar null se não encontrar', async () => {
      (prisma.projeto.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await service.findId('999');

      expect(result).toBeNull();
    });
  });
});
