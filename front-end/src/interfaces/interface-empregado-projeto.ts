export interface IDataEmpregadoProjeto {
  id_empregado: string;
  id_projeto: string;
}

export interface IDataEmpregadoProjetoResponsePost {
  id: string;
  id_empregado: string;
  id_projeto: string;
}

export interface IdataEmpregadoProjetoFind {
  page: number;
  limit: number;
}

export interface IdataEmpregadoProjetoResponseFInd {
  data: [
    {
      id: string;
      idEmpregado: string;
      idProjeto: string;
    },
  ];
  paginacao: {
    page: number;
    limit: number;
  };
}

export interface IFindaDataResponse {
  id: string;
  idProjeto: string;
  idEmpregado: string;
}
