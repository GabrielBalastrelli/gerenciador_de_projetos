import { useEffect, useState } from "react";

import { Projeto } from "../../services/ServiceProjeto/Projeto";
import { Empregado } from "../../services/ServiceEmpregado/Empregado";

import { CardProjeto } from "../../components/card-projeto/CardProjeto";
import { CardEmpregado } from "../../components/card-empregado/CardEmpregado";
import { CardError } from "../../components/card-erro/CardError";
import { NavBar } from "../../components/nav-bar/NavBar";

import { useEmpregadoStore } from "../../store/useEmpregadoStore";

import type { IDataEmpregado } from "../../interfaces/interface-empregado";
import type { IGetProjetoResponse } from "../../interfaces/interface-projeto";

export function Home() {
  const consultasProjetos: Projeto = new Projeto();
  const consultasEmpregado: Empregado = new Empregado();

  const email = useEmpregadoStore((set) => set.email);
  const setNomeStore = useEmpregadoStore((set) => set.setNome);
  const setRole = useEmpregadoStore((set) => set.setRole);
  const setEmail = useEmpregadoStore((set) => set.setEmail);
  const setIdEmpregado = useEmpregadoStore((set) => set.setId);

  const [empregado, setEmpregado] = useState<IDataEmpregado | null>(null);
  const [projetos, setProjeto] = useState<IGetProjetoResponse[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) return;

    const fetchEmpregado = async () => {
      try {
        const res = await consultasEmpregado.findEmpregadoEmail("");
        setIdEmpregado(res.id);
        setEmail(res.email);
        setNomeStore(res.nome);
        setRole(res.role);

        setEmpregado(res);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Erro ao consultar o empregado.");
        }
      }
    };

    fetchEmpregado();
  }, []);

  useEffect(() => {
    const fetchProjeto = async () => {
      try {
        const res = await consultasProjetos.findProjeto({
          limit: 3,
          page: 1,
        });

        setProjeto(res.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Erro ao deletar o empregado.");
        }
      }
    };

    fetchProjeto();
  }, []);

  return (
    <>
      <NavBar />

      <div style={{ paddingTop: "80px" }}>
        <div className="container py-4" style={{ maxWidth: "1100px" }}>
          <h1 className="card-title fw-bold fs-4">Dashboard</h1>

          {empregado && <CardEmpregado data={empregado} />}
          {projetos && <CardProjeto data={projetos} />}

          {error && <CardError message={error} />}
        </div>
      </div>
    </>
  );
}
