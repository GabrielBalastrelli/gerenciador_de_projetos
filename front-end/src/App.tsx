import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/page-login/page-login";
import { CadastroEmpregado } from "./pages/page-cadastro/page-cadastro-empregado";
import { Home } from "./pages/page-home/page-home";
import { ConfigEmpregado } from "./pages/config-empregado/configEmpregado";
import { PerfilEmpregado } from "./pages/perfil-empregado/perfilEmpregado";
import { CadastroProjeto } from "./pages/cadastroProjeto/cadastroProjeto";
import { CadastroDemanda } from "./pages/cadastro-demanda/cadastro-demanda";
import { ListarProjetos } from "./pages/listar-projetos/listar-projetos";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastroEmpregado" element={<CadastroEmpregado />} />
        <Route path="/home" element={<Home />} />
        <Route path="/configEmpregado" element={<ConfigEmpregado />} />
        <Route path="/perfilEmpregado" element={<PerfilEmpregado />} />
        <Route path="/cadastroProjeto" element={<CadastroProjeto />} />
        <Route path="/cadastroDemanda" element={<CadastroDemanda />} />
        <Route path="/listarProjetos" element={<ListarProjetos />} />
      </Routes>
    </>
  );
}

export default App;
