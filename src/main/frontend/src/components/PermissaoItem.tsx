import type { Permissao } from "../types/Permissao";

interface PermissaoItemProps {
  permissao: Permissao;
  onEditar: (permissao: Permissao) => void;
  onExcluir: (id: number) => void;
}

function PermissaoItem({ permissao, onEditar, onExcluir }: PermissaoItemProps) {
  return (
    <li>
      <strong>{permissao.nome}</strong> — {permissao.descricao}{" "}
      <button onClick={() => onEditar(permissao)}>Editar</button>
      <button onClick={() => onExcluir(permissao.id)}>Excluir</button>
    </li>
  );
}

export default PermissaoItem;
