import { NavLink } from "react-router-dom";
import { useEmpregadoStore } from "../../store/useEmpregadoStore";
import { toUpperCase } from "zod";

export const NavBar = () => {
  const nome: string = useEmpregadoStore((state) => state.nome);
  const role: string = useEmpregadoStore((state) => state.role);
  console.log(role.toUpperCase() === "gerente".toLocaleUpperCase());
  console.log(role);
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top shadow-sm"
      style={{
        background: "linear-gradient(90deg, #0d6efd, #6610f2)",
      }}
    >
      <div className="container-fluid px-4">
        {/* Toggle mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-2">
            <li className="nav-item">
              <NavLink className="nav-link text-white fw-semibold" to="/home">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link text-white fw-semibold"
                to="/projetos"
              >
                Projetos
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white fw-semibold"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Opções
              </a>

              <ul className="dropdown-menu shadow border-0">
                <li>
                  <NavLink className="dropdown-item" to="/criarProjeto">
                    Criar Projeto
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/criarDemanda">
                    Criar Demanda
                  </NavLink>
                </li>
                <li>
                  {role.toUpperCase() === "gerente".toLocaleUpperCase() && (
                    <NavLink className="dropdown-item" to="/CriarEmpregado">
                      Cadastrar Empregado
                    </NavLink>
                  )}
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="dropdown d-flex align-items-center gap-3">
          <p className="mb-0 text-white fw-semibold">{nome}</p>

          <img
            src="https://i.pravatar.cc/60"
            alt="user"
            width="45"
            height="45"
            className="rounded-circle border border-2 border-white dropdown-toggle"
            style={{ cursor: "pointer" }}
            data-bs-toggle="dropdown"
          />

          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <NavLink to="/perfil">
                <button className="dropdown-item">Perfil</button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/configEmpregado">
                <button className="dropdown-item">Configurações</button>
              </NavLink>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item text-danger">Sair</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
