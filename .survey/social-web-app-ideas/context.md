# Context: Social Web/App Ideas

## Workflow Context
이번 루프에서도 플랫폼별 신호 품질 차이는 유지됐다.

- **Reddit**: direct live page는 불안정했지만, Yahoo indexed Reddit snippets로는 오히려 더 구체적인 workflow가 보였다. 팀들은 아직도 **Google Form → spreadsheet → weekly review**, **Slack/email/meeting note → ProductBoard → Jira**, **feature request별 dollars/resource time tie-back**, **enterprise request tracking용 multiple spreadsheets** 같은 수동 구조를 쓰고 있었다. 이번 루프에는 여기에 더해 **fill-in-the-blank JTBD intake template**, **JIRA feature request project**, **area / impact / effort grooming field**뿐 아니라, **Productboard는 quarterly planning에 묶이고 discovery/backlog weighing은 여전히 어렵다**, **90일 이상 scope/date commitment를 잠그기 어렵다**, **3개월 roadmap도 2주 단위로 흔들린다**는 신호까지 확인됐다.
- **X**: direct post reading은 막혔지만, Yahoo indexed snippets로는 `decision problem, not feedback problem`, `Monday-morning one view`, `support/Intercom/Slack/Salesforce hopping`, `percentile curiosity`, `7% churn + $20 ARPU` 같은 sharper framing이 유지됐다. Creator 쪽에서는 **day 3 / day 7 / day 30 follow-up cadence**, **late payment / underpayment / ghosting**, **WhatsApp-style invoicing**가 더 실무적인 pain으로 회수됐다. 여기에 더해 **professional invoice template + net 30 + late fee + auto-reminders** 같은 framing도 보이면서, 돈이 늦게 들어오는 문제의 일부가 invoice readiness / professionalism gap이라는 점이 더 또렷해졌다.
- **Threads**: 이번 루프의 focused query `site:threads.net creator invoice payment follow up brand deal`는 Yahoo에서 **검색 결과 0건**이었다. 여전히 discovery source보다는 blocker evidence에 가깝다.

이번 루프에서 더 선명해진 흐름은 세 가지다.

1. **VoC 쪽 핵심 pain은 feedback 부족이 아니라 decision failure + commitment management failure**다.
   - support, churn, NPS, feature request는 이미 충분히 들어오고,
   - 문제는 이것이 spreadsheet, ProductBoard, Jira, Slack, billing data로 분산돼,
   - 결국 팀이 `무엇이 악화됐는지`, `어느 세그먼트가 위험한지`, `무엇에 시간을 써야 하는지`를 weekly ritual 안에서 빨리 못 정한다는 점이다.
2. **VoC의 좋은 wedge는 repository가 아니라 Monday-morning decision brief + next-90-days commitment risk view**다.
   - X 쪽에서는 `one view every Monday morning` 욕구가 반복됐고,
   - Reddit 쪽에서는 여전히 spreadsheet review와 tool-bridging이 보였다.
   - 이번 루프에는 Productboard가 discovery보다 quarterly planning에 묶인다는 신호와, 90일 이상 commit을 잠그기 어렵다는 신호까지 붙었다.
   - 즉 사용자는 저장소보다 **decision surface + commitment-risk surface**를 원한다.
3. **Creator 쪽 pain은 generic CRM이 아니라 collections workflow clarity**다.
   - late payments, underpayments, ghosting, awkward chasing, `clear terms before work`, automated reminders 같은 신호가 더 누적됐다.
   - 다만 이번 루프의 fresh creator evidence는 agency-wide ops보다 **freelancer / solo creator cash collection pain** 쪽에 더 많이 기울었다.

즉 이번 루프는 순위를 뒤집지 않았다. 대신 **Primary인 VoC Repository는 `feedback repository`가 아니라 `decision problem + commitment-risk solver`로 더 또렷해졌고**, Backup인 Creator Deal CRM은 **`broad CRM`이 아니라 `deal execution + collections visibility + follow-up timing + payment-terms clarity + invoice readiness`**로 더 좁아졌다.

## Affected Users
| Role | Responsibility | Skill Level |
|------|----------------|-------------|
| 초기 B2B SaaS 창업자 | support / churn / request 신호를 주간 제품 우선순위와 리스크 판단으로 연결 | 중간~상 |
| PM / PMM | feature request, objection, churn reason, commitment를 정리하고 팀 의사결정으로 연결 | 중간~상 |
| Customer Success / Support 리드 | 반복 pain, escalations, churn warning, enterprise demand를 product와 연결 | 중간 |
| 솔로 크리에이터 / 프리랜서 | brand deal 이후 invoice / promised payment / overdue follow-up 관리 | 중간 |
| 소형 크리에이터 에이전시 | 여러 creator deal의 deliverable, payment terms, invoice, collection 상태 운영 | 중간~상 |

## Current Workarounds
1. Google Form / email / MS Forms로 request를 모은 뒤 spreadsheet를 매주 확인한다.
2. Slack / email / meeting note를 ProductBoard에 넣고, 다시 Jira Epic/Story로 밀어 넣는다.
3. feature request별로 어느 고객이 요청했는지, dollars/resource time이 어떻게 연결되는지 별도 수동 계산을 한다.
4. churn feedback는 survey/support/billing export에 남지만 ARR / ICP / lifecycle 기준으로 정규화하지 못한다.
5. 월요일 아침마다 support tickets, Intercom, Slack complaints, Salesforce churn note를 사람이 직접 오가며 읽는다.
6. formal intake를 도입해도 여전히 JTBD / use case / desired outcome을 템플릿으로 수집한 뒤 사람이 다시 grooming하고 보강한다.
7. JIRA feature request project에서 area / impact / effort를 채우며 raw request를 decision-ready field로 번역한다.
8. Productboard 같은 도구를 써도 quarterly planning 중심으로 굳어 discovery/backlog weighing은 다른 곳에서 다시 처리한다.
9. enterprise request/commitment는 spreadsheet 여러 개나 backlog 툴 여기저기에 흩어져 prioritization drift가 생긴다.
10. scope/date commitment는 90일 이상 잠그기 어려워도, 팀은 고객 커뮤니케이션과 내부 planning 사이를 수동으로 reconcile해야 한다.
11. 3개월 roadmap도 2주 단위로 흔들리는데 commitment ledger는 그 변화 속도를 못 따라간다.
12. creators와 freelancers는 invoice/payment 상태를 spreadsheet, Notion, email, DM, WhatsApp처럼 섞어서 관리한다.
13. late payment follow-up은 사람이 기억에 의존해 보내고, underpayment/ghosting도 체계 없이 처리한다.
14. follow-up cadence도 ad hoc인 경우가 많아 day 3 / day 7 / day 30 같은 sequence를 머릿속으로만 운영한다.
15. payment terms, invoice recipient, AP instructions를 deal 시작 전에 구조화하지 않아 뒤늦게 cash가 막힌다.
16. invoice 자체도 `scribbled note`처럼 느슨하게 보내는 경우가 있어 professionalism / late-fee / reminder setup이 약하다.

## Adjacent Problems
- feedback는 쌓이는데 decision artifact는 남지 않는다.
- feature request workflow가 tool bridging 문제(ProductBoard ↔ Jira ↔ spreadsheet)로 낭비된다.
- feature request를 revenue impact / resource cost와 연결하지 못하면 prioritization이 정치화되기 쉽다.
- churn을 `rate`로만 보면 unit economics 문제를 늦게 본다.
- enterprise request backlog는 commitment registry 역할까지 떠안으며 더 혼란스러워진다.
- quarterly planning 도구가 ongoing discovery와 commitment hygiene를 동시에 해결하지 못하면 request overload가 그대로 남는다.
- roadmap volatility가 큰 팀일수록 `무엇을 약속했고`, `무엇은 아직 약속하지 말아야 하는지`를 분리하는 레이어가 필요하다.
- creator payment ops는 `send invoice`보다 `terms are clear`, `promised date is tracked`, `follow-up is due now` 쪽이 더 중요하다.
- creator 쪽에서도 invoice professionalism이 약하면 collections 문제가 더 오래 끈다.
- creator 쪽 최신 X evidence는 solo/freelancer skew가 강해서, agency ICP는 계속 보되 early wedge는 solo pain으로 읽는 편이 맞다.
- Threads는 현재 discovery source로서 효율이 계속 낮다.

## User Voices
> "Most SaaS founders know their churn rate but have no idea why customers actually leave ... the cancellation data is sitting right there — in surveys, support tickets, Stripe fields — and nobody reads it systematically." — X indexed snippet
- https://x.com/brianfofficial/status/2031850417718460521
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "most founders don't have a feedback problem they have a decision problem ... users are telling you things every day through support tickets, churn, NPS..." — X indexed snippet
- https://x.com/jeebz_a/status
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: medium

> "PMs spend monday morning: reading last week's support tickets, skimming intercom, checking slack for complaints, opening salesforce for churn notes..." — X indexed snippet
- https://x.com/valewrnt/status
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "Instead of simply giving us solutions, we wanted to enforce the principle of understanding the problem so our template is a fill-in-the-blank JTBD." — Reddit indexed snippet
- https://www.reddit.com/r/ProductManagement/comments/1bi0jqk/do_you_have_a_formal_request_intake_process/
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "We have a JIRA project named Feature requests ... we fill out area of application, impact, effort as we groom this list." — Reddit indexed snippet
- https://www.reddit.com/r/ProductManagement/comments/11s751k/what_info_to_ask_for_in_feature_requests/
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "The founder could open one view every Monday morning and see exactly what was healthy, what was at risk, and what needed immediate attention. No digging through Slack." — X indexed snippet
- https://x.com/_kamsyed/status/2033983166759793024
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "at 7% churn and $20 ARPU you can't afford to spend more than $100 on CAC..." — X indexed snippet
- https://x.com/fbrsaas/status
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: medium

> "We use Productboard, but mostly for quarterly planning exercises ... using Productboard for actual discovery, keeping a backlog, weighing options, etc. pretty hard." — Reddit indexed snippet
- https://www.reddit.com/r/ProductManagement/comments/1csuyjc/how_do_you_use_productboard_successfully/
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "As a company, we are not yet accustomed to locking scope and dates more than 90 days in advance ... reduce commitments in each release ... leaving some bandwidth for the unexpected." — Reddit indexed snippet
- https://www.reddit.com/r/ProductManagement/comments/zrtnvu/how_do_i_respond_to_emails_loosely_and_not_give/
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "We usually define a roadmap for the next three months ... however in reality, the roadmap changes every two weeks ..." — Reddit indexed snippet
- https://www.reddit.com/r/ProductManagement/comments/t9oymm/realistically_how_often_do_you_actually_hit_your/
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "I set up a Google Form for feature requests that went into a spreadsheet ... capturing what the feedback was and who it originated from." — Reddit indexed snippet
- https://www.reddit.com/r/ProductManagement/comments/y3pmqg/managing_and_tracking_customer_feature_request/
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "I work at a B2B startup and [need] a mechanism to tie dollars and/or resource time back to feature request, as well as track which customers have made the request." — Reddit indexed snippet
- https://www.reddit.com/r/ProductManagement/comments/10g15dz/tools_for_tracking_customer_requests/
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "We capture insights (Slack conversations, emails, notes from meetings, etc) into ProductBoard ... then push the planned feature as an Epic ... to Jira." — Reddit indexed snippet
- https://www.reddit.com/r/ProductManagement/comments/vjpy9n/what_tools_do_you_use_to_gather_feature_requests/
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "That's the problems with spreadsheets (especially multiples ones)." — Reddit indexed snippet
- https://www.reddit.com/r/ProductManagement/comments/1bhv13s/how_to_track_feature_requests_for_enterprise/
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "in short term, I am using email or MS forms and have a spreadsheet that is checked weekly for new requests" — Reddit indexed snippet
- https://www.reddit.com/r/ProductManagement/comments/11xkty3/roadmapping_tools/
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "Saw the same post on r/freelance every single week: how do I chase late payments without being awkward" — X indexed snippet
- https://x.com/Anubhavhing/status/2028627747158016340
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "built : polite nudge day 3, firm follow up day 7, 'my accountant is handling this' at day 30" — X indexed snippet
- https://x.com/Anubhavhing/status/2028627747158016340
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "The fourth earner is an automated invoice reminder system for freelancers and small service businesses." — X indexed snippet
- https://x.com/shubh19/status
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: medium

> "Most freelancers lose more money to late payments than bad clients. The fix? A clear contract with payment terms BEFORE you start work." — X indexed snippet
- https://x.com/canusign/status
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: medium

> "Late payments, underpayments, and ghosting creators is way too common." — X indexed snippet
- https://x.com/mahlaku_m/status/2036378849487749441
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "A creator sent me a screenshot of how they invoice their clients. It was a WhatsApp message ... That's not an invoice." — X indexed snippet
- https://x.com/Dominus_Kelvin/status/2029573666388996145
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "Invoice Template – Not some scribbled note. A pro one with payment terms (net 30), late fees (1.5%/mo), and auto-reminders ... chased $5k for 90 days—proper invoice? Paid in 2 weeks." — X indexed snippet
- https://x.com/iRunDocs/status/2032562374872543349
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

## Collection Caveat
- Reddit evidence는 이번 루프도 **Yahoo indexed Reddit snippet**이 핵심이었다. live-page verification과 동일하지 않다.
- X evidence도 계속 **Yahoo indexed snippet** 중심이다. 일부 URL은 stem만 읽혔고 direct post verification은 막혀 있었다.
- Threads는 targeted query에서 다시 **검색 결과 0건**이 나왔다. 더 좁힌 quoted query `site:threads.net "creator invoice" "follow up" "brand deal"`도 **검색 결과 0건**이었다.
- 이번 루프의 가장 큰 변화는 새로운 1등 아이디어 발견이 아니라, **VoC는 `decision problem + commitment-risk` product**, **Creator는 `collections clarity + invoice readiness` product**라는 해석이 더 강해진 점이다.