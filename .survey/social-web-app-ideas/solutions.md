# Solution Landscape: Social Web/App Ideas

## Solution List
| Name | Approach | Strengths | Weaknesses | Notes |
|------|----------|-----------|------------|-------|
| Voice-of-Customer Repository | 인터뷰/세일즈콜/지원티켓을 구조화해 recurring signal과 decision brief 생성 | B2B team budget, decision wedge 명확 | generic AI notes와 혼동 위험 | 이번 루프에서 feedback inbox → pattern extraction 신호 보강 |
| Creator Deal CRM | 브랜드딜·deliverable·invoice·payment follow-up 운영 툴 | pain가 아주 구체적이고 money leak와 직결 | solo creator 예산과 CRM 비교 저항 가능 | 이번 루프 기준 social signal 가장 강함 |
| Meeting Decision Tracker | 회의 요약보다 결정·담당자·마감 추적에 집중 | summary tool 대비 차별점 선명 | PM tool과 경계 겹침 | 여전히 유효하나 이번 루프 신호는 약함 |
| SMB Unified Inbox | 리뷰/DM/예약/문의 통합 인박스 | 매출 보존 가치 직접적 | 채널 연동 복잡 | 보류 후보 |
| FAQ Support Copilot | 반복 문의 자동응답 + 정책 기반 응답 | 즉시 효율 개선 | knowledge base 품질 의존 | 보류 후보 |
| Content Attribution OS | 콘텐츠/채널별 전환 기여 추적 | founder-led growth와 연결 | 구현 난이도 높음 | 이번 루프 신호 약함 |

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
- 크리에이터와 에이전시는 여전히 시트, DM, 이메일, 캘린더를 붙여서 운영한다.
- 초기 SaaS 팀은 support tickets / feedback emails / call notes를 LLM에 붙여넣어 패턴을 찾지만, 정규 저장소나 팀 합의 레이어는 약하다.
- 즉, 사람들은 이미 AI를 쓰고 있지만 **AI-native workflow product**가 아니라 **ad-hoc manual workflow**로 쓰고 있다.

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
- https://x.com/polsia/status/2034926469835829637
- https://x.com/polsia/status/2030280962647671102
- https://x.com/MillieMarconnni/status/2023363588099113093

### Threads
- Direct usable signal not recovered this loop; indexed results were mostly low-context generic entries.

## Key Gaps
- creator revenue ops는 pain이 선명한데 `deal → deliverable → invoice → payment`를 가볍게 닫아주는 툴이 여전히 드물다.
- feedback synthesis는 가능해졌지만, 팀이 신뢰할 수 있는 `evidence-backed decision brief` 계층은 비어 있다.
- Threads는 검색 인덱싱 품질이 약해 빠른 루프 조사 대상으로는 효율이 낮다.

## Contradictions
- AI 요약은 흔하지만, 사용자가 실제로 원하는 것은 `pattern + action + evidence`다.
- CRM은 많지만 creator/agency는 여전히 spreadsheets와 DMs를 쓴다.
- 피드백은 넘치지만 product/team 의사결정 체계로 연결되는 저장소는 부족하다.

## Key Insight
이번 루프의 핵심은 **primary/backup 구도가 유지되더라도 social signal intensity는 Creator Deal CRM 쪽이 더 강했다**는 점이다. 다만 레포의 실행 준비도와 팀 예산형 wedge는 아직 Voice-of-Customer Repository가 앞서므로, 현재 최적 전략은 `VoC primary 유지 + Creator Deal CRM을 강한 대안으로 계속 압박`하는 것이다.
