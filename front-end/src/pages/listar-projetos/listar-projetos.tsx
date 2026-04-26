import { useEffect, useMemo, useState } from "react";
import { NavBar } from "../../components/nav-bar/NavBar";
import { Projeto } from "../../services/ServiceProjeto/Projeto";
import type { IGetProjetoResponse } from "../../interfaces/interface-projeto";
import { CardProjeto } from "../../components/card-projeto/CardProjeto";
import { CardError } from "../../components/card-erro/CardError";
import { Pagination } from "../../components/pagination/Pagination";

export const ListarProjetos = () => {
  const consultasProjetos = useMemo(() => new Projeto(), []);

  const [projetos, setProjetos] = useState<IGetProjetoResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const limite = 10;

  useEffect(() => {
    const fetchProjeto = async () => {
      try {
        const res = await consultasProjetos.findProjeto({
          page: paginaAtual,
          limit: limite,
        });

        setProjetos(res.data);
        setTotalPaginas(Math.ceil(res.total / limite));
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Erro ao buscar projetos");
        }
      }
    };

    fetchProjeto();
  }, [paginaAtual, consultasProjetos]);

  return (
    <>
      <NavBar />

      <div className="container" style={{ paddingTop: "80px" }}>
        <h1 className="text-center mb-4">Lista de projetos da Empresa</h1>

        {error && <CardError message={error} />}

        {projetos.length > 0 && (
          <>
            <CardProjeto data={projetos} />

            <Pagination
              paginaAtual={paginaAtual}
              totalPaginas={totalPaginas}
              onChange={setPaginaAtual}
            />
          </>
        )}
      </div>
    </>
  );
};
