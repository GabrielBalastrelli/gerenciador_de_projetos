type DemandaProps = {
  idDemanda: string;
  idProjeto: string;
  idEmpregado: string;
  nomeDemanda: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  dataTransacao: string;
};

export const CardDemanda = ({
  idDemanda,
  idProjeto,
  idEmpregado,
  nomeDemanda,
  descricao,
  dataInicio,
  dataFim,
  dataTransacao,
}: DemandaProps) => {
  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  return (
    <div className="card shadow-sm border-0 mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title fw-bold text-primary">{nomeDemanda}</h5>

          <span className="badge bg-primary">Demanda</span>
        </div>

        <p className="text-muted mb-3">{descricao}</p>

        <div className="row g-3">
          <div className="col-md-6">
            <small className="text-muted d-block">Início</small>
            <strong>{formatarData(dataInicio)}</strong>
          </div>

          <div className="col-md-6">
            <small className="text-muted d-block">Fim</small>
            <strong>{formatarData(dataFim)}</strong>
          </div>

          <div className="col-md-6">
            <small className="text-muted d-block">ID Projeto</small>
            <span>{idProjeto}</span>
          </div>

          <div className="col-md-6">
            <small className="text-muted d-block">ID Empregado</small>
            <span>{idEmpregado}</span>
          </div>
        </div>

        <hr />

        <small className="text-secondary">
          Criado em {formatarData(dataTransacao)}
        </small>
      </div>
    </div>
  );
};
