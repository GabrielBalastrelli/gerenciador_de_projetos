import z from 'zod';

export const schemaEmpregadoProjeto = z.object({
  id_empregado: z.string().optional(),
  id_projeto: z.string().optional(),
});
