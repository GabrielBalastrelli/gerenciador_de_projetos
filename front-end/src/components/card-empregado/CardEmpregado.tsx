import type { IDataEmpregado } from "../../interfaces/interface-empregado";

interface DataEmpregadoProps {
  data: IDataEmpregado;
}

export const CardEmpregado = ({ data }: DataEmpregadoProps) => {
  return (
    <div className="container mt-4">
      <div className="row">
        <h3 className=""> Nome: {data?.nome}</h3>
        <p>Data de contração: {data?.dataContratacao}</p>
        <p>Cargo: {data?.profissao}</p>
      </div>
    </div>
  );
};
