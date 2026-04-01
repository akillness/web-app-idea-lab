# Skeptical PM Memo — 2026-04-01 Loop 19

## Stance
- **Primary remains**: Voice-of-Customer Repository
- **Backup remains**: Creator Deal CRM
- **But** this loop should be read as a clarification loop, not a permission-to-expand loop.

## What should NOT change
1. Do **not** change the ranking.
2. Do **not** turn VoC into roadmap publishing / planning software.
3. Do **not** turn Creator into broad CRM, accounting, or contract software.

## Read on the newest evidence
- On the VoC side, the important new signal is not another prettier roadmap bucket. It is the direct statement that teams keep **a separate flow for customer commitments**.
- That matters because it supports the current wedge: raw evidence, planning candidates, and explicit promises should not collapse into one backlog state.
- The other new PM signal links commitment hygiene to business execution: **close deals, plan effectively, meet customer commitments**.
- On the creator side, the new evidence strengthens the same narrow job as before: **PO/reference reuse, contract-backed payment terms, and explicit late-fee rules**.
- Evidence quality is still mostly **Yahoo indexed snippets / prior recoveries**, so this is enough to sharpen fields and wording, not enough to authorize broader product ambition.

## Temptation to resist
> **Do not overbuild the VoC commitment-flow insight into a full roadmap-management product.**

Why:
- the new signal validates a separate commitment layer
- it does **not** validate that teams want another heavyweight planning suite
- overbuilding here risks drifting into Productboard/Jira territory before the sharper wedge is proven

## Smallest useful refinement to accept
### Accept one narrow primary-side refinement
Make `explicit customer commitment` a first-class workflow in the VoC docs and prompts.

Minimal acceptable shape:
- separate it from generic demand and execution backlog
- store owner, target window, confidence, risk reason, and next review trigger
- keep `bucket_mode` and the safe answer to `when is later?`

### Accept one narrow backup-side refinement
Model late-fee policy as structured rule data, not just notes.

Minimal acceptable shape:
- trigger days
- fee type
- fee value/formula
- compounding yes/no
- contract-backed yes/no

## Bottom line
- **Stay with VoC primary**
- **Keep Creator as a sharp backup**
- **Refine fields, not category scope**
