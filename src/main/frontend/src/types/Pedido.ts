import type { Cliente } from "./Cliente";
import type { Produto } from "./Produto";

export interface Pedido {
  id: number;
  cliente: Cliente;
  produto: Produto;
  quantidade: number;
  valorTotal: number;
  dataPedido: string;
}

export interface PedidoDados {
  clienteId: number;
  produtoId: number;
  quantidade: number;
}
