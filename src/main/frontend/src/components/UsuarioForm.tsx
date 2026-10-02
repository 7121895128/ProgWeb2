import { type FormEvent, useEffect, useState } from "react";
import type { Usuario, UsuarioDados } from "../types/Usuario";

interface UsuarioFormProps {
  editando: Usuario | null;
  onSalvar: (dados: UsuarioDados) => Promise<boolean>;
  onCancelar: () => void;
}

function UsuarioForm({ editando, onSalvar, onCancelar }: UsuarioFormProps) {
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Preenche o formulário ao clicar em "Editar" (ou limpa quando cancelar/salvar)
  useEffect(() => {
    setNome(editando?.nome ?? "");
    setUsername(editando?.username ?? "");
    setEmail(editando?.email ?? "");
    setSenha("");
  }, [editando]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const ok = await onSalvar({ nome, username, email, senha });
    if (ok) {
      setNome("");
      setUsername("");
      setEmail("");
      setSenha("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder={editando ? "Nova senha (opcional)" : "Senha"}
      />
      <button type="submit">{editando ? "Salvar alterações" : "Cadastrar"}</button>
      {editando && (
        <button type="button" onClick={onCancelar}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default UsuarioForm;
