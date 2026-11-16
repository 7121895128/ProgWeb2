import { useEffect, useState } from "react";
import api, { mensagemErro } from "../services/api";
import type { Cliente } from "../types/Cliente";
import ClienteForm from "../components/ClienteForm";
import ClienteList from "../components/ClienteList";
import { avisoErro, titulo } from "../components/estilos";

function ClientesPage() {
  const [itens, setItens] = useState<Cliente[]>([]);
  const [editando, setEditando] = useState<Cliente | null>(null);
  const [erro, setErro] = useState("");

  async function carregar() {
    const resposta = await api.get<Cliente[]>("/clientes");
    setItens(resposta.data);
  }

  useEffect(() => {
    carregar().catch((e) => setErro(mensagemErro(e)));
  }, []);

  async function salvar(dados: Omit<Cliente, "id">): Promise<boolean> {
    try {
      if (editando) {
        await api.put(`/clientes/${editando.id}`, dados);
      } else {
        await api.post("/clientes", dados);
      }
      await carregar();
      setEditando(null);
      setErro("");
      return true;
    } catch (e) {
      setErro(mensagemErro(e));
      return false;
    }
  }

  async function excluir(id: number) {
    try {
      await api.delete(`/clientes/${id}`);
      await carregar();
      if (editando?.id === id) setEditando(null);
      setErro("");
    } catch (e) {
      setErro(mensagemErro(e));
    }
  }

  return (
    <section>
      <h1 className={titulo}>Clientes</h1>
      {erro && <p className={avisoErro}>{erro}</p>}
      <ClienteForm editando={editando} onSalvar={salvar} onCancelar={() => setEditando(null)} />
      <ClienteList clientes={itens} onEditar={setEditando} onExcluir={excluir} />
    </section>
  );
}

export default ClientesPage;
