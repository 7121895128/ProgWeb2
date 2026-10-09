import { useEffect, useState } from "react";
import api, { mensagemErro } from "../services/api";
import type { Permissao } from "../types/Permissao";
import PermissaoForm from "../components/PermissaoForm";
import PermissaoList from "../components/PermissaoList";

function PermissoesPage() {
  const [itens, setItens] = useState<Permissao[]>([]);
  const [editando, setEditando] = useState<Permissao | null>(null);
  const [erro, setErro] = useState("");

  async function carregar() {
    const resposta = await api.get<Permissao[]>("/permissoes");
    setItens(resposta.data);
  }

  useEffect(() => {
    carregar().catch((e) => setErro(mensagemErro(e)));
  }, []);

  async function salvar(dados: Omit<Permissao, "id">): Promise<boolean> {
    try {
      if (editando) {
        await api.put(`/permissoes/${editando.id}`, dados);
      } else {
        await api.post("/permissoes", dados);
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
      await api.delete(`/permissoes/${id}`);
      await carregar();
      if (editando?.id === id) setEditando(null);
      setErro("");
    } catch (e) {
      setErro(mensagemErro(e));
    }
  }

  return (
    <section>
      <h1>Permissões</h1>
      {erro && <p style={{ color: "crimson" }}>{erro}</p>}
      <PermissaoForm editando={editando} onSalvar={salvar} onCancelar={() => setEditando(null)} />
      <PermissaoList permissoes={itens} onEditar={setEditando} onExcluir={excluir} />
    </section>
  );
}

export default PermissoesPage;
