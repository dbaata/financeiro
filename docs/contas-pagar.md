# Contas a pagar

## Objetivo

Controlar despesas mensais, pagamentos e pendencias.

## Campos

Codigo, mes de referencia, data da despesa, descricao, despesa vinculada, valor, pago, data de pagamento e observacao.

## Regras

O mes de referencia e armazenado como o primeiro dia do mes. Valores usam decimal. Exclusao e logica por `deletedAt`. Contas pendentes recebem destaque visual.

A conta pode ter uma despesa vinculada ou apenas descricao livre. Quando uma nova despesa e informada no lancamento, o service reutiliza uma despesa existente com a mesma descricao ou cria uma nova.

## Duplicacao do mes anterior

Ao duplicar, o sistema busca o mes anterior ao mes selecionado, copia descricao, despesa vinculada, valor e observacao, ajusta a data para o mes atual preservando o dia quando possivel, marca todos como nao pagos e evita duplicatas equivalentes ja existentes no mes atual.

## Totais

Total do mes soma todas as contas do mes. Total pago soma contas pagas. Total pendente e a diferenca entre total e pago. A quantidade pendente conta registros nao pagos.

## Funcionalidades

Filtrar por mes, listar contas, criar, editar, excluir logicamente, marcar como paga, marcar como nao paga e duplicar mes anterior.

## Implementacao

As actions ficam em `src/modules/contas-pagar/actions.ts`, as regras em `src/services/payable-accounts.ts` e as consultas em `src/repositories/payable-accounts.ts`.
