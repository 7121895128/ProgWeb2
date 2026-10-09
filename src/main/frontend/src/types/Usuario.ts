import type { Permissao } from "./Permissao";

export interface Usuario {
  id: number;
  nome: string;
  username: string;
  email: string;
  permissoes?: Permissao[];
}

// A senha só é enviada ao back-end, nunca recebida
export interface UsuarioDados {
  nome: string;
  username: string;
  email: string;
  senha: string;
}
