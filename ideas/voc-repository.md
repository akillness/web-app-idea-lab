# Voice-of-Customer Repository

**Status**: Primary pick
**Source basis**: Reddit/X recurring pain clusters, 1st-pass survey
**Updated**: 2026-04-01

## Problem Statement
초기 SaaS 팀은 고객 인터뷰, 세일즈 콜, 지원 티켓, 리뷰에 중요한 신호가 많지만 그 데이터가 Notion, Slack, Gong, Intercom, 메모에 흩어진다. 그 결과 고객 목소리는 존재하지만 제품 우선순위, 메시징, 세일즈 대응에 일관되게 반영되지 않는다.

## ICP
- 10~100명 B2B SaaS 팀
- Founder-led sales 또는 초기 PMF 탐색 단계
- 전담 리서치 조직이 약한 팀
- 인터뷰/콜/티켓은 늘고 있는데 인사이트 운영체계가 없는 팀

## High-Value User Pain
1. 고객 대화를 모으는 데서 끝나고 실행 가능한 패턴이 안 나온다.
2. 같은 pain이 반복되는데 팀마다 다르게 해석한다.
3. 기능 우선순위와 메시지 수정의 근거가 약하다.
4. CS, Sales, Product가 같은 고객 signal을 공유하지 못한다.

## Product Wedge
"고객 대화 저장소"가 아니라 **의사결정용 고객 증거 레이어**.

핵심 차별점:
- 인터뷰/콜/티켓을 JTBD / pain / objection / feature request / churn risk로 구조화
- 빈도와 심각도를 기준으로 recurring signal 탐지
- 인사이트를 태스크/문서/우선순위 변경 추천으로 연결

## MVP Boundary
### 포함
- 텍스트/문서 업로드 및 붙여넣기
- AI-assisted tagging (pain, segment, objection, request)
- recurring signal dashboard
- insight-to-action recommendation summary
- export to markdown / prompt-ready brief

### 제외
- 실시간 SaaS 연동
- 고급 권한관리
- full CRM/helpdesk replacement
- 다국어 고정밀 분류
- workflow automation beyond export

## Validation Plan
- 5~10개 초기 팀 인터뷰
- 샘플 데이터 20~50개 업로드 기반 파일럿
- 검증 지표:
  - 주 1회 이상 반복 업로드
  - 실제 메시지/우선순위 변경 1건 이상
  - "Notion보다 낫다" 반응 3팀 이상

## Pricing Hypothesis
- Team: $99~299 / month
- Upsell: seat, source volume, AI analysis usage

## Key Risks
- generic note-taking AI로 보일 수 있음
- 검색/태깅 정확도 기대치가 높아질 수 있음
- 연동 요구가 너무 빨리 들어오면 범위가 커짐

## Why Now
요약 도구는 많지만 실행 연결 레이어가 비어 있다. 초기 팀은 더 적은 인력으로 더 많은 고객 대화를 처리해야 하고, founder-led sales 및 AI-assisted product work가 늘면서 이 gap이 더 분명해졌다.
