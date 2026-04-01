# Build-Ready Agent Handoff

**Updated**: 2026-04-02

## Purpose
이 문서는 코딩 에이전트가 `ideas/`, `prompts/`, `.survey/`를 왔다 갔다 해석하지 않고도 바로 구현을 시작할 수 있도록, 이번 주 기준 핵심 엔티티/상태/시드 시나리오/근거를 한 장에 묶은 핸드오프다.

## Primary — Voice-of-Customer Repository

### Canonical entities
- `conversation_records`
- `record_extractions`
- `evidence_spans`
- `themes`
- `brief_generations`
- `brief_items`
- `source_contexts`

### Required fields that latest evidence made non-optional
- `priority_override_reason`
- `override_review_at`
- `escalation_decision_required`
- `decision_owner`
- `strategy_time_tax_summary`
- `work_size_band` = `small_3d | small_1w | small_2w | larger_bet | unknown`
- `commitment_fit` = `small_patch_candidate | roadmap_candidate | unsafe_to_commit`
- `satisfy_commitment_without_derailing_strategy` = `yes | no | unclear`

### Required seed scenarios
1. Generic support noise that should stay raw evidence
2. Named enterprise commitment that conflicts with current roadmap capacity
3. Request elevated by `external_customer_commitment` override
4. Conflict that now needs explicit exec arbitration
5. `later` item that still needs a safe answer to `when is later?`
6. Small commitment-linked ask that looks like a **3-day to 2-week save**, not a major roadmap bet
7. Weekly brief item showing **strategy-time tax** from commitment reconciliation

### Evidence → field mapping
| Evidence signal | Field / behavior it justifies |
|---|---|
| separate flow for customer commitments | explicit commitment queue separate from generic demand |
| external commitments / shipments / company objectives / market timing | `priority_override_reason` |
| some conflicts become exec decisions | `escalation_decision_required`, `decision_owner` |
| strategy time gets crowded out by commitments | `strategy_time_tax_summary` |
| customer commitments + 3-day-to-2-week small work items | `work_size_band`, `commitment_fit` |
| now/next/later still triggers `when is later?` | safe customer wording + ambiguity explanation |

## Backup — Creator Deal CRM

### Canonical entities
- `deals`
- `deal_contacts`
- `deliverables`
- `invoices`
- `payments`
- `follow_ups`
- `payment_terms`
- `follow_up_sequences`
- `usage_rights`

### Required fields that latest evidence made non-optional
- `invoice_destination`
- `ap_contact`
- `project_owner_contact`
- `po_or_vendor_reference`
- `payment_clause_strength` = `strong | partial | weak | missing`
- `missing_clause_fields[]`
- `invoice_in_advance_required`
- `direct_client_ap_navigation_confidence`
- `remittance_proof_artifact_type` = `receipt | remittance_advice | bank_proof | other`
- `recommended_next_send_date`
- `follow_up_sequence_step`

### Required seed scenarios
1. Healthy on-time payment
2. Overdue invoice with day-3 reminder due
3. Promised payment missed, waiting for proof
4. Weak clause setup causing poor collections posture
5. Missing AP contact / invoice destination split
6. PO/reference missing
7. Need to invoice in advance for AP lead time
8. Need dual-send to AP + project owner
9. Need 2-week re-nudge after soft reply
10. Remittance proof requested, specifically waiting on `remittance_advice`

### Evidence → field mapping
| Evidence signal | Field / behavior it justifies |
|---|---|
| AP contact and invoice destination are separate | split routing fields |
| client says payment sent → ask for documentation / receipt | remittance-proof state |
| paid invoice may be called remittance advice | `remittance_proof_artifact_type` |
| late payment clause can matter more than more reminders | `payment_clause_strength`, clause-first diagnosis |
| weak payment systems cause delay | payment-system-stage visibility |
| AP needs time to process/audit invoices | invoice-in-advance / AP lead-time fields |
| day 3 / day 7 / day 30 + 2-week re-nudge | explicit follow-up sequence engine |

## Definition of done this week

### If implementing VoC first
- seed fixtures exist for all 7 VoC scenarios above
- one weekly brief demo shows: override reason, escalation owner, strategy-time tax, and safe customer wording
- one commitment-linked item is classified as a small save rather than a roadmap bet

### If implementing Creator first
- seed fixtures exist for all 10 creator scenarios above
- overdue queue shows clause-strength diagnosis, routing completeness, payment-stage blocker, and next action
- one payment-claimed case clearly waits on `remittance_advice` rather than generic proof

## Source anchors
- `.survey/social-web-app-ideas/context.md`
- `.survey/social-web-app-ideas/solutions.md`
- `ideas/voc-repository.md`
- `ideas/creator-deal-crm.md`
- `prompts/voc-repository-build-prompt.md`
- `prompts/creator-deal-crm-build-prompt.md`
