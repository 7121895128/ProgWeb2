import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { obterSessao, temPapel } from "../services/auth";
import type { Cliente } from "../types/Cliente";
import type { Pedido } from "../types/Pedido";
import type { Produto } from "../types/Produto";

const cartao =
  "rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow";

function Home() {
  const sessao = obterSessao();
  const [produtos, setProdutos] = useState(0);
  const [clientes, setClientes] = useState(0);
  const [pedidos, setPedidos] = useState(0);
  const [totalVendido, setTotalVendido] = useState(0);

  useEffect(() => {
    Promise.all([
      api.get<Produto[]>("/produtos"),
      api.get<Cliente[]>("/clientes"),
      api.get<Pedido[]>("/pedidos"),
    ])
      .then(([p, c, pe]) => {
        setProdutos(p.data.length);
        setClientes(c.data.length);
        setPedidos(pe.data.length);
        setTotalVendido(pe.data.reduce((soma, pedido) => soma + pedido.valorTotal, 0));
      })
      .catch(() => {});
  }, []);

  const resumo = [
    { para: "/produtos", rotulo: "Produtos", valor: produtos.toString(), descricao: "itens no catálogo" },
    { para: "/clientes", rotulo: "Clientes", valor: clientes.toString(), descricao: "clientes cadastrados" },
    { para: "/pedidos", rotulo: "Pedidos", valor: pedidos.toString(), descricao: "pedidos registrados" },
    { para: "/pedidos", rotulo: "Total vendido", valor: `R$ ${totalVendido.toFixed(2)}`, descricao: "soma dos pedidos" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">Olá, {sessao?.nome}!</h1>
      <p className="mb-6 text-slate-600">Resumo da loja e atalhos para as telas do sistema.</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {resumo.map((item) => (
          <Link key={item.rotulo} to={item.para} className={cartao}>
            <p className="text-sm font-medium text-slate-500">{item.rotulo}</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{item.valor}</p>
            <p className="mt-1 text-xs text-slate-400">{item.descricao}</p>
          </Link>
        ))}
      </div>

      {temPapel("ADMIN") && (
        <div className="mt-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Administração</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link to="/usuarios" className={cartao}>
              <p className="font-semibold text-slate-900">Usuários</p>
              <p className="text-sm text-slate-500">Cadastrar e editar quem acessa o sistema</p>
            </Link>
            <Link to="/permissoes" className={cartao}>
              <p className="font-semibold text-slate-900">Permissões</p>
              <p className="text-sm text-slate-500">Papéis disponíveis (ADMIN, USER)</p>
            </Link>
            <Link to="/atribuir-permissoes" className={cartao}>
              <p className="font-semibold text-slate-900">Atribuir Permissões</p>
              <p className="text-sm text-slate-500">Definir os papéis de cada usuário</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
