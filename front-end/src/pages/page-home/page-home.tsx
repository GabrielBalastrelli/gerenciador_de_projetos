import { useLocation } from "react-router";
import { useEffect, useState } from "react";

import { Projeto } from "../../services/ConsultasProjeto/Projeto";

import type { IGetProjetoResponse } from "../../interfaces/interface-get-projeto";

export function Home() {
  const consultasProjetos: Projeto = new Projeto();
  const location = useLocation();

  const [empregado, setEmpregado] = useState(null);
  const [projeto, setProjeto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setEmpregado(location?.state?.data);
  }, [location]);

  useEffect(() => {
    const fetchProjeto = async () => {
      try {
        const res = await consultasProjetos.getProjeto({
          limit: 3,
          page: 1,
          token: sessionStorage.getItem("userToken"),
        });
        setProjeto(res);
        console.log(res);
      } catch (error) {
        setError(error);
      }
    };

    fetchProjeto();
  }, []);

  return <div></div>;
}
