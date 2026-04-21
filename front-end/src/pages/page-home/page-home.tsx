import { useEffect, useState } from "react";

import { Projeto } from "../../services/ConsultasProjeto/Projeto";
import { Empregado } from "../../services/ServiceEmpregado/Empregado";

import { CardProjeto } from "../../components/card-projeto/CardProjeto";
import { CardEmpregado } from "../../components/card-empregado/CardEmpregado";
import { CardError } from "../../components/card-erro/CardError";
import { NavBar } from "../../components/nav-bar/NavBar";

import { useEmpregadoStore } from "../../store/useEmpregadoStore";

import type { IDataEmpregado } from "../../interfaces/interface-empregado";
import type { IGetProjetoResponse } from "../../interfaces/interface-get-projeto";

export function Home() {
  const consultasProjetos: Projeto = new Projeto();
  const consultasEmpregado: Empregado = new Empregado();

  const setNomeStore = useEmpregadoStore((set) => set.setNome);
  const email = useEmpregadoStore((set) => set.email);
  const setRole = useEmpregadoStore((set) => set.setRole);

  const [empregado, setEmpregado] = useState<IDataEmpregado | null>(null);
  const [projetos, setProjeto] = useState<IGetProjetoResponse[] | null>(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem("userToken"));

  useEffect(() => {
    if (!email) return;
    const fetchEmpregado = async () => {
      try {
        const res = await consultasEmpregado.findEmpregadoEmail();

        setNomeStore(res.nome);
        setRole(res.role);
        setEmpregado(res);
      } catch (error) {
        setError(error);
        return;
      }
    };

    fetchEmpregado();
  }, [email]);

  useEffect(() => {
    const fetchProjeto = async () => {
      if (!token) return;
      try {
        const res = await consultasProjetos.getProjeto({
          limit: 3,
          page: 1,
          token,
        });

        setProjeto(res);
      } catch (error) {
        setError(error);
        return;
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

          {error && (
            <CardError message={error?.message ?? "Erro não identificado!"} />
          )}
        </div>
      </div>
    </>
  );
}
