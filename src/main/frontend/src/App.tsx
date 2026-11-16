import type { ReactNode } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import UsuariosPage from "./pages/UsuariosPage";
import UsuarioDetailPage from "./pages/UsuarioDetailPage";
import PermissoesPage from "./pages/PermissoesPage";
import UsuarioPermissoesPage from "./pages/UsuarioPermissoesPage";
import ProdutosPage from "./pages/ProdutosPage";
import ClientesPage from "./pages/ClientesPage";
import PedidosPage from "./pages/PedidosPage";
import { obterToken, temPapel } from "./services/auth";

interface RequireAuthProps {
  children: ReactNode;
  papel?: string;
}

function RequireAuth({ children, papel }: RequireAuthProps) {
  if (!obterToken()) {
    return <Navigate to="/login" replace />;
  }
  if (papel && !temPapel(papel)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<RequireAuth><Layout /></RequireAuth>}>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<ProdutosPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/pedidos" element={<PedidosPage />} />

        <Route element={<RequireAuth papel="ADMIN"><Outlet /></RequireAuth>}>
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/usuarios/:id" element={<UsuarioDetailPage />} />
          <Route path="/permissoes" element={<PermissoesPage />} />
          <Route path="/atribuir-permissoes" element={<UsuarioPermissoesPage />} />
        </Route>

        <Route path="*" element={<h1 className="text-2xl font-bold text-gray-800">Página não encontrada</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
