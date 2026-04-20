import { isAxiosError } from "axios";
import { authLogin } from "../../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router";

import { useEmpregadoStore } from "../../store/useEmpregadoStore";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setEmailStore = useEmpregadoStore((set) => set.setEmail);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("E-mail e senha são obrigatórios!");
      return;
    }

    try {
      const data = await authLogin(email, password);

      sessionStorage.setItem("userToken", data.token);

      setEmailStore(email);

      navigate("/home", {
        state: {
          data: email,
        },
      });
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.message);
      } else {
        setError("Erro ao fazer desconhecido.");
      }
      return;
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <div className="mb-3">
          <label>E-mail</label>
          <input
            className="form-control w-100"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Senha</label>
          <input
            className="form-control w-100"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          Entrar
        </button>
        {error && (
          <div className="alert alert-danger mt-3 text-center">{error}</div>
        )}
      </div>
    </div>
  );
}
