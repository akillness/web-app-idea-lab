# Context: Social Web/App Ideas

## Workflow Context
이번 루프에서는 소셜 원문 접근성이 플랫폼별로 더 명확하게 갈렸다.

- **Reddit**: live page는 여전히 불안정했지만, PullPush mirror를 통해 실제 pain 문장이 있는 post들을 다수 회수했다.
- **X**: direct post opening은 막혔지만 Yahoo indexed snippet으로 반복되는 workflow pain을 계속 확인했다.
- **Threads**: 이번 루프도 focused query에서 의미 있는 결과를 거의 주지 못했다.

이번에 더 선명해진 핵심 흐름은 두 가지다.

1. **VoC 쪽 진짜 pain은 feedback 저장이 아니라 support / feature-request / churn evidence를 product decision ritual로 바꾸는 일**이다.
   - support는 고객 요청을 product/dev로 그대로 던지고,
   - PM은 conflicting request list를 안고,
   - churn feedback은 ARR / ICP / segment 맥락 없이 흩어진다.
   - 결국 월요일 아침마다 support ticket, Slack complaint, churn note를 손으로 읽고 우선순위를 추정한다.
2. **Creator 쪽 진짜 pain은 generic CRM이 아니라 deal execution과 cash collection 사이의 운영 공백**이다.
   - creators와 small teams는 여전히 spreadsheet + Notion + email + DM 조합으로 진행 상황을 기억하고,
   - deliverable 완료 후 payment follow-up이 늦어지며,
   - invoice/payment 상태와 promised date가 분리돼 cash-flow risk가 커진다.

즉 이번 루프는 기존 방향을 뒤집지 않았다. 대신 **Primary인 VoC Repository는 `support-to-product intake + churn segmentation + Monday review brief`로 더 또렷해졌고**, Backup인 Creator Deal CRM은 **`deal status + deliverable tracking + invoice/payment follow-up + collections visibility`**로 더 구체화됐다.

## Affected Users
| Role | Responsibility | Skill Level |
|------|----------------|-------------|
| 초기 B2B SaaS 창업자 | support / churn / interview 신호를 주간 제품 우선순위로 연결 | 중간~상 |
| PM / PMM | feature request, objection, churn reason을 맥락 있게 정리 | 중간~상 |
| Customer Success / Support 리드 | 반복 pain, escalations, inconsistent answers, churn warning 신호 수집 | 중간 |
| 솔로 크리에이터 | sponsorship / brand deal 진행상황과 invoice / payment follow-up 관리 | 중간 |
| 소형 크리에이터 에이전시 | 여러 creator deal의 deliverable, invoice, payment 상태 운영 | 중간~상 |

## Current Workarounds
1. support 요청과 feature request를 Jira/Slack/email에 흩뿌린 뒤 PM이 수동 정리한다.
2. churn feedback는 survey나 note로 남기지만 ARR / ICP / segment 기준으로 정규화하지 못한다.
3. 월요일 아침 회의 전에 support tickets, Slack complaints, churn notes를 사람이 직접 뒤진다.
4. enterprise feature commitment는 이메일이나 Productboard/Jira에 나뉘어 남아 추적이 깨진다.
5. creators와 small agencies는 deal / deliverable / invoice / payment 상태를 spreadsheet, Notion, email, DM으로 붙여서 관리한다.
6. overdue follow-up은 사람이 기억에 의존해 WhatsApp, 이메일, DM을 수동 발송한다.

## Adjacent Problems
- support 팀이 product intake를 대신하지만 dedupe / prioritization / evidence ranking이 없다.
- raw feature request list가 길어질수록 problem framing과 expected value가 사라진다.
- churn reason을 모아도 segment / ARR / lifecycle context가 없으면 잘못 해석하기 쉽다.
- creator deal은 `delivered`와 `paid` 사이에 큰 공백이 있는데 범용 CRM은 이 구간에 약하다.
- usage rights, promised payment date, partial payment 같은 creator 운영 필드는 범용 툴에서 주변화된다.
- Threads는 현재 조사 채널로서 반복 가치가 낮다.

## User Voices
> "Most SaaS founders know their churn rate but have no idea why customers actually leave ... the cancellation data is sitting right there — in surveys, support tickets, Stripe fields — and nobody reads it systematically." — X indexed snippet
- https://x.com/brianfofficial/status/2031850417718460521
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "PMs spend monday morning: reading last week's support tickets, skimming intercom, checking slack for complaints, opening salesforce for churn notes then guessing what to build..." — X indexed snippet
- https://x.com/valewnrt/status/2031470425675354199
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

> "support is constantly reaching out to developers" and forwarding every customer request, which creates roadmap noise. — Reddit / PullPush mirror
- https://www.reddit.com/r/ProductManagement/comments/1jrlxxe/challenge_with_our_customer_support_team/
- Source path: PullPush Reddit mirror recovery, accessed 2026-04-01
- Confidence: high

> "valuable insights were buried in support conversations" and there was no systematic extraction path. — Reddit / PullPush mirror
- https://www.reddit.com/r/CustomerSuccess/comments/1jkq1wt/how_were_using_ai_to_transform_customer_support/
- Source path: PullPush Reddit mirror recovery, accessed 2026-04-01
- Confidence: high

> "The very first step is understanding the reasons for churn ... Then segment feedback by ARR, growth potential, ICP." — Reddit / PullPush mirror
- https://www.reddit.com/r/CustomerSuccess/comments/13zqul2/best_way_to_minimize_churn_in_saas/
- Source path: PullPush Reddit mirror recovery, accessed 2026-04-01
- Confidence: high

> "tracked in jira ... a long list of various and sometimes conflicting solutions, and no focus on the problem" — Reddit / PullPush mirror
- https://www.reddit.com/r/ProductManagement/comments/y3pmqg/managing_and_tracking_customer_feature_request/
- Source path: PullPush Reddit mirror recovery, accessed 2026-04-01
- Confidence: high

> "most teams are still doing this in spreadsheets or some frankenstack of Notion + email" while tracking negotiation, delivery, and payment status across creators. — Reddit / PullPush mirror
- https://www.reddit.com/r/influencermarketing/comments/1rvi66q/how_are_agencies_actually_tracking_brand_deal/
- Source path: PullPush Reddit mirror recovery, accessed 2026-04-01
- Confidence: high

> "How do you manage invoices and payment follow-ups?" — Reddit / PullPush mirror
- https://www.reddit.com/r/UGCcreators/comments/1rgfo0p/fulltime_ugc_creators_whats_your_backend_system/
- Source path: PullPush Reddit mirror recovery, accessed 2026-04-01
- Confidence: high

> "most seem to sit in that 30 to 90 day window ... didn't pay until I followed up multiple times" — Reddit / PullPush mirror
- https://www.reddit.com/r/influencermarketing/comments/1pj7ztr/how_are_you_all_speeding_up_brand_payments_mine/
- Source path: PullPush Reddit mirror recovery, accessed 2026-04-01
- Confidence: high

> "It was a WhatsApp message ... That's not an invoice." — X indexed snippet
- https://x.com/Dominus_Kelvin/status/2029573666388996145
- Source path: Yahoo Search indexed snippet, accessed 2026-04-01
- Confidence: high

## Collection Caveat
- Reddit evidence는 이번 루프부터 **PullPush mirror 기반 회수**가 중심이다. live-page verification과 동일하지 않다.
- X evidence는 여전히 **Yahoo indexed snippet 기반**이다.
- Threads는 focused query 대비 회수 효율이 낮아 현재는 보조 채널 이하로 본다.
- 그래도 이번 루프는 `feedback repository`보다 **support-to-product/churn decision ritual**, `creator CRM`보다 **collections-aware deal ops**가 더 강한 wedge라는 점을 한 단계 더 명확하게 만들었다.
