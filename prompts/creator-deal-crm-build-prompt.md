# Build Prompt — Creator Deal CRM

## Purpose
아래 프롬프트는 AI 코딩 에이전트에게 바로 전달해 Creator Deal CRM의 좁고 검증 가능한 MVP를 설계/구현하도록 하기 위한 실행 문서다.

## Prompt
```text
Build an MVP for a product called "Creator Deal CRM".

Goal:
Create a lightweight operations tool for creators and small creator agencies that prevents money leaks across deal stages, deliverables, invoice timing, promised payment dates, payment terms, overdue follow-up, and partial-payment recovery.

Important framing:
Do NOT build a broad creator marketplace.
Do NOT build a generic sales CRM.
Do NOT build a full accounting suite.
Build a creator deal-ops and collections-visibility workflow tool.

Target users:
- Solo creators / freelancers with recurring brand deals
- Small creator agencies (1-10 people)
- Operators/managers who currently run brand deal tracking in spreadsheets, Notion, WhatsApp, DMs, and email

ICP note:
Start with a solo-creator / freelancer-first workflow even if the data model can later support agencies. Current social evidence is strongest around individual cash-collection pain.

Core problem:
Creators and small agencies often manage brand deals across inboxes, chat apps, spreadsheets, and memory. They lose track of deliverables, usage rights, invoice status, promised payment dates, partial payments, follow-up timing, and overdue receivables. The result is awkward manual chasing, late payments, underpayments, ghosting, and poor cash visibility. Another recurring failure happens before invoicing: payment terms, invoice recipient details, and AP instructions are often unclear before work starts.

Product wedge:
Optimize the MVP for creator deal execution plus collections visibility, not generic deal management.
Treat `cash-arrival visibility` as the north-star UX, not dashboard breadth.
Treat `follow-up timing` as a first-class product problem, not just a copy-generation afterthought.
Treat `payment terms clarity before work starts` as a first-class risk-control problem, not a buried notes field.
Treat `weak payment system / weak payment clause setup` as a core root-cause diagnosis, not just an after-the-fact collections excuse.
Treat invoice professionalism / readiness as a first-class problem too: many users still send weak, incomplete, or chat-style invoices without clear terms, late-fee expectations, or reminder setup.
Assume the default manual collections workflow often wants explicit checkpoints like **7 days before due date, 1 day before due date, day 3 after due date, day 7 after due date, and day 30 after due date or promised payment date**.
Preserve collections policy memory too: users may want late-fee rules, stop-work-until-paid rules, and escalation thresholds tracked per deal.
Treat invoice routing completeness as a first-class gating problem. Before work starts or an invoice is sent, the MVP must make it obvious whether the creator has the AP recipient, the day-to-day/project-owner contact, any required PO number or vendor reference, and the correct submission path.
Treat payment-system-stage visibility as first-class too. The MVP should make it explicit whether the deal is blocked on vendor onboarding, payment-system setup, recruiter/intermediary billing handoff, invoice booking, or the next AP pay run.
The MVP should help a user answer these questions quickly:
1. Which deals are unpaid, underpaid, or overdue?
2. What deliverable is blocking invoice readiness?
3. Who needs a follow-up today, and through which channel?
4. What message should I send next without sounding chaotic?
5. What usage rights, quoted rate, and deliverable commitments were agreed?
6. What payment terms or promised dates were missed, and what should happen next?
7. What invoice workflow details still need to be confirmed before I send or chase an invoice?
8. Is the invoice itself professional enough — terms, due date, late-fee policy, required fields, reminder setup — to support collections?
9. How did usage-rights scope change the quoted price during negotiation?
10. Which deals are risky because the payment terms were never clarified before work started?
11. Do I have the correct AP contact, project owner, PO/reference number, and submission path before I send or chase this invoice?
12. Is the money actually late, or is it blocked in vendor onboarding, intermediary billing, invoice booking, or the next pay run?
13. Should this deal now move into `pause future work until paid` mode?

Primary user outcome:
By the end of a session, the user should be able to see:
- all active deals,
- deal stage and deliverable status,
- invoice/payment state,
- next follow-up action,
- a clean overdue queue,
- and the fastest answer to: `where is my money stuck right now?`

MVP scope:
- single workspace
- create and manage post-agreement payment-tracked deals
- attach one or more deliverables to each deal
- capture structured payment terms, invoice workflow requirements, and deposit requirements
- capture AP routing details, including project owner, AP contact, and PO/reference fields when known
- capture invoice-template quality fields such as due date, late-fee policy, reminder defaults, and required invoice fields
- capture quoted rate, usage rights, and repeat-brand notes
- capture usage-rights pricing deltas and negotiation notes
- log invoices manually
- log payments manually, including partial payment and underpayment
- record promised payment dates
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
   - payment_terms
   - follow_up_sequences
   - usage_rights

   Each deal must store structured payment terms, deposit expectations, invoice trigger conditions, promised payment dates, quoted rate history, usage rights, usage-rights pricing adjustments, invoice workflow requirements (invoice recipient, AP recipient, project owner / day-to-day contact, required fields, PO number or vendor reference, submission method, supporting docs, payment portal or AP instructions if known), invoice-quality fields (due date clarity, late-fee policy, late-fee start rule, reminder defaults, professional-template readiness), stop-work-until-paid policy, payment-system-stage fields (vendor onboarding status, payment-system setup status, intermediary/recruiter billing involvement, invoice booked status, next expected pay-run date when known), and the recommended follow-up sequence.
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
   - deal_status: lead | negotiating | awaiting_deposit | active | delivered | invoiced | partially_paid | paid | overdue | closed
   - deliverable_status: planned | in_progress | submitted | approved
   - invoice_status: draft | sent | deposit_pending | partially_paid | promised | promised_date_missed | paid | overdue | disputed
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
   - every deal detail should expose the reason a case is blocked from invoicing or closing
   - invoice readiness blockers must distinguish missing creator-side work from missing client-side invoice instructions
   - invoice readiness blockers must explicitly flag missing AP recipient, missing project-owner contact, missing PO/reference number, or unknown submission route
   - payment blockers must explicitly distinguish: vendor onboarding delay, payment-system setup delay, intermediary/recruiter handoff, invoice not booked, waiting for next pay run, client dispute, or true non-response
   - quoted rate history must make usage-rights-driven price changes visible
6. Follow-up generation contract:
   - recommend the next step in a collections sequence, not just a standalone message
   - support a default cadence such as **day-3 gentle reminder, day-7 firmer payment-date confirmation, day-30 escalation/final follow-up**, while allowing per-deal override
   - valid next actions include: gentle reminder | payment date confirmation | resend invoice details | contact AP / request PO | firmer escalation | final notice / pause future work | late fee notice | stop work until paid
   - the system must explain *why now* for each next action so users understand why this is the right follow-up moment
   - store sequence step number, last contact date, last_contact_target, promised payment date, recommended next send date, and the reason that date was chosen
   - generate 2-3 message variants for each overdue case
   - tone options: polite | firm | final_notice
   - include due amount, invoice reference, and next requested action
   - keep WhatsApp variants short and sendable
   - when an invoice is overdue or promised payment is missed, support dual-send guidance: send one version to AP/accounts payable and one version to the project owner/day-to-day contact when both exist
   - when late fees are enabled, the recommendation must state whether the next message should reference the late fee and from what trigger date
7. Start with fixtures and local-first iteration:
   - seed at least 10 sample deals
   - include examples for: on-time payment, partial payment, overdue invoice, missing deliverable, ghosted client, payment-promised-then-missed, missing invoice instructions, missing AP recipient / project owner / PO number, dual-send follow-up to AP + project owner, and a usage-rights expansion that changed the quoted rate

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
- a user can log 10+ deals and see current stage, invoice, and payment status
- the system surfaces overdue, underpaid, and promised-date-missed deals correctly
- the system can suggest follow-up drafts for WhatsApp and email
- the system can show what operational fact is blocking payment progress
- the system makes invoice workflow questions explicit before an invoice is sent
- the system makes AP recipient, project-owner contact, PO/reference number, late-fee policy, and stop-work-until-paid status explicit before collections start
- the system shows how usage-rights negotiation changed the deal value or follow-up recommendation
- a user can tell what to do next without opening a spreadsheet
- the output is clearly more focused on deal ops and collections visibility than a generic CRM

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
  "quoted_rate": 1500,
  "agreed_payment_terms": "50% upfront, 50% net 14 after approval",
  "deposit_required": true,
  "deposit_amount": 750,
  "work_start_condition": "deposit_received",
  "invoice_trigger": "deliverable_approved",
  "usage_rights": "organic social for 90 days",
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