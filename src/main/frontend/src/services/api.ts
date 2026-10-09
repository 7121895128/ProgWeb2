import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Extrai a mensagem de erro devolvida pelas regras de negócio do back-end
export function mensagemErro(e: unknown): string {
  if (axios.isAxiosError(e)) {
    return e.response?.data?.message ?? "Não foi possível conectar ao servidor";
  }
  return "Erro inesperado";
}

export default api;
