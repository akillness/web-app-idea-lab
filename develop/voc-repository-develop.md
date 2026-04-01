# Develop File — Voice-of-Customer Repository

**Idea status**: Primary  
**Purpose**: 이 문서는 아이디어 설명이 아니라, 실제 구현 착수용 개발 기준 문서다.

## 1. Product goal
초기 B2B SaaS 팀이 흩어진 support / churn / feature-request / commitment 데이터를 넣으면,
매주 월요일 아침 기준으로 아래 4가지를 바로 얻어야 한다.

1. 이번 주에 악화된 문제
2. 어떤 세그먼트/고객군이 영향을 받는지
3. 어떤 요청/약속/로드맵 항목이 위험한지
4. 내부 의사결정과 외부 커뮤니케이션에 바로 쓸 수 있는 brief

## 2. MVP target user
### Primary ICP
- 10~100명 규모 B2B SaaS 팀
- founder-led product / sales 운영
- support tooling은 있으나 discovery ritual이 약한 팀
- Productboard/Jira/Notion/Sheet를 섞어 쓰는 팀

### User persona
- Founder/CEO: 이번 주 뭐가 가장 위험한지 알고 싶음
- PM: raw request가 아니라 ranked decision queue가 필요함
- CS lead: 어떤 churn/support signal이 구조적 문제인지 구분하고 싶음
- Product marketer: roadmap/status language를 안전하게 만들고 싶음

## 3. MVP promise
사용자는 여러 source record를 넣고 10분 안에 아래 산출물을 받아야 한다.
- weekly decision brief
- commitment risk list
- now/next/later-safe external update draft
- evidence-linked theme list

## 4. Core user flow
1. 사용자가 record를 paste/upload 한다.
2. source type을 고른다. (`support`, `churn`, `feature_request`, `sales_note`, `commitment_note`, `other`)
3. 시스템이 AI extraction을 수행한다.
4. extracted signal이 theme cluster로 묶인다.
5. 사용자는 theme별 evidence를 drill-down 한다.
6. 시스템이 weekly brief를 생성한다.
7. 사용자는 내부 회의용 markdown / 외부 업데이트 초안으로 export 한다.

## 5. MVP surfaces
### A. Intake Inbox
- 최근 업로드 record 목록
- source type, account, segment, severity preview
- processing status
- failed extraction retry

### B. Theme Board
- pain / objection / feature / churn / commitment-risk 탭
- 빈도, ARR importance, segment concentration, recency
- theme 클릭 시 evidence snippet 표시

### C. Monday Brief
- What got worse
- Segment at risk
- Commitments at risk this quarter
- Recommended actions now
- What stays intentionally uncommitted

### D. External Update Draft
- now / next / later-safe wording
- roadmap vs release-plan 분리 문안
- ambiguity explanation 포함

## 6. Screen-level spec
### `/records`
- record list
- upload modal
- paste textarea
- source filters

### `/themes`
- theme ranking table
- score breakdown: frequency / severity / revenue importance / commitment exposure
- source evidence drawer

### `/briefs/:id`
- weekly decision brief markdown view
- edit / regenerate
- export markdown

### `/updates/draft`
- external-safe draft view
- tone selector: conservative / neutral / proactive

## 7. Required entities
### `records`
- id
- workspace_id
- source_type
- raw_text
- account_name
- segment
- arr_band
- lifecycle_stage
- uploaded_at
- status

### `signals`
- id
- record_id
- signal_type
- label
- severity
- evidence_spans
- requesting_customer
- expected_value
- rough_effort
- commitment_status
- external_update_mode

### `themes`
- id
- theme_type
- canonical_label
- frequency
- severity_score
- revenue_risk_score
- commitment_risk_score
- recency_score
- total_score

### `brief_items`
- id
- brief_id
- item_type
- title
- recommendation
- confidence
- source_theme_ids

## 8. Ranking logic (MVP)
Theme total score는 아래의 가중합으로 계산한다.
- frequency: 30%
- severity: 20%
- ARR / account importance: 20%
- commitment risk: 20%
- recency: 10%

초기 버전에서는 완전 자동 최적화보다 **명시적 규칙 기반 + LLM 보조**가 낫다.

## 9. AI jobs
### extraction job
입력 record를 structured signal로 변환

### normalization job
유사 label 정리, canonical label 부여

### clustering job
theme 생성 및 score 계산

### brief generation job
weekly decision brief 생성

### external draft job
roadmap-safe customer-facing update 생성

## 10. Non-goals
- full helpdesk integration
- Jira sync first
- Productboard replacement
- benchmark product
- workflow automation hub
- outbound email sender

## 11. Sample success criteria
- 20개 record를 넣었을 때 5개 이상 meaningful theme가 나온다.
- 각 theme에 source evidence가 보인다.
- founder/PM이 brief를 그대로 회의에 쓴다.
- external update draft가 “date promise를 덜 위험하게 만든다”는 피드백을 받는다.

## 12. Build order
1. record intake
2. extraction JSON validation
3. theme ranking board
4. weekly brief generation
5. external update draft
6. editing/export

## 13. Open implementation questions
- SQLite로 시작하고 나중에 Postgres로 갈지
- score tuning을 config file로 뺄지
- evidence span UX를 quote block 중심으로 할지 inline highlight로 할지
- roadmap-safe draft를 separate artifact로 유지할지 brief 내 subsection으로 둘지

## 14. First dev milestone
**Milestone 1:**
- paste/upload 가능
- 10개 샘플 record 처리 가능
- top themes 보임
- markdown brief 1개 생성 가능

이 milestone까지 되면, 실제 인터뷰/티켓 데이터로 바로 검증 시작 가능.
