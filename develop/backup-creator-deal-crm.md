# Develop — Backup / Creator Deal CRM

**Status**: Latest active development plan  
**Updated**: 2026-04-02

## 1. Build goal
사용자가 deal 이후의 invoice/payment 흐름을 구조화해서 **오늘 회수해야 할 돈과 다음 행동**을 볼 수 있게 한다.

## 2. MVP scope
### 포함
- deal 등록
- AP / project owner / intermediary routing
- payment terms / PO / reference 저장
- invoice destination 저장
- invoice readiness checklist
- due date / promised payment date tracking
- pay-run / onboarding blockage 상태 관리
- overdue cadence queue
- underpaid / ghosted / escalated state tracking
- remittance-proof 상태 기록

### 제외
- creator discovery CRM
- contract suite
- accounting integration
- auto-send messaging
- marketplace/network 기능

## 3. Core user flow
1. deal 생성
2. contact / clause / routing 정보 입력
3. deliverable 상태 기록
4. invoice sent 기록
5. due/promised/pay-run 정보 추적
6. overdue cadence queue 생성
7. paid / underpaid / escalated 종료

## 4. Main screens
### `/deals`
- stage view
- amount / due date / promised date
- payment status
- blockage badge

### `/collections/today`
- follow-up due today
- 3/7/14/30 day overdue buckets
- next action recommendation
- tone stage (`gentle`, `firm`, `escalate`)
- blockage-first grouping (`routing`, `AP review`, `pay-run`, `proof missing`)

### `/deals/:id`
- invoice readiness checklist
- routing contacts
- follow-up log
- payment events
- remittance-proof status

### `/blockages`
- onboarding blocked
- AP review
- pay-run missed
- wrong invoice destination
- missing PO/reference

## 5. Core entities
### `deals`
- id
- creator_name
- brand_name
- amount
- stage
- invoice_due_at
- promised_payment_at
- next_pay_run_at
- payment_status
- blockage_status

### `contacts`
- deal_id
- role (`project_owner`, `ap`, `intermediary`)
- name
- email
- phone

### `invoice_profiles`
- invoice_recipient
- invoice_destination
- po_number
- vendor_reference
- terms_text
- late_fee_rule
- vendor_onboarding_status
- remittance_proof_status

### `followups`
- deal_id
- cadence_day
- due_at
- tone_stage
- status
- channel
- note

### `payment_events`
- deal_id
- event_type
- amount
- happened_at
- note
- proof_requested_at
- proof_received_at

## 6. Required automation
- invoice sent → due date tracking 시작
- promised date 입력 → follow-up 기준 재계산
- due+3 / due+7 / due+14 / due+30 queue 생성
- underpaid / ghosted flag 표시
- outstanding unpaid → new work risk 표시
- pay-run miss → blockage queue 이동
- remittance promised but not received → proof request 추천
- reminder-only 자동화가 아니라 blockage type 기준으로 next step 추천

## 7. Build order
1. deal + status model
2. invoice readiness checklist + routing fields
3. overdue cadence queue
4. blockage states + payment transitions
5. next-step recommendation

## 8. First milestone
- 10개 deal 등록 가능
- today follow-up queue 동작
- overdue / underpaid / ghosted / blocked 분리
- next action 추천 표시
- invoice readiness 누락 필드 경고 표시

## 9. Validation
- 사용자가 시트 대신 이 화면을 회수 source of truth로 본다.
- follow-up timing이 유용하다는 반응이 나온다.
- invoice readiness checklist와 AP routing 정보가 실제로 빠진 정보를 줄인다.

## 10. Build prompt
```text
Build a collections-first MVP for Creator Deal CRM.

Goal:
Help creators and small agencies track invoice readiness, AP routing, payment-stage blockages, overdue follow-up, and collections visibility after a deal is won.

Must-have:
- deal tracking
- AP/project-owner/intermediary routing
- invoice readiness checklist
- invoice destination + terms + PO/reference
- due/promised/pay-run dates
- overdue cadence queue
- underpaid/ghosted/blocked states
- remittance-proof tracking

Do not build:
- discovery CRM
- accounting platform
- contract suite
- reminder-only auto-send messaging

Success:
- user can see today’s collections queue
- overdue and blocked cases are categorized clearly
- next step is obvious per deal
```
