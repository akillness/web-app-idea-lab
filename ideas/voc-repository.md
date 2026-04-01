# Voice-of-Customer Repository

**Status**: Primary pick
**Source basis**: Reddit/X recurring pain clusters + indexed snippets recovered on 2026-04-01
**Updated**: 2026-04-01

## One-line Thesis
초기 B2B SaaS 팀의 churn/support/interview 데이터를 **월요일 아침 health/risk decision brief**로 바꿔주는 evidence layer.

## Problem Statement
초기 SaaS 팀은 고객 피드백이 없는 게 아니다. support tickets, churn survey, cancellation reasons, NPS, sales call notes, interview transcripts는 이미 존재한다. 문제는 이 신호가 Stripe export, inbox, Slack, support tool, 노트, 문서에 흩어져 있어서 **무엇이 악화됐는지, 어느 세그먼트에 몰리는지, 무엇을 먼저 고쳐야 하는지**를 한 번에 보지 못한다는 점이다.

이번 루프에서 보강된 핵심 증거는 다음 네 문장으로 압축된다.
- founders는 churn rate를 봐도 **why customers leave**를 체계적으로 읽지 못한다.
- churn signal은 존재하지만 surveys / support tickets / Stripe fields에 흩어져 있어 **systematic reading**이 안 된다.
- 팀은 월요일 아침마다 Slack / docs / inbox를 뒤져서 상태를 재조합한다.
- 필요한 출력은 generic summary가 아니라 **health / risk / segment concentration / evidence-backed action**이다.

## ICP
- 10~100명 B2B SaaS 팀
- founder-led sales 또는 초기 PMF 탐색 단계
- 전담 리서치 조직이 약한 팀
- churn/support/interview 신호는 늘고 있는데 주간 decision ritual이 없는 팀

## High-Value User Pain
1. 고객 대화와 churn reason을 모으는 데서 끝나고 실행 가능한 패턴이 안 나온다.
2. 같은 pain이 반복되는데 팀마다 다르게 해석한다.
3. 주간 우선순위 회의 전에 누가 무엇을 뒤져야 할지부터 비효율적이다.
4. churn/cancellation reason이 세그먼트별로 얼마나 비정상적인지 판단하기 어렵다.
5. CS, Sales, Product가 같은 고객 signal을 source-linked evidence로 공유하지 못한다.

## Product Wedge
"고객 대화 저장소"가 아니라 **Monday-Morning Churn + Support Review**.

핵심 포지셔닝 문장:
> Early B2B SaaS teams upload support tickets, churn notes, cancellation reasons, and interview/call notes each week, then receive a Monday-morning health-and-risk brief that tells them what got worse, for which segment, and what deserves action now.

핵심 차별점:
- 인터뷰/콜/티켓/취소사유를 JTBD / pain / objection / feature request / churn reason으로 구조화
- 빈도·심각도·segment concentration·source diversity 기준으로 recurring signal 탐지
- raw churn wording과 normalized churn reason을 구분해 과잉반응을 줄임
- why-now를 설명하는 risk review와 action recommendation을 같이 제시
- generic AI summary가 아니라 **source-linked evidence brief**를 출력

## MVP Boundary
### 포함
- 텍스트/문서 업로드 및 붙여넣기
- support tickets / feedback emails / churn notes / cancellation reason 주간 배치 업로드
- AI-assisted tagging (pain, segment, objection, request, churn reason, lifecycle stage)
- recurring signal dashboard
- health / risk review brief
- evidence-linked decision brief export to markdown

### 제외
- generic research repository UX 확장
- 실시간 SaaS 연동
- 고급 권한관리
- full CRM/helpdesk replacement
- enterprise benchmark dataset 구축
- workflow automation beyond export

## Validation Plan
- 5~10개 초기 팀 인터뷰
- 샘플 데이터 20~50개 업로드 기반 파일럿
- 검증 질문:
  - 지금 churn/support/cancellation source가 어디에 흩어져 있는가?
  - 월요일 또는 주간 우선순위 회의 전에 실제로 어떤 수동 작업을 하는가?
  - raw churn note를 어떤 기준으로 묶고 normal/not-normal을 판단하는가?
  - health/risk brief가 있으면 어떤 회의/문서가 대체되는가?
- 검증 지표:
  - 주 1회 이상 반복 업로드
  - brief에서 나온 결정이 실제 우선순위 변경으로 이어진 사례 1건 이상
  - 팀이 brief를 회의 artifact로 재사용한 비율

## Pricing Hypothesis
- Team: $99~299 / month
- Upsell: seat, source volume, AI analysis usage

## Key Risks
- generic note-taking AI로 보일 수 있음
- benchmark/normalization 기대치를 너무 빨리 올리면 범위가 커질 수 있음
- 연동 요구가 너무 빨리 들어오면 범위가 커짐
- 건강도/리스크 판단이 단순 count dashboard로 보이면 차별점이 약해짐

## Why Now
요약 도구는 많지만 실행 연결 레이어가 비어 있다. 초기 팀은 더 적은 인력으로 더 많은 고객 대화와 churn reason을 처리해야 하고, founder-led sales 및 AI-assisted product work가 늘면서 **"what got worse this week, for whom, and what should we do now?"** 라는 질문이 더 선명해졌다.

## Supporting Evidence
- X indexed snippet: founders know churn rate but not why customers leave; evidence sits in surveys/support tickets/Stripe fields
  - https://x.com/brianfofficial/status/2031850417718460521
- X indexed snippet: many founders do not know if churn is normal without benchmark context
  - https://x.com/polsia/status/2035027604550689279
- X indexed snippet: fix churn first
  - https://x.com/fbrsaas/status/2036449960581837060
- X indexed snippet: founders want one Monday-morning view of healthy / at-risk / immediate attention items
  - https://x.com/_kamsyed/status/2033983166759793024
- Reddit indexed snippet: cancellation button reason capture is a treasure trove of churn insight
  - https://www.reddit.com/r/SaaS/comments/1as7rr6/heres_a_mini_guide_to_reduce_churn_for_your_saas/
- Survey artifact
  - `.survey/social-web-app-ideas/context.md`
  - `.survey/social-web-app-ideas/solutions.md`
