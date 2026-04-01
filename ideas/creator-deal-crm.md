# Creator Deal CRM

**Status**: Backup pick
**Updated**: 2026-04-01

## One-line Thesis
브랜드딜 CRM 전체를 하려는 게 아니라, 크리에이터와 소형 에이전시의 **deal status · deliverable · invoice readiness · payment terms · promised payment date · follow-up timing · collections visibility**를 닫아주는 creator cash-ops tool.

## Why it stayed backup, not primary
이번 루프에서도 creator payment / workflow pain은 여전히 강했다. 특히 `late payment`, `underpayment`, `ghosting`, `awkward chasing`, `automated reminders`, `clear payment terms before work` 같은 framing이 더 추가됐다. 다만 fresh evidence의 무게중심은 agency-wide CRM보다는 **freelancer / solo creator collections pain** 쪽에 더 가까웠고, 현재 레포의 문서화와 구현 준비도는 VoC 쪽이 더 앞서 있다. 그래서 지금은 **강한 backup**으로 유지한다.

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
- 첫 deal 단계에서는 invoice recipient, required fields, AP instructions, payment terms 같은 기본 invoice workflow 정보도 정리되지 않는다.
- follow-up copy보다 **언제 follow-up해야 하는지**가 더 큰 문제다.

## Strongest Wedge
`creator CRM`처럼 넓게 시작하지 말고, 초반 wedge는 아래로 고정한다.

> A creator deal ops tool that helps creators and small agencies track deal stages, deliverables, payment terms, invoice readiness, promised payment dates, and overdue follow-up before cash leaks.

즉 핵심은 discovery가 아니라:
- deal stage visibility
- deliverable due date와 invoice trigger 연결
- payment terms before work clarity
- invoice/payment status
- promised payment date log
- overdue follow-up queue
- partial / underpayment / ghosting 추적
- usage rights / repeat brand memory
- invoice workflow readiness memory (recipient, required fields, portal/AP instructions)

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
- follow-up sequence recommendation

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
- `clear payment terms before work`가 invoice 이후 문제가 아니라 **사전 cash-risk control**이라는 점이 추가됐다.
- late payments뿐 아니라 **underpayments / ghosting**도 first-class 상태여야 한다.
- 이번 루프의 최신 X evidence는 agency보다 solo/freelancer cash pain에 더 기울었다. 즉 entry wedge는 solo-first로 검증해도 된다.

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
- X indexed snippet: awkward late-payment chasing appears often enough to be productized
  - https://x.com/Anubhavi/status
- X indexed snippet: automated invoice reminders are being framed as their own product for freelancers and small service businesses
  - https://x.com/shubh19/status
- X indexed snippet: clear payment terms before work are framed as the main fix for late-payment losses
  - https://x.com/canusign/status
- X indexed snippet: late payments, underpayments, and ghosting creators is way too common
  - https://x.com/mahlaku_m/status
- X indexed snippet: freelancers still chase payments 30+ days after delivery and feel real stress
  - https://x.com/Indiepat2026/status
- X indexed snippet: creators still invoice through WhatsApp-like chat messages
  - https://x.com/Dominus_Kelvin/status/2029573666388996145
- X browser-rendered indexed snippet: freelancers lose money because nobody followed up at the right time
  - https://x.com/ManojBuilds/status
