import { useEffect, useState } from "react";
import { NavBar } from "../../components/nav-bar/NavBar";
import { useEmpregadoStore } from "../../store/useEmpregadoStore";
import { CardError } from "../../components/card-erro/CardError";
import { Empregado } from "../../services/ServiceEmpregado/Empregado";

export const PerfilEmpregado = () => {
  const empregadoService = new Empregado();

  const [empregado, setEmpregado] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const nome = useEmpregadoStore((state) => state.nome);
  const email = useEmpregadoStore((state) => state.email);

  useEffect(() => {
    const fetchEmpregado = async () => {
      try {
        const res = await empregadoService.findEmpregadoEmail();
        setEmpregado(res);
      } catch (err: any) {
        setError(err?.message || "Erro interno!");
      }
    };

    fetchEmpregado();
  }, [email]);

  const calcularTempoCasa = (data: string) => {
    if (!data) return "-";

    const admissao = new Date(data);
    const hoje = new Date();

    let anos = hoje.getFullYear() - admissao.getFullYear();
    let meses = hoje.getMonth() - admissao.getMonth();

    if (meses < 0) {
      anos--;
      meses += 12;
    }

    return `${anos} ano(s) e ${meses} mês(es)`;
  };

  return (
    <>
      <NavBar />

      <div
        className="container d-flex justify-content-center"
        style={{ paddingTop: "100px" }}
      >
        <div
          className="card shadow-lg border-0"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <div className="card-body text-center">
            <img
              src="https://i.pravatar.cc/120"
              alt="user"
              width="120"
              height="120"
              className="rounded-circle border border-3 border-primary mb-3"
            />

            <h4 className="fw-bold">{nome}</h4>
            <p className="text-muted">{empregado?.email}</p>

            <hr />

            <div className="text-start">
              <p>
                <strong>Nome:</strong> {empregado?.nome}
              </p>
              <p>
                <strong>Email:</strong> {empregado?.email}
              </p>
              <p>
                <strong>Profissão:</strong> {empregado?.profissao}
              </p>
              <p>
                <strong>Cargo:</strong> {empregado?.role}
              </p>

              <p>
                <strong>Data de Admissão:</strong>{" "}
                {empregado?.dataContratacao
                  ? new Date(empregado.dataContratacao).toLocaleDateString()
                  : "-"}
              </p>

              <p>
                <strong>Tempo de Casa:</strong>{" "}
                {calcularTempoCasa(empregado?.dataContratacao)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && <CardError message={error} />}
    </>
  );
};
