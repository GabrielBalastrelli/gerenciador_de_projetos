import { NavBar } from "../../components/nav-bar/NavBar";
export const VinculoEmpregadoProjeto = () => {
  return (
    <>
      <NavBar />
      <div className="container" style={{ paddingTop: "80px" }}>
        <div>
          <h1 className="text-center">Vinculo entre projeto e funcionario</h1>
          <p>Informe o funcionario abaixo</p>
        </div>
        <form>
          <div>
            <label className="form-label">Email:</label>
            <input type="email" className="form-control" />
          </div>
          <div className="mt-4">
            <label className="form-label">Projeto:</label>
            <input type="text" className="form-control" disabled />
          </div>
          <button
            className="btn btn-primary btn-lg w-100 w-md-auto  mt-4"
            type="submit"
          >
            Vincular
          </button>
        </form>
      </div>
    </>
  );
};
