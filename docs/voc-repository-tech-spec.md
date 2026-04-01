# Voice-of-Customer Repository — Technical Spec

**Author**: Hermes Agent  
**Date**: 2026-04-01  
**Status**: Draft

## Overview
Voice-of-Customer Repository는 인터뷰, 세일즈 콜, 지원 티켓, 리뷰 텍스트를 수집해 구조화된 고객 신호로 변환하고, 그 결과를 제품/메시지 의사결정용 brief로 내보내는 B2B SaaS MVP다.

이 제품의 핵심은 `대화 저장`이 아니라 `증거 기반 의사결정`이다. 따라서 MVP는 화려한 통합보다, 작은 팀이 실제 텍스트 데이터를 넣고 recurring signal을 확인하며 바로 액션을 정할 수 있는 흐름을 우선한다.

## Problem Statement
초기 SaaS 팀은 고객 신호를 많이 갖고 있지만, 그 신호가 여러 도구에 흩어져 있어 반복 pain, objection, feature request를 체계적으로 축적하지 못한다. 그 결과 우선순위와 메시징 결정이 개인 기억이나 강한 의견에 치우치기 쉽다.

## Goals
- 수동 업로드 기반으로 대화 기록을 빠르게 적재할 수 있어야 한다.
- AI가 구조화 태깅을 수행하되, 사용자가 evidence를 검토할 수 있어야 한다.
- recurring theme를 frequency + severity 관점에서 보여줘야 한다.
- 최종 결과는 markdown brief 형태로 export 가능해야 한다.

## Non-Goals
- Intercom/Zendesk/Gong 등 실시간 연동
- 엔터프라이즈 권한 체계
- 완전 자동 workflow orchestration
- 범용 CRM/helpdesk 대체

## Core User Flow
1. 사용자가 transcript/note/ticket/review 텍스트를 붙여넣거나 업로드한다.
2. 시스템이 레코드를 저장하고 extraction job을 생성한다.
3. AI가 source_type, segment, JTBD, pain, objection, request 등을 추출한다.
4. 시스템이 여러 레코드의 추출 결과를 theme 단위로 클러스터링한다.
5. 사용자가 evidence를 확인하고 recurring pattern을 검토한다.
6. 시스템이 decision brief를 markdown으로 생성한다.
7. 사용자가 brief를 팀 문서나 코딩 프롬프트 입력으로 재사용한다.

## Information Architecture
- Workspace
  - Records
  - Extracted Signals
  - Themes
  - Decision Briefs
  - Export History

## Data Model
### `conversation_records`
- id
- workspace_id
- title
- source_type
- raw_text
- source_label
- created_at
- uploaded_by
- processing_status

### `record_extractions`
- id
- record_id
- customer_segment
- company_stage
- summary
- sentiment
- churn_risk
- buying_signal
- extraction_json
- model_name
- created_at

### `themes`
- id
- workspace_id
- theme_name
- theme_type
- frequency
- severity_score
- segments_json
- evidence_json
- suggested_action
- created_at
- updated_at

### `decision_briefs`
- id
- workspace_id
- title
- markdown_body
- source_theme_ids_json
- created_at

## AI Pipeline
### Stage 1: Extraction
입력 레코드 1건 기준으로 구조화 JSON 생성.

### Stage 2: Normalization
pain/objection/request label을 normalize해서 중복 표현을 줄인다.

### Stage 3: Theme Clustering
여러 extraction 결과를 theme로 묶고 frequency, segment, representative evidence를 계산한다.

### Stage 4: Decision Brief Generation
가장 강한 signal을 바탕으로 제품/메시지 관점의 markdown brief를 생성한다.

## Async Jobs
비동기로 처리할 것:
- extraction
- theme clustering
- decision brief generation

동기로 처리할 것:
- record upload
- record list 조회
- evidence view
- markdown export 다운로드

## Evidence and Trust UX
- 모든 AI 결과에는 원문 snippet/evidence를 연결한다.
- confidence가 낮으면 unknown 또는 weak signal로 표시한다.
- 사용자는 theme별 근거 record를 역추적할 수 있어야 한다.
- "요약"이 아니라 "근거 문장 + 해석" 쌍을 보여준다.

## MVP Stack Suggestion
- Frontend: Next.js
- Backend: Next.js route handlers or lightweight API server
- DB: PostgreSQL or SQLite for fastest validation
- Queue: simple background job runner
- AI layer: structured-output capable LLM API

## Implementation Plan
### Phase 1
- repo scaffold
- record upload/paste UI
- storage schema
- extraction pipeline

### Phase 2
- theme clustering
- theme list/detail UI
- evidence inspection

### Phase 3
- decision brief generation
- markdown export
- sample dataset + validation loop

## Success Metrics
- 10개 이상 record 업로드 후 theme 생성 가능
- evidence-linked recurring pains를 확인 가능
- markdown brief가 실제 product/message 결정에 사용됨

## Open Questions
- workspace permission을 MVP에서 얼마나 단순화할지
- clustering 기준을 rule-based + LLM hybrid로 할지
- brief regeneration을 manual trigger만 둘지 자동화할지
