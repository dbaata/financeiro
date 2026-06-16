# Despesas

## Objetivo

Manter o cadastro base de despesas usadas nos lancamentos de contas a pagar.

## Campos

Codigo, descricao e situacao.

## Regras

Descricao e obrigatoria e nao pode ser duplicada, considerando comparacao sem diferenciar maiusculas de minusculas. Despesas podem ser inativadas sem apagar historico.

## Integracao

Contas a pagar podem apontar para uma despesa cadastrada ou criar uma nova despesa durante o lancamento.

## Funcionalidades

Listar em grid inicial com filtros por texto e situacao, criar, editar e inativar despesas pela acao da linha. A inativacao preserva contas historicas vinculadas.

As telas de criacao e edicao sao abertas por parametro de URL (`acao=novo` ou `editar=<id>`), mantendo o grid como entrada do modulo.

## Implementacao

As actions ficam em `src/modules/despesas/actions.ts`, as regras em `src/services/expenses.ts` e as consultas em `src/repositories/expenses.ts`.
