# Context: Social Web/App Ideas

## Workflow Context
이번 루프에서는 직접 플랫폼 원문 접근이 계속 막혀서, **검색엔진이 인덱싱한 Reddit / X / Threads 결과 스니펫**을 source-backed signal로 사용했다. 이번에 실제로 더 선명해진 pain은 두 갈래다.

1. **크리에이터 브랜드딜 운영은 여전히 스프레드시트·DM·이메일에 묶여 있다.**
2. **고객 피드백은 inbox와 티켓에 쌓이지만, 반복 패턴을 잡아 제품 의사결정으로 연결하기 어렵다.**

즉, 이번 루프는 `generic productivity`보다 `운영 파편화가 돈/의사결정 손실로 이어지는 좁은 workflow`가 더 강하다는 쪽으로 신호가 보강됐다.

## Affected Users
| Role | Responsibility | Skill Level |
|------|----------------|-------------|
| 솔로 크리에이터 | 브랜드딜 수주, 납기 관리, 인보이스, 입금 확인 | 중간 |
| 소형 크리에이터 에이전시 | 다수 크리에이터 deal pipeline, 커뮤니케이션, deliverable 추적 | 중간~상 |
| 초기 B2B SaaS 창업자 | 인터뷰/세일즈콜/지원티켓에서 반복 pain 추출 | 중간~상 |
| PM / PMM / CS 리드 | 고객 신호 정리, 우선순위, 메시지 수정 | 중간~상 |
| 소상공인/1인 운영자 | 여러 채널에서 들어오는 반복 문의와 고객 맥락 관리 | 낮음~중간 |

## Current Workarounds
1. 스프레드시트로 deal stage, 납기, 입금 상태를 수동 관리한다.
2. Gmail / DM / 캘린더 / Notion을 사람이 머리로 연결해서 운영한다.
3. support tickets, feedback emails, call notes를 inbox에 쌓아두고 LLM에 통째로 붙여넣어 패턴만 뽑는다.
4. 회의/고객대화 요약은 하되, action owner / due date / follow-up은 다시 수동으로 옮긴다.

## Adjacent Problems
- deal tracking 누락이 곧바로 미수금·납기 리스크로 이어진다.
- customer feedback는 모아도 `반복 패턴`과 `의사결정 근거`로 정제되지 않는다.
- AI 요약은 쉬워졌지만, 팀이 합의 가능한 evidence layer는 여전히 부족하다.
- 검색엔진 인덱싱 품질이 플랫폼마다 달라 Threads는 usable signal이 거의 안 잡힌다.

## User Voices
> "I run an outdoor channel ... got tired of losing track of brand emails. So I built myself a tool. It's basically a YouTube creator CRM..." — Reddit / r/PartneredYoutube search snippet
- https://www.reddit.com/r/PartneredYoutube/comments/1qjw1po/built_a_tool_to_track_my_own_brand_deals_need/
- Source path: Brave Search indexed snippet, accessed 2026-04-01

> "What do you all use for managing brand deals/payments ... managing payments, gifts, and projects for the brands" — Reddit / r/influencermarketing search snippet
- https://www.reddit.com/r/influencermarketing/comments/17seflc/what_do_you_all_use_for_managing_brand/
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01

> "Brands still manage creator relationships in spreadsheets." — X indexed snippet
- https://x.com/polsia/status/2034926469835829637
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01

> "Talent agencies run on spreadsheets and DMs. So I built Dealboard." — X indexed snippet
- https://x.com/polsia/status/2030280962647671102
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01

> "Cluster feedback into themes from support tickets/feedback emails and calculate frequency, JTBD, and workarounds." — X indexed snippet
- https://x.com/MillieMarconnni/status/2023363588099113093
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01

> "Creators invoice clients with WhatsApp and an account number, not formal invoices." — X indexed snippet
- https://x.com/Dominus_Kelvin/status/2029573666388996145
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01

> "SMEs bleed cash to late payments; AI chases overdue invoices." — X indexed snippet
- https://x.com/polsia/status/2033895987073454226
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01

## Collection Caveat
- Reddit direct access: browser/curl 모두 network policy block.
- X / Threads direct in-browser reading: login/captcha/anti-bot 제한이 강함.
- 따라서 이번 문서는 **원문 전수 검증본이 아니라 search-indexed snippet 기반 2차 관측본**이다.
- 다만 이전 루프의 `반복 pain 클러스터` 수준에서 한 단계 올라가, 이번에는 **구체 URL + 인덱싱 스니펫**까지 확보했다.
- 새 증거 기준으로는 VoC 쪽이 `theme/frequency/JTBD/workaround` 구조를 더 또렷하게 보여줬고, Creator Deal CRM 쪽은 `invoice/payment follow-up`이 가장 강한 money wedge로 보강됐다.
