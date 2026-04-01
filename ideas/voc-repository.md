# Voice-of-Customer Repository

**Status**: Primary pick
**Source basis**: Reddit PullPush mirror recoveries + Yahoo indexed Reddit/X snippets refreshed on 2026-04-01
**Updated**: 2026-04-01

## One-line Thesis
초기 B2B SaaS 팀의 support / feature-request / churn 데이터를 **월요일 아침 health/risk decision brief**로 바꿔주는 evidence layer.

## Problem Statement
초기 SaaS 팀은 고객 신호가 없는 게 아니다. support tickets, churn survey, cancellation reasons, sales call notes, CS escalations, feature requests는 이미 많다. 문제는 이 신호가 support inbox, Slack, Jira, billing export, 문서, 개인 메모에 흩어져 있어서 **무엇이 악화됐는지, 어느 세그먼트에 몰리는지, 어떤 요청이 진짜 product problem인지**를 한 번에 보지 못한다는 점이다.

이번 루프에서 더 강해진 핵심 증거는 아래 다섯 가지다.
- support가 고객 요청을 product/dev에 그대로 전달해 roadmap noise가 커진다.
- PM은 conflicting feature request list를 들고도 problem framing과 expected value를 잃는다.
- enterprise deal/renewal 문맥에서는 어떤 요청이 실제 commitment인지, 어떤 요청이 단순 demand인지 분리하기 어렵다.
- churn 감소 논의는 많지만 ARR / ICP / lifecycle context로 reason을 구조화하지 못한다.
- 결국 월요일 아침마다 support ticket, complaints, churn notes를 수동으로 읽고 우선순위를 추정하고, 분기 planning에서는 commitments를 다시 손으로 reconcile한다.

## ICP
- 10~100명 B2B SaaS 팀
- founder-led sales 또는 초기 PMF 탐색 단계
- 전담 research / revops / CS analytics 조직이 약한 팀
- support와 churn 신호는 많은데 weekly decision ritual이 약한 팀

## High-Value User Pain
1. support 요청과 feature request가 product intake 없이 그대로 흘러들어온다.
2. 고객 요청이 많아질수록 request list만 길어지고 문제 정의는 흐려진다.
3. churn reason은 남지만 ARR / ICP / lifecycle stage 맥락이 사라져 의사결정이 흔들린다.
4. 월요일 회의 전에 누가 무엇을 뒤져야 할지부터 비효율적이다.
5. CS, Sales, Product가 같은 evidence를 source-linked 상태로 공유하지 못한다.
6. enterprise commitment나 promised feature delivery가 scattered state로 남아 later dispute risk가 생긴다.

## Product Wedge
"고객 대화 저장소"가 아니라 **Monday-Morning Support + Churn Review + Commitment Risk Review**.

핵심 포지셔닝 문장:
> Early B2B SaaS teams upload support tickets, feature-request context, churn notes, cancellation reasons, enterprise commitments, and interview/call notes each week, then receive a Monday-morning health-and-risk brief that shows what got worse, for which segment, which commitments are now at risk, and what deserves action now.

핵심 차별점:
- support / CS / sales / churn evidence를 같은 ingestion surface로 묶음
- raw request가 아니라 **problem, expected value, ARR/ICP context, segment concentration**을 같이 읽음
- recurring signal을 pain / objection / feature request / churn reason / broken promise로 구조화
- weekly brief에서 health overview → risk review → ranked actions → evidence & gaps 순으로 제시
- weekly brief 안에서 `commitments at risk this quarter`를 별도 블록으로 제시
- generic AI summary가 아니라 **source-linked decision artifact**를 출력

## MVP Boundary
### 포함
- 텍스트/문서 업로드 및 붙여넣기
- support tickets / feedback emails / churn notes / cancellation reasons / feature-request context 업로드
- AI-assisted tagging (pain, segment, objection, request, churn reason, lifecycle stage, ARR/ICP importance)
- recurring signal dashboard
- support-to-product intake summary
- health / risk review brief
- lightweight commitment tracking for already-promised customer asks
- evidence-linked decision brief export to markdown

### 제외
- full helpdesk replacement
- 실시간 SaaS 연동
- 고급 권한관리
- enterprise benchmark network 구축
- workflow automation hub
- outbound customer communication automation

## Validation Plan
- 5~10개 초기 팀 인터뷰
- 샘플 데이터 20~50개 업로드 기반 파일럿
- 검증 질문:
  - support / feature request / churn evidence가 지금 어디에 흩어져 있는가?
  - 월요일 또는 주간 우선순위 회의 전에 실제로 어떤 수동 작업을 하는가?
  - raw request를 어떤 기준으로 problem / urgency / segment impact로 재해석하는가?
  - 이미 약속한 customer commitment를 어디서 추적하고 누가 reconcile하는가?
  - churn reason을 ARR / ICP / lifecycle context와 함께 보고 있는가?
  - health/risk brief가 있으면 어떤 회의/문서가 대체되는가?
- 검증 지표:
  - 주 1회 이상 반복 업로드
  - brief에서 나온 결정이 실제 우선순위 변경으로 이어진 사례 1건 이상
  - 팀이 brief를 회의 artifact로 재사용한 비율
  - 기존 `Slack + Jira + docs + ad-hoc AI summary`보다 낫다는 반응 3건 이상

## Pricing Hypothesis
- Team: $99~299 / month
- Upsell: seat, source volume, AI analysis usage

## Key Risks
- generic feedback repository처럼 보일 수 있음
- integration 요구가 빠르게 커질 수 있음
- commitment tracking을 과하게 확장하면 roadmap system-of-record처럼 보여 scope가 커질 수 있음
- benchmark/normalization 기대치를 너무 빨리 올리면 범위가 커짐
- intake layer와 decision brief를 함께 못 보여주면 차별점이 약해짐

## Why Now
support와 churn 데이터는 이미 많지만, 초기 팀은 여전히 그것을 product decision ritual로 바꾸지 못한다. 요약 도구는 많아졌지만 **`what got worse this week?`, `which segment is newly at risk?`, `what deserves action now?`** 를 source-linked 상태로 말해주는 레이어는 여전히 희박하다.

## Supporting Evidence
- X indexed snippet: founders know churn rate but not why customers leave; evidence sits in surveys/support tickets/Stripe fields
  - https://x.com/brianfofficial/status/2031850417718460521
- X indexed snippet: PMs manually read support tickets, complaints, and churn notes on Monday morning
  - https://x.com/valewnrt/status/2031470425675354199
- Reddit / PullPush mirror: support forwards every customer request to developers, creating roadmap noise
  - https://www.reddit.com/r/ProductManagement/comments/1jrlxxe/challenge_with_our_customer_support_team/
- Reddit / PullPush mirror: valuable insights are buried in support conversations without systematic extraction
  - https://www.reddit.com/r/CustomerSuccess/comments/1jkq1wt/how_were_using_ai_to_transform_customer_support/
- Reddit / PullPush mirror: teams track feature requests in Jira but lose focus on the underlying problem
  - https://www.reddit.com/r/ProductManagement/comments/y3pmqg/managing_and_tracking_customer_feature_request/
- Reddit indexed snippet: too many deals and too many feature requests force Sales & CSM teams to prioritize between commitments every quarter
  - https://www.reddit.com/r/ProductManagement/comments/1bhv13s/how_to_track_feature_requests_for_enterprise/
- Reddit indexed snippet: PMs ask what tool/process should track customer commitments with deadlines once promises are made
  - https://www.reddit.com/r/ProductManagement/comments/zsuyqn/how_do_you_documenttrack_costumer_committments/
- Reddit / PullPush mirror: churn work should start by understanding reasons and segmenting by ARR / growth potential / ICP
  - https://www.reddit.com/r/CustomerSuccess/comments/13zqul2/best_way_to_minimize_churn_in_saas/
- Survey artifact
  - `.survey/social-web-app-ideas/context.md`
  - `.survey/social-web-app-ideas/solutions.md`
