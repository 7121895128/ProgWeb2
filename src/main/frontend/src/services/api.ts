import axios from "axios";
import { obterToken, sair } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use((config) => {
  const token = obterToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (resposta) => resposta,
  (erro) => {
    if (erro.response?.status === 401 && obterToken()) {
      sair();
      window.location.href = "/login";
    }
    return Promise.reject(erro);
  }
);

export function mensagemErro(e: unknown): string {
  if (axios.isAxiosError(e)) {
    if (!e.response) {
      return "Não foi possível conectar ao servidor";
    }
    if (e.response.status === 403) {
      return "Você não tem permissão para realizar esta ação";
    }
    return e.response.data?.message ?? "Erro ao processar a requisição";
  }
  return "Erro inesperado";
}

export default api;
