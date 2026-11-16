import { type FormEvent, useEffect, useState } from "react";
import type { Usuario, UsuarioDados } from "../types/Usuario";
import Botao from "./Botao";
import { campo, formulario, tituloForm } from "./estilos";

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
    <form onSubmit={handleSubmit} className={`${formulario} md:grid-cols-5`}>
      <h2 className={tituloForm}>{editando ? "Editar usuário" : "Novo usuário"}</h2>
      <input className={campo} value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input className={campo} value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input className={campo} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
      <input
        className={campo}
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder={editando ? "Nova senha (opcional)" : "Senha"}
      />
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

export default UsuarioForm;
