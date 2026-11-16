const TOKEN = "token";
const USUARIO = "usuario";

export interface Sessao {
  token: string;
  nome: string;
  permissoes: string[];
}

export function salvarSessao(sessao: Sessao) {
  localStorage.setItem(TOKEN, sessao.token);
  localStorage.setItem(USUARIO, JSON.stringify(sessao));
}

export function obterToken() {
  return localStorage.getItem(TOKEN);
}

export function obterSessao(): Sessao | null {
  const u = localStorage.getItem(USUARIO);
  return u ? (JSON.parse(u) as Sessao) : null;
}

export function temPapel(papel: string) {
  return obterSessao()?.permissoes.includes(papel) ?? false;
}

export function sair() {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(USUARIO);
}
