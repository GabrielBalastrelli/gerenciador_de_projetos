import z from 'zod';

export const schemaCriarEmpregado = z.object({
  ds_nome: z.string('O nome do empregado é obrigatório!').min(2, 'Informe um núimero válido'),
  ds_email: z.string('E-mail obrigatório!').min(2, 'Informe um e-mail válido'),
  dt_nascimento: z.string('A data de nascimento é obrigatório!').min(2, 'Informe uma data válida.'),
  ds_profissao: z.string('A profissão é obrigatória!').min(2, 'Informe uma profissão válida.'),
  vl_salario: z.number('O sálario é obrigatório!'),
  dt_admissao: z.string('A data de admissão é obrigatória!').min(2, 'Informe uma data válida.'),
  role: z.string('O cargo é obrigatório!').min(2, 'O cargo é obrigatório.'),
  ds_password: z.string('A senha obrigatório!').min(8, 'Informe uma senha válida.'),
  ds_cpf: z.string('O CPF é obrigatório!').min(2, 'Informe um CPF válido.'),
});
