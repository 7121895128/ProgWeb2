import { Link } from "react-router-dom";
import type { Usuario } from "../types/Usuario";
import Botao from "./Botao";
import { avatar, itemLista, selo } from "./estilos";

interface UsuarioItemProps {
  usuario: Usuario;
  onEditar: (usuario: Usuario) => void;
  onExcluir: (id: number) => void;
}

function UsuarioItem({ usuario, onEditar, onExcluir }: UsuarioItemProps) {
  return (
    <li className={itemLista}>
      <div className="flex items-center gap-3">
        <span className={avatar}>{usuario.nome.charAt(0).toUpperCase()}</span>
        <div>
          <Link to={`/usuarios/${usuario.id}`} className="font-medium text-indigo-700 hover:underline">
            {usuario.nome} <span className="font-normal text-slate-500">({usuario.username})</span>
          </Link>
          <p className="text-sm text-slate-500">{usuario.email}</p>
        </div>
        <div className="flex gap-1">
          {usuario.permissoes?.map((permissao) => (
            <span key={permissao.id} className={`${selo} bg-indigo-100 text-indigo-700`}>
              {permissao.nome}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <Botao variante="neutro" onClick={() => onEditar(usuario)}>Editar</Botao>
        <Botao variante="perigo" onClick={() => onExcluir(usuario.id)}>Excluir</Botao>
      </div>
    </li>
  );
}

export default UsuarioItem;
