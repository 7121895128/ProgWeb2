import { type FormEvent, useEffect, useState } from "react";
import type { Produto } from "../types/Produto";

interface ProdutoFormProps {
  editando: Produto | null;
  onSalvar: (dados: Omit<Produto, "id">) => Promise<boolean>;
  onCancelar: () => void;
}

function ProdutoForm({ editando, onSalvar, onCancelar }: ProdutoFormProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");

  useEffect(() => {
    setNome(editando?.nome ?? "");
    setDescricao(editando?.descricao ?? "");
    setPreco(editando?.preco?.toString() ?? "");
    setQuantidade(editando?.quantidade?.toString() ?? "");
  }, [editando]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const ok = await onSalvar({
      nome,
      descricao,
      preco: Number(preco),
      quantidade: Number(quantidade),
    });
    if (ok) {
      setNome("");
      setDescricao("");
      setPreco("");
      setQuantidade("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
      <input type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Preço" />
      <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} placeholder="Quantidade" />
      <button type="submit">{editando ? "Salvar alterações" : "Cadastrar"}</button>
      {editando && (
        <button type="button" onClick={onCancelar}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default ProdutoForm;
