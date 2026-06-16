# Financeiro

Aplicacao web privada para controle de contas a pagar e investimentos pessoais.

## Stack

- Node.js 24 LTS
- TypeScript 6 em modo strict
- Next.js 16 com App Router
- React 19
- Prisma 7
- PostgreSQL 18.4
- Auth.js / NextAuth Credentials

## Configuracao

1. Instale as dependencias:

```bash
npm install
```

2. Copie `.env.example` para `.env` e ajuste as variaveis:

```env
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="financeiro"
DB_USER="postgres"
DB_PASSWORD="postgres"
DB_SCHEMA="public"
AUTH_SECRET="change-me-with-openssl-rand-base64-32"
AUTH_TRUST_HOST="true"
ADMIN_LOGIN="admin"
ADMIN_NAME="Administrador"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"
```

3. Crie o banco, gere o Prisma Client, aplique as migrations e crie o usuario admin:

```bash
npm run db:create
npm run prisma:generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run db:check
```

4. Inicie o projeto:

```bash
npm run dev
```

Abra `http://localhost:3000`.

## Verificacoes

```bash
npm run lint
npm run typecheck
npm run build
npx prisma validate
```

## Scripts

- `npm run db:create`: cria o banco definido por `DB_NAME`, se ainda nao existir.
- `npm run db:check`: verifica as tabelas principais e mostra contagens.
- `npm run prisma:generate`: gera o Prisma Client.
- `npm run prisma:migrate`: aplica migrations em desenvolvimento.
- `npm run prisma:seed`: cria ou mantem o usuario administrador inicial.

## Documentacao

A documentacao do projeto fica em `docs`. O arquivo `AGENTS.md` contem instrucoes para agentes e colaboradores automatizados.

Este projeto nao executa commit ou push automaticamente.
