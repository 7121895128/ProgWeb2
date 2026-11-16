import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { salvarSessao, type Sessao } from "../services/auth";
import { avisoErro, campo } from "../components/estilos";

const rotulo = "mb-1 block text-sm font-medium text-slate-700";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function entrar(e: FormEvent) {
    e.preventDefault();
    try {
      const resposta = await api.post<Sessao>("/login", { username, senha });
      salvarSessao(resposta.data);
      navigate("/");
    } catch {
      setErro("Usuário ou senha inválidos");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 bg-linear-to-br from-slate-900 to-indigo-950 px-4">
      <form onSubmit={entrar} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">SV</span>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Sistema de Vendas</h1>
            <p className="text-sm text-slate-500">Entre com seu usuário e senha</p>
          </div>
        </div>

        {erro && <p className={avisoErro}>{erro}</p>}

        <label className={rotulo}>Usuário</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="admin"
          className={`${campo} mb-4`}
        />

        <label className={rotulo}>Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="••••••••"
          className={`${campo} mb-6`}
        />

        <button className="w-full cursor-pointer rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
