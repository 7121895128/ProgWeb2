import { useEffect, useState } from "react";
import api, { mensagemErro } from "../services/api";
import type { Usuario } from "../types/Usuario";
import type { Permissao } from "../types/Permissao";
import Botao from "../components/Botao";
import { avisoErro, avisoSucesso, titulo } from "../components/estilos";

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
    <div className="rounded-lg bg-white p-6 shadow">
      <h1 className={titulo}>Atribuir Permissões</h1>
      {erro && <p className={avisoErro}>{erro}</p>}
      {mensagem && <p className={avisoSucesso}>{mensagem}</p>}

      <label className="mb-1 block text-sm font-medium text-gray-700">Usuário</label>
      <select
        className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2"
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

      {usuarioId !== null && (
        <fieldset className="mb-4 rounded-md border border-gray-300 p-4">
          <legend className="px-2 text-sm font-medium text-gray-700">Permissões</legend>
          {permissoes.length === 0 && <p className="text-gray-500">Nenhuma permissão cadastrada.</p>}
          {permissoes.map((permissao) => (
            <label key={permissao.id} className="flex items-center gap-2 py-1">
              <input
                type="checkbox"
                checked={selecionadas.includes(permissao.id)}
                onChange={() => alternar(permissao.id)}
              />
              <span>
                <strong>{permissao.nome}</strong> — {permissao.descricao}
              </span>
            </label>
          ))}
        </fieldset>
      )}

      <Botao variante="sucesso" onClick={salvar} disabled={usuarioId === null}>
        Salvar permissões
      </Botao>
    </div>
  );
}

export default UsuarioPermissoesPage;
