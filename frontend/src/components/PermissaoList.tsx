import { useEffect, useState } from "react";
import api from "../services/api";
import type { Permissao } from "../types/Permissao";
import PermissaoItem from "./PermissaoItem";
import PermissaoForm from "./PermissaoForm";

function PermissaoList() {
  const [permissoes, setPermissoes] = useState<Permissao[]>([]);
  const [editando, setEditando] = useState<Permissao | null>(null);

  function carregarPermissoes() {
    api.get<Permissao[]>("/permissoes").then((resposta) => {
      setPermissoes(resposta.data);
    });
  }

  useEffect(() => {
    carregarPermissoes();
  }, []);

  async function excluir(id: number) {
    await api.delete(`/permissoes/${id}`);
    carregarPermissoes();
  }

  return (
    <div>
      <PermissaoForm
        key={editando?.id ?? "novo"}
        permissaoEditando={editando}
        onPermissaoSalva={() => {
          carregarPermissoes();
          setEditando(null);
        }}
      />

      <ul>
        {permissoes.map((permissao) => (
          <li key={permissao.id}>
            <PermissaoItem permissao={permissao} />
            <button onClick={() => setEditando(permissao)}>Editar</button>
            <button onClick={() => excluir(permissao.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PermissaoList;
