# Develop — Primary / Voice-of-Customer Repository

**Status**: Latest active development plan  
**Updated**: 2026-04-02

## 1. Build goal
사용자가 support / churn / feature request / commitment records를 넣으면, 시스템이 이를 구조화해서 **customer-level evidence board**, **주간 의사결정 브리프**, **ranked build-next queue**, **commitment-safe external update draft**를 생성한다.

핵심은 feedback 저장소가 아니라, 흩어진 evidence를 **account-aware decision layer**, **priority rationale layer**, **external communication layer**로 번역하는 것이다. 이번 최신 신호 기준으로는 여기에 더해 **customer commitment / explanation work / repeated roadmap-call burden**이 잡아먹는 strategy-time tax를 줄이는 운영 레이어가 필요하다. 따라서 MVP도 단순 브리프 생성에서 끝나지 않고, **반복되는 `when is later?` / `why not now?` / customer roadmap call 요청에 바로 재사용할 수 있는 답변 패키지**를 만들어야 한다.

## 2. MVP scope
### 포함
- record paste/upload
- source type 지정
- source preset 선택 (`support ticket`, `CRM note`, `call note`, `Slack paste`, `review`, `survey`, `roadmap/customer commitment note`)
- shared store ingestion (`tickets`, `reviews`, `surveys`, `call notes`)
- one-table intake baseline for mixed sources (`sales calls`, `CS tickets`, `Intercom`, `notes`)
- low-friction note capture for personal docs / meeting notes
- AI extraction
- tagging + AI clustering
- customer/account matching
- account/revenue-aware ranking
- commitment risk detection
- priority override labeling
- `why this jumped` / `why not now` explanation 생성
- `what should we build next?` decision queue 생성
- customer-level evidence board
- weekly decision brief 생성
- now/next/later-safe external update draft 생성
- bucket definition note 생성
- ambiguity-closing answer 생성 (`when is later?`, `why not now?`)
- stakeholder-specific explanation mode 생성 (`customer`, `sales/revenue`, `internal exec`)
- commitment-overhead queue 생성
- customer-roadmap communication queue 생성
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
4. account matching
5. theme cluster 생성
6. ranked theme board 표시
7. decision queue 생성
8. decision rationale 생성
9. weekly brief 생성
10. external update draft 생성
11. commitment-overhead queue 생성
12. customer-roadmap communication queue 생성
13. markdown export

## 4. Main screens
### `/records`
- upload / paste
- source preset chips
- source filter
- personal-note vs system-record badge
- processing status
- failed retry

### `/accounts`
- customer-level evidence board
- account risk summary
- linked requests / churn / support / commitment signals
- ARR / segment context
- latest customer-safe wording note

### `/themes`
- theme list
- score breakdown
- evidence drawer
- linked accounts / segments
- linked commitments / override reasons
- `why this theme moved` explanation
- `why not now` explanation
- `build-next candidate` badge

### `/briefs/latest`
- weekly decision brief
- edit / regenerate
- export markdown
- internal notes vs customer-facing implications split
- `decision trace` block
- `what changed since last review` block
- `what should we build next` answer block
- `strategy-time tax this week` block

### `/updates/latest`
- customer-safe roadmap / progress wording
- tone selector
- bucket definition note (`now`, `next`, `later`)
- ambiguity explanation block
- stakeholder mode selector (`customer`, `sales`, `exec`)
- `near-term commitments only` validation badge
- `when is later?` answer helper
- `why this is not committed yet` helper

### `/commitments`
- promises at risk
- affected accounts
- promise type (`date`, `range`, `directional`)
- suggested safer wording
- confidence / evidence link

### `/queue/build-next`
- ranked build-next candidates
- why this jumped now
- why not the alternatives
- linked account concentration
- linked churn / revenue / commitment signals
- override reason badge

### `/queue/commitment-overhead`
- accounts asking for timing clarity
- open `when is later?` style questions
- accounts with risky dated promises
- suggested ambiguity-closing answer
- suggested safer directional wording
- owner + due-next-action

### `/queue/customer-roadmap-calls`
- accounts repeatedly asking for roadmap walkthroughs
- open customer/executive explanation requests
- why-this-priority / why-not-now response starter
- latest safe roadmap wording draft
- owner + next scheduled response/action

### `/answers`
- reusable answer pack for `when is later?`, `why not now?`, `what changed?`
- audience mode (`customer`, `sales`, `exec`)
- linked account evidence + linked theme rationale
- safe wording draft + editable short/long version
- last-used answer and account reuse history

## 5. Core entities
### `records`
- id
- source_type
- source_preset
- capture_origin (`system`, `personal_note`, `meeting_note`, `manual_paste`)
- raw_text
- account_name
- customer_name
- segment
- arr_band
- lifecycle_stage
- uploaded_at
- status

### `accounts`
- id
- name
- segment
- arr_band
- health_risk_level
- open_commitment_count
- latest_update_mode
- evidence_summary

### `signals`
- id
- record_id
- account_id
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

### `decision_rationales`
- id
- theme_id
- status (`jumped`, `held`, `deferred`)
- why_this_jumped
- why_not_now
- linked_override_reasons
- linked_account_ids
- confidence

### `decision_queue_items`
- id
- theme_id
- queue_rank
- recommendation_type (`build_now`, `validate_next`, `hold`)
- why_build_next
- why_not_alternative
- linked_override_reasons
- linked_account_ids
- confidence

### `brief_items`
- id
- brief_type
- title
- recommendation
- confidence
- source_theme_ids
- affected_account_ids
- rationale_id

### `update_drafts`
- id
- brief_id
- now_text
- next_text
- later_text
- bucket_definition_note
- ambiguity_note
- safe_wording_notes
- audience_mode (`customer`, `sales`, `exec`)
- commitment_window_rule (`near_term_only`)
- timeline_confidence_note
- answer_when_is_later
- answer_why_not_committed

### `answer_packs`
- id
- account_id
- theme_id
- rationale_id
- audience_mode (`customer`, `sales`, `exec`)
- question_type (`when_is_later`, `why_not_now`, `what_changed`, `why_this_priority`)
- short_answer
- long_answer
- linked_evidence_ids
- last_used_at
- reuse_count

### `commitment_overhead_items`
- id
- account_id
- source_record_id
- question_type (`when_is_later`, `why_not_now`, `can_you_commit`, `follow_up_needed`)
- risk_level
- suggested_answer
- suggested_safe_wording
- owner
- next_action_at
- status

### `roadmap_call_queue_items`
- id
- account_id
- request_surface (`customer_call`, `sales_followup`, `exec_review`)
- request_summary
- linked_theme_ids
- linked_rationale_id
- draft_response
- owner
- next_action_at
- status

## 6. Ranking logic
초기 점수 가중치:
- frequency 20
- severity 20
- ARR/account importance 20
- commitment risk 20
- customer concentration 10
- recency 5
- priority override 5

규칙 기반 점수 + LLM 해석 보조로 시작한다.

`priority_override_reason`은 아래 중 하나 이상으로 제한한다.
- customer commitment
- churn risk
- strategic segment
- company objective
- technical foundation

`decision_rationales`는 아래 두 질문을 항상 채운다.
- 왜 이 항목이 이번 주에 점프했는가?
- 왜 다른 항목은 아직 now에 들어가지 않는가?

`decision_queue_items`는 아래 두 질문을 항상 채운다.
- 그래서 지금 build next 후보는 무엇인가?
- 다른 후보보다 이 항목을 먼저 다뤄야 하는 이유는 무엇인가?

`commitment_overhead_items`는 아래 두 질문을 항상 채운다.
- 어떤 account/commitment 질문이 이번 주 전략 시간을 가장 많이 잡아먹는가?
- 이 질문을 안전하게 닫기 위해 다음으로 누구에게 어떤 설명을 보내야 하는가?

## 7. Required outputs
### Customer-Level Evidence Board
반드시 아래가 보여야 한다.
- account summary
- open pain themes
- churn / expansion / commitment signals
- latest supporting evidence
- recommended customer-safe wording

### Weekly Decision Brief
반드시 아래 섹션이 있어야 한다.
- what got worse
- segment at risk
- account concentration risk
- commitments at risk
- recommended actions now
- priority overrides and why
- why this jumped
- why not now
- build next recommendation
- what stays intentionally uncommitted
- strategy-time tax this week
- evidence highlights

### External Update Draft
- now
- next
- later
- bucket definition note
- ambiguity explanation
- answer to `when is later?`
- answer to `why isn't this committed yet?`
- non-commitment-safe wording
- rule: `now`에만 near-term commitment 허용, `next/later`는 방향성 표현만 허용

### Commitment-Overhead Queue
- open expectation-management questions
- risky dated promises
- suggested owner
- suggested safe answer
- next action due

### Customer-Roadmap Communication Queue
- repeated roadmap-call / explanation requests
- linked why-this-priority / why-not-now rationale
- latest safe wording draft
- suggested owner
- next action due

## 8. Product rules
- `now/next/later`는 **일정 약속 도구**가 아니라 **방향성 커뮤니케이션 도구**로 취급한다.
- `when is later?` 대응은 PM 내부만이 아니라 customer / sales / exec 대화 표면까지 지원해야 한다.
- `now`에만 구체 약속 후보를 허용하고, `next/later`는 directional wording만 허용한다.
- customer-level evidence가 없는 theme summary는 incomplete로 취급한다.
- 대형 계정 / churn / objective로 우선순위가 바뀌면 반드시 `왜 점프했는지`를 brief에 남긴다.
- deferred item에도 `왜 아직 now가 아닌지`를 남긴다.
- `build next` 추천은 linked account evidence 없이 생성하지 않는다.
- internal decision artifact와 customer-facing update draft를 섞지 않는다.
- `commitment_overhead_items`는 separate queue로 유지해 decision work와 explanation work를 같이 보되 섞지 않는다.
- 반복 질문에 대한 응답은 ad-hoc 작성으로 끝내지 않고 `answer_packs`로 저장해 account/audience별 재사용이 가능해야 한다.

## 9. Build order
1. record intake
2. extraction JSON validation
3. account matching + account summary card
4. theme ranking board
5. commitment risk + priority override labeling
6. decision queue generation
7. decision rationale generation
8. weekly brief generation
9. external update draft
10. commitment-overhead queue
11. reusable answer packs
12. export/editing

## 10. First milestone
- 10~20개 샘플 record 입력 가능
- 5개 이상 theme 생성
- 3개 이상 account summary 생성
- ranked build-next queue 1개 생성
- brief 1개 생성
- evidence linked output 확인 가능
- commitment risk item 최소 1개 노출
- `when is later?`에 답하는 safe draft 한 개 생성
- `why this jumped / why not now` rationale 한 세트 생성
- commitment-overhead queue item 최소 1개 노출
- 재사용 가능한 answer pack 최소 1개 생성

## 11. Validation
- founder/PM이 실제 weekly review 전에 본다.
- brief를 회의에서 그대로 사용한다.
- `무엇이 악화됐는지 빨리 읽힌다`는 피드백 확보.
- `왜 이 고객군/계정이 중요한지`가 더 빨리 읽힌다는 피드백 확보.
- `why this jumped the queue` 설명이 납득된다는 피드백 확보.
- `why not now` 설명이 customer-facing 팀에도 유용하다는 반응 확보.
- `지금 무엇을 build next 해야 하는지`를 linked evidence 기준으로 말할 수 있다는 반응 확보.
- `now/next/later` 초안이 고객 커뮤니케이션에 바로 수정 가능한 수준이라는 반응 확보.
- expectation-management 질문을 처리하는 시간이 줄었다는 반응 확보.

## 12. Build prompt
```text
Build an MVP web app for Voice-of-Customer Repository.

Goal:
Turn support, churn, feature request, and commitment records into a customer-level evidence board, a weekly decision brief, a ranked build-next decision queue, a commitment-overhead queue, a priority rationale layer, and a commitment-safe external update draft for early-stage B2B SaaS teams.

Must-have capabilities:
- upload/paste records
- structured extraction
- customer/account matching
- customer-level evidence board
- account/revenue-aware ranking
- commitment risk detection
- priority override labeling
- ranked build-next queue
- why-this-jumped / why-not-now rationale generation
- weekly brief generation
- commitment-safe external update draft
- commitment-overhead queue
- reusable answer packs for recurring roadmap questions

Do not build:
- helpdesk replacement
- full roadmap system of record
- deep Productboard/Jira integrations first
- outbound automation first

Important rules:
- shared store and clustering are not the product end-state; decision translation is
- the intake must accept both system records and messy personal notes with minimal friction
- every top theme must show linked account/customer evidence
- the product must explicitly answer `what should we build next?`
- `now` can contain near-term commitments, `next/later` cannot
- the product must answer both `why this jumped` and `why not now`
- the product must reduce commitment/explanation overhead, not just summarize feedback

Success:
- a PM/founder can review linked customer evidence before the weekly meeting
- the brief explains what changed, who is affected, and why priorities moved
- the build-next queue is explainable from linked evidence
- the external draft is safer than ad-hoc now/next/later messaging
- the team can close recurring `when is later?` / `why not now?` questions faster
```

## 13. Current implementation slice
### Selected task
Scaffold a dependency-light ranking engine for the primary idea that:
- turns theme metrics into a ranked build-next queue
- enforces the documented score weights and override taxonomy
- emits per-theme score breakdowns and recommendation labels
- is covered by executable tests so later UI/ingestion work can build on stable domain logic

**Execution note (this run)**: implement the pure ranking module first, keep it dependency-light, and verify it with the built-in `node:test` runner before any UI or ingestion scaffolding.

### Planned files
- Create: `package.json`
- Create: `src/voc/ranking.js`
- Create: `tests/voc-ranking.test.js`
- Modify: `README.md`

### Short implementation plan
1. Bootstrap a dependency-light Node test harness with the built-in `node:test` runner.
2. Implement a pure ranking module that validates the documented override taxonomy and score ranges.
3. Encode the MVP weight table into deterministic weighted scoring + recommendation thresholds.
4. Gate recommendations on linked account evidence so queue items do not overstate confidence.
5. Cover the module with executable tests for scoring, validation, and ranked output ordering.

### Verification
- `npm test`
