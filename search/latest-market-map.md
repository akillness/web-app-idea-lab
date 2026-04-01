# Latest Market Map

**Updated**: 2026-04-02

## 목적
이 문서는 이번 루프에서 다시 확인한 최신 검색/시장 신호만 반영해, 지금 유지할 아이디어 순위와 이유를 짧게 고정하는 최신 요약본이다.

## 이번 루프에서 다시 확인한 신호
### 1) Primary 쪽 신호
- **Productboard 직접 소스**: `Building Product Roadmaps Around Customer Insights`는 customer insights를 제품 계획과 로드맵에 반영해야 business outcomes로 이어진다고 직접 설명한다. 즉 feedback 저장 자체보다 **planning/roadmap translation**이 핵심 문제라는 점을 다시 확인했다.  
  - https://www.productboard.com/blog/5-benefits-of-building-product-roadmaps-around-customer-insights/
- **UserJot 비교 글 직접 소스**: 현재 페이지 제목이 `Top 8 Feedback Tools for B2B SaaS in 2026`로 노출되고, 설명문에 `CRM integrations`, `revenue-based prioritization`, `enterprise features`가 직접 들어간다. 즉 팀은 단순 suggestion box가 아니라 **account context + revenue weighting**을 원한다.  
  - https://userjot.com/blog/top-8-feedback-tools-b2b-saas-2025
- **Yahoo Japan indexed snippet (browser-rendered)**: `r/ProductManagement` 검색 결과에서 `If you use a roadmap without specific timelines...` 글은 2025-02-26 기준으로 "Okay, but WHEN is later?" 질문이 반복된다고 보여준다. 또 다른 2025-01-03 결과는 `now/next/later`의 핵심을 "near-term commitments only"로 설명한다. 즉 `now/next/later`는 널리 쓰이지만 **ambiguity-closing + commitment-window control**이 여전히 비어 있다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com+product+management+now+next+later+when+is+later+roadmap+customer+commitments
- **Yahoo Japan indexed snippet (browser-rendered)**: 별도 검색 결과에서는 `Pendo roadmap tool`로 외부용 high-level roadmap을 보여주고 `Canny` 또는 `Productboard(or Notion) + JIRA` 조합으로 내부 상세를 관리하는 패턴이 보인다. 즉 실제 운영은 여전히 **multi-tool split workflow**다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com+Pendo+roadmap+Canny+internal+detailed+roadmap+product+management

### 2) Backup 쪽 신호
- **Yahoo Japan indexed snippet (browser-rendered)**: `r/smallbusiness`, `r/freelanceWriters`, `r/Bookkeeping`, `r/agency` 검색 결과에서 `vendor status`, `payment terms`, `firm final reminder`, `small discount/payment plan`, `late fees` 같은 회수 운영 언어가 반복된다. 즉 문제는 generic CRM보다 **collections operations** 쪽이 더 선명하다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com+freelancer+late+payment+accounts+payable+invoice+ghosting
- **Yahoo Japan indexed snippet (browser-rendered)**: `accounts payable process and audit your invoice` 검색 결과에서 `gives accounts payable time to process and audit your invoice`, `manual AP process`, `payment run option`이 노출된다. 즉 지연 원인은 단순 미지급이 아니라 **AP review / pay-run / routing blockage**인 경우가 많다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com+accounts+payable+process+and+audit+your+invoice+freelancer
- **Yahoo Japan indexed snippet (browser-rendered)**: `r/influencermarketing` 결과는 `invoice sent → payment received → payout scheduled` 같은 월간 체크리스트 언어를 보여주고, 같은 결과 페이지의 2026-03-19 `Chasr` 포스트는 `reminders fire on schedule` 식의 자동 chasing tool을 드러낸다. 즉 creator-side에서도 이미 **reminder automation 자체는 존재**하고, 더 빈 곳은 `현재 blockage와 다음 조치`를 한 화면에서 보는 레이어다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com+influencermarketing+invoice+sent+payment+received+payout+scheduled

## 핵심 결론
### 1) Primary: Voice-of-Customer Repository
가장 강한 신호는 여전히 B2B SaaS 팀이 feedback 저장 문제보다 **decision translation + commitment-safe communication 문제**를 겪고 있다는 점이다.

이번 루프에서 더 선명해진 포인트:
- 팀은 customer insight를 roadmap에 반영하려고 하지만, 실제 운영은 Productboard/Notion/JIRA/Pendo/Canny처럼 여러 도구로 갈라진다.
- revenue-based prioritization 요구가 분명하다.
- `now/next/later`는 널리 쓰이지만, 여전히 `when is later?`를 닫아줄 설명 레이어가 부족하다.
- 따라서 strongest wedge는 "feedback repository"가 아니라 **weekly decision brief + commitment-safe update draft**다.
- 특히 update draft는 `near-term commitments only` 규칙을 제품 안에서 강제하는 방향이 더 맞다.

왜 여전히 1위인가:
- pain이 팀 운영 레이어에 걸쳐 있다.
- ICP가 10~100명 B2B SaaS 팀으로 비교적 선명하다.
- 출력물이 분명하다: weekly brief, risk summary, safe external update.
- account/revenue weighting까지 연결돼 가격 논리가 자연스럽다.

### 2) Backup: Creator Deal CRM
creator/agency 쪽 pain도 계속 강하다. 다만 broad CRM이 아니라 **collections visibility + AP routing + payment-stage checklist**가 entry wedge라는 점이 더 분명해졌다.

이번 루프에서 더 선명해진 포인트:
- 지연은 단순 ghosting만이 아니라 vendor setup, AP audit, pay-run miss, invoice destination 오류처럼 운영 단계에서 많이 발생한다.
- 사람들은 follow-up 문구보다 `지금 누구에게 무엇을 보내야 하는지`와 `현재 어디서 막혔는지`를 더 필요로 한다.
- invoice sent → payment received → payout scheduled 같은 checklist형 workflow가 실제 행동 언어에 가깝다.
- reminder automation 자체는 이미 보이므로, strongest wedge는 `자동 독촉`이 아니라 **routing/blockage visibility + next-step clarity**다.

왜 아직 2위인가:
- pain은 선명하지만 ICP가 solo creator / freelancer / small agency로 아직 더 섞여 있다.
- use case는 강하지만 VoC보다 팀 단위 운영 문제로 확장되는 폭이 좁다.
- 현재 문서화와 MVP 범위는 VoC 쪽이 더 바로 개발하기 쉽다.

## 현재 순위
1. Voice-of-Customer Repository
2. Creator Deal CRM

## 보류한 파생 아이디어
아래는 독립 파일로 유지하지 않고 계속 하위 wedge/module로만 취급한다.
- Support-to-Product Decision Hub → VoC 하위 wedge
- Churn Decision Copilot → VoC 하위 module
- Creator Collections Assistant → Creator Deal CRM entry wedge

## 이번 루프 판단
- **순위 변경 없음**
- Primary는 `near-term commitments only`를 제품 규칙으로 녹이는 방향이 더 선명해졌다.
- Backup은 `reminder bot`이 아니라 `AP-routing + blockage visibility + next-step queue`로 더 좁혀졌다.
- 다음 개발은 Primary를 기준으로 진행하고, Backup은 collections operating system wedge로만 보존하는 게 맞다.
