import { forwardRef } from "react";
import type { IDataEmpregado } from "../../interfaces/interface-empregado";

type Props = {
  empregado: IDataEmpregado | null;
};

export const ModalEmpregado = forwardRef<HTMLDivElement, Props>(
  ({ empregado }, ref) => {
    return (
      <div ref={ref} className="modal fade" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Novo Empregado criado com sucesso!
              </h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              {empregado && (
                <>
                  <p>Nome: {empregado.nome}</p>
                  <p>Profissão: {empregado.profissao}</p>
                  <p>E-mail: {empregado.email}</p>
                  <p>Data de Admissão: {empregado.dataContratacao}</p>
                  <p>Id Registrado: {empregado.id}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
