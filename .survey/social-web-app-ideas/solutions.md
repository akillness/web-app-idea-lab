# Solution Landscape: Social Web/App Ideas

## Solution List
| Name | Approach | Strengths | Weaknesses | Notes |
|------|----------|-----------|------------|-------|
| Voice-of-Customer Repository | churn/support/interview 데이터를 `Monday-morning health/risk decision brief`로 변환하는 evidence layer | 이번 루프의 fresh signal과 가장 직접적으로 맞물림, churn budget과 연결됨 | repository처럼 보이면 약해짐, benchmark data 확보는 어려움 | 이번 루프에서 `why customers leave`, `is churn normal`, `one Monday view` 신호가 추가로 붙음 |
| Creator Deal CRM | creator/agency의 deposit·invoice·payment follow-up 운영 툴 | 돈이 새는 순간을 직접 겨냥해 pain이 선명함 | 솔로 크리에이터 budget과 범용 CRM 비교 저항 가능 | broad CRM보다 `collections + payment recovery` wedge가 더 맞다는 점이 강화됨 |
| Churn Benchmark Copilot | churn percentile/peer comparison 중심 툴 | founder urgency가 높고 숫자가 직관적임 | benchmark supply가 어렵고 standalone이면 얕아질 수 있음 | 독립 제품보다 VoC의 보조 layer로 붙는 편이 자연스러움 |
| Support Workflow Embedder | 고객 워크플로 내부에 들어가는 support ticket/ops layer | 현장 workflow와 밀착 | implementation surface가 넓고 기존 툴과 겹침 | standalone idea보다는 VoC 주변 인접 문제 |
| Meeting Decision Tracker | 회의 요약보다 결정·담당자·마감 추적에 집중 | summary tool 대비 차별점 선명 | PM/work-management 툴과 경계가 겹침 | 이번 루프 증거는 상대적으로 약함 |

## Categories
### Evidence / retention intelligence
- Voice-of-Customer Repository
- Churn Benchmark Copilot
- Meeting Decision Tracker

### Revenue ops / collections workflow
- Creator Deal CRM

### Embedded operations
- Support Workflow Embedder

## What People Actually Use
- 초기 SaaS 팀은 feedback를 이미 많이 모으지만, 여전히 LLM 요약·문서·Slack 검색에 의존한다.
- churn number는 보되, churn reason을 정규화하거나 세그먼트별로 읽는 workflow는 약하다.
- 월요일 아침 회의용 health/risk review를 손으로 만든다.
- 크리에이터와 소형 에이전시는 여전히 시트, WhatsApp, DM, 이메일을 붙여서 deposit/invoice/payment를 운영한다.
- 즉 사람들이 원하는 것은 `AI summary`가 아니라 **review artifact** 혹은 **recovery workflow**다.

## Frequency Ranking
1. Voice-of-Customer Repository
2. Creator Deal CRM
3. Churn Benchmark Copilot
4. Support Workflow Embedder
5. Meeting Decision Tracker

## Curated Sources
### Reddit
- https://www.reddit.com/r/SaaS/comments/1as7rr6/heres_a_mini_guide_to_reduce_churn_for_your_saas/
- https://www.reddit.com/r/SaaS/comments/1by5znz/what_do_you_use_for_support_tickets/
- https://www.reddit.com/r/SaaS/comments/17hdocl/how_to_keep_track_of_product_feedback_and_ideas/
- https://www.reddit.com/r/influencermarketing/comments/1amt7so/payment_terms_on_invoices_for_sponsored_content/
- https://www.reddit.com/r/influencermarketing/comments/j8smty/influencersbrands_how_do_you_handle_payments/
- https://www.reddit.com/r/PartneredYoutube/comments/ox8vm3/is_it_normal_to_ask_for_a_deposit_before_doing_a/

### X
- https://x.com/brianfofficial/status/2031850417718460521
- https://x.com/polsia/status/2035027604550689279
- https://x.com/fbrsaas/status/2036449960581837060
- https://x.com/_kamsyed/status/2033983166759793024
- https://x.com/Dominus_Kelvin/status/2029573666388996145
- https://x.com/polsia/status/2033895987073454226

### Threads
- Direct usable signal still not recovered this loop; targeted Yahoo queries returned 0 parseable result blocks.

## Key Gaps
- feedback synthesis 시장에는 요약 툴은 많지만, 팀이 회의에서 바로 쓰는 **health/risk decision brief** 레이어는 비어 있다.
- churn benchmark는 중요하다는 신호가 있지만, credible peer baseline을 확보하기는 어렵다.
- creator ops는 pain가 분명한데도 `deposit → invoice → follow-up → recovery`를 작고 빠르게 닫아주는 툴이 부족하다.
- Threads는 계속 조사 효율이 낮아 social-signal sourcing에서 보조 채널 이상이 되지 못한다.

## Contradictions
- 사용자들은 feedback를 모으지 못하는 게 아니라, 그걸 **월요일 아침 의사결정**으로 바꾸지 못한다.
- churn 관리 툴은 많아 보여도 `why customers leave`와 `is this normal for this segment?`를 동시에 닫아주는 툴은 드물다.
- creator CRM은 많지만 creators는 실제로 여전히 spreadsheets와 WhatsApp를 쓴다.
- AI summary는 흔하지만, payment follow-up sequence나 source-linked decision review는 드물다.

## Key Insight
이번 루프의 핵심은 **Primary를 바꿀 정도의 새 아이디어가 나온 것이 아니라, 기존 Primary인 VoC Repository의 opening wedge가 훨씬 선명해졌다는 점**이다. 이제 VoC는 `feedback repository`가 아니라 **Monday-morning churn/support health-and-risk review for founder-led SaaS teams**로 설명하는 편이 맞고, Backup인 Creator Deal CRM은 `generic creator CRM`이 아니라 **deposit / invoice / overdue recovery ops**로 더 좁혀야 한다.
