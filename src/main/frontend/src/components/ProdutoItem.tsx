import type { Produto } from "../types/Produto";
import Botao from "./Botao";
import { itemLista, selo } from "./estilos";

interface ProdutoItemProps {
  produto: Produto;
  onEditar: (produto: Produto) => void;
  onExcluir: (id: number) => void;
}

function corEstoque(quantidade: number) {
  if (quantidade === 0) return "bg-red-100 text-red-700";
  if (quantidade <= 5) return "bg-amber-100 text-amber-700";
  return "bg-emerald-100 text-emerald-700";
}

function ProdutoItem({ produto, onEditar, onExcluir }: ProdutoItemProps) {
  return (
    <li className={itemLista}>
      <div className="flex items-center gap-3">
        <span className={`${selo} bg-slate-100 text-slate-600`}>#{produto.id}</span>
        <div>
          <p className="font-medium text-slate-900">{produto.nome}</p>
          <p className="text-sm text-slate-500">{produto.descricao}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className={`${selo} ${corEstoque(produto.quantidade)}`}>Estoque: {produto.quantidade}</span>
        <span className="w-28 text-right font-semibold text-slate-900">R$ {produto.preco.toFixed(2)}</span>
        <div className="flex gap-2">
          <Botao variante="neutro" onClick={() => onEditar(produto)}>Editar</Botao>
          <Botao variante="perigo" onClick={() => onExcluir(produto.id)}>Excluir</Botao>
        </div>
      </div>
    </li>
  );
}

export default ProdutoItem;
