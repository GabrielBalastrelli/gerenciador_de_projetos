export interface IGetProjetoParams {
  token: string;
  page: number;
  limit: number;
}

export interface IGetProjetoParams {
  id_projeto: string;
  ds_nome: string;
  ds_descricao: string;
  orcamento: number;
  dt_inicio: string;
  dt_fim: string;
  dt_transacao: string;
}
