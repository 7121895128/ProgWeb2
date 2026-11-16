import { type FormEvent, useEffect, useState } from "react";
import type { Produto } from "../types/Produto";
import Botao from "./Botao";
import { campo, formulario, tituloForm } from "./estilos";

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
    <form onSubmit={handleSubmit} className={`${formulario} md:grid-cols-5`}>
      <h2 className={tituloForm}>{editando ? "Editar produto" : "Novo produto"}</h2>
      <input className={campo} value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input className={campo} value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
      <input className={campo} type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Preço" />
      <input className={campo} type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} placeholder="Estoque" />
      <div className="flex gap-2">
        <Botao type="submit" className="flex-1">{editando ? "Salvar" : "Cadastrar"}</Botao>
        {editando && (
          <Botao type="button" variante="neutro" onClick={onCancelar}>
            Cancelar
          </Botao>
        )}
      </div>
    </form>
  );
}

export default ProdutoForm;
