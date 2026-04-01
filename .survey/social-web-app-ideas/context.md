# Context: Social Web/App Ideas

## Workflow Context
이번 루프에서도 직접 플랫폼 원문 접근은 계속 막혔다. 그래서 **Yahoo 검색 인덱스가 노출한 Reddit / X / Threads 결과 스니펫**을 근거 레이어로 사용했다. 이번에 더 또렷해진 흐름은 두 가지다.

1. **초기 SaaS 팀은 피드백 수집보다 의사결정 변환에서 막힌다.**
   - support tickets, churn survey, NPS, cancellation notes, call notes는 이미 있지만
   - 어떤 패턴을 우선순위로 올려야 하는지 체계적으로 읽지 못한다.
2. **크리에이터 운영 pain은 여전히 돈 회수 단계에서 가장 선명하다.**
   - deal 관리 자체보다 `invoice → follow-up → overdue recovery`가 더 날카로운 wedge로 보였다.

즉, 이번 루프는 `generic AI summary`보다 **돈이 새는 운영 루프**와 **결정이 막히는 증거 루프**가 더 유망하다는 쪽으로 신호를 보강했다.

## Affected Users
| Role | Responsibility | Skill Level |
|------|----------------|-------------|
| 초기 B2B SaaS 창업자 | churn/support/interview 신호를 제품 결정으로 연결 | 중간~상 |
| PM / PMM / CS 리드 | 반복 pain, objection, segment 차이, why-now 정리 | 중간~상 |
| 솔로 크리에이터 | 브랜드딜 납기, 인보이스, 입금 추적, 독촉 | 중간 |
| 소형 크리에이터 에이전시 | 다수 creator deal / deliverable / payment ops 관리 | 중간~상 |
| 소형 크리에이티브 에이전시 | 프로젝트·파일·인보이스를 WhatsApp/시트에서 운영 | 중간 |

## Current Workarounds
1. support tickets, feedback emails, churn notes를 LLM에 통째로 붙여넣고 ad-hoc summary만 뽑는다.
2. cancellation reasons와 support pain은 Stripe/export/CS inbox에 쌓아두고 사람이 회의 직전에 수동 정리한다.
3. 크리에이터와 소형 에이전시는 deal stage, deliverable, invoice, payment 상태를 스프레드시트·DM·이메일로 이어 붙인다.
4. overdue follow-up은 WhatsApp / 이메일 수작업 리마인드에 의존한다.

## Adjacent Problems
- 피드백 저장은 쉬워졌지만 `theme + frequency + segment + evidence` 합의 레이어는 약하다.
- churn data를 읽지 못하면 retention/product/message 수정 모두 늦어진다.
- creator payment ops는 감정노동이 섞여 있어 늦은 입금과 ghosting이 반복된다.
- Threads는 검색 인덱싱 품질이 약해 빠른 증거 수집 채널로는 아직 효율이 낮다.

## User Voices
> "Most founders don't have a feedback problem. They have a decision problem ... users are telling you things every day through support tickets, churn, NPS scores, session replays ..." — X indexed snippet
- https://x.com/jeebz_a/status/2029969484459462989
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "Most SaaS founders know their churn rate but have no idea why customers actually leave ... the cancellation data is sitting right there — in surveys, support tickets, Stripe fields — and nobody reads it systematically." — X indexed snippet
- https://x.com/brianfofficial/status/2031850417718460521
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "Cluster feedback into themes ... calculate how many customers mentioned it, what's the JTBD, what are they using as a workaround right now." — X indexed snippet
- https://x.com/MillieMarconnni/status/2023363588099113093
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "I got tired of losing track of brand emails. So I built myself a tool. It's basically a YouTube creator CRM..." — Reddit / r/PartneredYoutube indexed snippet
- https://www.reddit.com/r/PartneredYoutube/comments/1qjw1po/built_a_tool_to_track_my_own_brand_deals_need/
- Source path: Brave Search indexed snippet from prior loop, retained as prior evidence
- Confidence: medium

> "What do you all use for managing brand deals/payments ... managing payments, gifts, and projects for the brands" — Reddit / r/influencermarketing indexed snippet
- https://www.reddit.com/r/influencermarketing/comments/17seflc/what_do_you_all_use_for_managing_brand/
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "A creator sent me a screenshot of how they invoice their clients. It was a WhatsApp message ... That's not an invoice." — X indexed snippet
- https://x.com/Dominus_Kelvin/status/2029573666388996145
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "Late payments, underpayments, and ghosting creators is way too common." — X indexed snippet
- https://x.com/mahlaku_m/status/2036378849487749441
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "A small creative agency [is] managing client projects over WhatsApp and spreadsheets." — X indexed snippet
- https://x.com/ZapsAndFlow/status/2033872545670123846
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

## Collection Caveat
- Reddit direct access: browser/curl 모두 network policy block.
- X / Threads direct in-browser reading: login/captcha/anti-bot 제한이 강함.
- 따라서 이번 문서는 **원문 전수 검증본이 아니라 search-indexed snippet 기반 관측본**이다.
- 그래도 이번 루프는 VoC 쪽에서 `feedback storage`가 아니라 `decision problem`이라는 언어가 새로 보강됐고,
  Creator 쪽에서는 `generic CRM`이 아니라 `invoice / overdue recovery`가 더 강한 wedge로 좁혀졌다.
