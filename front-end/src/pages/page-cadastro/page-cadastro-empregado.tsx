import { useEffect, useState, useRef } from "react";
import { NavBar } from "../../components/nav-bar/NavBar";
import type {
  IDataEmpregado,
  IDataEmpregadoForm,
} from "../../interfaces/interface-empregado";

import { Modal } from "bootstrap";

import { Empregado } from "../../services/ServiceEmpregado/Empregado";

import { CardError } from "../../components/card-erro/CardError";
import { ModalEmpregado } from "../../components/modal-empregado/ModalEmpregado";

export function CadastroEmpregado() {
  const empregadoService = new Empregado();

  const modalRef = useRef<HTMLDivElement | null>(null);

  const [empregado, setEmpregado] = useState<IDataEmpregado | null>(null);

  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [salario, setSalario] = useState(null);
  const [profissao, setProfissao] = useState("");
  const [role, setRole] = useState("Funcionario");
  const [dataAdmissao, setDataAdmissao] = useState(new Date());
  const [dataNascimento, setDataNascimento] = useState(null);
  const [error, setError] = useState(null);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const data: IDataEmpregadoForm = {
      nome,
      email,
      cpf,
      password,
      dataAdmissao,
      dataNascimento,
      role,
      salario,
      profissao,
    };

    try {
      const res = await empregadoService.postEmpregado(data);
      setEmpregado(res);
    } catch (error) {
      setError(error.errors);
    }
  };

  useEffect(() => {
    if (empregado && modalRef.current) {
      const modal = new Modal(modalRef.current);
      modal.show();
    }
  }, [empregado]);

  return (
    <>
      <NavBar />
      <form
        className="container mt-4 "
        style={{ paddingTop: "80px" }}
        method=""
        onSubmit={handlerSubmit}
      >
        <div className=" mb-3 form-group">
          <label className="form-label">Nome: </label>
          <input
            name="nome"
            type="text"
            className="form-control form-control-lg"
            onChange={(event) => setNome(event.target.value)}
          />
        </div>
        <div className=" mb-3 form-group">
          <label className="form-label">Email: </label>
          <input
            name="email"
            type="email"
            className="form-control form-control-lg"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className=" mb-3 form-group">
          <label className="form-label">CPF: </label>
          <input
            name="cpf"
            type="text"
            className="form-control form-control-lg"
            onChange={(event) => setCpf(event.target.value)}
          />
        </div>
        <div className=" mb-3 form-group">
          <label className="form-label">Profissão: </label>
          <input
            name="profissao"
            type="text"
            className="form-control form-control-lg"
            onChange={(event) => setProfissao(event.target.value)}
          />
        </div>
        <div className=" mb-3 form-group">
          <label className="form-label">Sálario: </label>
          <input
            name="salario"
            type="text"
            className="form-control form-control-lg"
            onChange={(event) => setSalario(Number(event.target.value))}
          />
        </div>
        <div className=" mb-3 form-group">
          <label className="form-label">Data de Nascimento: </label>
          <input
            name="dataNascimento"
            type="date"
            className="form-control form-control-lg"
            onChange={(event) => setDataNascimento(event.target.value)}
          />
        </div>
        <div className=" mb-3 form-group">
          <label className="form-label">Senha do Funcionário: </label>
          <input
            name="password"
            type="password"
            className="form-control form-control-lg"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button
          className="btn btn-primary btn-lg w-100 w-md-auto"
          type="submit"
        >
          {" "}
          Cadastrar
        </button>
      </form>
      {error &&
        error.map((erro, index: number) => (
          <CardError message={erro || "Erro Desconhecido"} key={index} />
        ))}
      <ModalEmpregado ref={modalRef} empregado={empregado} />
    </>
  );
}
