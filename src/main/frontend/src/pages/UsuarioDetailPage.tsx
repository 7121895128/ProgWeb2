import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { mensagemErro } from "../services/api";
import type { Usuario } from "../types/Usuario";
import Botao from "../components/Botao";
import { avisoErro } from "../components/estilos";

function UsuarioDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    api
      .get<Usuario>(`/usuarios/${id}`)
      .then((resposta) => setUsuario(resposta.data))
      .catch((e) => setErro(mensagemErro(e)));
  }, [id]);

  if (erro) {
    return <p className={avisoErro}>{erro}</p>;
  }

  if (!usuario) {
    return <p className="text-gray-600">Carregando...</p>;
  }

  return (
    <div className="max-w-md rounded-lg bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">{usuario.nome}</h1>
      <p className="text-gray-700"><strong>Username:</strong> {usuario.username}</p>
      <p className="text-gray-700"><strong>E-mail:</strong> {usuario.email}</p>
      <p className="mb-4 text-gray-700">
        <strong>Permissões:</strong>{" "}
        {usuario.permissoes?.length ? usuario.permissoes.map((p) => p.nome).join(", ") : "nenhuma"}
      </p>
      <Botao variante="neutro" onClick={() => navigate("/usuarios")}>Voltar</Botao>
    </div>
  );
}

export default UsuarioDetailPage;
