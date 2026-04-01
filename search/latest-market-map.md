# Latest Market Map

**Updated**: 2026-04-02

## 목적
이번 루프에서 다시 확인한 최신 검색/시장 신호만 반영해, 지금 유지할 아이디어 순위와 이유를 짧게 고정한다.

## 이번 루프에서 다시 확인한 신호

### 1) Primary 쪽 신호
- **Productboard 직접 소스**: Productboard의 `Building Product Roadmaps Around Customer Insights`는 customer insights를 product planning과 roadmap에 연결해야 business outcomes로 이어진다고 직접 설명한다. 즉 핵심 문제는 feedback 저장 자체보다 **insight → planning translation**이다.  
  - https://www.productboard.com/blog/5-benefits-of-building-product-roadmaps-around-customer-insights/
- **UserJot 직접 소스**: `Top 8 Feedback Tools for B2B SaaS in 2026` 설명문에 `CRM integrations`, `revenue-based prioritization`, `enterprise features`가 직접 들어간다. 즉 팀이 원하는 건 generic inbox가 아니라 **account context + revenue weighting**이다.  
  - https://userjot.com/blog/top-8-feedback-tools-b2b-saas-2025
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/ProductManagement` 검색 결과에서 2025-02-26 글은 `Okay, but WHEN is 'Later'?` 질문을 그대로 드러낸다. 또 2025-01-03 글은 now/next/later의 핵심을 `your commitments are only near term`으로 설명한다. 즉 팀은 now/next/later를 쓰더라도 **ambiguity-closing layer + commitment window control**이 필요하다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com+product+management+now+next+later+when+is+later+roadmap+customer+commitments
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: 별도 결과에서 `Pendo roadmap tool`로 외부용 high-level roadmap을 보여주고, `Canny` 또는 `Productboard(or Notion) + JIRA`로 내부 상세를 관리하는 패턴이 노출된다. 즉 실제 운영은 여전히 **external roadmap / internal detail split + multi-tool workflow**다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com+Pendo+roadmap+Canny+internal+detailed+roadmap+product+management

### 2) Backup 쪽 신호
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/AccountingDepartment` 결과는 `very manual AP process`, `payment run option`을 직접 노출한다. 또 `r/freelance` 결과는 `It gives accounts payable time to process and audit your invoice` 문구를 보여준다. 즉 지연의 큰 축은 단순 미지급이 아니라 **AP audit + payment-run latency**다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com+accounts+payable+process+and+audit+your+invoice+freelancer
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: 같은 검색 결과 안의 `r/influencermarketing` 결과는 `invoice sent, payment received, payout scheduled` 같은 월간 체크리스트 언어를 보여준다. 즉 creator-side 실제 행동 언어는 broad CRM이 아니라 **payment-stage checklist**에 가깝다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com+accounts+payable+process+and+audit+your+invoice+freelancer
- **Direct page retrieval**: Chaser는 페이지 제목 자체가 `Automated email payment reminders`다. 즉 reminder automation 자체는 이미 명확한 상품 카테고리다. 빈 곳은 자동 리마인더보다 **현재 blockage visibility + next-step clarity**다.  
  - https://www.chaserhq.com/features/email
- **Yahoo Japan indexed snippet (browser-rendered, medium confidence)**: 일반 invoice chase 검색 결과에서도 `confirm the due date, payment terms, and that it was sent to the right ...` 같은 문구가 노출된다. 즉 실제 collections pain은 follow-up 문구보다 먼저 **invoice correctness / destination correctness**를 확인하는 운영 단계가 있다.  
  - https://search.yahoo.co.jp/search?p=Chasr+invoice+reminders+creator+payments

## 현재 순위
1. Voice-of-Customer Repository
2. Creator Deal CRM

## 순위 유지 이유
### 1) Voice-of-Customer Repository
이번 루프에서도 더 강한 쪽은 여전히 VoC다.
- 시장이 원하는 건 feedback inbox보다 **account-aware prioritization**이다.
- 실제 팀 운영은 여전히 Productboard / Notion / Jira / Pendo / Canny로 갈라져 있다.
- now/next/later를 쓰더라도 `when is later?`를 닫아주는 레이어가 비어 있다.
- 따라서 가장 강한 wedge는 repository 그 자체가 아니라 **weekly decision brief + commitment-safe external update draft**다.

### 2) Creator Deal CRM
backup 쪽 pain도 선명하지만 더 좁다.
- reminder automation은 이미 상품화돼 있다.
- 진짜 운영 pain은 `invoice가 맞게 갔는지`, `AP audit 중인지`, `다음 pay-run에 실리는지`, `지금 누구에게 무엇을 보내야 하는지`다.
- 따라서 strongest wedge는 broad CRM이 아니라 **collections operating layer**다.

## 이번 루프 판단
- **순위 변경 없음**
- Primary는 `external roadmap / internal detail split`과 `near-term commitments only` 규칙을 제품에 더 강하게 넣는 방향이 맞다.
- Backup은 `독촉 자동화`보다 `invoice correctness + AP review + pay-run visibility + next-step queue`로 더 좁혀야 한다.
- 다음 개발은 계속 Primary 기준으로 진행한다.
