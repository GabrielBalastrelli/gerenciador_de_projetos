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
  id_empregado: string;
  id_projeto: string;
  page: number;
  limit: number;
}

export interface IdataEmpregadoProjetoResponseFInd {
  data: [
    {
      id: string;
      id_empregado: string;
      id_projeto: string;
    },
  ];
  paginacao: {
    page: number;
    limit: number;
  };
}
