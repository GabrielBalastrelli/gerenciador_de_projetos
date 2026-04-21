import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useEmpregadoStore } from "../../store/useEmpregadoStore";

export const NavBar = () => {
  const nome = useEmpregadoStore((state) => state.nome);
  const role = useEmpregadoStore((state) => state.role);

  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const menuRef = useRef<HTMLLIElement | null>(null);
  const userRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (menuRef.current && !menuRef.current.contains(target)) {
        setMenuOpen(false);
      }

      if (userRef.current && !userRef.current.contains(target)) {
        setUserOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setUserOpen(false);
      }
    }

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top shadow-sm"
      style={{
        background: "linear-gradient(90deg, #0d6efd, #6610f2)",
      }}
    >
      <div className="container-fluid px-4">
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU PRINCIPAL */}
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

            <li className="nav-item position-relative" ref={menuRef}>
              <button
                type="button"
                className="nav-link text-white fw-semibold bg-transparent border-0"
                onClick={() => setMenuOpen((v) => !v)}
              >
                Opções
              </button>

              {menuOpen && (
                <ul className="dropdown-menu show shadow border-0 position-absolute">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/cadastroProjeto"
                      onClick={() => setMenuOpen(false)}
                    >
                      Criar Projeto
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className="dropdown-item"
                      to=""
                      onClick={() => setMenuOpen(false)}
                    >
                      Criar Demanda
                    </NavLink>
                  </li>

                  {role?.toUpperCase() === "GERENTE" && (
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/cadastroEmpregado"
                        onClick={() => setMenuOpen(false)}
                      >
                        Cadastrar Empregado
                      </NavLink>
                    </li>
                  )}
                </ul>
              )}
            </li>
          </ul>
        </div>

        <div
          className="d-flex align-items-center gap-3 position-relative"
          ref={userRef}
        >
          <p className="mb-0 text-white fw-semibold">{nome}</p>

          <img
            src="https://i.pravatar.cc/60"
            alt="user"
            width="45"
            height="45"
            className="rounded-circle border border-2 border-white"
            style={{ cursor: "pointer" }}
            onClick={() => setUserOpen((v) => !v)}
          />

          {userOpen && (
            <ul className="dropdown-menu dropdown-menu-end show shadow position-absolute top-100 end-0 mt-2">
              <li>
                <NavLink
                  to="/perfilEmpregado"
                  className="dropdown-item"
                  onClick={() => setUserOpen(false)}
                >
                  Perfil
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/configEmpregado"
                  className="dropdown-item"
                  onClick={() => setUserOpen(false)}
                >
                  Configurações
                </NavLink>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <button className="dropdown-item text-danger">Sair</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};
