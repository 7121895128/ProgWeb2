import type { Permissao } from "../types/Permissao";
import PermissaoItem from "./PermissaoItem";

interface PermissaoListProps {
  permissoes: Permissao[];
  onEditar: (permissao: Permissao) => void;
  onExcluir: (id: number) => void;
}

function PermissaoList({ permissoes, onEditar, onExcluir }: PermissaoListProps) {
  return (
    <ul>
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
