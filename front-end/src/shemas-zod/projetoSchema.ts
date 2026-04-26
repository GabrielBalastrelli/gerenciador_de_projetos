import * as z from "zod";

export const ProjetoSchema = z.object({
  ds_nome: z
    .string("O nome do Projeto é obrigatório!")
    .min(5, { error: "O nome do projeto deve ter pelo menos 10 letras." }),

  ds_descricao: z.string("A descriçõ do Projeto é obrigatória!").min(15, {
    error: "A descrição do projeto deve ter pelo menos 15 letras.",
  }),

  orcamento: z
    .number("O orçamento do Projeto é obrigatório!")
    .min(1000, { error: "O valor minímo do projeto é R$ 1000 reais" }),

  dt_inicio: z.date("A data de Inicío é obrigatória!"),

  dt_fim: z.date("A data de Fim é obrigatória!"),
});
