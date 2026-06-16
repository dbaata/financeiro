# Product Review For LGPD

Use this reference when reviewing code, backlog items, database schemas, APIs, forms, analytics, logs, automations, AI features, or user-facing flows.

For CRUD work, use this reference both for existing modules and new modules whenever an entity contains or can be linked to a natural person.

## Review Areas

- Coleta: the UI only asks for data needed for a clear purpose.
- Transparencia: privacy notice, inline explanations, and consent text are aligned with actual processing.
- Default privacy: optional processing is off by default when appropriate.
- Access control: personal data is visible only to roles that need it.
- Logs: logs avoid full identifiers, secrets, tokens, credentials, hashes, free-text personal data, and unnecessary payloads.
- Retention: records have retention criteria and deletion/anonymization flow.
- Export and access: data subject access can be answered without manual database spelunking.
- Correction: user or backoffice flows can correct inaccurate data where required.
- Deletion/blocking: functional deletion uses appropriate retention exceptions and audit needs.
- Sharing: integrations and webhooks document recipients and purpose.
- International transfer: cloud, analytics, support, and subprocessors are identified.
- Security: encryption, transport security, least privilege, audit trail, and incident detection are proportional to risk.
- Automated decisions: provide review path, explanation, and bias/non-discrimination controls when decisions affect the titular.

## Software Output Template

```markdown
## LGPD Review

### Personal Data Inventory
- Data:
- Titulars:
- Purpose:
- Systems:
- Recipients:

### Role And Basis
- Controller/operator:
- Candidate lawful basis:
- Open validation:

### Product Risks
- Risk:
- Impact:
- Mitigation:

### Engineering Requirements
- Requirement:
- Acceptance criteria:
- Evidence:

### Open Questions
- Question:
```

## Red Flags

- Broad consent for mandatory service processing.
- Sensitive data stored without a specific need.
- Free-text fields used for structured personal data.
- Debug logs with request bodies containing personal data.
- Analytics or marketing pixels firing before appropriate notice/control.
- No retention rule for inactive users, leads, candidates, or customers.
- Vendor has access to production data without documented role and controls.
- Support agents can view more data than needed.
- Exported spreadsheets with excessive personal data.
- AI feature using personal data without purpose limitation, reviewability, or risk assessment.

## CRUD Checklist

- List/grid: columns, filters, sort fields, row actions, bulk actions, exports, and empty states do not disclose excessive personal data.
- Detail: sensitive or high-risk fields are hidden, masked, or permission-gated when possible.
- Create/edit: required fields have a clear purpose; optional fields are truly optional.
- Delete: behavior is documented as hard delete, soft delete, anonymization, blocking, or retention for legal/audit reasons.
- Search: partial identifiers and broad text search are limited to legitimate operational needs.
- Attachments: uploads are typed, access-controlled, retained intentionally, and scanned/validated where applicable.
- Audit: audit trails record operational evidence without copying full personal data payloads.
- Errors: validation and server errors avoid leaking internal data or personal data.
- Tests/seeds: sample data does not contain real personal data.
- Docs: module documentation states data categories, purpose, access assumptions, retention assumptions, and open legal questions.
