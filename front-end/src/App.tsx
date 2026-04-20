import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/page-login/page-login";
import { CadastroEmpregado } from "./pages/page-cadastro/page-cadastro-empregado";
import { Home } from "./pages/page-home/page-home";
import { ConfigEmpregado } from "./pages/confi-empregado/configEmpregado";
import { Perfil } from "./pages/perfil/perfil";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastroEmpregado" element={<CadastroEmpregado />} />
        <Route path="/home" element={<Home />} />
        <Route path="/configEmpregado" element={<ConfigEmpregado />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </>
  );
}

export default App;
