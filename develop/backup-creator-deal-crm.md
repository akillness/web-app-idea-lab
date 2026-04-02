# Develop — Backup / Creator Deal CRM

**Status**: Latest active development plan  
**Updated**: 2026-04-02

## 1. Build goal
사용자가 deal 이후의 invoice/payment 흐름을 구조화해서 **오늘 회수해야 할 돈과 다음 행동**을 볼 수 있게 한다.

핵심은 generic creator CRM이 아니라, collections 단계에서 `지금 어디서 막혔는지`를 보여주는 **cash-ops operating layer**다. 최신 재검색 기준으로는 `invoice destination`, `remittance-proof`를 핵심 thesis로 과장하지 말고, **AP owner / AP review lead time / pay-run / blockage recovery**를 중심축으로 두는 편이 맞다. 또한 일부 실무자는 pay-run을 놓치지 않기 위해 invoice를 미리 넣기 때문에, MVP도 `독촉 시점`뿐 아니라 **invoice-ahead timing**을 다뤄야 한다.

## 2. MVP scope
### 포함
- deal 등록
- AP / project owner / intermediary routing
- named AP owner 기록
- payment terms / PO / reference 저장
- AP contact와 invoice destination을 분리해 저장
- invoice destination 저장 (보조 운영 필드)
- invoice readiness checklist
- AP review lead time 상태 관리
- due date / promised payment date tracking
- pay-run / onboarding blockage 상태 관리
- payer-side manual AP process 상태 관리
- overdue cadence queue
- underpaid / ghosted / escalated state tracking
- remittance-proof 상태 기록 (보조 운영 필드)
- next-step recommendation
- invoice-ahead recommendation for pay-run-sensitive deals

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
4. invoice readiness 확인
5. invoice sent 기록
6. due/promised/pay-run 정보 추적
7. AP review lead time 확인
8. overdue cadence queue 생성
9. pay-run miss / AP review recovery
10. paid / underpaid / escalated 종료

## 4. Main screens
### `/deals`
- stage view
- amount / due date / promised date
- payment status
- blockage badge
- invoice correctness badge
- named AP owner badge

### `/collections/today`
- follow-up due today
- 3/7/14/30 day overdue buckets
- next action recommendation
- invoice-ahead recommendation for upcoming pay-run windows
- tone stage (`gentle`, `firm`, `escalate`)
- blockage-first grouping (`routing`, `AP review`, `manual AP process`, `pay-run`, `proof missing`, `wrong destination`)

### `/deals/:id`
- invoice readiness checklist
- routing contacts
- follow-up log
- payment events
- remittance-proof status
- AP review started / cleared timestamps
- promised date vs actual status delta
- pay-run recovery notes

### `/blockages`
- onboarding blocked
- AP review
- pay-run missed
- wrong invoice destination
- missing PO/reference
- missing remittance proof
- no named AP owner

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
- payer_process_mode (`manual_ap`, `scheduled_pay_run`, `unknown`)
- invoice_ahead_recommended

### `contacts`
- deal_id
- role (`project_owner`, `ap`, `intermediary`)
- name
- email
- phone
- is_primary_ap_owner

### `invoice_profiles`
- invoice_recipient
- invoice_destination
- invoice_destination_verified
- po_number
- vendor_reference
- terms_text
- late_fee_rule
- vendor_onboarding_status
- ap_review_status
- ap_review_started_at
- ap_review_cleared_at
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
- promised_pay_run_at
- missed_pay_run_flag

## 6. Required automation
- invoice sent → due date tracking 시작
- promised date 입력 → follow-up 기준 재계산
- due+3 / due+7 / due+14 / due+30 queue 생성
- upcoming pay-run window + AP review state 기준으로 invoice-ahead recommendation 생성
- underpaid / ghosted flag 표시
- outstanding unpaid → new work risk 표시
- pay-run miss → blockage queue 이동
- pay-run miss 후 재확인 날짜 자동 재계산
- remittance promised but not received → proof request 추천
- invoice destination 미확인 / PO 누락 / onboarding 미완료 / named AP owner 없음 시 `send reminder`보다 먼저 `fix routing` 추천
- reminder-only 자동화가 아니라 blockage type 기준으로 next step 추천

## 7. Product rules
- broad CRM처럼 deal 전체를 관리하지 않고 **payment-stage visibility**에만 집중한다.
- follow-up 문구 생성보다 먼저 `invoice correctness`, `invoice destination`, `AP owner`, `pay-run date`, `AP review state`를 확인한다.
- `AP review`, `manual AP process`, `pay-run miss`, `wrong destination`, `proof missing`, `no named AP owner`는 서로 다른 blockage로 유지한다.
- overdue queue는 날짜 기준이지만, 추천 액션은 blockage 기준으로 만든다.
- scheduled pay-run이 보이면 overdue가 아니어도 `invoice-ahead` 추천을 낼 수 있어야 한다.

## 8. Build order
1. deal + status model
2. invoice readiness checklist + routing fields
3. overdue cadence queue
4. blockage states + payment transitions
5. pay-run miss / AP owner / AP review recovery rules
6. next-step recommendation
7. invoice-ahead timing recommendation

## 9. First milestone
- 10개 deal 등록 가능
- today follow-up queue 동작
- overdue / underpaid / ghosted / blocked 분리
- next action 추천 표시
- invoice readiness 누락 필드 경고 표시
- wrong destination / AP review / pay-run miss / no named AP owner가 서로 다른 상태로 보임
- pay-run-sensitive case에서 invoice-ahead recommendation 1개 이상 생성

## 10. Validation
- 사용자가 시트 대신 이 화면을 회수 source of truth로 본다.
- follow-up timing보다 `지금 어디서 막혔는지`가 더 빨리 보인다는 반응이 나온다.
- invoice readiness checklist와 AP routing 정보가 실제로 빠진 정보를 줄인다.
- `누구에게 무엇을 보내야 하는지`가 바로 결정된다는 피드백 확보.
- `payment run을 놓쳤는지`가 한 번에 읽힌다는 반응 확보.

## 11. Build prompt
```text
Build a collections-first MVP for Creator Deal CRM.

Goal:
Help creators and small agencies track invoice readiness, AP routing, payment-stage blockages, overdue follow-up, and collections visibility after a deal is won.

Must-have:
- deal tracking
- AP/project-owner/intermediary routing
- named AP owner
- invoice readiness checklist
- invoice destination verification
- invoice destination + terms + PO/reference
- due/promised/pay-run dates
- overdue cadence queue
- underpaid/ghosted/blocked states
- remittance-proof tracking
- next-step recommendation by blockage type
- invoice-ahead recommendation for pay-run-sensitive deals

Do not build:
- discovery CRM
- accounting platform
- contract suite
- reminder-only auto-send messaging

Important rules:
- treat AP review, wrong invoice destination, pay-run miss, proof missing, and missing AP owner as separate states
- fix routing before sending another chase email when core invoice fields are incomplete
- optimize for collections visibility, not CRM completeness

Success:
- user can see today’s collections queue
- overdue and blocked cases are categorized clearly
- next step is obvious per deal
- invoice correctness problems are caught before another reminder is sent
- missing AP owner and missed pay-run are immediately visible
```
