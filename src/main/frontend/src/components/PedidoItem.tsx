import type { Pedido } from "../types/Pedido";
import Botao from "./Botao";
import { itemLista, selo } from "./estilos";

interface PedidoItemProps {
  pedido: Pedido;
  onEditar: (pedido: Pedido) => void;
  onExcluir: (id: number) => void;
}

function PedidoItem({ pedido, onEditar, onExcluir }: PedidoItemProps) {
  const data = pedido.dataPedido.split("-").reverse().join("/");

  return (
    <li className={itemLista}>
      <div className="flex items-center gap-3">
        <span className={`${selo} bg-slate-100 text-slate-600`}>#{pedido.id}</span>
        <div>
          <p className="font-medium text-slate-900">{pedido.cliente.nome}</p>
          <p className="text-sm text-slate-500">
            {pedido.quantidade}x {pedido.produto.nome} · {data}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-28 text-right font-semibold text-emerald-700">R$ {pedido.valorTotal.toFixed(2)}</span>
        <div className="flex gap-2">
          <Botao variante="neutro" onClick={() => onEditar(pedido)}>Editar</Botao>
          <Botao variante="perigo" onClick={() => onExcluir(pedido.id)}>Excluir</Botao>
        </div>
      </div>
    </li>
  );
}

export default PedidoItem;
