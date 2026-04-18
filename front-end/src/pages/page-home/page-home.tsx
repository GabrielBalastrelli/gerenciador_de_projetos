import { useLocation } from "react-router";
import { useEffect, useState } from "react";

import { Projeto } from "../../services/ConsultasProjeto/Projeto";
import { Empregado } from "../../services/ConsultasEmpregado/Empregado";

import { CardProjeto } from "../../components/card-projeto/CardProjeto";
import { CardEmpregado } from "../../components/card-empregado/CardEmpregado";
import { CardError } from "../../components/card-erro/CardError";

import type { IDataEmpregado } from "../../interfaces/interface-empregado";
import type { IGetProjetoResponse } from "../../interfaces/interface-get-projeto";

export function Home() {
  const consultasProjetos: Projeto = new Projeto();
  const consultasEmpregado: Empregado = new Empregado();

  const location = useLocation();

  const [email, setEmail] = useState(null);
  const [empregado, setEmpregado] = useState<IDataEmpregado | null>(null);
  const [projetos, setProjeto] = useState<IGetProjetoResponse[] | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setEmail(location?.state?.data?.email);
  }, [location]);

  useEffect(() => {
    if (!email) return;
    const fetchEmpregado = async () => {
      try {
        const res = await consultasEmpregado.findEmpregadoEmail(
          email,
          sessionStorage.getItem("userToken"),
        );

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
      try {
        const res = await consultasProjetos.getProjeto({
          limit: 3,
          page: 1,
          token: sessionStorage.getItem("userToken"),
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
    <div className="container py-4">
      <h1>Dashboard</h1>

      {empregado && <CardEmpregado data={empregado} />}

      {projetos && <CardProjeto data={projetos} />}

      {error && (
        <CardError message={error?.message ?? "Erro não identificado!"} />
      )}
    </div>
  );
}
