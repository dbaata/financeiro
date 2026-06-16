# Usuarios

## Objetivo

Controlar quem pode acessar a aplicacao.

## Campos

Codigo, login, nome, e-mail, situacao e senha.

## Regras

Login e e-mail devem ser unicos. E-mail deve ter formato valido. Senha e obrigatoria na criacao e armazenada somente como hash seguro. Listagens e retornos nao exibem senha nem hash.

Usuarios inativos nao autenticam. A edicao de usuario so altera a senha quando o campo de nova senha e preenchido.

## Funcionalidades

Listar em grid inicial com filtros por texto e situacao, criar, editar por Server Action e inativar usuarios pela acao da linha. A listagem usa DTO sem `passwordHash`.

As telas de criacao, edicao e visualizacao sao abertas por parametro de URL (`acao=novo`, `editar=<id>` ou `visualizar=<id>`) em uma tela propria, sem exibir filtros e lista acima do formulario ou detalhe.

## Implementacao

As actions ficam em `src/modules/usuarios/actions.ts`, as regras em `src/services/users.ts` e as consultas de listagem em `src/repositories/users.ts`.
