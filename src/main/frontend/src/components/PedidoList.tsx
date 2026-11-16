import type { Pedido } from "../types/Pedido";
import PedidoItem from "./PedidoItem";
import { lista, listaVazia } from "./estilos";

interface PedidoListProps {
  pedidos: Pedido[];
  onEditar: (pedido: Pedido) => void;
  onExcluir: (id: number) => void;
}

function PedidoList({ pedidos, onEditar, onExcluir }: PedidoListProps) {
  if (pedidos.length === 0) {
    return <p className={listaVazia}>Nenhum pedido registrado.</p>;
  }

  return (
    <ul className={lista}>
      {pedidos.map((pedido) => (
        <PedidoItem
          key={pedido.id}
          pedido={pedido}
          onEditar={onEditar}
          onExcluir={onExcluir}
        />
      ))}
    </ul>
  );
}

export default PedidoList;
