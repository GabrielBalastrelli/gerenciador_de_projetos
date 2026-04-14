import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/page-login/page-login";
import { Cadastro } from "./pages/page-cadastro/page-cadastro";
import { Home } from "./pages/page-home/page-home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
