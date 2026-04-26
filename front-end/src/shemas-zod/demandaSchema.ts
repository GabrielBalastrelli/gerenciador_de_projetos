import * as z from "zod";

export const DemandaSchema = z.object({
  idProjeto: z.string("O Id do projeto é obrigatório!"),

  idEmpregado: z.string("O Id do empregado é obrigatório!"),

  nomeDemanda: z
    .string("O nome do Projeto é obrigatório!")
    .min(5, { error: "O nome do projeto deve ter pelo menos 10 letras." }),

  descricao: z.string("A descriçõ do Projeto é obrigatória!").min(15, {
    error: "A descrição do projeto deve ter pelo menos 15 letras.",
  }),

  dataInicio: z.string("A data de Inicío é obrigatória!"),

  dataFim: z.string("A data de Fim é obrigatória!"),
});
