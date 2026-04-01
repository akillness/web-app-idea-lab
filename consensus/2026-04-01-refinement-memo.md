# Refinement Memo — 2026-04-01

## Decision
- **Primary stays**: Voice-of-Customer Repository
- **Backup stays**: Creator Deal CRM
- **Reason**: VoC still has the best build readiness and team-pricing logic; Creator Deal CRM gained pressure but not enough to force a swap.

## Primary refinement — Voice-of-Customer Repository

### Sharp positioning
> The weekly evidence brief for early B2B SaaS teams: upload support tickets, feedback emails, sales notes, and interview transcripts, then get recurring pain patterns with source-linked proof and recommended product/messaging actions.

### MVP wedge
- Start with **support tickets + feedback emails** as the highest-friction, highest-volume input.
- Turn messy text into:
  - recurring pain / request / objection clusters
  - frequency + severity signals
  - source-linked evidence snippets
  - a weekly decision brief for product prioritization and messaging updates
- Win condition: replace the manual “read everything and summarize in Notion” ritual.

### What not to build
- Not a generic research repository
- Not a helpdesk replacement
- Not real-time omnichannel integrations first
- Not broad search/copilot UX before the weekly brief is clearly valuable
- Not enterprise governance / permissions early

### Why this refinement fits this loop
- New evidence kept confirming the same pain: teams already have the raw feedback, but miss **patterns** across support tickets and feedback emails.
- This makes the sharpest wedge **pattern extraction -> decision brief**, not storage.

## Backup refinement — Creator Deal CRM

### Sharp positioning
> The accounts-receivable operating system for creators and small creator agencies: track deliverables, invoices, payment status, and overdue follow-up so brand deals actually get paid.

### MVP wedge
- Narrow from “creator CRM” to **post-close revenue ops**.
- Start with the painful flow after a deal is agreed:
  - deliverable due dates
  - invoice creation/logging
  - payment status timeline
  - overdue reminders
  - manual WhatsApp/email follow-up tracking
- Win condition: prevent missed invoices, late payments, and money leaks.

### What not to build
- Not lead generation / brand discovery
- Not a full influencer marketplace
- Not full accounting/bookkeeping
- Not deep email/calendar sync in v1
- Not contract signature / legal workflow first

### Why this refinement fits this loop
- New evidence intensified specifically around **invoicing, late payments, and manual follow-up**, including WhatsApp-heavy workflows.
- That means the wedge should tighten around **AR control**, not a broad creator relationship manager.

## Prompt-ready summary
- **Primary**: Voice-of-Customer Repository = weekly source-linked decision brief from support tickets and feedback emails.
- **Backup**: Creator Deal CRM = creator AR ops tool for invoices, overdue payments, and follow-up visibility.
