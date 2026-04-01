# Voice-of-Customer Repository

**Status**: Primary pick
**Source basis**: Reddit/X recurring pain clusters + indexed snippets recovered on 2026-04-01
**Updated**: 2026-04-01

## One-line Thesis
초기 B2B SaaS 팀의 churn/support/interview 데이터를 **무엇을 다음에 고쳐야 하는지 보여주는 주간 decision brief**로 바꿔주는 evidence layer.

## Problem Statement
초기 SaaS 팀은 고객 피드백이 없는 게 아니다. support tickets, churn survey, NPS, sales call notes, interview transcripts, cancellation reasons는 이미 존재한다. 문제는 이 신호가 Stripe export, inbox, support tool, 노트, 문서에 흩어져 있어서 **반복 패턴을 읽고 우선순위 결정으로 바꾸는 체계가 없다**는 점이다.

이번 루프에서 보강된 핵심 증거는 다음 세 문장으로 압축된다.
- founders는 feedback problem보다 **decision problem**을 더 크게 느낀다.
- churn reason은 존재하지만 support tickets / surveys / Stripe fields에 흩어져 있어 **systematic reading**이 안 된다.
- 필요한 출력은 generic summary가 아니라 **theme / frequency / JTBD / workaround / evidence-backed recommendation**이다.

## ICP
- 10~100명 B2B SaaS 팀
- founder-led sales 또는 초기 PMF 탐색 단계
- 전담 리서치 조직이 약한 팀
- churn/support/interview 신호는 늘고 있는데 정기 decision ritual이 없는 팀

## High-Value User Pain
1. 고객 대화와 churn reason을 모으는 데서 끝나고 실행 가능한 패턴이 안 나온다.
2. 같은 pain이 반복되는데 팀마다 다르게 해석한다.
3. 기능 우선순위와 메시지 수정의 근거가 약하다.
4. CS, Sales, Product가 같은 고객 signal을 source-linked evidence로 공유하지 못한다.

## Product Wedge
"고객 대화 저장소"가 아니라 **Weekly Churn + Support Decision Brief**.

핵심 포지셔닝 문장:
> Early B2B SaaS teams upload support tickets, churn notes, feedback emails, sales call notes, and interview transcripts each week, then receive an evidence-backed decision brief that tells them what to fix, for which segment, and why now.

핵심 차별점:
- 인터뷰/콜/티켓/취소사유를 JTBD / pain / objection / feature request / churn risk로 구조화
- 빈도·심각도·segment concentration·source diversity 기준으로 recurring signal 탐지
- workaround와 job context까지 같이 잡아 why-now를 설명
- 인사이트를 제품/메시지/세일즈/지원 액션 추천으로 연결
- generic AI summary가 아니라 **source-linked evidence brief**를 출력

## MVP Boundary
### 포함
- 텍스트/문서 업로드 및 붙여넣기
- support tickets / feedback emails / churn notes 주간 배치 업로드
- AI-assisted tagging (pain, segment, objection, request, churn reason)
- recurring signal dashboard
- evidence-linked decision brief
- export to markdown / prompt-ready brief

### 제외
- generic research repository UX 확장
- 실시간 SaaS 연동
- 고급 권한관리
- full CRM/helpdesk replacement
- 다국어 고정밀 분류
- workflow automation beyond export
- broad search/copilot UX first

## Validation Plan
- 5~10개 초기 팀 인터뷰
- 샘플 데이터 20~50개 업로드 기반 파일럿
- 검증 질문:
  - 지금 churn/support source가 어디에 흩어져 있는가?
  - recurring pattern을 잡을 때 실제로 어떤 수동 작업을 하는가?
  - weekly decision brief가 있으면 어떤 회의/문서가 대체되는가?
- 검증 지표:
  - 주 1회 이상 반복 업로드
  - brief에서 나온 결정이 실제 우선순위 변경으로 이어진 사례 1건 이상
  - 팀이 brief를 회의 artifact로 재사용한 비율

## Pricing Hypothesis
- Team: $99~299 / month
- Upsell: seat, source volume, AI analysis usage

## Key Risks
- generic note-taking AI로 보일 수 있음
- 검색/태깅 정확도 기대치가 높아질 수 있음
- 연동 요구가 너무 빨리 들어오면 범위가 커짐

## Why Now
요약 도구는 많지만 실행 연결 레이어가 비어 있다. 초기 팀은 더 적은 인력으로 더 많은 고객 대화와 churn reason을 처리해야 하고, founder-led sales 및 AI-assisted product work가 늘면서 **"what is this feedback actually telling us to build next?"** 라는 질문이 더 선명해졌다.

## Supporting Evidence
- X indexed snippet: founders don't have a feedback problem, they have a decision problem
  - https://x.com/jeebz_a/status/2029969484459462989
- X indexed snippet: churn data sits in surveys, support tickets, and Stripe fields; nobody reads it systematically
  - https://x.com/brianfofficial/status/2031850417718460521
- X indexed snippet: cluster support tickets + feedback emails into themes / frequency / JTBD / workarounds
  - https://x.com/MillieMarconnni/status/2023363588099113093
- Survey artifact
  - `.survey/social-web-app-ideas/context.md`
  - `.survey/social-web-app-ideas/solutions.md`
