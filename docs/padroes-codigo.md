# Padroes de codigo

## Nomes

Rotas e pastas usam kebab-case quando expostas na URL. Funcoes e variaveis usam camelCase. Tipos e componentes usam PascalCase.

## Modulos

Cada dominio deve ter actions em `src/modules`, regras em `src/services` e consultas persistentes em `src/repositories`.

Todos os modulos privados, existentes e novos, devem abrir primeiro em um grid de listagem com filtros padroes. A tela de detalhe, criacao ou edicao so deve ser aberta depois de uma acao explicita no grid.

O grid deve ter filtros adequados ao dominio, mantendo como base: busca textual quando houver campo descritivo, filtro de situacao/status quando existir, e filtros temporais quando o modulo for mensal ou por data. Acoes de inserir, editar e excluir devem ficar no inicio das linhas quando houver tabela. Formularios de criacao e edicao podem ser exibidos na propria rota por parametro de URL, por exemplo `acao=novo` ou `editar=<id>`.

## Services

Services concentram regras de negocio, validacoes server-side e composicao de operacoes Prisma. Server Actions devem ser finas.

## Repositories

Repositories fazem consultas diretas e previsiveis. Evite colocar regras de negocio nessa camada.

## Validations

Schemas Zod ficam em `src/lib/validations.ts` ou em arquivo especifico do modulo quando o modulo crescer.

## Prisma e ambiente

Nao coloque `DATABASE_URL` diretamente no `.env`. Use variaveis separadas de banco e deixe `src/lib/database-url.ts` montar a URL. A CLI Prisma usa `prisma.config.ts`; o runtime usa `src/lib/prisma.ts` com `@prisma/adapter-pg`.

Depois de mudar `prisma/schema.prisma`, crie migration com `npx prisma migrate dev --name <nome>` e gere o client com `npm run prisma:generate`.

## Verificacoes

Antes de concluir alteracoes, rode `npm run lint`, `npm run typecheck` e `npx prisma validate`. Para mudancas em rotas, build, auth ou Prisma, rode tambem `npm run build`.

## Novo modulo

Criar schema Prisma, repository, service, actions, pagina privada, validacoes, componentes especificos e documentacao em `/docs`.

A pagina privada de um novo modulo deve seguir obrigatoriamente o fluxo: grid inicial com filtros padroes, acoes no inicio da linha e abertura posterior de detalhes, criacao ou edicao. Atualize tambem `AGENTS.md` se a mudanca alterar comandos, setup ou regras operacionais.
