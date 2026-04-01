# Voice-of-Customer Repository — MVP Task List

## Goal
가장 빠른 검증 경로로 `고객 대화 입력 → 구조화 태깅 → recurring signal → decision brief export` 흐름을 만든다.

## Phase 0 — Product framing
1. Primary ICP 문장 확정
2. sample customer record 20개 수집 기준 정의
3. success metric 3개 확정

## Phase 1 — Data ingestion
1. repo/app scaffold
2. single-workspace assumption 구현
3. paste/upload form 구현
4. conversation record 저장
5. processing status 표시

## Phase 2 — Extraction pipeline
1. extraction prompt wiring
2. structured JSON validation
3. extraction result storage
4. evidence span extraction/storage
5. failed record retry flow

## Phase 3 — Theme view
1. normalization rule 정의
2. theme clustering job 구현
3. theme priority scoring 구현
4. recurring theme list UI
5. evidence snippet drill-down

## Phase 4 — Decision brief
1. decision brief prompt wiring
2. brief item generation with ranking
3. markdown brief 생성
4. export/download 기능
5. brief regeneration trigger

## Phase 5 — Validation loop
1. 10~20개 샘플 record 투입
2. false clustering / weak evidence 체크
3. generic summary vs evidence-backed brief 비교 fixture 추가
4. PM/founder 3명에게 brief usefulness 검증
5. wording/structure 개선

## Fastest validation path
- auth 생략 또는 매우 단순화
- one workspace only
- integrations 없음
- manual upload only
- AI output editable/inspectable
- export는 markdown only

## Exit criteria
- 10개 이상의 records로 3개 이상의 recurring theme 도출
- theme마다 source evidence 확인 가능
- final brief가 실제 우선순위/메시지 논의에 사용 가능
