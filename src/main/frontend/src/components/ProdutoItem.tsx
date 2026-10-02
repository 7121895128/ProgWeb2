import type { Produto } from "../types/Produto";

interface ProdutoItemProps {
  produto: Produto;
  onEditar: (produto: Produto) => void;
  onExcluir: (id: number) => void;
}

function ProdutoItem({ produto, onEditar, onExcluir }: ProdutoItemProps) {
  return (
    <li>
      <strong>{produto.nome}</strong> — {produto.descricao} — R$ {produto.preco.toFixed(2)} — Qtd:{" "}
      {produto.quantidade}{" "}
      <button onClick={() => onEditar(produto)}>Editar</button>
      <button onClick={() => onExcluir(produto.id)}>Excluir</button>
    </li>
  );
}

export default ProdutoItem;
