import { useState } from "react";
import UsuarioList from "./components/UsuarioList";
import PermissaoList from "./components/PermissaoList";
import ProdutoList from "./components/ProdutoList";
import UsuarioPermissoesPage from "./pages/UsuarioPermissoesPage";

function App() {
  const [aba, setAba] = useState<"cadastros" | "permissoes">("cadastros");

  return (
    <div>
      <nav>
        <button onClick={() => setAba("cadastros")}>Cadastros</button>
        <button onClick={() => setAba("permissoes")}>Permissões do usuário</button>
      </nav>

      {aba === "cadastros" ? (
        <>
          <h1>Usuários cadastrados</h1>
          <UsuarioList />

          <h1>Permissões</h1>
          <PermissaoList />

          <h1>Produtos</h1>
          <ProdutoList />
        </>
      ) : (
        <>
          <h1>Atribuir permissões a usuários</h1>
          <UsuarioPermissoesPage />
        </>
      )}
    </div>
  );
}
export default App;
