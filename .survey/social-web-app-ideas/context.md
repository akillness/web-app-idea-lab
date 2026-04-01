# Context: Social Web/App Ideas

## Workflow Context
이번 루프에서도 직접 플랫폼 원문 접근은 계속 제한됐다. 그래서 **Yahoo 검색 인덱스가 노출한 Reddit / X 결과 스니펫**을 근거 레이어로 사용했고, Threads는 별도 쿼리에서 여전히 의미 있는 회수에 실패했다.

이번에 더 선명해진 흐름은 두 가지다.

1. **초기 SaaS 팀의 진짜 pain은 feedback storage가 아니라 churn / support signal을 월요일 아침 의사결정으로 바꾸는 일**이다.
   - churn reason, cancellation survey, support tickets, Slack, call notes는 이미 존재한다.
   - 하지만 무엇이 악화됐고, 어느 세그먼트에 몰리고 있으며, 지금 무엇을 고쳐야 하는지를 한 번에 보지 못한다.
2. **크리에이터 운영 pain은 여전히 돈 회수 단계가 가장 날카롭다.**
   - broad CRM보다 `deposit → invoice → overdue follow-up → payment recovery`가 더 실제적이다.
   - WhatsApp, 이메일, 시트 기반 수작업이 계속 반복된다.

즉 이번 루프는 `generic AI summary`보다 **Monday-morning health/risk review**와 **collections workflow**가 더 유효한 wedge임을 보강했다.

## Affected Users
| Role | Responsibility | Skill Level |
|------|----------------|-------------|
| 초기 B2B SaaS 창업자 | churn/support/interview 신호를 제품 결정으로 연결 | 중간~상 |
| PM / PMM / CS 리드 | 반복 pain, cancellation reason, 세그먼트별 risk 정리 | 중간~상 |
| Support / RevOps 운영자 | 티켓·취소이유·헬스 신호를 주간 리뷰 자료로 정리 | 중간 |
| 솔로 크리에이터 | 선금, 인보이스, 입금 추적, 독촉 | 중간 |
| 소형 크리에이터 에이전시 | 다수 creator deal / deliverable / payment ops 관리 | 중간~상 |

## Current Workarounds
1. support tickets, churn notes, cancellation surveys를 LLM에 붙여넣고 ad-hoc summary만 본다.
2. cancellation reason은 Stripe/export에 남지만 주간 리뷰 artifact로 구조화하지 못한다.
3. 팀은 Slack, 문서, inbox를 뒤져 월요일 회의용 상태를 손으로 정리한다.
4. 크리에이터와 소형 에이전시는 deal / deliverable / deposit / invoice / payment 상태를 스프레드시트·DM·이메일·WhatsApp으로 이어 붙인다.
5. overdue follow-up은 WhatsApp / 이메일 수작업 리마인드에 의존한다.

## Adjacent Problems
- 피드백 저장은 쉬워졌지만 `무엇이 악화됐는지 / 어디에 몰렸는지 / 무엇을 먼저 고칠지` 합의 레이어는 약하다.
- churn reason은 있어도 benchmark/normalization context가 없으면 팀이 과잉반응하거나 무시한다.
- support workflow가 제품 워크플로와 분리되면 실제 현장 맥락이 끊긴다.
- creator payment ops는 감정노동과 cash-flow risk가 섞여 있어 late payment와 ghosting이 반복된다.
- Threads는 검색 인덱싱 품질이 약해 반복 조사 채널로는 계속 효율이 낮다.

## User Voices
> "Most SaaS founders know their churn rate but have no idea why customers actually leave ... the cancellation data is sitting right there — in surveys, support tickets, Stripe fields — and nobody reads it systematically." — X indexed snippet
- https://x.com/brianfofficial/status/2031850417718460521
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "Most SaaS founders have no idea if their churn rate is normal. Percentile fixes that. Connect Stripe, see where you rank against anonymized peers." — X indexed snippet
- https://x.com/polsia/status/2035027604550689279
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "Most founders attack growth backwards ... fix churn first." — X indexed snippet
- https://x.com/fbrsaas/status/2036449960581837060
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "The founder could open one view every Monday morning and see exactly what was healthy, what was at risk, and what needed immediate attention. No digging through Slack." — X indexed snippet
- https://x.com/_kamsyed/status/2033983166759793024
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "Add a simple form at cancellation button with just one field and ask for a reason.. this seems very simple but it’s treasure trove of insights to fix churn." — Reddit / r/SaaS indexed snippet
- https://www.reddit.com/r/SaaS/comments/1as7rr6/heres_a_mini_guide_to_reduce_churn_for_your_saas/
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: medium

> "I run a marketing automation platform and wanted something that allowed me to integrate the support experience directly into my customers workflow..." — Reddit / r/SaaS indexed snippet
- https://www.reddit.com/r/SaaS/comments/1by5znz/what_do_you_use_for_support_tickets/
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: medium

> "A creator sent me a screenshot of how they invoice their clients. It was a WhatsApp message ... That's not an invoice." — X indexed snippet
- https://x.com/Dominus_Kelvin/status/2029573666388996145
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "PayHerd. AI that chases overdue invoices via WhatsApp..." — X indexed snippet
- https://x.com/polsia/status/2033895987073454226
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "Payment terms on invoices for sponsored content ... how long do you normally have to wait? (30, 60 or 90 days seems to be quite common...)" — Reddit / r/influencermarketing indexed snippet
- https://www.reddit.com/r/influencermarketing/comments/1amt7so/payment_terms_on_invoices_for_sponsored_content/
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: medium

## Collection Caveat
- Reddit direct access: browser/curl 모두 여전히 불안정하거나 block.
- X / Threads direct reading: login/captcha/anti-bot 제한이 강함.
- 따라서 이번 문서는 **원문 전수 검증본이 아니라 search-indexed snippet 기반 관측본**이다.
- 그래도 이번 루프는 VoC 쪽에서 `feedback repository`가 아니라 **Monday-morning churn/support decision review**, Creator 쪽에서는 `generic CRM`이 아니라 **deposit / invoice / overdue recovery ops**가 더 강한 wedge라는 점을 추가로 보강했다.
