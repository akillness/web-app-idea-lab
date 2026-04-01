# Build Prompt — Creator Deal CRM

## Purpose
아래 프롬프트는 AI 코딩 에이전트에게 바로 전달해 Creator Deal CRM의 좁고 검증 가능한 MVP를 설계/구현하도록 하기 위한 실행 문서다.

## Prompt
```text
Build an MVP for a product called "Creator Deal CRM".

Goal:
Create a lightweight operations tool for creators and small creator agencies that prevents money leaks across deliverables, invoices, payment follow-up, and overdue deals.

Important framing:
Do NOT build a broad creator marketplace.
Do NOT build a generic sales CRM.
Do NOT build a full accounting suite.
Build a creator collections and payment-recovery workflow tool.

Target users:
- Solo creators with recurring brand deals
- Small creator agencies (1-10 people)
- Operators/managers who currently run brand deal tracking in spreadsheets, WhatsApp, DMs, and email

Core problem:
Creators and small agencies often manage brand deals across inboxes, chat apps, spreadsheets, and memory. They lose track of deliverables, invoice status, partial payments, follow-up timing, and overdue receivables. The result is awkward manual chasing, late payments, underpayments, and poor cash visibility.

Product wedge:
The MVP should help a user answer these questions quickly:
1. Which deals are unpaid, underpaid, or overdue?
2. What deliverable is blocking invoice readiness?
3. Who needs a follow-up today, and through which channel?
4. What message should I send next without sounding chaotic?

Primary user outcome:
By the end of a session, the user should be able to see:
- all active deals,
- invoice/payment state,
- next follow-up action,
- and a clean overdue queue.

MVP scope:
- single workspace
- create and manage brand deals
- attach one or more deliverables to each deal
- log invoices manually
- log payments manually, including partial payment and underpayment
- surface overdue and next-action views
- generate copy-ready follow-up drafts for WhatsApp and email
- export overdue summary to markdown or CSV

Out of scope:
- marketplace/network features
- accounting integrations
- deep email sync
- e-signature
- contract generation
- tax/compliance workflows
- automated payment collection

Implementation contract for coding agent:
1. Use these canonical entities:
   - deals
   - deal_contacts
   - deliverables
   - invoices
   - payments
   - follow_ups
   - reminder_rules
2. Support these minimum routes:
   - POST /deals
   - GET /deals
   - GET /deals/:id
   - PATCH /deals/:id
   - POST /deals/:id/deliverables
   - POST /deals/:id/invoices
   - POST /invoices/:id/payments
   - POST /invoices/:id/follow-ups
   - GET /queues/overdue
   - GET /queues/today
3. Use these status enums:
   - deal_status: lead | negotiating | active | delivered | invoiced | partially_paid | paid | overdue | closed
   - deliverable_status: planned | in_progress | submitted | approved
   - invoice_status: draft | sent | partially_paid | paid | overdue | disputed
   - follow_up_channel: whatsapp | email | call | dm
4. Minimum UI surfaces:
   - deal list with filters
   - deal detail with deliverables, invoices, payments, and timeline
   - overdue queue
   - today follow-up queue
   - follow-up draft drawer/modal
5. Preserve financial traceability:
   - every payment log must record amount, currency, paid_at, method, and note
   - every underpayment must remain visible until resolved
   - every follow-up must store channel, suggested message, actual message sent, and response status
6. Follow-up generation contract:
   - generate 2-3 message variants for each overdue case
   - tone options: polite | firm | final_notice
   - include due amount, invoice reference, and next requested action
   - keep WhatsApp variants short and sendable
7. Start with fixtures and local-first iteration:
   - seed at least 10 sample deals
   - include examples for: on-time payment, partial payment, overdue invoice, missing deliverable, and ghosted client

Suggested artifacts to produce:
1. product spec
2. information architecture
3. data model
4. overdue queue logic
5. follow-up prompt templates
6. MVP implementation plan
7. simple UI flow
8. validation checklist

Success criteria:
- a user can log 10+ deals and see current invoice/payment status
- the system surfaces overdue and underpaid deals correctly
- the system can suggest follow-up drafts for WhatsApp and email
- a user can tell what to do next without opening a spreadsheet
- the output is clearly more focused on collections/payment recovery than a generic CRM

Engineering preference:
Favor a simple stack and fast iteration. Choose implementation details that make the overdue queue and follow-up loop testable with sample data immediately.
```

## Example payloads to anchor implementation
```text
Sample deal:
{
  "brand_name": "Acme Hydration",
  "campaign_name": "Spring launch reel",
  "owner_name": "Jennie",
  "currency": "USD",
  "deal_value": 1500,
  "agreed_payment_terms": "50% on approval, 50% net 14",
  "primary_channel": "email"
}

Sample invoice:
{
  "deal_id": "deal_001",
  "invoice_number": "INV-2026-014",
  "amount_due": 1500,
  "issued_at": "2026-04-01",
  "due_at": "2026-04-15",
  "status": "sent"
}

Sample payment log:
{
  "invoice_id": "inv_001",
  "amount_paid": 750,
  "paid_at": "2026-04-18",
  "method": "bank_transfer",
  "note": "Client paid first half only"
}

Sample follow-up draft:
WhatsApp / polite:
Hi! Quick reminder that invoice INV-2026-014 for $750 remaining is now overdue. Could you confirm the payment date today?
```

## Immediate follow-up prompt
```text
Using the above product definition, generate:
1. a technical spec,
2. a JSON schema for deals / invoices / payments / follow-ups,
3. prompt templates for follow-up draft generation,
4. a barebones MVP task list ordered by fastest validation path.
```
