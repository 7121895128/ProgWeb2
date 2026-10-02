import type { Usuario } from "../types/Usuario";
import UsuarioItem from "./UsuarioItem";

interface UsuarioListProps {
  usuarios: Usuario[];
  onEditar: (usuario: Usuario) => void;
  onExcluir: (id: number) => void;
}

function UsuarioList({ usuarios, onEditar, onExcluir }: UsuarioListProps) {
  return (
    <ul>
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
