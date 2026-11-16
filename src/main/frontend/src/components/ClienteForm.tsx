import { type FormEvent, useEffect, useState } from "react";
import type { Cliente } from "../types/Cliente";
import Botao from "./Botao";
import { campo, formulario, tituloForm } from "./estilos";

interface ClienteFormProps {
  editando: Cliente | null;
  onSalvar: (dados: Omit<Cliente, "id">) => Promise<boolean>;
  onCancelar: () => void;
}

function ClienteForm({ editando, onSalvar, onCancelar }: ClienteFormProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    setNome(editando?.nome ?? "");
    setEmail(editando?.email ?? "");
    setTelefone(editando?.telefone ?? "");
  }, [editando]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const ok = await onSalvar({ nome, email, telefone });
    if (ok) {
      setNome("");
      setEmail("");
      setTelefone("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`${formulario} md:grid-cols-4`}>
      <h2 className={tituloForm}>{editando ? "Editar cliente" : "Novo cliente"}</h2>
      <input className={campo} value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input className={campo} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
      <input className={campo} value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="Telefone" />
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

export default ClienteForm;
