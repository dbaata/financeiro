# AGENTS.md

Guia operacional para agentes e colaboradores que forem alterar este projeto.

## Regras obrigatorias

- Nao execute `git commit`, `git push` ou qualquer comando que envie codigo para repositorio remoto.
- Antes de alterar comportamento, leia os arquivos do modulo afetado em `src/modules`, `src/services`, `src/repositories` e a documentacao correspondente em `docs`.
- Mantenha TypeScript strict. Nao use `any` sem necessidade clara e documentada.
- Nao exponha senha, hash de senha ou valores sensiveis de `.env` em logs, telas ou respostas.
- Preserve o padrao de variaveis separadas de banco: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_SCHEMA`.
- Para Prisma 7, mantenha `prisma.config.ts` como fonte de configuracao da CLI e use `@prisma/adapter-pg` no runtime.

## Comandos principais

```bash
npm install
npm run db:create
npm run prisma:generate
npx prisma migrate dev --name <nome-da-migration>
npm run prisma:seed
npm run db:check
npm run lint
npm run typecheck
npm run build
npm run dev
```

## Estrutura

- `src/app`: rotas Next.js App Router.
- `src/components`: componentes de UI, formularios e layout.
- `src/lib`: infraestrutura compartilhada, Prisma, Auth, validacoes e helpers.
- `src/modules`: Server Actions por dominio.
- `src/services`: regras de negocio e validacoes server-side.
- `src/repositories`: consultas Prisma reutilizaveis.
- `prisma`: schema, migrations e seed.
- `scripts`: utilitarios de banco e verificacao.
- `docs`: documentacao por modulo e padroes.

## Padrao de implementacao

- Server Components fazem leitura e renderizacao inicial.
- Server Actions chamam services, fazem revalidacao e redirecionamento quando necessario.
- Services concentram regras de negocio.
- Repositories concentram consultas de leitura comuns.
- Validacoes de entrada usam Zod em `src/lib/validations.ts`.
- Exclusoes funcionais devem preferir `deletedAt`, salvo decisao explicita em contrario.

## Banco de dados

- A URL PostgreSQL e montada por `src/lib/database-url.ts`.
- `npm run db:create` cria `DB_NAME` se nao existir, conectando no banco administrativo `postgres` ou `DB_ADMIN_DATABASE`.
- `npm run db:check` valida acesso as tabelas principais sem imprimir dados sensiveis.
- Depois de alterar `prisma/schema.prisma`, rode `npx prisma migrate dev --name <nome>` e `npm run prisma:generate`.

## Criterios antes de concluir uma alteracao

Execute, no minimo:

```bash
npm run lint
npm run typecheck
npx prisma validate
```

Para mudancas em rotas, auth, Prisma ou build:

```bash
npm run build
```

Atualize a documentacao em `docs` e o `README.md` quando mudar setup, regras de negocio, scripts ou arquitetura.
