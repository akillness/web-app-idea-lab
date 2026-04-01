# Solution Landscape: Social Web/App Ideas

## Solution List
| Name | Approach | Strengths | Weaknesses | Notes |
|------|----------|-----------|------------|-------|
| Voice-of-Customer Repository | support / churn / feature request / commitment evidence를 **Monday-morning decision brief + next-90-days commitment-risk view + roadmap-theme / release-plan separation + progress-report surface**로 바꾸는 decision layer | 이번 루프의 Reddit + X signal과 가장 직접적으로 맞물림 | repository처럼 보이거나 roadmap software처럼 커지면 흐려짐 | `decision problem, not feedback problem`, weekly spreadsheet review, ProductBoard→Jira bridging, revenue/resource tie-back에 더해 **JTBD intake template**, **JIRA area/impact/effort grooming**, **Productboard quarterly-planning bias**, **quarterly commitment reprioritization**, **high-level roadmap + release/sprint plan + progress report ritual**, **90-day commitment limit**, **roadmap changes every two weeks**, **roadmap ≠ release plan**, **public roadmap date-avoidance**, **2-week release cadence reality**, 그리고 새로 **now/next/later는 near-term commitment만 만들고 later ambiguity는 그대로 남는다**, **timeline disclaimer만으로는 expectation management가 안 된다**, **NOW/NEXT/LATER가 clarity/commitment 부족으로 읽힐 수 있다**, **transparent roadmap는 신뢰를 주지만 status-language 중심이 더 안전하다**, **now/next/later는 시작점이고 detail은 firm해질수록 덧붙여야 한다**는 신호까지 붙어 더 강화됨 |
| Creator Deal CRM | creator/agency의 deal status·deliverable·invoice·payment follow-up·collections 상태를 묶는 ops tool | creator payment pain과 cash visibility 욕구가 선명함 | broad CRM처럼 보이거나 agency/solo ICP가 섞이면 약해짐 | 이번 루프는 특히 `late payment`, `underpayment`, `ghosting`, `clear payment terms before work`, **day 3/day 7/day 30 follow-up cadence**, **pre-due reminder habit**, **late-fee rule**, **hold-work-until-paid rule**, **AP list delay reality**, **WhatsApp-style invoicing**, **professional invoice template + net 30 + late fee + auto-reminder**에 더해 **weak payment systems**, **solid payment clause**, **AP + project-owner dual-send**, **PO/reference memory**, **30일 이후 주간 late-fee rule** 신호가 붙으면서, creator 문제를 broad CRM보다 payment-system clarity / invoice-routing completeness / collections discipline 문제로 더 좁혔다 |
| Support-to-Product Decision Hub | support/CS 요청을 dedupe·contextualize·impact-aware prioritization으로 바꾸는 intake layer | VoC의 가장 강한 하위 wedge | standalone이면 Productboard/Jira 보조툴처럼 보일 위험 | dollars/resource time tie-back과 request-origin tracking이 이번 루프에서 더 또렷해짐 |
| Creator Collections Assistant | overdue invoice, promised date, follow-up sequence, reminder timing에 특화된 회수 보조 툴 | pain가 매우 선명하고 ROI 설명이 쉬움 | 너무 좁으면 deal context와 rights memory가 빠짐 | solo/freelancer skew가 강한 entry wedge로는 유효 |
| Churn Decision Copilot | churn rate가 아니라 churn reason / segment / avoidability / unit-econ impact를 연결하는 분석 레이어 | `why`와 `so what`을 동시에 풀 수 있음 | 단독 제품이면 intake/evidence layer 없이 약할 수 있음 | VoC의 module로는 강하지만 standalone 1순위는 아님 |

## Categories
### Decision / evidence systems
- Voice-of-Customer Repository
- Support-to-Product Decision Hub
- Churn Decision Copilot

### Creator ops / collections
- Creator Deal CRM
- Creator Collections Assistant

## What People Actually Use
- SaaS 팀은 여전히 Google Forms, email, MS Forms, spreadsheets로 request를 모으고 weekly review를 한다.
- formal intake를 도입한 팀도 여전히 JTBD / problem statement / desired outcome을 템플릿으로 받는다.
- Slack / email / meeting note를 ProductBoard에 넣고 Jira로 다시 넘기는 식의 multi-tool bridge가 흔하다.
- feature request grooming은 여전히 `area`, `impact`, `effort` 같은 필드를 사람이 채우며 진행된다.
- feature request prioritization은 여전히 `누가 요청했는지`, `얼마짜리 고객인지`, `얼마나 많은 resource time이 드는지`를 수동으로 연결한다.
- founders는 feedback가 없는 게 아니라 support/churn/NPS가 많아서 **무엇을 결정해야 하는지**가 더 어려워진다.
- PM은 월요일 아침 support tickets, Intercom, Slack, Salesforce를 오가며 상황을 재구성한다.
- Productboard 같은 도구를 써도 discovery/backlog weighing은 따로 남고 quarterly planning 중심으로 쏠리기 쉽다.
- enterprise request가 많아지면 Sales/CSM이 commitments 사이 우선순위를 분기마다 다시 조정한다.
- 팀은 90일 이상 scope/date commitment를 잠그기 어려워하면서도 고객과 내부 roadmap을 계속 reconcile해야 한다.
- 그래서 실제 운영은 high-level roadmap, sprint/release plan, progress report를 섞어 commitment를 설명하는 식으로 흘러간다.
- roadmap 자체와 release plan을 구분해야 한다는 practitioner language가 분명히 존재한다.
- public roadmap은 now/next/soon/later로 유지하고 날짜는 피하라는 현실적 조언이 반복된다.
- 이번 루프에는 **roadmap transparency 자체는 신뢰를 주지만, commitment는 날짜보다 status language로 관리해야 한다**는 뉘앙스가 추가됐다.
- 또 **now/next/later는 시작점일 뿐, detail은 firm해질수록 layered communication으로 보강해야 한다**는 practitioner framing도 붙었다.
- 그런데 이번 루프에는 **now/next/later를 써도 고객이 결국 later가 언제인지 다시 묻는다**는 신호가 붙어, bucket label만으로는 expectation management가 끝나지 않는다는 점이 더 선명해졌다.
- 실제 shipping cadence가 짧을수록 roadmap-theme와 customer-facing promise를 분리해 주는 레이어가 더 필요하다.
- 3개월 roadmap도 2주마다 흔들릴 수 있어 commitment-risk visibility가 비어 있다.
- churn은 여전히 rate로 먼저 보지만, 실제로는 unit economics와 연결된 decision pressure를 만든다.
- creators와 freelancers는 여전히 invoice sending, overdue follow-up, promised payment, underpayment, ghosting을 수동으로 처리한다.
- creator 쪽 최신 X 결과는 agency dashboard보다 `awkward chasing`, `clear terms before work`, `automated reminders`, `money stuck` 같은 solo operator pain을 더 많이 보여준다.
- Reddit `r/freelance` 쪽에서는 일주일 전/전날 pre-due reminder, late-fee clause, first-invoice 미지급 시 추가 작업 중단 같은 collections discipline을 개인 습관으로 운영한다.
- 이번 루프에는 여기에 더해 **AP 담당자 + 프로젝트 담당자 dual-send**, **PO/reference 확보 후 chase**, **30일 이후 주간 late-fee rule** 같은 invoice-routing / accounting-facing ritual도 붙었다.
- 작은 운영자는 AP list 맨 아래로 밀리기 쉬워 overdue list보다 `지금 어떤 escalation step을 밟아야 하는지`가 더 중요해진다.
- 즉 사람들이 원하는 것은 generic dashboard보다 **결정용 한 화면** 또는 **오늘 회수해야 할 돈/행동 큐**다.

## Frequency Ranking
1. Voice-of-Customer Repository
2. Creator Deal CRM
3. Support-to-Product Decision Hub
4. Creator Collections Assistant
5. Churn Decision Copilot

## Curated Sources
### Reddit / Yahoo indexed snippets
- https://www.reddit.com/r/ProductManagement/comments/1bi0jqk/do_you_have_a_formal_request_intake_process/
- https://www.reddit.com/r/ProductManagement/comments/11s751k/what_info_to_ask_for_in_feature_requests/
- https://www.reddit.com/r/ProductManagement/comments/y3pmqg/managing_and_tracking_customer_feature_request/
- https://www.reddit.com/r/ProductManagement/comments/10g15dz/tools_for_tracking_customer_requests/
- https://www.reddit.com/r/ProductManagement/comments/vjpy9n/what_tools_do_you_use_to_gather_feature_requests/
- https://www.reddit.com/r/ProductManagement/comments/1bhv13s/how_to_track_feature_requests_for_enterprise/
- https://www.reddit.com/r/ProductManagement/comments/11xkty3/roadmapping_tools/
- https://www.reddit.com/r/ProductManagement/comments/1csuyjc/how_do_you_use_productboard_successfully/
- https://www.reddit.com/r/ProductManagement/comments/zrtnvu/how_do_i_respond_to_emails_loosely_and_not_give/
- https://www.reddit.com/r/ProductManagement/comments/t9oymm/realistically_how_often_do_you_actually_hit_your/
- https://www.reddit.com/r/ProductManagement/comments/13d599t/how_do_you_manage_enterprise_saas_customers_who/
- https://www.reddit.com/r/ProductManagement/comments/zsuyqn/how_do_you_documenttrack_costumer_committments/
- https://www.reddit.com/r/ProductManagement/comments/z978tk/product_commitments/
- https://www.reddit.com/r/ProductManagement/comments/1jcy21y/how_do_you_make_roadmaps_actually_useful/
- https://www.reddit.com/r/ProductManagement/comments/1jsoma2/advice_on_building_roadmaps_from_scratch/
- https://www.reddit.com/r/CustomerSuccess/comments/13zqul2/best_way_to_minimize_churn_in_saas/
- https://www.reddit.com/r/CustomerSuccess/comments/19b0xvo/how_do_you_handle_churn/
- https://www.reddit.com/r/freelance/comments/a0viuu/is_it_wrong_to_send_a_reminder_to_client_for/
- https://www.reddit.com/r/freelance/comments/bdtlwa/how_long_should_i_take_to_remind_my_client_to_pay/
- https://www.reddit.com/r/freelance/comments/qm5omp/steps_when_a_client_is_late_on_payment/
- https://www.reddit.com/r/freelance/comments/10rbyln/my_client_has_a_habit_of_saying_hell_pay_me_today/
- https://www.reddit.com/r/freelance/comments/o7k3tm/getting_a_client_to_pay_invoices_help_please/
- https://www.reddit.com/r/freelance/comments/ej4uqx/took_a_gig_that_pays_net_45_still_havent_been/
- https://www.reddit.com/r/freelance/comments/11r9p3n/late_payment_rant/
- https://www.reddit.com/r/PartneredYoutube/comments/rdh39k/first_brand_deal_wondering_how_to_invoice_the/
- https://www.reddit.com/r/PartneredYoutube/comments/1d21p8k/is_there_a_formula_for_how_much_i_should_charge/
- https://www.reddit.com/r/PartneredYoutube/comments/1cf7d33/pricing_sponsorships_and_usage_rights/

### Reddit / PullPush mirror recoveries carried forward
- https://www.reddit.com/r/ProductManagement/comments/1jrlxxe/challenge_with_our_customer_support_team/
- https://www.reddit.com/r/CustomerSuccess/comments/1jkq1wt/how_were_using_ai_to_transform_customer_support/
- https://www.reddit.com/r/influencermarketing/comments/1rvi66q/how_are_agencies_actually_tracking_brand_deal/
- https://www.reddit.com/r/influencermarketing/comments/1pj7ztr/how_are_you_all_speeding_up_brand_payments_mine/
- https://www.reddit.com/r/PartneredYoutube/comments/1r3a35i/how_are_you_guys_organizing_sponsorships_and/
- https://www.reddit.com/r/UGCcreators/comments/1rgfo0p/fulltime_ugc_creators_whats_your_backend_system/

### X / Yahoo indexed snippets
- https://x.com/brianfofficial/status/2031850417718460521
- https://x.com/_kamsyed/status/2033983166759793024
- https://x.com/valewrnt/status
- https://x.com/jeebz_a/status/2029969484459462989
- https://x.com/polsia/status/2035027604550689279
- https://x.com/fbrsaas/status
- https://x.com/Anubhavhing/status/2028627747158016340
- https://x.com/shubh19/status
- https://x.com/canusign/status
- https://x.com/mahlaku_m/status/2036378849487749441
- https://x.com/ManojBuilds/status
- https://x.com/Indiepat2026/status
- https://x.com/Dominus_Kelvin/status/2029573666388996145
- https://x.com/iRunDocs/status/2032562374872543349

### Threads
- Focused query `site:threads.net creator invoice payment follow up brand deal` returned zero Yahoo results this loop.
- Narrow quoted query `site:threads.net "creator invoice" "follow up" "brand deal"` also returned zero Yahoo results.

## Key Gaps
- feedback tooling 시장에는 저장/태깅 툴은 많아 보이지만, **support → churn → request → commitment → Monday decision brief**를 한 줄로 닫아주는 레이어는 여전히 약하다.
- Productboard/Jira류 planning stack과 별개로 **next-90-days commitment risk**를 읽어주는 lightweight layer도 부족하다.
- hard date가 어려운 상황에서 **progress report / release-plan language로 commitment 상태를 설명해주는 lightweight surface**도 부족하다.
- **roadmap theme**와 **release plan / dated promise**를 안전하게 분리해주는 lightweight surface도 부족하다.
- **now/next/later를 보여줘도 결국 later timing 질문에 답해야 하는 ambiguity-closing surface**도 부족하다.
- request를 revenue impact / resource time / customer importance와 연결해 의사결정하는 lightweight layer도 부족하다.
- benchmark curiosity는 존재하지만, 현장의 더 급한 pain은 still messy evidence cleanup + weekly decision ritual이다.
- churn tooling도 많지만 `why`, `which segment`, `what action`, `what unit-econ risk`를 동시에 보여주는 decision layer는 드물다.
- creator tooling은 invoice creation을 말해도 실제 사용자는 **late payment / underpayment / ghosting / follow-up timing**에서 막힌다.
- creator tooling은 payment terms before work, promised payment date, invoice instructions, rights/pricing memory를 first-class로 다루지 않는 경우가 많다.
- 그리고 이번 루프의 X/Threads indexed evidence는 creator pain의 뿌리를 **weak payment systems / weak payment clauses** 쪽으로 더 밀어, CRM보다 시스템-정비 레이어가 더 급하다는 점을 드러냈다.
- Threads는 discovery source로서 계속 효율이 낮다.

## Contradictions
- 사용자들은 feedback를 못 모으는 게 아니라 **무엇을 결정할지 못 정한다**.
- quarterly planning tool을 써도 discovery/backlog weighting과 commitment hygiene는 따로 남는다.
- hard date를 줄이려 해도 결국 고객-facing progress report / release-plan communication은 따로 필요하다.
- roadmap을 보여주는 것과 release/date promise를 주는 것은 다른데, 현장 툴은 이 둘을 자주 섞는다.
- tool을 하나 더 추가해도 ProductBoard→Jira→spreadsheet 같은 bridge work는 계속 남는다.
- benchmark percentile curiosity는 있지만, 실제 현장은 peer rank보다 먼저 `weekly decision surface`가 필요하다.
- churn problem은 retention dashboard처럼 보이지만, 실제 pain은 unit economics pressure가 걸린 prioritization 문제다.
- creator CRM은 많지만 creators가 아픈 건 broad relationship management보다 **돈이 왜/어디서 막혔는지**다.
- invoice tool이 있어도 `before work payment terms clarity`가 없으면 cash leak는 계속된다.
- reminder copy generation은 쉬워도 `why follow up now`, `what sequence step`, `what promise was missed`는 여전히 비어 있다.
- invoice tool이 있어도 pre-due reminder, late-fee policy, stop-work rule, AP-delay reality 같은 운영 규율은 보통 제품에 잘 반영되지 않는다.

## Key Insight
이번 루프의 핵심은 **Primary/Backup 순위를 바꾸는 게 아니라, 두 아이디어의 operational wedge를 더 명확히 닫는 것**이었다. Primary인 Voice-of-Customer Repository는 이제 `feedback repository`보다 **support/churn/request/commitment를 decision artifact로 바꾸는 Monday-morning operating system + next-90-days commitment-risk view + roadmap-theme / release-plan separation + progress-report surface**로 보는 편이 정확하다. 특히 이번 루프는 `decision problem`, `weekly spreadsheet review`, `Productboard quarterly-planning bias`, `quarterly commitment reprioritization`, `high-level roadmap + release/sprint plan + progress report ritual`, `90-day commitment limit`, `roadmap changes every two weeks`, `roadmap ≠ release plan`, `public roadmap without dates`, `2-week release cadence`, `ProductBoard→Jira bridge`, `revenue/resource tie-back`, `unit-econ pressure`가 한 흐름으로 연결됐다. Backup인 Creator Deal CRM은 `creator CRM`보다 **cash-arrival visibility + payment-terms clarity + overdue follow-up timing + underpayment/ghosting handling + invoice professionalism + collections policy memory**로 더 좁혀야 한다. Creator 쪽 최신 X evidence는 솔로/프리랜서 skew가 강했고, 이번 루프 Reddit recoveries는 여기에 **pre-due reminder**, **late-fee rule**, **stop-work-until-paid**, **AP-list delay reality**를 더했다. 그래서 broad agency OS보다 **collections clarity + invoice readiness + escalation-step guidance entry wedge**가 더 실전적이다.