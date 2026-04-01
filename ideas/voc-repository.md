# Voice-of-Customer Repository

**Status**: Primary pick
**Source basis**: Yahoo indexed Reddit/X snippets + prior PullPush Reddit mirror recoveries refreshed on 2026-04-01
**Updated**: 2026-04-01

## One-line Thesis
초기 B2B SaaS 팀의 support / feature-request / churn / commitment 데이터를 **한 화면짜리 Monday-morning decision brief + now/next/later roadmap communication + next-90-days commitment-risk view + release-plan separation + progress-report surface**로 바꿔주는 decision layer.

## Problem Statement
초기 SaaS 팀은 고객 신호가 없는 게 아니다. support tickets, churn survey, cancellation reasons, sales call notes, CS escalations, feature requests는 이미 많다. 문제는 이 신호가 support inbox, spreadsheet, ProductBoard, Jira, Slack, billing export, 문서, 개인 메모에 흩어져 있어서 **무엇이 악화됐는지, 어느 세그먼트에 몰리는지, 어떤 요청이 진짜 product problem인지, 무엇에 시간을 써야 하는지**를 한 번에 보지 못한다는 점이다.

이번 루프에서 더 강해진 핵심 증거는 아래 신호들이다.
- 사용자는 feedback 부족보다 **decision problem**을 겪고 있다.
- feature request intake는 여전히 Google Form / MS Forms / spreadsheet와 weekly review에 의존한다.
- 일부 팀은 formal intake를 도입해도 여전히 **fill-in-the-blank JTBD template**로 문제 정의를 강제한다.
- PM은 Slack / email / meeting note를 ProductBoard에 넣고 다시 Jira로 옮기는 bridge workflow를 수동으로 운영한다.
- feature request grooming도 자동화되지 않았고, 여전히 **area / impact / effort** 같은 필드를 사람이 채우며 decision-ready 상태로 번역한다.
- 일부 팀은 feature request별로 **dollars / resource time / requesting customer**를 묶고 싶지만 구조화가 부족하다.
- spreadsheet가 여러 개가 되면 enterprise request prioritization이 팀이 원래 만들고 싶은 로드맵에서 벗어나기 시작한다.
- 어떤 팀은 request/deal이 너무 많아서 Sales/CSM이 commitments 사이 우선순위를 **분기마다 다시 조정**한다.
- Productboard를 써도 quarterly planning에는 맞지만 discovery / backlog weighing에는 답답하다는 신호가 있다.
- 날짜 약속이 비현실적일 때는 high-level roadmap + release/sprint plan + progress report로 겨우 expectation을 관리한다.
- roadmap을 timeline과 동일시하면 곧 date promise처럼 읽힌다는 practitioner signal이 있다.
- public roadmap은 `now / next / later` 또는 `now / next / soon / later` 수준으로 두고, proven delivery history 없으면 날짜를 피하라는 운영 조언이 반복해서 보인다.
- public roadmap transparency 자체는 긍정적으로 읽히지만, commitment는 날짜보다 **status language**로 관리하는 쪽이 안전하다는 신호가 추가됐다.
- 실제 release cadence는 2주처럼 짧을 수 있어, 내부 shipping rhythm과 외부 expectation language를 분리하는 레이어가 필요하다.
- support가 고객 요청을 product/dev에 그대로 전달해 roadmap noise가 커진다.
- churn evidence는 surveys / support tickets / Stripe fields에 흩어져 있고 systematic reading이 없다.
- 일부 팀은 percentile benchmark도 궁금해하지만, 그 전에 월요일 아침마다 support ticket, Intercom, Slack, Salesforce를 수동으로 읽고 정리한다.
- scope/date commitment는 90일 이상 잠그기 어렵고, 3개월 roadmap도 2주 단위로 흔들릴 수 있다.
- churn pressure는 unit economics와 연결된다. 즉 `what got worse?`를 늦게 읽으면 retention 문제를 넘어 CAC/ARPU 의사결정까지 흔들린다.

## ICP
- 10~100명 B2B SaaS 팀
- founder-led sales 또는 초기 PMF 탐색 단계
- 전담 research / revops / CS analytics 조직이 약한 팀
- support와 churn 신호는 많은데 weekly decision ritual이 약한 팀
- enterprise ask와 general demand가 한 backlog에 섞여 가시성이 떨어지는 팀

## High-Value User Pain
1. support 요청과 feature request가 intake discipline 없이 그대로 흘러들어온다.
2. raw request는 쌓이지만 problem framing과 expected value는 사라진다.
3. feature request를 requesting customer / ARR / dollars / resource time과 연결하지 못한다.
4. churn reason은 남지만 ARR / ICP / lifecycle / avoidability 맥락이 사라진다.
5. 월요일 회의 전에 support tickets, Intercom, Slack, Salesforce를 오가며 사람이 다시 판단한다.
6. Productboard/Jira/시트가 있어도 discovery와 commitment hygiene가 분리돼 다시 사람이 중간 정리를 한다.
7. CS, Sales, Product가 같은 evidence를 source-linked 상태로 공유하지 못한다.
8. enterprise commitment와 일반 수요가 같은 backlog에 섞여 later dispute risk가 생긴다.
9. 90일 이상 lock하기 어려운 roadmap 현실과 customer expectation을 같은 화면에서 reconcile하지 못한다.
10. churn 문제를 늦게 읽으면 unit economics와 성장 의사결정까지 같이 흔들린다.

## Product Wedge
"고객 대화 저장소"가 아니라 **Monday-Morning Support + Churn Review + Commitment Risk Review + Now/Next/Later Roadmap Communication + Next-90-Days Decision View + Customer-Facing Progress Report Surface**.

핵심은 raw feedback를 더 모으는 게 아니라, 팀이 이미 쓰는 intake/grooming language로 바꾸는 것이다. 즉 record는 최소한 아래 필드를 향해야 한다.
- JTBD / use case / desired outcome
- impacted area
- expected impact
- rough effort / implementation weight
- requesting customer / account importance
- commitment status
- external update mode (high-level roadmap / sprint or release update / explicit non-commitment / at-risk progress report)
- roadmap layer vs release-plan layer distinction

핵심 포지셔닝 문장:
> Voice-of-Customer Repository helps founder-led B2B SaaS teams turn support tickets, churn reasons, feature requests, and customer commitments scattered across spreadsheets and tools into a Monday-morning decision brief plus a now/next/later roadmap communication layer, next-90-days commitment-risk view, and progress-report surface showing what got worse, for which segment, what revenue or trust is at risk, and what to say or do now.

핵심 차별점:
- support / CS / sales / churn evidence를 같은 ingestion surface로 묶음
- raw request가 아니라 **problem, expected value, ARR/ICP context, segment concentration, request origin**을 같이 읽음
- recurring signal을 pain / objection / feature request / churn reason / broken promise로 구조화
- avoidable churn vs non-actionable churn을 구분해 false alarm을 줄임
- weekly brief에서 health overview → risk review → ranked actions → evidence & gaps 순으로 제시
- weekly brief 안에서 `commitments at risk this quarter`를 별도 블록으로 제시
- `what should stay intentionally uncommitted for the next 90 days`를 명시해 false commitment를 줄임
- hard date를 못 주는 상황에서도 쓸 수 있는 **progress report / release-plan style external update draft**를 생성
- public roadmap에 바로 복사할 수 있는 **now / next / later-safe language**를 생성
- roadmap theme와 release/date-like promise를 섞지 않도록 **safe communication mode**를 강제
- generic AI summary가 아니라 **source-linked decision artifact**를 출력

## MVP Boundary
### 포함
- 텍스트/문서 업로드 및 붙여넣기
- support tickets / feedback emails / churn notes / cancellation reasons / feature-request context 업로드
- AI-assisted tagging (pain, segment, objection, request, churn reason, lifecycle stage, ARR/ICP importance, request origin, avoidable-vs-non-actionable churn)
- structured intake normalization for JTBD / use case / desired outcome / impacted area / expected impact / rough effort
- recurring signal dashboard
- support-to-product intake summary
- health / risk review brief
- lightweight commitment tracking for already-promised customer asks
- next-90-days commitment-risk summary
- evidence-linked decision brief export to markdown
- requesting account / revenue importance / estimated resource cost 같은 decision context 필드

### 제외
- full helpdesk replacement
- 실시간 SaaS 연동
- 고급 권한관리
- external benchmark network 구축
- workflow automation hub
- roadmap system-of-record
- outbound customer communication automation

## Validation Plan
- 5~10개 초기 팀 인터뷰
- 샘플 데이터 20~50개 업로드 기반 파일럿
- 검증 질문:
  - support / feature request / churn evidence가 지금 어디에 흩어져 있는가?
  - 월요일 또는 주간 우선순위 회의 전에 실제로 어떤 수동 작업을 하는가?
  - request를 requesting customer / dollars / resource time과 같이 읽고 있는가?
  - raw request를 어떤 기준으로 problem / urgency / segment impact로 재해석하는가?
  - 이미 약속한 customer commitment를 어디서 추적하고 누가 reconcile하는가?
  - churn reason을 ARR / ICP / lifecycle / unit-econ impact와 함께 보고 있는가?
  - health/risk brief가 있으면 어떤 회의/문서가 대체되는가?
- 검증 지표:
  - 주 1회 이상 반복 업로드
  - brief에서 나온 결정이 실제 우선순위 변경으로 이어진 사례 1건 이상
  - 팀이 brief를 회의 artifact로 재사용한 비율
  - 기존 `spreadsheet + ProductBoard/Jira + ad-hoc AI summary`보다 낫다는 반응 3건 이상

## Pricing Hypothesis
- Team: $99~299 / month
- Upsell: seat, source volume, AI analysis usage

## Key Risks
- generic feedback repository처럼 보일 수 있음
- integration 요구가 빠르게 커질 수 있음
- commitment tracking을 과하게 확장하면 roadmap system-of-record처럼 보여 scope가 커질 수 있음
- percentile / peer benchmark 기대치를 너무 빨리 올리면 decision wedge보다 benchmark product처럼 보일 수 있음
- request tie-back 필드를 너무 많이 넣으면 운영툴처럼 무거워질 수 있음

## Why Now
support와 churn 데이터는 이미 많지만, 초기 팀은 여전히 그것을 product decision ritual로 바꾸지 못한다. 요약 도구는 많아졌지만 **`what got worse this week?`, `which segment is newly at risk?`, `which requests are worth time now?`, `what revenue or commitment is exposed?`** 를 source-linked 상태로 말해주는 레이어는 여전히 희박하다.

이번 루프의 추가 신호는 여기에 한 가지를 더 보탠다. 팀은 public roadmap transparency를 원하지만, 실제로는 hard-date roadmap보다 **now / next / later 같은 low-commitment status communication**과 release-plan 분리가 더 실무적이다. 즉 VoC wedge는 단순 저장소가 아니라 **evidence-backed roadmap communication safety layer**로도 읽힌다.

## Supporting Evidence
- X indexed snippet: founders know churn rate but not why customers leave; evidence sits in surveys/support tickets/Stripe fields
  - https://x.com/brianfofficial/status/2031850417718460521
- X indexed snippet: founders have a decision problem, not a feedback problem
  - https://x.com/jeebz_a/status/2029969484459462989
- Reddit indexed snippet: some teams enforce problem understanding with a fill-in-the-blank JTBD intake template
  - https://www.reddit.com/r/ProductManagement/comments/1bi0jqk/do_you_have_a_formal_request_intake_process/
- Reddit indexed snippet: some teams still groom feature requests in JIRA using area / impact / effort fields
  - https://www.reddit.com/r/ProductManagement/comments/11s751k/what_info_to_ask_for_in_feature_requests/
- X indexed snippet: PMs manually read support tickets, Intercom, Slack, and Salesforce on Monday morning
  - https://x.com/valewrnt/status
- X indexed snippet: some founders want a single Monday-morning view of what is healthy, at risk, and urgent
  - https://x.com/_kamsyed/status/2033983166759793024
- X indexed snippet: some founders also want to know whether churn is normal via percentile-style peer comparison
  - https://x.com/polsia/status/2035027604550689279
- X indexed snippet: unit-econ pressure appears directly in churn discussions (`7% churn`, `$20 ARPU`, CAC ceiling)
  - https://x.com/fbrsaas/status
- Reddit indexed snippet: Productboard can become tied to quarterly planning, making actual discovery/backlog weighing hard
  - https://www.reddit.com/r/ProductManagement/comments/1csuyjc/how_do_you_use_productboard_successfully/
- Reddit indexed snippet: teams are not accustomed to locking scope and dates more than 90 days in advance
  - https://www.reddit.com/r/ProductManagement/comments/zrtnvu/how_do_i_respond_to_emails_loosely_and_not_give/
- Reddit indexed snippet: even a 3-month roadmap can change every two weeks once work begins
  - https://www.reddit.com/r/ProductManagement/comments/t9oymm/realistically_how_often_do_you_actually_hit_your/
- Reddit indexed snippet: some PMs explicitly distinguish roadmap from release plan and warn against treating roadmap like a dated timeline
  - https://www.reddit.com/r/ProductManagement/comments/rtmf2p/how_to_write_a_product_roadmap/
- Reddit indexed snippet: some teams keep public roadmap language at now / next / soon / later and avoid dates unless delivery history is proven
  - https://www.reddit.com/r/ProductManagement/comments/mtid85/product_roadmap_template/
- Reddit / Yahoo indexed snippet: publishing a transparent roadmap can build trust, but teams often use now / next / later framing to show commitment without overcommitting to dates
  - https://www.reddit.com/r/ProductManagement/comments/1jcy21y/how_do_you_make_roadmaps_actually_useful/
- Reddit / Yahoo indexed snippet: now / next / later is described as the right starting structure for roadmap communication because detail can be layered in later
  - https://www.reddit.com/r/ProductManagement/comments/1jsoma2/advice_on_building_roadmaps_from_scratch/
- Reddit indexed snippet: release planning can follow a concrete 2-week SaaS cadence even when customer-facing roadmap commitments stay softer
  - https://www.reddit.com/r/ProductManagement/comments/q3q7dv/how_do_you_plan_releases/
- Reddit indexed snippet: Google Form + spreadsheet intake still powers feature request collection
  - https://www.reddit.com/r/ProductManagement/comments/y3pmqg/managing_and_tracking_customer_feature_request/
- Reddit indexed snippet: teams want to tie dollars / resource time / requesting customers back to feature requests
  - https://www.reddit.com/r/ProductManagement/comments/10g15dz/tools_for_tracking_customer_requests/
- Reddit indexed snippet: teams still bridge Slack/email/meeting notes into ProductBoard and then Jira
  - https://www.reddit.com/r/ProductManagement/comments/vjpy9n/what_tools_do_you_use_to_gather_feature_requests/
- Reddit indexed snippet: multiple spreadsheets distort enterprise feature prioritization
  - https://www.reddit.com/r/ProductManagement/comments/1bhv13s/how_to_track_feature_requests_for_enterprise/
- Reddit indexed snippet: weekly spreadsheet review still appears in roadmapping workflows
  - https://www.reddit.com/r/ProductManagement/comments/11xkty3/roadmapping_tools/
- Reddit indexed snippet: PMs ask what tool/process should track customer commitments with deadlines once promises are made
  - https://www.reddit.com/r/ProductManagement/comments/zsuyqn/how_do_you_documenttrack_costumer_committments/
- Reddit indexed snippet: enterprise customers keep demanding roadmap dates even when the feature may not land until much later
  - https://www.reddit.com/r/ProductManagement/comments/13d599t/how_do_you_manage_enterprise_saas_customers_who/
- Reddit / PullPush mirror: support forwards every customer request to developers, creating roadmap noise
  - https://www.reddit.com/r/ProductManagement/comments/1jrlxxe/challenge_with_our_customer_support_team/
- Reddit / PullPush mirror: churn work should start by understanding reasons and segmenting by ARR / growth potential / ICP
  - https://www.reddit.com/r/CustomerSuccess/comments/13zqul2/best_way_to_minimize_churn_in_saas/
- Survey artifact
  - `.survey/social-web-app-ideas/context.md`
  - `.survey/social-web-app-ideas/solutions.md`