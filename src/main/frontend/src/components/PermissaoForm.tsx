import { type FormEvent, useEffect, useState } from "react";
import type { Permissao } from "../types/Permissao";
import Botao from "./Botao";
import { campo, formulario, tituloForm } from "./estilos";

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
    <form onSubmit={handleSubmit} className={`${formulario} md:grid-cols-3`}>
      <h2 className={tituloForm}>{editando ? "Editar permissão" : "Nova permissão"}</h2>
      <input className={campo} value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input className={campo} value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
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

export default PermissaoForm;
