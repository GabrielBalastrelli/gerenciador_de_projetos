import { useLocation } from "react-router";
import { Projeto } from "../../services/ServiceProjeto/Projeto";
import { useEffect, useState } from "react";
import type { IGetProjetoResponseConvert } from "../../interfaces/interface-projeto";
import { CardError } from "../../components/card-erro/CardError";

import { ModalEmpregadoProjeto } from "../../components/modal-empregado-projeto/ModalEmpregadoProjeto";

export const ProjetoPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projeto, setProjeto] = useState<IGetProjetoResponseConvert | null>(
    null,
  );

  const projetoServices = new Projeto();
  const location = useLocation();

  const idProjeto = location.state?.data;

  useEffect(() => {
    const fetchProjeto = async () => {
      try {
        const res = await projetoServices.getProjeto(idProjeto);
        setProjeto(res);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Erro ao buscar projeto");
        }
      }
    };

    if (idProjeto) {
      fetchProjeto();
    }
  }, [idProjeto]);

  return (
    <div className="container py-4">
      {error && <CardError message={error} />}

      {projeto && (
        <>
          <div className="card border-0 shadow rounded-4 mb-4">
            <div className="card-body p-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div>
                  <p className="text-muted mb-1">Projeto</p>
                  <h1 className="fw-bold fs-3 mb-0">
                    📁 {projeto.nomeProjeto}
                  </h1>
                </div>

                <button
                  className="btn btn-primary rounded-pill px-4"
                  onClick={() => setShowModal(true)}
                >
                  Vincular Empregado
                </button>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-12 col-lg-8">
              <div className="card border-0 shadow rounded-4 h-100">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-3">Descrição</h4>

                  <p className="text-muted mb-0">
                    {projeto.descricao || "Nenhuma descrição cadastrada."}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="card border-0 shadow rounded-4">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">Resumo</h5>

                  <div className="mb-3">
                    <span className="text-muted d-block">Orçamento</span>
                    <strong className="fs-5">
                      {projeto.orcamento.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </strong>
                  </div>

                  <div className="mb-3">
                    <span className="text-muted d-block">ID do Projeto</span>
                    <small className="text-break">{projeto.idProjeto}</small>
                  </div>

                  <div>
                    <span className="text-muted d-block">
                      Empregados Vinculados
                    </span>
                    <strong>{projeto.empregados?.length || 0}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow rounded-4 mt-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Equipe do Projeto</h4>
              </div>

              {projeto.empregados?.length > 0 ? (
                <div className="row g-3">
                  {projeto.empregados.map((item: any) => (
                    <div className="col-12 col-md-6 col-xl-4" key={item.id}>
                      <div className="border rounded-4 p-3 h-100">
                        <h6 className="fw-bold mb-1">{item.nome}</h6>
                        <p className="text-muted mb-1">{item.email}</p>
                        <small className="text-secondary">ID: {item.id}</small>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0">
                  Nenhum empregado vinculado a este projeto.
                </p>
              )}
            </div>
            <ModalEmpregadoProjeto
              show={showModal}
              idProjeto={idProjeto}
              onClose={() => setShowModal(false)}
              onAdd={(idEmpregado) => {
                console.log("  em pregado:", idEmpregado);

                setShowModal(false);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
