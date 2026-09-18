import { useEffect, useState } from "react";
import api from "../services/api";
import type { Produto } from "../types/Produto";
import ProdutoItem from "./ProdutoItem";
import ProdutoForm from "./ProdutoForm";

function ProdutoList() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editando, setEditando] = useState<Produto | null>(null);

  function carregarProdutos() {
    api.get<Produto[]>("/produtos").then((resposta) => {
      setProdutos(resposta.data);
    });
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function excluir(id: number) {
    await api.delete(`/produtos/${id}`);
    carregarProdutos();
  }

  return (
    <div>
      <ProdutoForm
        key={editando?.id ?? "novo"}
        produtoEditando={editando}
        onProdutoSalvo={() => {
          carregarProdutos();
          setEditando(null);
        }}
      />

      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            <ProdutoItem produto={produto} />
            <button onClick={() => setEditando(produto)}>Editar</button>
            <button onClick={() => excluir(produto.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProdutoList;
