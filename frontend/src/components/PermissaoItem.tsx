import type { Permissao } from "../types/Permissao";

interface PermissaoItemProps {
  permissao: Permissao;
}

function PermissaoItem({ permissao }: PermissaoItemProps) {
  return (
    <>
      <strong>{permissao.nome}</strong> — {permissao.descricao}
    </>
  );
}

export default PermissaoItem;
