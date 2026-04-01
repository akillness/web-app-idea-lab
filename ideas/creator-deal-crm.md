# Creator Deal CRM

**Status**: Backup pick
**Updated**: 2026-04-01

## One-line Thesis
브랜드딜 CRM 전체를 하려는 게 아니라, 크리에이터와 소형 에이전시의 **invoice · overdue follow-up · payment recovery**를 닫아주는 creator collections ops tool.

## Why it stayed backup, not primary
이번 루프에서도 social signal intensity는 강했다. 특히 late payments, underpayments, ghosting, WhatsApp invoicing pain이 더 분명해졌다. 그래도 현재 레포는 VoC Repository 쪽 문서화와 실행 준비도가 더 앞서 있으므로, 지금은 `강한 backup`으로 유지한다.

## ICP
- 월 브랜드딜이 꾸준한 솔로 크리에이터
- 1~10명 크리에이터 에이전시
- 스프레드시트로 협찬/송장/입금을 관리 중인 팀
- 특히 cash flow stress가 큰 small agency / manager / operator

## Core Pain
- 브랜드딜 pipeline, deliverable, invoice, payment follow-up이 분산됨
- 미수금/지연입금/underpayment가 현금흐름 스트레스로 이어짐
- formal invoice 대신 WhatsApp/account number 수준으로 청구해 추적성과 회계 맥락이 약함
- 수정요청, 업로드 일정, 리마인드가 체계적으로 관리되지 않음
- 브랜드 커뮤니케이션이 DM / 이메일 / 시트에 나뉘어 누락되기 쉽다
- 특히 invoice 발행과 late payment follow-up이 WhatsApp / 이메일 수작업에 의존한다

## Strongest Wedge
`creator CRM`처럼 넓게 시작하지 말고, 초반 wedge는 아래로 고정한다.

> A creator collections ops tool that helps creators and small agencies prevent late payments, track invoices, and run polite but persistent follow-up before cash leaks.

즉, 핵심은 discovery가 아니라:
- overdue invoice view
- deliverable due date와 invoice status 연결
- underpayment / partial payment 기록
- WhatsApp / 이메일 follow-up reminder log
- payment recovery workflow visibility

## MVP Boundary
### 포함
- deal stage tracking
- deliverable due date tracking
- invoice/payment status
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
범용 CRM/Notion/시트와 비교될 때 가치가 흐려질 수 있으므로, 초반엔 `collections + overdue recovery` 중심 wedge가 중요하다. 또한 social signal은 강하지만, 아직 paying ICP의 예산 허용치와 실제 회수 성과 검증은 부족하다.

## What changed this loop
- `creator CRM`보다 `payment recovery ops`가 더 날카로운 wedge라는 점이 강화됐다.
- creator pain은 단순 관리 불편보다 **돈을 늦게 받거나 못 받는 문제**에서 가장 강하게 드러났다.
- small creative agency workflow도 WhatsApp + spreadsheets 조합으로 계속 보였다.

## Supporting Evidence
- Reddit indexed snippet: creator가 brand emails 추적이 어려워 직접 creator CRM을 만듦
  - https://www.reddit.com/r/PartneredYoutube/comments/1qjw1po/built_a_tool_to_track_my_own_brand_deals_need/
- Reddit indexed snippet: managing brand interactions / payments / gifts / projects 문제 제기
  - https://www.reddit.com/r/influencermarketing/comments/17seflc/what_do_you_all_use_for_managing_brand/
- X indexed snippet: creators invoice clients with WhatsApp and an account number
  - https://x.com/Dominus_Kelvin/status/2029573666388996145
- X indexed snippet: late payments, underpayments, and ghosting creators is common
  - https://x.com/mahlaku_m/status/2036378849487749441
- X indexed snippet: small creative agency manages client projects over WhatsApp and spreadsheets
  - https://x.com/ZapsAndFlow/status/2033872545670123846
- X indexed snippet: brands / agencies still manage creator relationships in spreadsheets and DMs
  - https://x.com/polsia/status/2034926469835829637
  - https://x.com/polsia/status/2030280962647671102
