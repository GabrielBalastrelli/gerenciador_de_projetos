import { useState } from "react";
import { useEmpregadoStore } from "../../store/useEmpregadoStore";

import { Demanda } from "../../services/serviceDemanda/Demanda";
import { DemandaSchema } from "../../shemas-zod/demandaSchema";
import { CardError } from "../card-erro/CardError";

type Props = {
  idProjetoProp: string;
  open: boolean;
  setOpen: (state: boolean) => void;
};

export const ModalDemandas = ({ idProjetoProp, setOpen, open }: Props) => {
  const DemandaServices = new Demanda();

  const id: string = useEmpregadoStore((state) => state.id);
  const [nomeDemanda, setNomeDemanda] = useState<string | null>(null);
  const [idProjeto, setIdProjeto] = useState<string>(idProjetoProp);
  const [idEmpregado, setIdEmpregado] = useState<string>(id);
  const [dataInicio, setDataInicio] = useState<string | null>(null);
  const [dataFim, setDataFim] = useState<string | null>(null);
  const [descricao, setDescricao] = useState<string | null>(null);
  const [error, setError] = useState<string[] | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = DemandaSchema.safeParse({
      nomeDemanda,
      idProjeto,
      idEmpregado,
      dataInicio,
      dataFim,
      descricao,
    });

    if (!data.success) {
      const errors = data.error.issues.map((err) => err.message);
      setError(errors);
      return;
    }

    try {
      const res = await DemandaServices.postDemanda(data.data);
      setOpen(false);
    } catch (error) {}
  };

  return (
    <>
      {open && (
        <div className="modal d-block" tabIndex={-1}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nova Demanda</h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setOpen(false)}
                ></button>
              </div>

              <div className="modal-body">
                <form method="" onSubmit={handleSubmit}>
                  <div className="mb-3 form-group">
                    <label className="form-label">Nome da Demanda: </label>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      onChange={(event) => setNomeDemanda(event.target.value)}
                    />
                  </div>
                  <div className="mb-3 form-group">
                    <label className="form-label">Id Projeto: </label>
                    <input
                      disabled
                      className="form-control form-control-lg"
                      type="text"
                      value={idEmpregado}
                      onChange={(event) => setIdProjeto(event.target.value)}
                    />
                  </div>
                  <div className="mb-3 form-group">
                    <label className="form-label">Id Empregado: </label>
                    <input
                      disabled
                      className="form-control form-control-lg"
                      type="text"
                      value={idEmpregado}
                      onChange={(event) => setIdEmpregado(event.target.value)}
                    />
                  </div>
                  <div className="mb-3 form-group">
                    <label className="form-label">Descrição da Demanda: </label>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      onChange={(event) => setDescricao(event.target.value)}
                    />
                  </div>
                  <div className="mb-3 form-group">
                    <label className="form-label">Data de Inicío: </label>
                    <input
                      className="form-control form-control-lg"
                      type="date"
                      onChange={(event) => setDataInicio(event.target.value)}
                    />
                  </div>
                  <div className="mb-3 form-group">
                    <label className="form-label">Data de Fim: </label>
                    <input
                      className="form-control form-control-lg"
                      type="date"
                      onChange={(event) => setDataFim(event.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn-primary btn-lg w-100 w-md-auto"
                    type="submit"
                  >
                    {" "}
                    Criar Demanda
                  </button>
                </form>
              </div>
              {error &&
                error.map((erro, index: number) => (
                  <CardError
                    message={erro || "Erro Desconhecido"}
                    key={index}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
