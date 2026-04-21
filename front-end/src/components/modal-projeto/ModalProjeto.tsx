import { forwardRef } from "react";
import type { IGetProjetoResponseConvert } from "../../interfaces/interface-projeto";

type Props = {
  projeto: IGetProjetoResponseConvert | null;
};
export const ModalProjeto = forwardRef<HTMLDivElement, Props>(
  ({ projeto }, ref) => {
    return (
      <div ref={ref} className="modal fade" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Novo Projeto criado com sucesso!</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              {projeto && (
                <>
                  <p>Nome Projeto: {projeto.nomeProjeto}</p>
                  <p>Descrição: {projeto.descricao}</p>
                  <p>Orçamento: {projeto.orcamento}</p>
                  <p>Data de Início: {projeto.dataInicio}</p>
                  <p>Data de Conclusão: {projeto.dataFim}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
