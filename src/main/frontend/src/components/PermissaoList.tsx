import type { Permissao } from "../types/Permissao";
import PermissaoItem from "./PermissaoItem";
import { lista, listaVazia } from "./estilos";

interface PermissaoListProps {
  permissoes: Permissao[];
  onEditar: (permissao: Permissao) => void;
  onExcluir: (id: number) => void;
}

function PermissaoList({ permissoes, onEditar, onExcluir }: PermissaoListProps) {
  if (permissoes.length === 0) {
    return <p className={listaVazia}>Nenhuma permissão cadastrada.</p>;
  }

  return (
    <ul className={lista}>
      {permissoes.map((permissao) => (
        <PermissaoItem
          key={permissao.id}
          permissao={permissao}
          onEditar={onEditar}
          onExcluir={onExcluir}
        />
      ))}
    </ul>
  );
}

export default PermissaoList;
