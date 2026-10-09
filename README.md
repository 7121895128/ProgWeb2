# Web II — N1 (Usuario, Permissao, Produto)

Spring Boot 3 (Java 21) + React (Vite + TypeScript), integrados de ponta a ponta.

## Como rodar

**Back-end** (raiz do projeto, porta 8080):

    mvn spring-boot:run

Console do H2: http://localhost:8080/h2-console  (JDBC URL `jdbc:h2:file:./data/database`, user `sa`, senha vazia)

**Front-end** (outro terminal, porta 5173):

    cd src/main/frontend
    npm install
    npm run dev

Abra http://localhost:5173

## Estrutura

- `controller` → recebe HTTP e chama apenas o `service`
- `service` → regras de negócio (username único, nome de permissão único, preço > 0, estoque >= 0)
- `repository` → `JpaRepository` por entidade
- `model` → `@Entity` (`Usuario`, `Permissao`, `Produto`)
- Front: `pages/` (lógica de cada tela) → `components/` (List, Item, Form) → `services/api.ts` (Axios)
