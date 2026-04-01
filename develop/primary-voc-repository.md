# Develop — Primary / Voice-of-Customer Repository

**Status**: Latest active development plan  
**Updated**: 2026-04-02

## 1. Build goal
사용자가 support / churn / feature request / commitment records를 넣으면, 시스템이 이를 구조화해서 **주간 의사결정 브리프**와 **commitment-safe external update draft**를 생성한다.

핵심은 feedback 저장소가 아니라, 흩어진 evidence를 **internal decision layer**와 **external communication layer**로 번역하는 것이다.

## 2. MVP scope
### 포함
- record paste/upload
- source type 지정
- AI extraction
- theme clustering
- account/revenue-aware ranking
- commitment risk detection
- priority override labeling
- weekly decision brief 생성
- now/next/later-safe external update draft 생성
- markdown export

### 제외
- 실시간 SaaS integration
- advanced auth / permissions
- Productboard/Jira sync
- benchmark network
- outbound automation

## 3. Core user flow
1. record 업로드
2. extraction job 실행
3. signals 저장
4. theme cluster 생성
5. ranked theme board 표시
6. weekly brief 생성
7. external update draft 생성
8. markdown export

## 4. Main screens
### `/records`
- upload / paste
- source filter
- processing status
- failed retry

### `/themes`
- theme list
- score breakdown
- evidence drawer
- linked accounts / segments
- linked commitments / override reasons

### `/briefs/latest`
- weekly decision brief
- edit / regenerate
- export markdown
- internal notes vs customer-facing implications split

### `/updates/latest`
- customer-safe roadmap / progress wording
- tone selector
- bucket definition note (`now`, `next`, `later`)
- ambiguity explanation block
- `near-term commitments only` validation badge
- `when is later?` answer helper

### `/commitments`
- promises at risk
- affected accounts
- promise type (`date`, `range`, `directional`)
- suggested safer wording
- confidence / evidence link

## 5. Core entities
### `records`
- id
- source_type
- raw_text
- account_name
- customer_name
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
- expected_value
- rough_effort
- commitment_status
- promise_type
- external_update_mode
- priority_override_reason

### `themes`
- id
- canonical_label
- theme_type
- frequency
- severity_score
- revenue_risk_score
- commitment_risk_score
- recency_score
- override_score
- total_score

### `brief_items`
- id
- brief_type
- title
- recommendation
- confidence
- source_theme_ids
- affected_account_ids

### `update_drafts`
- id
- brief_id
- now_text
- next_text
- later_text
- bucket_definition_note
- ambiguity_note
- safe_wording_notes
- commitment_window_rule (`near_term_only`)
- timeline_confidence_note
- answer_when_is_later

## 6. Ranking logic
초기 점수 가중치:
- frequency 25
- severity 20
- ARR/account importance 20
- commitment risk 20
- recency 10
- priority override 5

규칙 기반 점수 + LLM 해석 보조로 시작한다.

`priority_override_reason`은 아래 중 하나 이상으로 제한한다.
- customer commitment
- churn risk
- strategic segment
- company objective
- technical foundation

## 7. Required outputs
### Weekly Decision Brief
반드시 아래 섹션이 있어야 한다.
- what got worse
- segment at risk
- commitments at risk
- recommended actions now
- priority overrides and why
- what stays intentionally uncommitted
- evidence highlights

### External Update Draft
- now
- next
- later
- bucket definition note
- ambiguity explanation
- answer to `when is later?`
- non-commitment-safe wording
- rule: `now`에만 near-term commitment 허용, `next/later`는 방향성 표현만 허용

## 8. Product rules
- `now/next/later`는 **일정 약속 도구**가 아니라 **방향성 커뮤니케이션 도구**로 취급한다.
- `now`에만 구체 약속 후보를 허용하고, `next/later`는 directional wording만 허용한다.
- 대형 계정 / churn / objective로 우선순위가 바뀌면 반드시 `왜 점프했는지`를 brief에 남긴다.
- internal decision artifact와 customer-facing update draft를 섞지 않는다.

## 9. Build order
1. record intake
2. extraction JSON validation
3. theme ranking board
4. commitment risk + priority override labeling
5. weekly brief generation
6. external update draft
7. export/editing

## 10. First milestone
- 10~20개 샘플 record 입력 가능
- 5개 이상 theme 생성
- brief 1개 생성
- evidence linked output 확인 가능
- commitment risk item 최소 1개 노출
- `when is later?`에 답하는 safe draft 한 개 생성

## 11. Validation
- founder/PM이 실제 weekly review 전에 본다.
- brief를 회의에서 그대로 사용한다.
- `무엇이 악화됐는지 빨리 읽힌다`는 피드백 확보.
- `why this jumped the queue` 설명이 납득된다는 피드백 확보.
- `now/next/later` 초안이 고객 커뮤니케이션에 바로 수정 가능한 수준이라는 반응 확보.

## 12. Build prompt
```text
Build an MVP web app for Voice-of-Customer Repository.

Goal:
Turn support, churn, feature request, and commitment records into a weekly decision brief and a commitment-safe external update draft for early-stage B2B SaaS teams.

Must-have capabilities:
- upload/paste records
- structured extraction
- account/revenue-aware ranking
- commitment risk detection
- priority override labeling
- weekly brief generation
- customer-safe now/next/later update draft
- explicit answer helper for "when is later?"
- markdown export

Do not build:
- deep integrations
- enterprise auth
- generic note-taking app
- roadmap system of record

Important rules:
- only near-term commitments can appear in `now`
- `next/later` must remain directional
- keep internal decision logic separate from customer-facing wording

Success:
- 10+ records in
- meaningful ranked themes out
- one weekly brief generated with source evidence
- one commitment-safe update draft generated
- one clear explanation of why an item jumped priority
```
