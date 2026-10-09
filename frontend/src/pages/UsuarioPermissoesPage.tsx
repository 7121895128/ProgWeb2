import { useEffect, useState } from "react";
import api from "../services/api";
import type { Usuario } from "../types/Usuario";
import type { Permissao } from "../types/Permissao";

function UsuarioPermissoesPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [permissoes, setPermissoes] = useState<Permissao[]>([]);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [selecionadas, setSelecionadas] = useState<number[]>([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    api.get<Usuario[]>("/usuarios").then((r) => setUsuarios(r.data));
    api.get<Permissao[]>("/permissoes").then((r) => setPermissoes(r.data));
  }, []);

  async function selecionarUsuario(id: number | null) {
    setUsuarioId(id);
    setMensagem("");

    if (id === null) {
      setSelecionadas([]);
      return;
    }

    const resposta = await api.get<Permissao[]>(`/usuarios/${id}/permissoes`);
    setSelecionadas(resposta.data.map((p) => p.id));
  }

  function alternarPermissao(id: number) {
    setSelecionadas((atuais) =>
      atuais.includes(id) ? atuais.filter((x) => x !== id) : [...atuais, id]
    );
  }

  async function salvar() {
    if (usuarioId === null) return;

    await api.put(`/usuarios/${usuarioId}/permissoes`, selecionadas);
    setMensagem("Permissões salvas com sucesso!");
  }

  return (
    <div>
      <label>
        Usuário:{" "}
        <select
          value={usuarioId ?? ""}
          onChange={(e) =>
            selecionarUsuario(e.target.value === "" ? null : Number(e.target.value))
          }
        >
          <option value="">Selecione um usuário</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nome} ({usuario.username})
            </option>
          ))}
        </select>
      </label>

      {usuarioId !== null && (
        <div>
          <h3>Permissões</h3>
          {permissoes.map((permissao) => (
            <div key={permissao.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selecionadas.includes(permissao.id)}
                  onChange={() => alternarPermissao(permissao.id)}
                />{" "}
                {permissao.nome} — {permissao.descricao}
              </label>
            </div>
          ))}

          <button onClick={salvar}>Salvar permissões</button>
          {mensagem && <p>{mensagem}</p>}
        </div>
      )}
    </div>
  );
}

export default UsuarioPermissoesPage;
