import { useEffect, useState } from "react";
import api, { mensagemErro } from "../services/api";
import type { Usuario, UsuarioDados } from "../types/Usuario";
import UsuarioForm from "../components/UsuarioForm";
import UsuarioList from "../components/UsuarioList";

function UsuariosPage() {
  const [itens, setItens] = useState<Usuario[]>([]);
  const [editando, setEditando] = useState<Usuario | null>(null);
  const [erro, setErro] = useState("");

  async function carregar() {
    const resposta = await api.get<Usuario[]>("/usuarios");
    setItens(resposta.data);
  }

  useEffect(() => {
    carregar().catch((e) => setErro(mensagemErro(e)));
  }, []);

  async function salvar(dados: UsuarioDados): Promise<boolean> {
    try {
      if (editando) {
        await api.put(`/usuarios/${editando.id}`, dados);
      } else {
        await api.post("/usuarios", dados);
      }
      await carregar();
      setEditando(null);
      setErro("");
      return true;
    } catch (e) {
      setErro(mensagemErro(e));
      return false;
    }
  }

  async function excluir(id: number) {
    try {
      await api.delete(`/usuarios/${id}`);
      await carregar();
      if (editando?.id === id) setEditando(null);
      setErro("");
    } catch (e) {
      setErro(mensagemErro(e));
    }
  }

  return (
    <section>
      <h1>Usuários cadastrados</h1>
      {erro && <p style={{ color: "crimson" }}>{erro}</p>}
      <UsuarioForm editando={editando} onSalvar={salvar} onCancelar={() => setEditando(null)} />
      <UsuarioList usuarios={itens} onEditar={setEditando} onExcluir={excluir} />
    </section>
  );
}

export default UsuariosPage;
