import type { Cliente } from "../types/Cliente";
import Botao from "./Botao";
import { avatar, itemLista } from "./estilos";

interface ClienteItemProps {
  cliente: Cliente;
  onEditar: (cliente: Cliente) => void;
  onExcluir: (id: number) => void;
}

function ClienteItem({ cliente, onEditar, onExcluir }: ClienteItemProps) {
  return (
    <li className={itemLista}>
      <div className="flex items-center gap-3">
        <span className={avatar}>{cliente.nome.charAt(0).toUpperCase()}</span>
        <div>
          <p className="font-medium text-slate-900">{cliente.nome}</p>
          <p className="text-sm text-slate-500">
            {cliente.email}
            {cliente.telefone && ` · ${cliente.telefone}`}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Botao variante="neutro" onClick={() => onEditar(cliente)}>Editar</Botao>
        <Botao variante="perigo" onClick={() => onExcluir(cliente.id)}>Excluir</Botao>
      </div>
    </li>
  );
}

export default ClienteItem;
