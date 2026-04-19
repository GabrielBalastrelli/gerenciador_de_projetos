import type { IGetProjetoResponse } from "../../interfaces/interface-get-projeto";

interface CardProjetoProps {
  data: IGetProjetoResponse[];
}

export const CardProjeto = ({ data }: CardProjetoProps) => {
  return (
    <div className="row mt-4 g-4">
      <h3 className="fw-bold fs-3 mb-4">Seus Projetos Recentes</h3>
      {data?.map((item, index) => (
        <div key={index} className="col-12 col-md-6 col-lg-4 d-flex ">
          <div className="card h-100 shadow border-0 rounded-4">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title fw-bold mb-3">📁 {item.ds_nome}</h5>

              <p className="card-text text-muted flex-grow-1">
                {item.ds_descricao}
              </p>

              <div className="mt-3">
                <span className="fw-semibold text-secondary">Orçamento:</span>
                <p className="mb-0">
                  {item.orcamento.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
