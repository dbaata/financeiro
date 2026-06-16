---
name: lgpd
description: Use this skill whenever the user asks for help with Brazil's LGPD, privacy notices, data mapping, lawful bases, DPIA/RIPD, cookies, data subject requests, vendor/controller/operator analysis, incident response, retention, privacy-by-design, or reviewing product and software requirements for personal data risks in Brazil. Also use it when creating, reviewing, or changing any CRUD, grid, form, detail page, API route, Server Action, database schema, repository, service, import/export, report, log, audit trail, seed, or documentation that handles or may expose personal data. Apply it to existing CRUDs and new CRUDs whenever the affected data includes or may include personal data, sensitive data, identifiers, financial data, contact data, user/account data, documents, analytics events, marketing data, HR data, customer/supplier data, or data subject rights workflows, even if the user does not explicitly say "LGPD".
---

# LGPD

Use this skill to help with practical LGPD analysis and deliverables for Brazilian personal data protection work. Keep the output operational, traceable, and cautious: explain assumptions, identify missing facts, and separate legal interpretation from implementation recommendations.

This skill is not a substitute for legal advice. When the result could affect regulatory posture, contracts, sanctions, data subject rights, incident notification, or sensitive personal data, recommend review by qualified legal/privacy counsel.

## Core Workflow

1. Identify the context: product feature, business process, document, vendor flow, database, incident, request from titular, or compliance artifact.
2. Map the personal data: categories, titulares, source, purpose, systems, recipients, retention, transfers, and whether sensitive data or children/adolescents are involved.
3. Classify roles: controlador, operador, controlador conjunto, suboperador, encarregado, and relevant internal owners.
4. Identify lawful basis candidates and risks. Do not force consent when contract, legal obligation, legitimate interest, health protection, credit protection, or another LGPD basis is more appropriate.
5. Check principles: finalidade, adequacao, necessidade, livre acesso, qualidade, transparencia, seguranca, prevencao, nao discriminacao, responsabilizacao e prestacao de contas.
6. Produce the requested artifact: checklist, gap analysis, data map, RIPD outline, privacy notice draft, data subject request workflow, incident triage, vendor questionnaire, or product requirements review.
7. End with concrete next actions and evidence to collect.

## Source Discipline

For legal details that may have changed, verify against current official sources before giving definitive guidance:

- Lei 13.709/2018, texto oficial do Planalto.
- Autoridade Nacional de Protecao de Dados (ANPD), guias, regulamentos, resolucoes e enunciados vigentes.
- Normas setoriais only when the user's sector requires them, such as health, finance, telecom, education, labor, consumer, or public sector rules.

If you cannot verify current official sources, say so and frame the result as a working draft based on known LGPD structure.

## Required Questions When Facts Are Missing

Ask only the questions needed to avoid a wrong conclusion. Prefer grouping them in a short list.

- Quem e o controlador e quem opera o tratamento?
- Qual e a finalidade concreta do tratamento?
- Quais categorias de dados pessoais sao tratadas?
- Ha dados pessoais sensiveis, dados de criancas/adolescentes, biometria, geolocalizacao precisa, dados financeiros ou saude?
- Qual e o fluxo dos dados: coleta, uso, compartilhamento, armazenamento, exclusao?
- Ha fornecedores, suboperadores, nuvem, analytics, IA, marketing, transferencia internacional ou compartilhamento com grupo economico?
- Qual prazo de retencao e qual criterio de eliminacao?
- O titular recebe informacao clara e consegue exercer direitos?

## Output Standards

Write in Brazilian Portuguese unless the user asks for another language.

Use this structure for compliance reviews:

```markdown
## Escopo
## Dados e Titulares
## Papeis LGPD
## Finalidades
## Bases Legais Candidatas
## Riscos e Lacunas
## Recomendacoes
## Evidencias a Coletar
```

For product or software reviews, add:

```markdown
## Impacto no Produto
## Requisitos Funcionais
## Requisitos de Seguranca e Privacidade
## Logs, Retencao e Exclusao
## Criterios de Aceite
```

For document drafts, mark uncertain clauses with `[validar juridico]` instead of presenting them as final.

## Practical Guidance

- Prefer data minimization over adding consent banners or broad disclosures.
- Treat consent as fragile: it must be free, informed, unambiguous, specific, and revocable. Do not use it to justify processing that is actually required for contract execution or legal obligation.
- For legitimate interest, recommend a balancing test and transparency notice.
- For sensitive data, check the specific LGPD hypotheses for sensitive data, not only the general lawful bases.
- For children and adolescents, flag best interest and parental/guardian consent issues when applicable.
- For vendors, check controller/operator roles, written instructions, security measures, subprocessors, audit rights, incident notice, deletion/return at termination, and international transfer mechanisms.
- For incidents, separate containment, assessment, evidence preservation, communication strategy, ANPD/titular notification analysis, and remediation.
- For AI or automated decisions, flag explainability, human review, data minimization, bias/non-discrimination, logs, and right to review automated decisions.
- For databases and logs, avoid exposing passwords, hashes, secrets, tokens, full identifiers, or unnecessary personal data.

## CRUD And Software Changes

Apply this review whenever working on existing or new CRUDs if the entity contains or can be linked to a natural person. This includes users, customers, suppliers, employees, leads, accounts, expenses, payables, investments, documents, contacts, addresses, identifiers, notes, attachments, and audit records.

For each CRUD, check:

- Grid columns expose only data needed for the workflow.
- Filters and search do not encourage unnecessary broad access to personal data.
- Detail pages and forms separate required data from optional data.
- Create and edit actions validate purpose, minimization, and lawful basis assumptions.
- Delete actions consider retention, legal obligations, audit requirements, and functional deletion/anonymization.
- Import, export, print, CSV, PDF, and reports avoid excessive personal data.
- Logs and error messages do not include secrets, passwords, hashes, tokens, full documents, or unnecessary personal data.
- Role-based access is proportional to who needs to view or change the data.
- Documentation records the purpose, categories of data, retention expectation, and open LGPD questions.

If the CRUD clearly does not handle personal data, no LGPD artifact is required beyond noting that no personal data was identified.

## Bundled References

Read these files when needed:

- `references/lgpd-checklists.md` for reusable checklists and artifact templates.
- `references/product-review.md` for software/product LGPD review criteria.
