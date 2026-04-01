# Creator Deal CRM

**Status**: Backup pick
**Updated**: 2026-04-01

## One-line Thesis
브랜드딜 CRM 전체를 하려는 게 아니라, 크리에이터와 소형 에이전시의 **deposit · invoice · overdue follow-up · payment recovery**를 닫아주는 creator collections ops tool.

## Why it stayed backup, not primary
이번 루프에서도 creator payment pain signal은 계속 강했다. 특히 WhatsApp invoicing, late payment, payment terms, deposit, overdue chasing이 반복됐다. 그래도 현재 레포는 VoC Repository 쪽 문서화와 실행 준비도가 더 앞서 있고, 이번 루프의 fresh signal도 SaaS churn/support decision layer 쪽이 더 강했으므로 지금은 `강한 backup`으로 유지한다.

## ICP
- 월 브랜드딜이 꾸준한 솔로 크리에이터
- 1~10명 크리에이터 에이전시
- 스프레드시트로 협찬/송장/입금을 관리 중인 팀
- 특히 cash flow stress가 큰 small agency / manager / operator

## Core Pain
- 브랜드딜 pipeline, deliverable, invoice, payment follow-up이 분산됨
- 미수금/지연입금/underpayment가 현금흐름 스트레스로 이어짐
- formal invoice 대신 WhatsApp/account number 수준으로 청구해 추적성과 회계 맥락이 약함
- payment terms가 길거나 모호해 follow-up 기준이 흔들린다
- 선금 없이 일부터 시작해 리스크가 커진다
- follow-up이 수작업이라 promise-to-pay와 actual payment가 계속 어긋난다

## Strongest Wedge
`creator CRM`처럼 넓게 시작하지 말고, 초반 wedge는 아래로 고정한다.

> A creator collections ops tool that helps creators and small agencies track deposits, invoices, payment terms, and overdue follow-up before cash leaks.

즉 핵심은 discovery가 아니라:
- deposit required / received 여부
- deliverable due date와 invoice trigger 연결
- invoice/payment status
- promise-to-pay 기록
- overdue follow-up sequence
- underpayment / partial payment 추적

## MVP Boundary
### 포함
- post-agreement deal tracking
- deliverable due date tracking
- structured payment terms
- deposit tracking
- invoice/payment status
- promised payment date log
- overdue follow-up log
- manual WhatsApp / email follow-up tracking
- overdue / unpaid / underpaid view
- next action queue for collections

### 제외
- lead gen / brand discovery CRM
- accounting suite
- e-signature
- deep email/calendar sync
- marketplace/network features
- contract workflow first

## Pricing Hypothesis
- Solo: $29~79 / month
- Agency: $149~499 / month

## Main Risk
범용 CRM/Notion/시트와 비교될 때 가치가 흐려질 수 있으므로, 초반엔 `collections + overdue recovery + payment terms visibility` 중심 wedge가 중요하다. 또한 social signal은 강하지만, 아직 paying ICP의 예산 허용치와 실제 회수 성과 검증은 부족하다.

## What changed this loop
- `creator CRM`보다 `payment recovery ops`가 더 날카로운 wedge라는 점이 다시 확인됐다.
- overdue뿐 아니라 **deposit / payment terms / promise-to-pay**가 first-class data여야 한다는 점이 더 또렷해졌다.
- WhatsApp이 단순 커뮤니케이션 채널이 아니라 실제 invoice / reminder / chasing workflow의 핵심 surface로 보였다.

## Supporting Evidence
- X indexed snippet: creators invoice clients with WhatsApp and an account number
  - https://x.com/Dominus_Kelvin/status/2029573666388996145
- X indexed snippet: AI that chases overdue invoices via WhatsApp for SMEs
  - https://x.com/polsia/status/2033895987073454226
- Reddit indexed snippet: payment terms on sponsored-content invoices are often 30/60/90 days
  - https://www.reddit.com/r/influencermarketing/comments/1amt7so/payment_terms_on_invoices_for_sponsored_content/
- Reddit indexed snippet: creators ask whether it is normal to request a deposit before doing a brand deal
  - https://www.reddit.com/r/PartneredYoutube/comments/ox8vm3/is_it_normal_to_ask_for_a_deposit_before_doing_a/
- Reddit indexed snippet: both brands and influencers still worry about what happens when one side does the work and the other side does not pay / deliver
  - https://www.reddit.com/r/influencermarketing/comments/j8smty/influencersbrands_how_do_you_handle_payments/
