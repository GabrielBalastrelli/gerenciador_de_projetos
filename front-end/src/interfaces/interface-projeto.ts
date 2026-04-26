export interface IGetProjetoParams {
  page: number;
  limit: number;
}

export interface IGetProjetoResponse {
  id_projeto: string;
  ds_nome: string;
  ds_descricao: string;
  orcamento: number;
  dt_inicio: string;
  dt_fim: string;
  dt_transacao: string;
}

export interface IDataProjetoParams {
  ds_nome: string;
  ds_descricao: string;
  orcamento: number;
  dt_inicio: Date;
  dt_fim: Date;
}

export interface IGetProjetoResponseConvert {
  idProjeto: string;
  nomeProjeto: string;
  descricao: string;
  orcamento: number;
  dataInicio: string;
  dataFim: string;
  dataTransacao: string;
}

export interface IFindProjetoResponse {
  data: IGetProjetoResponse[];
  total: number;
  page: number;
  limit: number;
}
