import type { IGetProjetoResponse } from "../../interfaces/interface-projeto";
import { useNavigate } from "react-router";

interface CardProjetoProps {
  data: IGetProjetoResponse[];
}

export const CardProjeto = ({ data }: CardProjetoProps) => {
  const navigate = useNavigate();
  return (
    <div className="container mt-4">
      <h3 className="fw-bold fs-3 mb-4">Seus Projetos Recentes</h3>
      <div className="row g-4">
        {data?.map((item, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3 d-flex">
            <div className="card h-100 shadow border-0 rounded-4 w-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold mb-3">📁 {item.ds_nome}</h5>
                <p className="card-text text-muted flex-grow-1">
                  {item.ds_descricao}
                </p>
                <div className="mt-auto pt-3 border-top mb-3">
                  <span className="fw-semibold text-secondary">Orçamento:</span>
                  <p className="mb-0 fw-bold text-dark">
                    {item.orcamento.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>

                <button
                  className="btn btn-primary rounded-pill w-100"
                  onClick={() =>
                    navigate("/projeto", {
                      state: {
                        data: item.id_projeto,
                      },
                    })
                  }
                >
                  Detalhes
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
