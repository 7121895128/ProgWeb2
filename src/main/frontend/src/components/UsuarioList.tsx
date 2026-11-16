import type { Usuario } from "../types/Usuario";
import UsuarioItem from "./UsuarioItem";
import { lista, listaVazia } from "./estilos";

interface UsuarioListProps {
  usuarios: Usuario[];
  onEditar: (usuario: Usuario) => void;
  onExcluir: (id: number) => void;
}

function UsuarioList({ usuarios, onEditar, onExcluir }: UsuarioListProps) {
  if (usuarios.length === 0) {
    return <p className={listaVazia}>Nenhum usuário cadastrado.</p>;
  }

  return (
    <ul className={lista}>
      {usuarios.map((usuario) => (
        <UsuarioItem
          key={usuario.id}
          usuario={usuario}
          onEditar={onEditar}
          onExcluir={onExcluir}
        />
      ))}
    </ul>
  );
}

export default UsuarioList;
