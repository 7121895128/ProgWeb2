import { type FormEvent, useEffect, useState } from "react";
import type { Cliente } from "../types/Cliente";
import type { Produto } from "../types/Produto";
import type { Pedido, PedidoDados } from "../types/Pedido";
import Botao from "./Botao";
import { campo, formulario, tituloForm } from "./estilos";

interface PedidoFormProps {
  clientes: Cliente[];
  produtos: Produto[];
  editando: Pedido | null;
  onSalvar: (dados: PedidoDados) => Promise<boolean>;
  onCancelar: () => void;
}

function PedidoForm({ clientes, produtos, editando, onSalvar, onCancelar }: PedidoFormProps) {
  const [clienteId, setClienteId] = useState("");
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState("");

  useEffect(() => {
    setClienteId(editando?.cliente.id.toString() ?? "");
    setProdutoId(editando?.produto.id.toString() ?? "");
    setQuantidade(editando?.quantidade.toString() ?? "");
  }, [editando]);

  const produtoSelecionado = produtos.find((p) => p.id === Number(produtoId));
  const total = produtoSelecionado ? produtoSelecionado.preco * Number(quantidade) : 0;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const ok = await onSalvar({
      clienteId: Number(clienteId),
      produtoId: Number(produtoId),
      quantidade: Number(quantidade),
    });
    if (ok) {
      setClienteId("");
      setProdutoId("");
      setQuantidade("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`${formulario} md:grid-cols-4`}>
      <h2 className={tituloForm}>{editando ? "Editar pedido" : "Novo pedido"}</h2>
      <select className={campo} value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
        <option value="">Selecione o cliente</option>
        {clientes.map((cliente) => (
          <option key={cliente.id} value={cliente.id}>
            {cliente.nome}
          </option>
        ))}
      </select>
      <select className={campo} value={produtoId} onChange={(e) => setProdutoId(e.target.value)} required>
        <option value="">Selecione o produto</option>
        {produtos.map((produto) => (
          <option key={produto.id} value={produto.id}>
            {produto.nome} — R$ {produto.preco.toFixed(2)} (estoque: {produto.quantidade})
          </option>
        ))}
      </select>
      <input
        className={campo}
        type="number"
        min="1"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
        placeholder="Quantidade"
      />
      <div className="flex gap-2">
        <Botao type="submit" className="flex-1">{editando ? "Salvar" : "Registrar pedido"}</Botao>
        {editando && (
          <Botao type="button" variante="neutro" onClick={onCancelar}>
            Cancelar
          </Botao>
        )}
      </div>
      <p className="col-span-full text-sm text-slate-600">
        Total do pedido: <strong>R$ {total.toFixed(2)}</strong>
      </p>
    </form>
  );
}

export default PedidoForm;
