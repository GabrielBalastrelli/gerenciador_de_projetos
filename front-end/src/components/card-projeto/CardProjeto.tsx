import type { IGetProjetoResponse } from "../../interfaces/interface-get-projeto";

interface CardProjetoProps {
  data: IGetProjetoResponse[];
}

export const CardProjeto = ({ data }: CardProjetoProps) => {
  console.log("data no CardProjeto:", data);
  console.log("é array?", Array.isArray(data));
  return (
    <div className="row mt-4">
      {data?.map((item, index) => (
        <div key={index} className="col-4">
          <p>
            <strong>Projeto:</strong> {item.ds_nome}
          </p>
          <p>
            <strong>Descrição:</strong> {item.ds_descricao}
          </p>
          <p>
            Orçamento:{" "}
            {item.orcamento.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
      ))}
    </div>
  );
};
