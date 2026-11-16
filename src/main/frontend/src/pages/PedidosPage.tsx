import { useEffect, useState } from "react";
import api, { mensagemErro } from "../services/api";
import type { Cliente } from "../types/Cliente";
import type { Produto } from "../types/Produto";
import type { Pedido, PedidoDados } from "../types/Pedido";
import PedidoForm from "../components/PedidoForm";
import PedidoList from "../components/PedidoList";
import { avisoErro, titulo } from "../components/estilos";

function PedidosPage() {
  const [itens, setItens] = useState<Pedido[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editando, setEditando] = useState<Pedido | null>(null);
  const [erro, setErro] = useState("");

  async function carregar() {
    const [pedidos, listaClientes, listaProdutos] = await Promise.all([
      api.get<Pedido[]>("/pedidos"),
      api.get<Cliente[]>("/clientes"),
      api.get<Produto[]>("/produtos"),
    ]);
    setItens(pedidos.data);
    setClientes(listaClientes.data);
    setProdutos(listaProdutos.data);
  }

  useEffect(() => {
    carregar().catch((e) => setErro(mensagemErro(e)));
  }, []);

  async function salvar(dados: PedidoDados): Promise<boolean> {
    try {
      if (editando) {
        await api.put(`/pedidos/${editando.id}`, dados);
      } else {
        await api.post("/pedidos", dados);
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
      await api.delete(`/pedidos/${id}`);
      await carregar();
      if (editando?.id === id) setEditando(null);
      setErro("");
    } catch (e) {
      setErro(mensagemErro(e));
    }
  }

  return (
    <section>
      <h1 className={titulo}>Pedidos</h1>
      {erro && <p className={avisoErro}>{erro}</p>}
      <PedidoForm
        clientes={clientes}
        produtos={produtos}
        editando={editando}
        onSalvar={salvar}
        onCancelar={() => setEditando(null)}
      />
      <PedidoList pedidos={itens} onEditar={setEditando} onExcluir={excluir} />
    </section>
  );
}

export default PedidosPage;
