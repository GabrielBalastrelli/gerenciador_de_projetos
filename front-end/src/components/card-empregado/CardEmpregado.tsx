import type { IDataEmpregado } from "../../interfaces/interface-empregado";
import { NavLink } from "react-router-dom";

interface DataEmpregadoProps {
  data: IDataEmpregado;
}

export const CardEmpregado = ({ data }: DataEmpregadoProps) => {
  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body">
          <h5 className="card-title fw-bold mb-3">👤 {data?.nome}</h5>

          <div className="mb-2">
            <span className="fw-semibold text-secondary">
              Data de contratação:
            </span>
            <p className="mb-0">{data?.dataContratacao}</p>
          </div>

          <div className="mb-2">
            <span className="fw-semibold text-secondary">Cargo:</span>
            <p className="mb-0">{data?.profissao}</p>
          </div>
          <div></div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="badge bg-info p-3">{data?.role}</span>
            <NavLink to="/perfil">
              <button type="button" className="btn btn-primary">
                Editar Perfil
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
