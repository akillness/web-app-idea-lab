# Solution Landscape: Social Web/App Ideas

## Solution List
| Name | Approach | Strengths | Weaknesses | Notes |
|------|----------|-----------|------------|-------|
| Voice-of-Customer Repository | churn/support/interview 데이터를 주간 decision brief로 변환하는 evidence layer | 팀 예산과 맞고, `decision problem`에 직접 대응 | generic feedback tool처럼 보이면 약해짐 | 이번 루프에서 `support/churn/NPS는 있는데 뭘 만들지 모르겠다`는 신호가 추가로 붙음 |
| Creator Deal CRM | creator/agency의 deliverable·invoice·payment follow-up 운영 툴 | 돈이 새는 순간을 직접 겨냥해 pain이 매우 선명 | solo creator budget과 범용 CRM 비교 저항 가능 | broad CRM보다 `collections + overdue recovery` wedge가 더 강하다는 점이 강화됨 |
| Meeting Decision Tracker | 회의 요약보다 결정·담당자·마감 추적에 집중 | summary tool 대비 차별점 선명 | PM/work-management 툴과 경계가 겹침 | 계속 유효하지만 이번 루프 증거는 약함 |
| SMB Unified Inbox | 리뷰/DM/문의 통합 인박스 | 매출/응답속도와 직결 | 채널 연동 복잡도 큼 | 보류 후보 |
| FAQ Support Copilot | 반복 문의 자동응답 + 정책 기반 응답 | 즉시 효율 개선 | knowledge base 품질 의존 | 보류 후보 |
| Content Attribution OS | 콘텐츠/채널별 전환 기여 추적 | founder-led growth와 연결 | 데이터 연결 난이도 높음 | 이번 루프 신호 약함 |

## Categories
### Revenue ops / workflow
- Creator Deal CRM
- SMB Unified Inbox
- FAQ Support Copilot

### Evidence / decision layer
- Voice-of-Customer Repository
- Meeting Decision Tracker

### Growth / analytics
- Content Attribution OS

## What People Actually Use
- 초기 SaaS 팀은 feedback를 이미 많이 모으지만, 여전히 LLM에 붙여넣는 ad-hoc 분석에 의존한다.
- 창업자는 churn rate는 보지만 churn reason synthesis는 체계적으로 하지 못한다.
- 크리에이터와 소형 에이전시는 여전히 시트, WhatsApp, DM, 이메일을 붙여서 invoice/payment를 운영한다.
- 즉, 사람들이 원하는 것은 `AI summary`가 아니라 **결정/회수까지 닫아주는 workflow**다.

## Frequency Ranking
1. Creator Deal CRM
2. Voice-of-Customer Repository
3. Meeting Decision Tracker
4. SMB Unified Inbox
5. FAQ Support Copilot
6. Content Attribution OS

## Curated Sources
### Reddit
- https://www.reddit.com/r/PartneredYoutube/comments/1qjw1po/built_a_tool_to_track_my_own_brand_deals_need/
- https://www.reddit.com/r/influencermarketing/comments/17seflc/what_do_you_all_use_for_managing_brand/

### X
- https://x.com/jeebz_a/status/2029969484459462989
- https://x.com/brianfofficial/status/2031850417718460521
- https://x.com/MillieMarconnni/status/2023363588099113093
- https://x.com/Dominus_Kelvin/status/2029573666388996145
- https://x.com/mahlaku_m/status/2036378849487749441
- https://x.com/ZapsAndFlow/status/2033872545670123846
- https://x.com/polsia/status/2034926469835829637
- https://x.com/polsia/status/2030280962647671102
- https://x.com/polsia/status/2033895987073454226

### Threads
- Direct usable signal still not recovered this loop; indexed results were mostly generic or low-context.

## Key Gaps
- creator revenue ops는 pain가 분명한데도 `deal → deliverable → invoice → collection`을 작고 빠르게 닫아주는 툴이 여전히 부족하다.
- feedback synthesis 시장에는 요약 툴은 많지만, 팀이 신뢰할 수 있는 `why customers leave / what to build next` decision layer는 비어 있다.
- social signal 수집 자체도 플랫폼 품질 차이가 커서 Threads는 반복 조사 효율이 낮다.

## Contradictions
- 사용자들은 feedback를 모으지 못하는 게 아니라, 그걸 읽고 결정으로 바꾸지 못한다.
- CRM은 많지만 creator/agency는 실제로 여전히 spreadsheets와 WhatsApp를 쓴다.
- AI summary는 흔하지만, source-linked recommendation과 payment recovery workflow는 드물다.

## Key Insight
이번 루프의 핵심은 **사회적 pain intensity만 보면 Creator Deal CRM이 여전히 강하지만, VoC Repository는 `feedback repository`가 아니라 `weekly churn + support decision brief`로 재정의되면서 훨씬 더 날카로워졌다는 점**이다. 그래서 현재 최적 전략은 `VoC primary 유지 + Creator Deal CRM을 collections/payment-recovery backup으로 문서화해 비교 가능 상태까지 끌어올리기`다.
