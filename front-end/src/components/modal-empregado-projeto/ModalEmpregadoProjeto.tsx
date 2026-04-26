import { useEffect, useState } from "react";
import type { IDataEmpregado } from "../../interfaces/interface-empregado";
import { Empregado } from "../../services/ServiceEmpregado/Empregado";
import { CardError } from "../../components/card-erro/CardError";
import { EmpregadoProjeto } from "../../services/ServiceEmpregadoProjeto/EmpregadoProjeto";
import { id } from "zod/v4/locales";

interface ModalEmpregadoProjetoProps {
  show: boolean;
  idProjeto: string;
  onClose: () => void;
  onAdd: (idEmpregado: string) => void;
}

export const ModalEmpregadoProjeto = ({
  show,
  idProjeto,
  onClose,
  onAdd,
}: ModalEmpregadoProjetoProps) => {
  const [empregados, setEmpregados] = useState<IDataEmpregado[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const empregadoService = new Empregado();
  const empregadoProjetoService = new EmpregadoProjeto();

  useEffect(() => {
    if (!show) return;

    const fetchEmpregados = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await empregadoService.findAllEmpregados();
        setEmpregados(res);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Erro ao buscar empregados");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmpregados();
  }, [show]);

  const handlePostEmpregadoProjeto = async (idEmpregado: string) => {
    try {
      const res = await empregadoProjetoService.postEmpregadoProjeto({
        id_empregado: idEmpregado,
        id_projeto: idProjeto,
      });

      console.log(res);
      onAdd(idEmpregado);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable px-2">
        <div className="modal-content border-0 rounded-4 shadow">
          <div className="modal-header border-0 pb-0">
            <div>
              <h4 className="fw-bold mb-1">Adicionar Empregado</h4>
              <p className="text-muted mb-0 small">
                Selecione um empregado para vincular ao projeto
              </p>
            </div>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body pt-3">
            {error && <CardError message={error} />}

            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary"></div>
              </div>
            )}

            {!loading && empregados.length === 0 && !error && (
              <p className="text-muted text-center mb-0">
                Nenhum empregado encontrado.
              </p>
            )}

            {!loading && empregados.length > 0 && (
              <div className="d-flex flex-column gap-3">
                {empregados.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-4 p-3 d-flex align-items-center justify-content-between flex-wrap gap-3"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src="https://i.pravatar.cc/120"
                        alt={item.nome}
                        className="rounded-circle object-fit-cover"
                        width="52"
                        height="52"
                      />

                      <div>
                        <h6 className="mb-0 fw-bold">{item.nome}</h6>
                        <small className="text-muted">{item.email}</small>
                      </div>
                    </div>

                    <button
                      className="btn btn-primary rounded-pill px-4"
                      onClick={() => handlePostEmpregadoProjeto(item.id)}
                    >
                      Adicionar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="modal-footer border-0 pt-0">
            <button
              className="btn btn-light rounded-pill px-4"
              onClick={onClose}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
