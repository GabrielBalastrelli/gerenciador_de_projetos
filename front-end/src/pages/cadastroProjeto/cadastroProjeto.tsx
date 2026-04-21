import { useState, useEffect, useRef } from "react";
import { Projeto } from "../../services/ServiceProjeto/Projeto";
import { NavBar } from "../../components/nav-bar/NavBar";
import { CardError } from "../../components/card-erro/CardError";
import { ModalProjeto } from "../../components/modal-projeto/ModalProjeto";

import type {
  IDataProjetoParams,
  IGetProjetoResponseConvert,
} from "../../interfaces/interface-projeto";
import axios from "axios";
import { Modal } from "bootstrap";

export const CadastroProjeto = () => {
  const projetoService = new Projeto();

  const modalRef = useRef<HTMLDivElement | null>(null);

  const [error, setError] = useState<string[] | null>(null);
  const [nomeProjeto, setNomeProjeto] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [orcamento, setOrcamento] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");
  const [projeto, setProjeto] = useState<IGetProjetoResponseConvert | null>(
    null,
  );
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);

    const data: IDataProjetoParams = {
      ds_nome: nomeProjeto,
      ds_descricao: descricao,
      orcamento: Number(orcamento),
      dt_inicio: new Date(dataInicio),
      dt_fim: new Date(dataFim),
    };

    try {
      const res = await projetoService.postProjeto(data);
      setProjeto(res);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.errors || ["Erro na requisição"]);
      } else {
        setError(["Erro inesperado!"]);
      }
    }
  };

  useEffect(() => {
    if (projeto && modalRef.current) {
      const modal = new Modal(modalRef.current);
      modal.show();
    }
  }, [projeto]);

  return (
    <>
      <NavBar />
      <form
        className="container mt-4"
        style={{ paddingTop: "80px" }}
        method=""
        onSubmit={handleSubmit}
      >
        <div className="mb-3 form-group">
          <label className="form-label">Nome do Projeto: </label>
          <input
            className="form-control form-control-lg"
            type="text"
            onChange={(event) => setNomeProjeto(event.target.value)}
          />
        </div>
        <div className="mb-3 form-group">
          <label className="form-label">Descrição: </label>
          <input
            className="form-control form-control-lg"
            type="text"
            onChange={(event) => setDescricao(event.target.value)}
          />
        </div>
        <div className="mb-3 form-group">
          <label className="form-label">Orçamento: </label>
          <input
            className="form-control form-control-lg"
            type="text"
            onChange={(event) => setOrcamento(event.target.value)}
          />
        </div>
        <div className="mb-3 form-group">
          <label className="form-label">Data de Inicio: </label>
          <input
            className="form-control form-control-lg"
            type="date"
            onChange={(event) => setDataInicio(event.target.value)}
          />
        </div>
        <div className="mb-3 form-group">
          <label className="form-label">Data de Entrega: </label>
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
          Criar Projeto
        </button>
      </form>
      {error &&
        error.map((erro, index: number) => (
          <CardError message={erro || "Erro Desconhecido"} key={index} />
        ))}
      <ModalProjeto ref={modalRef} projeto={projeto} />
    </>
  );
};
