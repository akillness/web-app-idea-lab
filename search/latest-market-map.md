# Latest Market Map

**Updated**: 2026-04-02

## 목적
이번 루프에서 다시 확인한 **최신 유효 신호만**으로 현재 아이디어 우선순위와 이유를 재고정한다.

## 이번 루프에서 다시 확인한 핵심 신호

### 1) Primary — Voice-of-Customer Repository
- **Direct page retrieval**: Productboard 페이지 제목은 `Building Product Roadmaps Around Customer Insights`, 메타 설명은 customer insights를 `product planning`과 `business outcomes`에 연결한다. 시장 메시지 축이 여전히 **feedback 저장**보다 **planning translation** 쪽에 있다.  
  - https://www.productboard.com/blog/5-benefits-of-building-product-roadmaps-around-customer-insights/
- **Direct page retrieval**: UserJot 페이지 제목은 `Top 8 Feedback Tools for B2B SaaS in 2026`, 메타 설명은 `CRM integrations`, `revenue-based prioritization`, `enterprise features`를 전면에 둔다. 경쟁 축은 inbox형 수집이 아니라 **account context + revenue weighting**이다.  
  - https://userjot.com/blog/top-8-feedback-tools-b2b-saas-2025
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/ProductManagement` 2025-05-13 결과는 `Closest I've seen is some combo of AI tagging + sentiment + clustering, but nothing that nails the “what to build next” piece automatically.`를 노출한다. 정리 단계 이후의 **build-next translation gap**이 그대로 남아 있다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20ProductManagement%20%22what%20to%20build%20next%22%20AI%20clustering%20feedback
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: 같은 검색 결과의 `r/ycombinator` 2026-02-12 스니펫은 `Even if you can figure out what to build next ... the real work ...`를 노출한다. pain은 추천 계산만이 아니라 **결정을 설명하고 조직 안팎에서 소화하는 운영 오버헤드**까지 포함한다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20ProductManagement%20%22what%20to%20build%20next%22%20AI%20clustering%20feedback
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/ProductManagement` 2025-02-26 / 2025-06-17, `r/ProductOwner` 2025-06-22 결과는 모두 `Okay, but WHEN is 'Later'?`를 반복 노출한다. `now/next/later`는 여전히 쓰이지만 **bucket explanation + ambiguity-closing answer**가 별도 산출물로 필요하다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20ProductManagement%20%22when%20is%20later%22%20roadmap%20%22now%20next%20later%22
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/ProductManagement` 2023-05-09 결과는 `These customers are asking dates for features from 3 to 12 months out. My solution right now is to deflect it by giving generalities ...`를 노출한다. 실제 B2B 운영에서는 **날짜 요구를 받아내는 enterprise/customer-facing surface**가 계속 남아 있다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20ProductManagement%20enterprise%20SaaS%20customers%20demand%20dates%20roadmap
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: 같은 결과 페이지의 `r/ProductManagement` 2024-01-11 스니펫은 `Traditional roadmaps with time constraints are commonly expected, as stakeholders often seek commitment to specific delivery dates.`를 노출한다. 이 pain은 고객 응대만이 아니라 **내부 stakeholder/exec/revenue surface에서도 time-constrained roadmap을 요구하는 구조**라는 점이 다시 확인됐다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20ProductManagement%20enterprise%20SaaS%20customers%20demand%20dates%20roadmap
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: 같은 결과 페이지의 `r/ProductManagement` 2024-03-18 스니펫은 `Our sales team has sold more and more enterprise deals with \"commitments\" of sorts in the contracts.`를 노출한다. 최신 wedge는 단순 feedback repository가 아니라 **sales-sold commitments / RFP pressure / roadmap expectation**까지 evidence graph에 묶는 operating layer다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20ProductManagement%20enterprise%20SaaS%20customers%20demand%20dates%20roadmap
- **Yahoo Japan indexed snippet (browser-rendered, medium-high confidence)**: 같은 결과 페이지의 `r/ProductManagement` 2024-04-28 스니펫은 `... product roadmap for the next 3 months to include deadlines in which sprint things will be ...`를 노출한다. 즉 최신 요구는 추상적 날짜 질문을 넘어서 **3개월 단위 roadmap + sprint deadline 요구**까지 포함한다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20ProductManagement%20enterprise%20SaaS%20customers%20demand%20dates%20roadmap
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: 같은 결과 페이지의 `r/ProductManagement` 2024-12-18 스니펫은 `How does your team prioritize what to build? And how do you balance business RFP needs versus building a strategic customer centric product?`를 노출한다. 즉 override pain은 단순한 특수 케이스가 아니라 **RFP / enterprise revenue asks vs strategic roadmap** 사이의 설명 가능한 trade-off 문제다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20ProductManagement%20RFP%20strategic%20roadmap%20prioritize%20what%20to%20build%20enterprise
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/ProductManagement` 2025-06-17 결과는 `Product Roadmap Template for Execs and Revenue / Sales Teams`를 노출한다. 이건 단순 공유 포맷 문제가 아니라 **같은 evidence를 customer-safe view, exec/revenue-facing view, internal decision view로 다시 패키징해야 하는 운영 surface**가 남아 있다는 신호다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20ProductManagement%20roadmap%20template%20exec%20sales%20revenue%20timeline
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/ProductManagement` 2023-04-28 결과는 `How to not be on every customer roadmap call? ... We do have customer facing versions of the roadmaps that they should be able ...`를 노출한다. artifact가 있어도 **반복 roadmap explanation workload**는 계속 남는다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20ProductManagement%20%22customer%20roadmap%20call%22%20PM
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/ProductManagement` 2024-04-04 결과는 `Support should report into Product ... They've also committed to major accounts guarantees about roadmap ...`를 노출한다. 즉 support-to-product relay는 별도 아이디어가 아니라 **major-account commitment pressure를 product decision layer로 바로 연결하는 sub-module**로 보는 편이 맞다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20%22support%20should%20report%20into%20product%22%20roadmap%20major%20accounts%20guarantees

### 2) Backup — Creator Deal CRM
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/freelance` 2021-01-15 결과는 `accounts payable department`와 `payment run`을 함께 언급한다. creator-side pain은 일반 독촉보다 **named AP owner + pay-run visibility** 쪽이 더 구조적이다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20%22payment%20run%22%20%22accounts%20payable%22%20freelance
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: 같은 결과 페이지의 `r/AccountingDepartment` 2024-04-30 스니펫은 `We currently have a very manual AP process ... switch to using the payment run option`을 노출한다. blockage는 creator만의 문제가 아니라 payer-side에서도 **manual AP process**에 걸려 있다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20%22payment%20run%22%20%22accounts%20payable%22%20freelance
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/PartneredYoutube` 2025-06-02 결과는 `Ask to speak to accounts payable`를 노출한다. 실제 회수 행동은 여전히 **AP owner 확보와 직접 추적** 중심이다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20PartneredYoutube%20%22accounts%20payable%22%20follow%20up%20again
- **Yahoo Japan indexed snippet (browser-rendered, medium confidence)**: `r/freelance` 2017-09-19 결과는 `It gives accounts payable time to process and audit your invoice.`를 노출한다. 즉 미수금 문제 전에도 **AP 검토 리드타임**이 실무 단계로 존재한다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20%22process%20and%20audit%20your%20invoice%22%20creator%20freelance
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: 이번 재확인에서 `r/videography` 2018-11-17 결과는 `In order for a big business to pay your invoice, it has to be overdue on the monthly date that the payment run ... accounts payable department ...`를 노출했다. 즉 실무 pain은 단순 overdue가 아니라 **monthly payment-run cutoff를 넘기면 한 사이클이 통째로 밀리는 구조**다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20%22payment%20run%22%20%22accounts%20payable%22%20freelance
- **Yahoo Japan indexed snippet (browser-rendered, medium confidence)**: `r/freelance` 2023-02-07, `r/PPC` 2023-06-12 결과는 `creating invoice in advance` / `invoice in advance and get the payment before ads run`을 노출한다. 일부 실무자는 리마인더보다 **pay-run에 맞추기 위한 선제 invoicing**으로 대응한다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20%22invoice%20in%20advance%22%20freelance%20accounts%20payable
- **Direct page retrieval**: Chaser 페이지 제목은 `Automated email payment reminders`, 메타 설명은 `Streamline your accounts receivable process with Chaser`다. reminder automation은 이미 카테고리화돼 있으므로 빈 곳은 자동 리마인더보다 **blockage visibility + AP timing clarity + next-step clarity**다.  
  - https://www.chaserhq.com/features/email

## 현재 순위
1. Voice-of-Customer Repository
2. Creator Deal CRM

## 순위 유지 이유
### 1) Voice-of-Customer Repository
- 이번 루프에서도 가장 강한 쪽은 VoC다.
- 시장 요구가 `feedback 저장`보다 **planning translation / build-next decision / account-aware prioritization** 쪽으로 더 선명하다.
- 최신 재확인으로 pain 범위가 더 또렷해졌다. 이제 빈 곳은 단순 prioritization이 아니라 **enterprise date pressure, internal stakeholder/exec timeline pressure, sales-sold commitments, repeated roadmap explanation workload, RFP-vs-strategy override trade-off**까지 묶어 처리하는 operating layer다.
- 새로 확인한 `Product Roadmap Template for Execs and Revenue / Sales Teams` 신호는 같은 evidence라도 **customer-safe view / exec-revenue view / internal decision view를 따로 재패키징해야 하는 surface**가 남아 있음을 보여준다.
- 추가로 support-to-product relay 자체도 별도 카테고리보다 **major-account commitment pressure를 decision layer에 연결하는 sub-module**로 흡수하는 편이 맞다는 신호가 보였다.
- 즉 필요한 것은 shared store 이후의 **decision layer + explanation layer + commitment-pressure layer + exec/revenue roadmap pack layer + internal timeline-defense layer + support-relay sub-module + override-defense layer**다.

### 2) Creator Deal CRM
backup pain도 여전히 선명하지만 더 좁다.
- reminder automation 자체는 이미 카테고리화돼 있다.
- 실제 운영 pain은 `AP review`, `manual AP process`, `payment run`, `AP owner 확보`, `invoice를 언제/어떻게 먼저 넣어야 하는지`, `monthly payment-run cutoff를 안 놓치려면 언제 invoice가 overdue/ready 상태여야 하는지`, `다음으로 누구에게 무엇을 보낼지`에 집중된다.
- 그래서 넓은 CRM보다 **collections operating layer**로 잡는 편이 여전히 맞고, 그 안에서도 `payment-run cutoff 관리`가 더 명확한 wedge로 보인다.
- 다만 evidence 밀도와 팀 단위 확장성은 아직 VoC보다 약하다.

## 이번 루프 판단
- **순위 변경 없음**
- Primary는 계속 1위지만, 이번 재확인으로 핵심 wedge가 **what-to-build-next + commitment/explanation workload + sales-sold commitment pressure + RFP-vs-strategy override defense + exec/revenue roadmap pack**까지 확장돼 더 명확해졌다.
- Backup은 계속 `독촉 자동화`보다 `AP owner + payment-run visibility + AP review lead time + blockage-first next step`이 맞다.
- 다음 개발 우선순위는 계속 Primary다.
