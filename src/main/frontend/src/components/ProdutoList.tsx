import type { Produto } from "../types/Produto";
import ProdutoItem from "./ProdutoItem";
import { lista, listaVazia } from "./estilos";

interface ProdutoListProps {
  produtos: Produto[];
  onEditar: (produto: Produto) => void;
  onExcluir: (id: number) => void;
}

function ProdutoList({ produtos, onEditar, onExcluir }: ProdutoListProps) {
  if (produtos.length === 0) {
    return <p className={listaVazia}>Nenhum produto cadastrado.</p>;
  }

  return (
    <ul className={lista}>
      {produtos.map((produto) => (
        <ProdutoItem
          key={produto.id}
          produto={produto}
          onEditar={onEditar}
          onExcluir={onExcluir}
        />
      ))}
    </ul>
  );
}

export default ProdutoList;
