# Solution Landscape: Social Web/App Ideas

## Solution List
| Name | Approach | Strengths | Weaknesses | Notes |
|------|----------|-----------|------------|-------|
| Voice-of-Customer Repository | support ticket / feature request / churn evidence를 `Monday-morning decision brief + commitment-risk review`로 바꾸는 evidence layer | 이번 루프의 fresh Reddit + X signal과 가장 직접적으로 맞물림 | repository처럼 보이면 약해지고, live integration 요구가 빨리 붙을 수 있음 | 이번 루프에서 `support-to-product intake`, `ARR/ICP churn segmentation`, `enterprise commitment tracking`, `Monday review` 신호가 강화됨 |
| Creator Deal CRM | creator/agency의 deal status·deliverable·invoice·payment follow-up·collections 상태를 묶는 ops tool | creator communities의 실제 workflow pain과 직접 연결 | vertical SaaS budget 저항, 범용 CRM/시트 비교 위험 | 이번 루프에서 `spreadsheet + Notion + email`, `30~90 day payments`, `invoice readiness`, `usage-rights ambiguity` 근거가 보강됨 |
| Churn Segmentation Copilot | churn reasons를 ARR / ICP / lifecycle 기준으로 정규화하는 분석 layer | VoC 내부의 고가치 sub-problem | 단독 제품이면 깊이가 부족할 수 있음 | standalone보다는 VoC의 module로 자연스러움 |
| Support-to-Product Intake Hub | support / CS 요청을 dedupe·contextualize·prioritize하는 intake layer | support chaos와 roadmap noise를 직접 겨냥 | standalone이면 PM tool/feedback tool과 경계가 겹침 | VoC primary의 핵심 wedge를 이루는 인접 레이어 |
| Creator Collections Assistant | overdue invoice, promised date, follow-up sequence에 특화된 회수 보조 툴 | pain가 매우 선명하고 ROI 설명이 쉬움 | 너무 좁으면 deal context가 빠질 수 있음 | Creator Deal CRM의 더 좁은 entry point로 적합 |

## Categories
### Evidence / retention intelligence
- Voice-of-Customer Repository
- Churn Segmentation Copilot
- Support-to-Product Intake Hub

### Revenue ops / creator collections
- Creator Deal CRM
- Creator Collections Assistant

## What People Actually Use
- SaaS 팀은 support와 feature request를 이미 많이 받지만, 여전히 Slack / Jira / email / docs로 흩어진 상태에서 수동 triage한다.
- churn feedback는 survey나 CS note로 남기되, ARR / ICP / lifecycle segment 기준으로 구조화하지 못한다.
- 심지어 churn을 읽더라도 `avoidable vs non-actionable` 구분 없이 한 덩어리로 보는 경우가 많다.
- PM은 월요일 아침 support tickets, churn notes, complaints를 다시 읽고 우선순위를 추정한다.
- enterprise 고객이 roadmap date를 압박하면 팀은 feature demand와 customer promise exposure를 한 backlog에서 동시에 감당한다.
- creators와 소형 에이전시는 여러 deal을 spreadsheet + Notion + email + DM 조합으로 운영한다.
- payment follow-up은 여전히 사람이 일정과 톤을 관리하며 반복 발송한다.
- first-time creator도 sponsor invoice workflow를 커뮤니티에 묻고, usage rights 가격도 deal-by-deal로 다시 계산한다.
- 즉 사람들이 원하는 것은 `AI summary`보다 **decision ritual artifact** 또는 **collections workflow queue + invoice/usage-rights memory**다.

## Frequency Ranking
1. Voice-of-Customer Repository
2. Creator Deal CRM
3. Support-to-Product Intake Hub
4. Creator Collections Assistant
5. Churn Segmentation Copilot

## Curated Sources
### Reddit / PullPush mirror recoveries
- https://www.reddit.com/r/ProductManagement/comments/1jrlxxe/challenge_with_our_customer_support_team/
- https://www.reddit.com/r/CustomerSuccess/comments/1jkq1wt/how_were_using_ai_to_transform_customer_support/
- https://www.reddit.com/r/CustomerSuccess/comments/13zqul2/best_way_to_minimize_churn_in_saas/
- https://www.reddit.com/r/ProductManagement/comments/y3pmqg/managing_and_tracking_customer_feature_request/
- https://www.reddit.com/r/ProductManagement/comments/1bhv13s/how_to_track_feature_requests_for_enterprise/
- https://www.reddit.com/r/influencermarketing/comments/1rvi66q/how_are_agencies_actually_tracking_brand_deal/
- https://www.reddit.com/r/influencermarketing/comments/1pj7ztr/how_are_you_all_speeding_up_brand_payments_mine/
- https://www.reddit.com/r/PartneredYoutube/comments/1r3a35i/how_are_you_guys_organizing_sponsorships_and/
- https://www.reddit.com/r/UGCcreators/comments/1rgfo0p/fulltime_ugc_creators_whats_your_backend_system/

### X / Yahoo indexed snippets
- https://x.com/brianfofficial/status/2031850417718460521
- https://x.com/valewnrt/status/2031470425675354199
- https://x.com/Dominus_Kelvin/status/2029573666388996145
- https://x.com/Anubhavhing/status/2028627747158016340
- https://x.com/toddsaunders/status/2025932667834015851
- https://x.com/dupayme/status/2028878071172915535

### Threads
- Direct usable signal still not recovered this loop; targeted `site:threads.net` queries again failed to add material net-new evidence.

## Key Gaps
- feedback tooling 시장에는 저장/요약 툴은 많지만, **support → product → weekly decision brief**를 한 줄로 닫아주는 레이어는 여전히 약하다.
- enterprise feature-request/commitment를 evidence-linked risk view로 다루는 툴 정의도 여전히 약하다.
- roadmap date pressure까지 포함한 `promise exposure` view는 더더욱 비어 있다.
- churn insight는 중요하지만 `why customers leave`와 `ARR/ICP/lifecycle context`를 같이 다루는 제품 정의가 드물다.
- 특히 `avoidable vs non-actionable churn`을 분리해 보여주는 decision layer는 거의 보이지 않는다.
- creator tooling은 많아 보여도 실제 사용자들은 여전히 deal progress와 payment follow-up을 시트/메일/DM으로 이어 붙인다.
- creator tooling은 usage rights·invoice recipient·AP instructions 같은 deal-memory 필드를 제대로 first-class로 다루지 못하는 경우가 많다.
- collections-only 툴은 있을 수 있지만 deliverable / deal context가 빠지면 creator workflow 전체 pain을 절반만 해결한다.
- Threads는 discovery channel로서 계속 효율이 낮다.

## Contradictions
- 사용자들은 feedback를 못 모으는 게 아니라 **product decision ritual로 못 바꾼다**.
- feature request 툴은 많지만 현장에서는 여전히 conflicting list와 ad-hoc forwarding이 반복된다.
- feature request 툴이 있어도 `already-promised commitment`와 `general demand`를 같은 backlog에 섞어 관리하는 문제가 남는다.
- churn advice는 많지만 실제 팀은 churn reasons를 segment 맥락으로 읽지 못하고, `good churn`까지 같은 알람으로 묶기 쉽다.
- creator CRM은 많지만 creators는 실제로 `누가 아직 안 냈는지`, `언제 follow-up할지`, `deliverable이 invoice를 막고 있는지`를 수동으로 본다.
- creator 툴은 탭을 늘리기 쉽지만, 사용자가 진짜 원하는 것은 더 많은 화면이 아니라 **돈이 언제 들어오는지 보이는 것**이다.
- creator CRM처럼 보여도 실제론 `invoice를 누구에게 어떤 포맷으로 보내야 하는지`, `usage rights 때문에 quote가 왜 달라졌는지`를 기억하지 못하는 경우가 많다.
- AI message generation은 쉬워도 payment follow-up sequence와 promised-date tracking은 여전히 비어 있다.

## Key Insight
이번 루프의 핵심은 **Primary와 Backup을 바꿀 만큼 새로운 1등 아이디어가 나온 것이 아니라, 두 아이디어의 entry wedge가 더 선명해졌다는 점**이다. Primary인 VoC Repository는 이제 `feedback repository`가 아니라 **support-to-product intake + churn segmentation + commitment-risk review + avoidable-vs-non-actionable churn labeling + Monday-morning decision brief**로 이해하는 편이 정확하고, Backup인 Creator Deal CRM은 `generic CRM`이 아니라 **deal execution + invoice workflow readiness + usage-rights memory + collections visibility + overdue follow-up queue**로 좁혀야 한다. Creator 쪽은 특히 `more tabs`가 아니라 `cash arrival visibility`가 가치의 핵심이라는 framing이 더 강해졌다.
