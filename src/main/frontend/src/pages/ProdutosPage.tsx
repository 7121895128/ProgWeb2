import { useEffect, useState } from "react";
import api, { mensagemErro } from "../services/api";
import type { Produto } from "../types/Produto";
import ProdutoForm from "../components/ProdutoForm";
import ProdutoList from "../components/ProdutoList";

function ProdutosPage() {
  const [itens, setItens] = useState<Produto[]>([]);
  const [editando, setEditando] = useState<Produto | null>(null);
  const [erro, setErro] = useState("");

  async function carregar() {
    const resposta = await api.get<Produto[]>("/produtos");
    setItens(resposta.data);
  }

  useEffect(() => {
    carregar().catch((e) => setErro(mensagemErro(e)));
  }, []);

  async function salvar(dados: Omit<Produto, "id">): Promise<boolean> {
    try {
      if (editando) {
        await api.put(`/produtos/${editando.id}`, dados);
      } else {
        await api.post("/produtos", dados);
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
      await api.delete(`/produtos/${id}`);
      await carregar();
      if (editando?.id === id) setEditando(null);
      setErro("");
    } catch (e) {
      setErro(mensagemErro(e));
    }
  }

  return (
    <section>
      <h1>Produtos</h1>
      {erro && <p style={{ color: "crimson" }}>{erro}</p>}
      <ProdutoForm editando={editando} onSalvar={salvar} onCancelar={() => setEditando(null)} />
      <ProdutoList produtos={itens} onEditar={setEditando} onExcluir={excluir} />
    </section>
  );
}

export default ProdutosPage;
