import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { obterSessao, sair, temPapel } from "../services/auth";

const link = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"
  }`;

function Layout() {
  const navigate = useNavigate();
  const sessao = obterSessao();
  const admin = temPapel("ADMIN");

  function deslogar() {
    sair();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="bg-slate-900 shadow">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-1 px-4 py-3">
          <span className="mr-5 flex items-center gap-2 text-lg font-bold text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-sm">SV</span>
            Sistema de Vendas
          </span>
          <NavLink to="/" end className={link}>Home</NavLink>
          <NavLink to="/produtos" className={link}>Produtos</NavLink>
          <NavLink to="/clientes" className={link}>Clientes</NavLink>
          <NavLink to="/pedidos" className={link}>Pedidos</NavLink>
          {admin && (
            <>
              <NavLink to="/usuarios" className={link}>Usuários</NavLink>
              <NavLink to="/permissoes" className={link}>Permissões</NavLink>
              <NavLink to="/atribuir-permissoes" className={link}>Atribuir Permissões</NavLink>
            </>
          )}
          <div className="ml-auto flex items-center gap-3">
            <div className="text-right leading-tight">
              <p className="text-sm font-medium text-white">{sessao?.nome}</p>
              <p className="text-xs text-slate-400">{admin ? "Administrador" : "Usuário"}</p>
            </div>
            <button
              onClick={deslogar}
              className="cursor-pointer rounded-lg border border-slate-600 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
