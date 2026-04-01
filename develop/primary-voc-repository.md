# Develop — Primary / Voice-of-Customer Repository

**Status**: Latest active development plan  
**Updated**: 2026-04-02

## 1. Build goal
사용자가 support / churn / feature request / commitment records를 넣으면, 시스템이 이를 구조화해서 **주간 의사결정 브리프**를 생성한다.

## 2. MVP scope
### 포함
- record paste/upload
- source type 지정
- AI extraction
- theme clustering
- theme ranking
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

### `/briefs/latest`
- weekly decision brief
- edit / regenerate
- export markdown

### `/updates/latest`
- customer-safe roadmap / progress wording
- tone selector

## 5. Core entities
### `records`
- id
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
- expected_value
- rough_effort
- commitment_status
- external_update_mode

### `themes`
- id
- canonical_label
- theme_type
- frequency
- severity_score
- revenue_risk_score
- commitment_risk_score
- recency_score
- total_score

### `brief_items`
- id
- brief_type
- title
- recommendation
- confidence
- source_theme_ids

## 6. Ranking logic
초기 점수 가중치:
- frequency 30
- severity 20
- ARR/account importance 20
- commitment risk 20
- recency 10

규칙 기반 점수 + LLM 해석 보조로 시작한다.

## 7. Required outputs
### Weekly Decision Brief
반드시 아래 섹션이 있어야 한다.
- what got worse
- segment at risk
- commitments at risk
- recommended actions now
- what stays intentionally uncommitted
- evidence highlights

### External Update Draft
- now
- next
- later
- ambiguity explanation
- non-commitment-safe wording

## 8. Build order
1. record intake
2. extraction JSON validation
3. theme ranking board
4. weekly brief generation
5. external update draft
6. export/editing

## 9. First milestone
- 10~20개 샘플 record 입력 가능
- 5개 이상 theme 생성
- brief 1개 생성
- evidence linked output 확인 가능

## 10. Validation
- founder/PM이 실제 weekly review 전에 본다.
- brief를 회의에서 그대로 사용한다.
- "무엇이 악화됐는지 빨리 읽힌다"는 피드백 확보.

## 11. Build prompt
```text
Build an MVP web app for Voice-of-Customer Repository.

Goal:
Turn support, churn, feature request, and commitment records into a weekly decision brief for early-stage B2B SaaS teams.

Must-have capabilities:
- upload/paste records
- structured extraction
- theme clustering and ranking
- weekly brief generation
- customer-safe now/next/later update draft
- markdown export

Do not build:
- deep integrations
- enterprise auth
- generic note-taking app
- roadmap system of record

Success:
- 10+ records in
- meaningful ranked themes out
- one weekly brief generated with source evidence
```
