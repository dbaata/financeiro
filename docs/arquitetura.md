# Arquitetura

## Stack

Aplicacao privada em Next.js 16, React 19, TypeScript 6 strict, Prisma 7 e PostgreSQL 18.4. A autenticacao usa Auth.js / NextAuth com Credentials Provider e sessoes JWT em cookie seguro.

## Estrutura

O App Router separa rotas publicas em `(auth)` e rotas privadas em `(private)`. Componentes reutilizaveis ficam em `src/components`, regras de negocio em `src/services`, acesso a dados em `src/repositories`, validacoes em `src/lib/validations.ts`, scripts operacionais em `scripts` e tipos compartilhados em `src/types`.

## Decisoes

Server Components sao usados para listagens e leitura. Server Actions executam gravacoes, validacoes server-side e revalidacao das paginas. Prisma fica encapsulado em `src/lib/prisma.ts` para evitar multiplas instancias em desenvolvimento.

Prisma 7 exige configuracao fora do `schema.prisma`. A CLI usa `prisma.config.ts` e o runtime usa `@prisma/adapter-pg`. A URL de conexao e montada por `src/lib/database-url.ts` a partir de variaveis separadas de ambiente: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` e `DB_SCHEMA`.

Rotas privadas sao marcadas como dinamicas para evitar consultas ao banco durante o build.

## Fluxo

O usuario acessa `/login`, informa login e senha, e o Auth.js valida o hash armazenado. O `proxy.ts` protege as rotas privadas. Dentro da area privada, o usuario navega por dashboard, usuarios, despesas, contas a pagar e investimentos.

Todos os modulos privados seguem o mesmo fluxo de navegacao: a primeira tela e sempre um grid de listagem com filtros padroes do dominio. A partir do grid, o usuario escolhe inserir, editar, excluir ou abrir detalhes. Telas de detalhe, criacao e edicao nao devem ser a entrada inicial do modulo.

## Setup de banco

`npm run db:create` cria o banco se necessario. `npx prisma migrate dev --name <nome>` cria e aplica migrations. `npm run prisma:seed` cria o usuario administrador inicial. `npm run db:check` verifica as tabelas principais sem expor dados sensiveis.
