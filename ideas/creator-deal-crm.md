# Creator Deal CRM

**Status**: Backup pick
**Updated**: 2026-04-01

## One-line Thesis
브랜드딜 CRM 전체를 하려는 게 아니라, 크리에이터와 소형 에이전시의 **deal status · deliverable · invoice · payment follow-up · collections visibility**를 닫아주는 creator ops tool.

## Why it stayed backup, not primary
이번 루프에서도 creator payment / workflow pain은 여전히 강했다. 특히 `spreadsheet + Notion + email`, `30~90 day payment window`, `follow-up fatigue`, `delivered but not paid`, `How do you manage invoices and payment follow-ups?` 같은 문장이 반복됐다. 여기에 이번 루프에서는 **"Freelancers don’t need more tabs. They need money to show up"** 라는 framing까지 추가돼, 사용자가 원하는 가치가 generic CRM breadth가 아니라 **cash-arrival visibility**라는 점이 더 분명해졌다. 다만 현재 레포의 문서화와 구현 준비도는 VoC 쪽이 더 앞서 있고, fresh evidence도 이번에는 support/churn/commitment decision ritual 쪽이 더 넓고 깊었다. 그래서 지금은 **강한 backup**으로 유지한다.

## ICP
- 월 브랜드딜이 꾸준한 솔로 크리에이터
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
- 첫 deal 단계에서는 invoice recipient, required fields, AP instructions 같은 invoice workflow 정보도 정리되지 않는다.
- usage rights 가격과 기간 조건이 deal memory에 남지 않아 매번 비슷한 협상을 다시 한다.

## Strongest Wedge
`creator CRM`처럼 넓게 시작하지 말고, 초반 wedge는 아래로 고정한다.

> A creator deal ops tool that helps creators and small agencies track deal stages, deliverables, invoices, promised payment dates, and overdue follow-up before cash leaks.

즉 핵심은 discovery가 아니라:
- deal stage visibility
- deliverable due date와 invoice trigger 연결
- invoice/payment status
- promised payment date log
- overdue follow-up queue
- partial / underpayment 추적
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
- overdue / unpaid / underpaid view
- next action queue for collections
- quoted rate, usage rights, repeat-brand note 저장

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
범용 CRM/Notion/시트와 비교될 때 가치가 흐려질 수 있으므로, 초반엔 `deal execution + collections visibility + follow-up sequencing` 중심 wedge가 중요하다. 또한 social signal은 강하지만, paid ICP의 예산 허용치와 실제 회수 성과 검증은 더 필요하다.

## What changed this loop
- `creator CRM`보다 `deal ops + collections visibility`가 더 날카로운 wedge라는 점이 다시 확인됐다.
- overdue만이 아니라 **deal stage / deliverable / promised payment date / follow-up queue**가 first-class data여야 한다.
- creators와 agencies가 실제로 원하는 필드 목록이 더 명확해졌다: incoming inquiries, quoted rate, deliverables, usage rights, revenue totals, repeat brands, payment follow-up.
- UI breadth보다 `이번 주 돈이 어디서 막히는지`가 먼저 보여야 한다. 즉 dashboard보다 **cash-arrival visibility**가 우선 가치다.
- cash-flow pain은 invoice 발행 자체보다 **누가 아직 안 냈는지, 언제 다시 독촉해야 하는지, 무엇이 payment를 막는지**에 더 가깝다.
- 하지만 이번 루프는 invoice 발행 전 단계의 readiness도 중요하다는 점을 추가로 보여줬다: first-time creators는 sponsor invoice workflow 자체를 묻고 시작한다.
- usage rights는 단순 메모 필드가 아니라 **quote variance를 설명하는 pricing memory** 역할까지 해야 한다.

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
- X indexed snippet: creators still invoice through WhatsApp-like chat messages
  - https://x.com/Dominus_Kelvin/status/2029573666388996145
- X indexed snippet: invoice chasing / late payment follow-up is explicit enough to become its own product wedge
  - https://x.com/Anubhavhing/status/2028627747158016340
- X indexed snippet: freelancers do not want more tabs; they want money to show up, which reinforces collections visibility over generic CRM breadth
  - https://x.com/MilesCraftDev/status
