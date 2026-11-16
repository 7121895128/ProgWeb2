import type { Permissao } from "../types/Permissao";
import Botao from "./Botao";
import { itemLista, selo } from "./estilos";

interface PermissaoItemProps {
  permissao: Permissao;
  onEditar: (permissao: Permissao) => void;
  onExcluir: (id: number) => void;
}

function PermissaoItem({ permissao, onEditar, onExcluir }: PermissaoItemProps) {
  return (
    <li className={itemLista}>
      <div className="flex items-center gap-3">
        <span className={`${selo} bg-indigo-100 text-indigo-700`}>{permissao.nome}</span>
        <p className="text-sm text-slate-600">{permissao.descricao}</p>
      </div>
      <div className="flex gap-2">
        <Botao variante="neutro" onClick={() => onEditar(permissao)}>Editar</Botao>
        <Botao variante="perigo" onClick={() => onExcluir(permissao.id)}>Excluir</Botao>
      </div>
    </li>
  );
}

export default PermissaoItem;
