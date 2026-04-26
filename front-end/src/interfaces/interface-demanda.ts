export interface IDataPostDemanda {
  id_projeto: string;
  id_empregado: string;
  ds_nome: string;
  ds_descricao: string;
  dt_inicio: Date;
  dt_fim: Date | null;
}

export interface IDataResponse {
  id_demanda: string;
  id_projeto: string;
  id_empregado: string;
  ds_nome: string;
  ds_descricao: string;
  dt_inicio: Date;
  dt_fim: Date;
  dt_transacao: Date;
}

export interface IDataConvertPostResponse {
  idProjeto: string;
  idEmpregado: string;
  nomeDemanda: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
}

export interface IDataMappingFront {
  idDemanda: string;
  idProjeto: string;
  idEmpregado: string;
  nomeDemanda: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  dataTransacao: Date;
}
