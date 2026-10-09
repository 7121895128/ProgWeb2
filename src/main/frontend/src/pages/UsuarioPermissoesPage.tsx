import { useEffect, useState } from "react";
import api, { mensagemErro } from "../services/api";
import type { Usuario } from "../types/Usuario";
import type { Permissao } from "../types/Permissao";

function UsuarioPermissoesPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [permissoes, setPermissoes] = useState<Permissao[]>([]);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [selecionadas, setSelecionadas] = useState<number[]>([]);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    Promise.all([
      api.get<Usuario[]>("/usuarios"),
      api.get<Permissao[]>("/permissoes"),
    ])
      .then(([u, p]) => {
        setUsuarios(u.data);
        setPermissoes(p.data);
      })
      .catch((e) => setErro(mensagemErro(e)));
  }, []);

  async function selecionarUsuario(id: number | null) {
    setUsuarioId(id);
    setMensagem("");
    setErro("");

    if (id === null) {
      setSelecionadas([]);
      return;
    }

    try {
      const resposta = await api.get<Permissao[]>(`/usuarios/${id}/permissoes`);
      setSelecionadas(resposta.data.map((p) => p.id));
    } catch (e) {
      setErro(mensagemErro(e));
    }
  }

  function alternar(id: number) {
    setMensagem("");
    setSelecionadas((atuais) =>
      atuais.includes(id) ? atuais.filter((x) => x !== id) : [...atuais, id]
    );
  }

  async function salvar() {
    if (usuarioId === null) return;

    try {
      await api.put(`/usuarios/${usuarioId}/permissoes`, selecionadas);
      setMensagem("Permissões salvas com sucesso!");
      setErro("");
    } catch (e) {
      setErro(mensagemErro(e));
    }
  }

  return (
    <section>
      <h1>Permissões do usuário</h1>
      {erro && <p style={{ color: "crimson" }}>{erro}</p>}

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
          {permissoes.length === 0 && <p>Nenhuma permissão cadastrada.</p>}
          {permissoes.map((permissao) => (
            <div key={permissao.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selecionadas.includes(permissao.id)}
                  onChange={() => alternar(permissao.id)}
                />{" "}
                <strong>{permissao.nome}</strong> — {permissao.descricao}
              </label>
            </div>
          ))}

          <button onClick={salvar}>Salvar permissões</button>
          {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
        </div>
      )}
    </section>
  );
}

export default UsuarioPermissoesPage;
