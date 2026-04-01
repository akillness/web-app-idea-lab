# Develop File — Creator Deal CRM

**Idea status**: Backup  
**Purpose**: creator CRM 일반론이 아니라, collections-first MVP를 만들기 위한 개발 문서.

## 1. Product goal
크리에이터/소형 에이전시가 deal 수주 이후부터 입금 완료 전까지의 현금흐름 리스크를 관리하게 한다.

핵심 질문은 아래다.
1. 지금 어떤 deal이 unpaid / underpaid / ghosted 상태인가?
2. 어떤 invoice가 아직 readiness 부족 상태인가?
3. 누구에게 언제 follow-up 해야 하는가?
4. 어떤 payment term / clause / AP 경로가 문제를 만들고 있는가?

## 2. MVP ICP
### Primary ICP
- 월 브랜드딜 3~20건 운영하는 솔로 크리에이터
- invoice / follow-up / payment 상태를 수동으로 관리 중인 사용자

### Secondary ICP
- 2~10명 규모 creator agency
- 여러 creator invoice를 한 번에 추적하는 운영자

## 3. MVP promise
사용자는 각 deal별로 아래를 한 화면에서 봐야 한다.
- deliverable status
- invoice readiness
- promised payment date
- AP/project owner routing
- overdue follow-up cadence
- next action

## 4. Core user flow
1. deal 생성
2. brand / project owner / AP contact / payment terms 입력
3. deliverable 상태 업데이트
4. invoice readiness 체크
5. invoice sent 기록
6. due date / promised payment date 추적
7. overdue cadence에 따라 next action queue 생성
8. paid / underpaid / escalated 상태 종료

## 5. MVP surfaces
### A. Deal Pipeline
- agreed / in production / delivered / invoiced / promised / overdue / paid
- amount, due date, promised date 표시

### B. Invoice Readiness Checklist
- invoice recipient
- AP contact
- PO/reference
- vendor onboarding done?
- payment terms defined?
- late fee / stop-work policy defined?

### C. Collections Queue
- follow-up due today
- 3-day / 7-day / 30-day overdue buckets
- ghosted
- underpaid
- escalation needed

### D. Deal Detail
- deliverable notes
- payment terms
- usage rights
- follow-up log
- payment events

## 6. Required entities
### `deals`
- id
- creator_name
- brand_name
- amount
- currency
- stage
- deliverable_due_at
- invoice_due_at
- promised_payment_at
- payment_status

### `contacts`
- id
- deal_id
- role (`project_owner`, `ap`, `intermediary`)
- name
- email
- phone
- preferred_channel

### `invoice_profiles`
- id
- deal_id
- invoice_recipient
- po_number
- vendor_reference
- onboarding_status
- terms_text
- late_fee_rule
- stop_work_rule

### `followups`
- id
- deal_id
- cadence_day
- due_at
- status
- channel
- note

### `payment_events`
- id
- deal_id
- event_type (`invoice_sent`, `promise_received`, `partial_paid`, `paid`, `escalated`)
- amount
- happened_at
- note

## 7. Core automation rules
- invoice sent 이후 due date 자동 생성
- promised payment date가 생기면 follow-up 기준일 재계산
- due+3, due+7, due+30 follow-up task 자동 추천
- underpaid면 outstanding balance를 별도 경고
- outstanding unpaid balance가 있으면 `new work risk` flag 표시

## 8. Non-goals
- creator discovery CRM
- contract generation suite
- accounting integration first
- auto-send email system first
- marketplace/network graph

## 9. Validation criteria
- 사용자가 10개 deal 이상 넣고도 상태를 잃지 않는다.
- 오늘 해야 할 follow-up queue가 유용하다는 피드백이 나온다.
- 사용자가 시트 대신 이 제품을 collections source of truth로 쓰기 시작한다.
- 최소 3명 이상이 invoice readiness checklist를 가치 있다고 말한다.

## 10. Build order
1. deal entity + pipeline
2. invoice readiness checklist
3. follow-up queue
4. payment status transitions
5. underpaid / ghosted / escalation flags

## 11. First milestone
**Milestone 1:**
- deal 생성 가능
- due/promised date 입력 가능
- today follow-up queue 보임
- overdue / underpaid list 보임

## 12. Key risk
creator CRM처럼 넓게 가면 바로 흐려진다. 초반 제품 문구, 화면, 데이터 모델 모두 `collections visibility` 중심으로 고정해야 한다.
