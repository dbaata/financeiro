# Investimentos

## Objetivo

Criar a base inicial para acompanhamento de investimentos pessoais.

## Campos

Codigo, tipo de investimento, instituicao, descricao, valor aplicado, data da aplicacao, data de vencimento, rentabilidade, observacao e situacao.

## Funcionalidades atuais

Listar em grid inicial com filtros por texto e situacao, criar, editar e excluir logicamente investimentos pela acao da linha. O dashboard mostra quantidade de investimentos ativos e valor aplicado total.

As telas de criacao e edicao sao abertas por parametro de URL (`acao=novo` ou `editar=<id>`), mantendo o grid como entrada do modulo.

## Evolucoes futuras

Rentabilidade historica, aportes, resgates parciais, classificacao por risco, integracao com indicadores e relatorios por instituicao ou tipo.

## Implementacao

As actions ficam em `src/modules/investimentos/actions.ts`, as regras em `src/services/investments.ts` e as consultas em `src/repositories/investments.ts`.
