import z, { number } from 'zod';

export const schemaPaginacao = z.object({
  page: number().min(1).default(1),
  limit: number().min(1).max(20).default(10),
});
