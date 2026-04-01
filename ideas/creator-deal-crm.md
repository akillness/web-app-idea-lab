# Creator Deal CRM

**Status**: Backup pick
**Updated**: 2026-04-01

## One-line Thesis
브랜드딜을 따오는 CRM이 아니라, 콘텐츠 납품부터 입금까지 놓치지 않게 해주는 **creator revenue ops tool**.

## Why it stayed backup, not primary
이번 루프에서 social signal intensity는 오히려 이 아이디어가 더 강했다. 다만 현재 레포는 VoC Repository 쪽 문서화와 실행 준비도가 더 앞서 있어, 지금은 `강한 backup`으로 유지한다.

## ICP
- 월 브랜드딜이 꾸준한 솔로 크리에이터
- 1~10명 크리에이터 에이전시
- 스프레드시트로 협찬/송장/입금을 관리 중인 팀
- 특히 cash flow stress가 큰 small agency / manager / operator

## Core Pain
- 브랜드딜 pipeline, deliverable, invoice, payment follow-up이 분산됨
- 미수금/지연입금이 현금흐름 스트레스로 이어짐
- 수정요청, 업로드 일정, 리마인드가 체계적으로 관리되지 않음
- 브랜드 커뮤니케이션이 DM / 이메일 / 시트에 나뉘어 누락되기 쉽다

## Strongest Wedge
`creator CRM`처럼 넓게 시작하지 말고, 초반 wedge는 아래로 고정한다.

> 크리에이터와 소형 에이전시가 브랜드딜에서 돈 새는 순간을 막는 운영 툴.

즉, 핵심은 discovery가 아니라:
- 미수금 추적
- deliverable due date
- follow-up reminder
- payment status visibility

## MVP Boundary
### 포함
- deal stage tracking
- deliverable due date tracking
- invoice/payment status
- reminder templates
- overdue / unpaid view

### 제외
- accounting suite
- e-signature
- deep email/calendar sync
- marketplace/network features

## Pricing Hypothesis
- Solo: $29~79 / month
- Agency: $149~499 / month

## Main Risk
범용 CRM/Notion/시트와 비교될 때 가치가 흐려질 수 있으므로, 초반엔 `미수금/팔로업` 중심 wedge가 중요하다. 또한 social signal은 강하지만, 아직 원문 전수 검증과 paying ICP 검증은 부족하다.

## Supporting Evidence
- Reddit indexed snippet: creator가 brand emails 추적이 어려워 직접 creator CRM을 만듦
  - https://www.reddit.com/r/PartneredYoutube/comments/1qjw1po/built_a_tool_to_track_my_own_brand_deals_need/
- Reddit indexed snippet: managing brand interactions / payments / gifts / projects 문제 제기
  - https://www.reddit.com/r/influencermarketing/comments/17seflc/what_do_you_all_use_for_managing_brand/
- X indexed snippet: brands still manage creator relationships in spreadsheets
  - https://x.com/polsia/status/2034926469835829637
- X indexed snippet: talent agencies run on spreadsheets and DMs
  - https://x.com/polsia/status/2030280962647671102
