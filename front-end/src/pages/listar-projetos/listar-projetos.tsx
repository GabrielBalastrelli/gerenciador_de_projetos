import { useEffect, useMemo, useState } from "react";
import { NavBar } from "../../components/nav-bar/NavBar";
import { Projeto } from "../../services/ServiceProjeto/Projeto";
import type { IGetProjetoResponse } from "../../interfaces/interface-projeto";
import { CardProjeto } from "../../components/card-projeto/CardProjeto";
import { CardError } from "../../components/card-erro/CardError";

export const ListarProjetos = () => {
  const consultasProjetos = useMemo(() => new Projeto(), []);

  const [projetos, setProjetos] = useState<IGetProjetoResponse[] | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjeto = async () => {
      const token: string | null = sessionStorage.getItem("userToken");

      if (!token) return;

      try {
        const res = await consultasProjetos.findProjeto({
          limit: 10,
          page: 1,
        });

        setProjetos(res);
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
      <div style={{ paddingTop: "80px" }} className="container">
        <h1 className="text-center mt-2">Lista de projetos da Empresa</h1>
        {projetos && <CardProjeto data={projetos} />}
        {error && <CardError message={error} />}
      </div>
    </>
  );
};
