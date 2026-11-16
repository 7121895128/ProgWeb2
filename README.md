# Web II — N2 (Sistema de Vendas)

Spring Boot 3 (Java 21) + React (Vite + TypeScript + Tailwind CSS), com autenticação JWT.

Sobre o esqueleto da N1 (`Usuario`, `Permissao`, `Produto`) foram acrescentados os modelos `Cliente` e `Pedido` e as telas de Clientes e Pedidos.

## Como rodar

**Back-end** (raiz do projeto, porta 8080):

    mvn spring-boot:run

Console do H2: http://localhost:8080/h2-console (JDBC URL `jdbc:h2:file:./data/database`, user `sa`, senha vazia)

**Front-end** (outro terminal, porta 5173):

    cd src/main/frontend
    npm install
    npm run dev

Abra http://localhost:5173

## Login

| Usuário | Senha    | Papéis      | Acesso                                             |
|---------|----------|-------------|----------------------------------------------------|
| admin   | admin123 | ADMIN, USER | Tudo                                               |
| joao    | joao123  | USER        | Produtos, Clientes e Pedidos                       |

Os dois usuários são criados na primeira execução. Se o banco da N1 já existir com outros dados, apague a pasta `data/` para começar do zero.

## Modelos e relacionamentos

- `Usuario` N:N `Permissao` (tabela `usuario_permissao`)
- `Cliente` 1:N `Pedido` (`@OneToMany` / `@ManyToOne`)
- `Pedido` N:1 `Produto` (`@ManyToOne`)

## Regras de negócio

- Cliente: nome e e-mail obrigatórios, e-mail único, não pode ser excluído se tiver pedidos
- Pedido: quantidade maior que zero, não pode passar do estoque, valor total calculado no servidor
- Criar um pedido baixa o estoque do produto; editar ou excluir devolve o estoque
- Produto: não pode ser excluído se tiver pedidos

## Estrutura

- `controller` → recebe HTTP e chama apenas o `service`
- `service` → regras de negócio
- `repository` → `JpaRepository` por entidade
- `model` → `@Entity` (`Usuario`, `Permissao`, `Produto`, `Cliente`, `Pedido`)
- `security` → `JwtUtil` (gera e valida o token) e `JwtFilter` (lê o token a cada requisição)
- `config` → `SecurityConfig` (rotas liberadas e protegidas) e `ConfiguracaoInicial` (usuários iniciais)
- Front: `pages/` (lógica de cada tela) → `components/` (List, Item, Form, Layout, Botao) → `services/` (`api.ts` com Axios, `auth.ts` com a sessão)
