import { type FormEvent, useEffect, useState } from "react";
import type { Permissao } from "../types/Permissao";

interface PermissaoFormProps {
  editando: Permissao | null;
  onSalvar: (dados: Omit<Permissao, "id">) => Promise<boolean>;
  onCancelar: () => void;
}

function PermissaoForm({ editando, onSalvar, onCancelar }: PermissaoFormProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    setNome(editando?.nome ?? "");
    setDescricao(editando?.descricao ?? "");
  }, [editando]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const ok = await onSalvar({ nome, descricao });
    if (ok) {
      setNome("");
      setDescricao("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
      <button type="submit">{editando ? "Salvar alterações" : "Cadastrar"}</button>
      {editando && (
        <button type="button" onClick={onCancelar}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default PermissaoForm;
