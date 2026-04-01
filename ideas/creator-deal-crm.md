# Creator Deal CRM

**Status**: Backup pick
**Updated**: 2026-04-02

## One-line Thesis
브랜드딜 CRM 전체를 하려는 게 아니라, 크리에이터와 소형 에이전시의 **deal status · deliverable · invoice readiness · payment terms / clause clarity · promised payment date · pre-due reminder · follow-up timing · collections visibility**를 닫아주고 `지금 돈이 어디서 막혔는지`를 보여주는 creator cash-ops tool.

## Why it stayed backup, not primary
이번 루프에서도 creator payment / workflow pain은 여전히 강했다. 특히 `late payment`, `underpayment`, `ghosting`, `awkward chasing`, `automated reminders`, `clear payment terms before work` 같은 framing에 더해, 이번에는 **accounts payable contact 동시 추적**, **PO number / invoice reference 기억**, **outstanding invoice가 있으면 새 작업을 멈추는 정책**, **30일 이후 주간 late fee 규칙** 같은 더 구체적인 collections operating rule 신호가 붙었다. 다만 fresh evidence의 무게중심은 agency-wide CRM보다는 **freelancer / solo creator collections pain** 쪽에 더 가까웠고, 현재 레포의 문서화와 구현 준비도는 VoC 쪽이 더 앞서 있다. 그래서 지금은 **강한 backup**으로 유지한다.

## ICP
- 월 브랜드딜이 꾸준한 솔로 크리에이터 / 프리랜서
- 1~10명 크리에이터 에이전시
- 여러 creator/deal을 동시에 운영하는 small operator team
- 스프레드시트, Notion, DM, 이메일로 협찬 / 납기 / 송장 / 입금을 관리 중인 사용자

## Core Pain
- deal stage, deliverable status, invoice state, payment follow-up가 서로 다른 툴에 흩어진다.
- `delivered`에서 `paid`까지의 구간이 가장 위험한데 가장 덜 구조화돼 있다.
- 30/60/90일 payment terms와 repeated follow-up이 cash flow를 압박한다.
- promised payment date와 actual payment가 계속 어긋난다.
- partial payment / underpayment / ghosting이 visibility 없이 흘러간다.
- usage rights, quoted rate, repeat-brand history 같은 운영 맥락이 payment 회수와 분리된다.
- 첫 deal 단계에서는 invoice recipient, required fields, AP instructions, AP contact, PO number / vendor reference, payment terms 같은 기본 invoice workflow 정보도 정리되지 않는다.
- 어떤 경우엔 vendor onboarding / payment-system setup 상태조차 추적되지 않아, deal은 시작됐는데 payable 상태까지 가는 데만 몇 주가 날아간다.
- follow-up copy보다 **언제 follow-up해야 하는지**가 더 큰 문제다.
- follow-up은 그냥 reminder가 아니라 **day 3 / day 7 / day 30** 같은 cadence로 관리될 때 가치가 생긴다.
- 일부 freelancers는 **due date 일주일 전**이나 **전날**에 미리 reminder를 보내며, 이 pre-due habit도 제품화 가치가 있다.
- late fee, late-fee start rule, stop-work-until-paid, AP escalation 여부 같은 collection policy를 deal별로 기억해야 한다.
- Threads/X의 최신 신호처럼, 좋은 payment clause는 **payment due timing + late fee**를 upfront에 명시해야 한다. 즉 collection policy는 연체 후 메모가 아니라 deal setup 단계의 first-class field여야 한다.
- 이번 루프 Yahoo Japan Reddit 검색은 여기에 더해 **3일 이상 연체 시 1% compounded daily** 같은 매우 구체적인 late-fee policy 예시와, **payment terms + unpaid-invoice late fee는 계약에 미리 들어 있어야 한다**는 점을 다시 보여줬다. 제품은 이런 정책을 자유 텍스트가 아니라 structured rule로 저장해야 한다.
- project owner에게만 chase하면 안 되고 AP contact에도 같이 보내야 하는 경우가 많다.
- 이번 루프의 fresh indexed signal은 여기서 한 단계 더 나아가, **AP contact를 아는 것**과 **invoice를 어디로 보내야 하는지 아는 것**이 별개라는 점을 보여줬다. 즉 invoice destination과 follow-up target은 따로 저장해야 한다.
- 어떤 경우엔 invoice가 늦어서가 아니라 **AP가 처리/감사할 시간을 아직 못 받은 것**이 문제일 수 있어, invoice 제출 lead time 자체를 관리해야 한다.
- 이번 루프의 fresh creator snippet은 사용자가 **`my invoices are being submitted and processed correctly`**를 직접 걱정한다는 점도 보여줬다. 즉 제품은 `invoice sent`만이 아니라 **submitted → received → processing** 상태를 더 분명히 보여줘야 한다.
- 또 AP를 잘 통과하느냐는 **direct client가 내부 결제 프로세스를 얼마나 잘 아느냐**에도 좌우되므로, 제품은 단순 contact 저장을 넘어서 `internal champion quality`를 기억해야 한다.
- client가 `payment sent`라고 말해도 실제 입금 전에는 **payment documentation / receipt**를 다시 받아야 하는 경우가 있다. 즉 `paid claimed`와 `proof received`는 다른 상태다.
- 이번 루프에는 paid-invoice receipt artifact를 **`remittance advice`**라고 부르는 실무 용어도 확인됐다. 즉 proof는 단순 boolean이 아니라 artifact type까지 저장하는 편이 맞다.
- PO number나 vendor reference가 없으면 follow-up이 느려지고 책임이 흐려진다.
- 큰 조직/대행사 체인에서는 project owner 승인 뒤에도 recruiter/intermediary billing이 끼어, 실제 돈이 도는 경로를 별도로 기억해야 한다.
- invoice 자체도 professional template, payment terms, late-fee expectation, auto-reminder setup이 약하면 회수 확률이 떨어진다.
- late invoice는 bad client만의 문제가 아니라 **not properly booked**, **missed pay run**, **cash-flow timing** 같은 accounting-stage 상태일 수도 있다.
- 이번 루프 신호처럼, late payment의 일부는 **bad client**보다 **weak payment system / weak clause setup**에서 오므로 deal memory 이전에 payment-system hygiene가 필요하다.
- Threads 재테스트에서는 **late payment clause를 넣는 것이 follow-up reminder를 더 많이 보내는 것보다 cash flow에 더 효과적**이라는 보조 신호도 추가됐다. 즉 제품은 cadence 엔진만이 아니라 **payment clause strength 진단**을 함께 제공해야 한다.

## Strongest Wedge
`creator CRM`처럼 넓게 시작하지 말고, 초반 wedge는 아래로 고정한다.

> A creator collections command center for solo creators and small agencies that tracks deal stages, deliverables, payment terms, invoice readiness, AP contacts, PO/reference numbers, AP lead time, promised payment dates, and overdue follow-up before cash leaks.

즉 핵심은 discovery가 아니라:
- deal stage visibility
- deliverable due date와 invoice trigger 연결
- payment terms before work clarity
- invoice professionalism / readiness
- AP + project-owner routing memory
- PO / vendor reference memory
- pre-due reminder schedule
- invoice/payment status
- promised payment date log
- overdue follow-up queue
- partial / underpayment / ghosting 추적
- late fee / stop-work / escalation policy memory
- outstanding-balance blocks for future work
- usage rights / repeat brand memory
- invoice workflow readiness memory (recipient, required fields, portal/AP instructions)
- AP processing/audit lead-time memory and `invoice in advance by` guidance
- direct-client AP-navigation confidence / internal champion quality
- payment clause strength (`strong`, `partial`, `weak`, `missing`)와 missing clause fields 진단
- remittance proof artifact type (`receipt`, `remittance_advice`, `bank_proof`, `other`)
- vendor onboarding / payment-system setup stage visibility
- intermediary billing path memory (e.g. recruiter / agency / AP handoff)
- invoice booking / pay-run visibility when payment has been promised but not received

## MVP Boundary
### 포함
- post-agreement deal tracking
- deliverable due date / submission / approval tracking
- structured payment terms
- invoice/payment status
- promised payment date 기록
- overdue follow-up log
- manual WhatsApp / email / DM follow-up tracking
- overdue / unpaid / underpaid / ghosted view
- next action queue for collections
- quoted rate, usage rights, repeat-brand note 저장
- pre-due reminder tracking (e.g. 7 days before due date, 1 day before due date)
- default follow-up cadence tracking (e.g. day 3 / day 7 / day 30 after due date or promised payment date)
- longer re-nudge cadence tracking after the first overdue cycle (e.g. 2 weeks after last reminder when a client gives a soft response but money still has not landed)
- follow-up sequence recommendation
- late fee / stop-work / escalation policy tracking
- AP contact + project owner follow-up routing
- PO number / vendor reference tracking

### 제외
- lead gen / creator discovery CRM
- accounting suite
- e-signature
- deep inbox sync
- marketplace/network features
- contract generation first

## Pricing Hypothesis
- Solo: $29~79 / month
- Agency: $149~499 / month

## Main Risk
범용 CRM/Notion/시트와 비교될 때 가치가 흐려질 수 있으므로, 초반엔 `deal execution + collections visibility + follow-up sequencing` 중심 wedge가 중요하다. 또한 creator evidence는 강하지만, paid ICP는 solo/freelancer와 agency가 섞여 있어 초기 ICP를 더 좁게 검증해야 한다.

## What changed this loop
- `creator CRM`보다 `collections clarity`가 더 날카로운 wedge라는 점이 다시 확인됐다.
- automated reminder demand가 보였지만, 더 중요한 건 reminder copy보다 **timing logic**이라는 점이다.
- 이번 루프에는 그 timing logic이 더 구체화돼 **day 3 / day 7 / day 30** cadence 수준까지 보였다.
- `clear payment terms before work`가 invoice 이후 문제가 아니라 **사전 cash-risk control**이라는 점이 추가됐다.
- late payments뿐 아니라 **underpayments / ghosting**도 first-class 상태여야 한다.
- 일부 creators는 여전히 **WhatsApp message 수준의 invoicing**을 하고 있어 invoice readiness / professionalism gap도 entry pain으로 읽힌다.
- 이번 루프에는 **professional invoice template + net 30 + late fee + auto-reminders**가 실제 회수 속도를 높인다는 framing도 추가돼, invoice setup quality를 별도 wedge로 둘 근거가 생겼다.
- Yahoo Japan indexed X/Threads 결과는 creator pain의 뿌리를 **weak payment systems / solid payment clauses** 쪽으로도 밀어, CRM보다 payment-system clarity를 더 전면에 둘 이유를 보강했다.
- 이번 루프에는 Threads targeted query가 **2건 중 1건만 materially useful**했다는 점도 확인됐다. 즉 Threads는 방향성 보조 근거로는 쓸 수 있지만, 아직 discovery ranking을 바꿀 만큼 강하지 않다.
- 이번 루프의 최신 X evidence는 agency보다 solo/freelancer cash pain에 더 기울었다. 즉 entry wedge는 solo-first로 검증해도 된다.
- 이번 루프 Reddit `r/freelance` recoveries는 reminder copy보다 **pre-due reminder habit**, **late-fee rule**, **work-stop policy**, **AP-list delay reality**가 더 제품적인 운영 규칙임을 보여줬다.
- 이번 루프의 추가 Reddit recoveries는 **AP 담당자와 프로젝트 담당자 동시 라우팅**, **PO number/reference 기억**, **30일 이후 주간 late fee**, **미지급이면 신규 작업 중단**이 단순 노하우가 아니라 제품화 가능한 collections workflow라는 점을 더 강하게 보여줬다.
- 새 Yahoo Japan Reddit 결과는 여기에 더해 **계약 기반 late-fee rule** 자체를 더 구조적으로 다뤄야 한다는 점도 보강했다. 즉 제품은 `late fee 있음` 수준이 아니라 **trigger days / percentage or formula / compounding 여부 / contract-defined 여부**를 저장해야 한다.
- 여기에 더해 **vendor onboarding / payment-system setup delay**, **recruiter/intermediary billing chain**, **not properly booked / pay-run miss** 같은 accounting-stage blockage가 드러나, 제품이 `연체 후 메시지`만이 아니라 `돈이 시스템 어디에서 막혔는지`를 보여줘야 한다는 점이 선명해졌다.
- 이번 루프에는 추가로 **AP가 invoice를 처리·감사할 시간을 벌기 위해 미리 청구해야 한다**, **AP 네비게이션은 direct client가 내부 프로세스를 얼마나 잘 아느냐에 좌우된다**는 신호도 붙었다. 즉 초기 wedge는 단순 overdue queue가 아니라 **AP-ready lead time + internal champion quality + collections clarity**다.
- 이번 루프의 추가 indexed signal은 여기에 더해 **invoice destination vs AP follow-up target 분리**, **client-paid claim 뒤 remittance proof/receipt 회수**, **2주 뒤 재알림 같은 중기 re-nudge cadence**까지 보여줬다. 즉 제품은 `누구에게 언제 다시 물을지`뿐 아니라 `돈이 실제로 이동했다는 증거를 받았는지`까지 다뤄야 한다.
- 이번 루프에는 `invoice가 제대로 제출/처리되고 있는지`를 걱정하는 직접 문구가 추가돼, backup 아이디어의 상태 모델을 `sent vs paid`에서 **submission correctness / receipt / processing visibility**까지 확장해야 할 이유가 더 분명해졌다.

## Supporting Evidence
- Reddit / PullPush mirror: agencies still track negotiation, delivery, and payment status in spreadsheets or a Notion + email frankenstack
  - https://www.reddit.com/r/influencermarketing/comments/1rvi66q/how_are_agencies_actually_tracking_brand_deal/
- Reddit / PullPush mirror: creators ask how to track incoming brand inquiries, follow-ups, quoted rates, deliverables, usage rights, revenue totals, and repeat brands
  - https://www.reddit.com/r/PartneredYoutube/comments/1r3a35i/how_are_you_guys_organizing_sponsorships_and/
- Reddit / PullPush mirror: full-time UGC creators explicitly ask how to manage invoices and payment follow-ups
  - https://www.reddit.com/r/UGCcreators/comments/1rgfo0p/fulltime_ugc_creators_whats_your_backend_system/
- Reddit indexed snippet: first-time creators still ask basic sponsor invoicing workflow questions
  - https://www.reddit.com/r/PartneredYoutube/comments/rdh39k/first_brand_deal_wondering_how_to_invoice_the/
- Reddit indexed snippet: creators need concrete guidance on usage-rights pricing and duration, not just a note field
  - https://www.reddit.com/r/PartneredYoutube/comments/1d21p8k/is_there_a_formula_for_how_much_i_should_charge/
- Reddit indexed snippet: agency practice treats one year of usage rights as a material extra line item
  - https://www.reddit.com/r/PartneredYoutube/comments/1cf7d33/pricing_sponsorships_and_usage_rights/
- Reddit / PullPush mirror: brand payments often stretch to 30–90 days and require repeated follow-up
  - https://www.reddit.com/r/influencermarketing/comments/1pj7ztr/how_are_you_all_speeding_up_brand_payments_mine/
- Reddit indexed snippet: some freelancers explicitly route invoices to both the project owner and accounts payable contact
  - https://www.reddit.com/r/freelance/comments/o7k3tm/getting_a_client_to_pay_invoices_help_please/
- Reddit indexed snippet: if an accounting department exists, getting and reusing a PO number helps late-payment follow-up move faster
  - https://www.reddit.com/r/freelance/comments/ej4uqx/took_a_gig_that_pays_net_45_still_havent_been/
- Reddit indexed snippet: some freelancers pause new work until outstanding invoices are paid and add late-fee rules to the next contract
  - https://www.reddit.com/r/freelance/comments/10rbyln/my_client_has_a_habit_of_saying_hell_pay_me_today/
- Reddit comment recovery: vendor due diligence and payment-system setup alone can push payment back about six weeks
  - https://www.reddit.com/comments/kcepp/_/c2j51go
- Reddit comment recovery: large organizations may pay ~90 days out via recruiter/intermediary billing chains
  - https://www.reddit.com/comments/1d0g6pa/_/l5oc7sw
- Reddit comment recovery: creator sponsors commonly operate on net-30 / net-60, with some net-90 terms
  - https://www.reddit.com/comments/1jdqwng/_/mid9qmh
- Reddit comment recovery: unpaid invoices can slip because they were not properly booked or missed a pay run
  - https://www.reddit.com/comments/1kdav8k/_/mq9hw7v
- Reddit / Yahoo Japan indexed snippet: some companies need AP time to process and audit an invoice
  - https://www.reddit.com/r/freelance/comments/7147hb/is_there_any_logical_explanation_as_to_why_some/
- Reddit / Yahoo Japan indexed snippet: some freelancers invoice in advance so the payment can go through accounts payable
  - https://www.reddit.com/r/freelance/comments/35zcax/large_wellknown_client_waits_til_i_submit_an/
- Reddit / Yahoo Japan indexed snippet: AP navigation depends heavily on whether the direct client understands the internal process
  - https://www.reddit.com/r/freelance/comments/nlhe6e/is_it_fair_this_client_expects_me_to_continue/
- Reddit / Yahoo Japan indexed snippet: ask for an AP contact and separately confirm where invoices should be sent
  - https://www.reddit.com/r/freelance/comments/joq52k/client_hasnt_paid_me_after_files_were_sent/
- Reddit / Yahoo Japan indexed snippet: if a client says payment was sent, request documentation / receipt
  - https://www.reddit.com/r/freelance/comments/wps58g/client_says_they_paid_my_invoice_but_i_received/
- Reddit / Yahoo Japan indexed snippet: some freelancers explicitly schedule the next reminder two weeks later
  - https://www.reddit.com/r/freelance/comments/ivipfs/i_asked_a_client_about_some_unpaid_invoices_what/
- X indexed snippet: awkward late-payment chasing appears often enough to be productized, and the best recovered framing explicitly suggested day 3 / day 7 / day 30 sequence steps
  - https://x.com/Anubhavhing/status/2028627747158016340
- X indexed snippet: automated invoice reminders are being framed as their own product for freelancers and small service businesses
  - https://x.com/shubh19/status
- X indexed snippet: clear payment terms before work are framed as the main fix for late-payment losses
  - https://x.com/canusign/status
- X indexed snippet: late payments, underpayments, and ghosting creators is way too common
  - https://x.com/mahlaku_m/status/2036378849487749441
- X indexed snippet: freelancers still chase payments 30+ days after delivery and feel real stress
  - https://x.com/Indiepat2026/status
- X indexed snippet: creators still invoice through WhatsApp-like chat messages
  - https://x.com/Dominus_Kelvin/status/2029573666388996145
- X indexed snippet: a professional invoice with payment terms, late fees, and auto-reminders can materially speed collections
  - https://x.com/iRunDocs/status/2032562374872543349
- X browser-rendered indexed snippet: freelancers lose money because nobody followed up at the right time
  - https://x.com/ManojBuilds/status