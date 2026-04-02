# Latest Market Map

**Updated**: 2026-04-02

## 목적
이번 루프에서 다시 확인한 **최신 유효 신호만**으로 현재 아이디어 우선순위와 이유를 다시 고정한다.

## 이번 루프에서 다시 확인한 핵심 신호

### 1) Primary — Voice-of-Customer Repository
- **Direct page retrieval**: Productboard 페이지 제목은 `Building Product Roadmaps Around Customer Insights`, 메타 설명은 customer insights를 `product planning`과 `business outcomes`에 연결한다. 시장 메시지 자체가 이미 단순 수집보다 **insight → planning translation** 쪽으로 이동했다.  
  - https://www.productboard.com/blog/5-benefits-of-building-product-roadmaps-around-customer-insights/
- **Direct page retrieval**: UserJot 페이지 제목은 `Top 8 Feedback Tools for B2B SaaS in 2026`, 메타 설명은 `CRM integrations`, `revenue-based prioritization`, `enterprise features`를 전면에 둔다. 경쟁 축은 inbox형 수집이 아니라 **account context + revenue weighting**이다.  
  - https://userjot.com/blog/top-8-feedback-tools-b2b-saas-2025
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/ProductManagement` 2025-05-13 결과는 `Closest I've seen is some combo of AI tagging + sentiment + clustering, but nothing that nails the “what to build next” piece automatically.`를 노출한다. 시장은 정리까지는 하지만 **build-next decision translation**을 아직 못 닫는다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20ProductManagement%20%22what%20to%20build%20next%22%20AI%20clustering%20feedback
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: 같은 결과 페이지의 2026-02-12 `r/ycombinator` 스니펫은 `Even if you can figure out what to build next ... the real work ...`를 보여준다. 즉 pain은 추천 계산만이 아니라 **우선순위를 설명하고 customer commitment를 소화하는 운영 오버헤드**까지 포함한다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20ProductManagement%20%22what%20to%20build%20next%22%20AI%20clustering%20feedback
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/ProductManagement` 2025-02-26, 2025-06-17와 `r/ProductOwner` 2025-06-22 결과는 모두 `Okay, but WHEN is 'Later'?`를 반복 노출한다. `now/next/later`는 여전히 쓰이지만 **bucket explanation + ambiguity-closing answer**가 빠져 있다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20ProductManagement%20%22when%20is%20later%22%20roadmap%20%22now%20next%20later%22
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/ProductManagement` 2023-04-28 결과는 `How to not be on every customer roadmap call? ... We do have customer facing versions of the roadmaps ...`를 노출한다. artifact가 있어도 **반복 설명 호출과 account-specific roadmap communication burden**은 남아 있다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20ProductManagement%20%22customer%20roadmap%20call%22%20PM

### 2) Backup — Creator Deal CRM
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/freelance` 2021-01-15 결과는 `accounts payable department`와 `payment run`을 함께 언급한다. creator-side pain은 일반적인 독촉보다 **named AP owner + pay-run visibility** 쪽이 더 구조적이다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20%22payment%20run%22%20%22accounts%20payable%22%20freelance
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/AccountingDepartment` 2024-04-30 결과는 `We currently have a very manual AP process ... switch to using the payment run option`을 노출한다. blockage는 creator만의 문제가 아니라 payer-side에서도 **manual AP process**에 걸려 있다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20%22payment%20run%22%20%22accounts%20payable%22%20freelance
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/PartneredYoutube` 2025-06-02 결과는 `Ask to speak to accounts payable`를 노출한다. 실제 회수 행동은 여전히 **AP owner 확보와 직접 추적** 중심이다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20PartneredYoutube%20%22accounts%20payable%22%20follow%20up%20again
- **Direct page retrieval**: Chaser 페이지 제목은 `Automated email payment reminders`, 메타 설명은 `Streamline your accounts receivable process with Chaser`다. reminder automation은 이미 카테고리화돼 있으므로 빈 곳은 자동 리마인더보다 **blockage visibility + next-step clarity**다.  
  - https://www.chaserhq.com/features/email

## 현재 순위
1. Voice-of-Customer Repository
2. Creator Deal CRM

## 순위 유지 이유
### 1) Voice-of-Customer Repository
이번 루프에서도 가장 강한 쪽은 VoC다.
- 시장 요구가 `feedback 저장`보다 **planning translation / build-next decision / account-aware prioritization** 쪽으로 더 선명하다.
- 실제 운영은 여전히 `tag + cluster + manual prioritization`에 머무르고, 그 이후 `왜 이게 지금 올라왔는지`, `왜 아직 약속 못 하는지`, `later가 언제인지`를 사람이 반복 설명한다.
- 최신 신호상 빈 곳은 단순 shared store가 아니라 **decision layer + explanation layer + commitment-safe communication layer**다.
- 특히 이번 재확인에서는 `customer roadmap call` 반복 부담이 다시 보여서, 제품 기회가 단순 요약이 아니라 **반복 설명/기대관리 workload 절감**까지 포함한다는 점이 더 선명해졌다.

### 2) Creator Deal CRM
backup pain도 여전히 선명하지만 더 좁다.
- reminder automation 자체는 이미 카테고리화돼 있다.
- 실제 운영 pain은 `AP review`, `manual AP process`, `payment run`, `AP owner 확보`, `다음으로 누구에게 무엇을 보낼지`에 집중된다.
- 그래서 넓은 CRM보다 **collections operating layer**로 잡는 편이 여전히 맞다.
- 다만 evidence 밀도와 팀 단위 확장성은 아직 VoC보다 약하다.

## 이번 루프 판단
- **순위 변경 없음**
- Primary는 계속 `shared store 이후 decision/explanation layer`가 핵심이다.
- 이번 재확인으로 Primary의 세부 wedge는 `what to build next`뿐 아니라 **반복 roadmap 설명과 commitment-safe wording까지 줄여주는 operating layer**로 더 선명해졌다.
- Backup은 계속 `독촉 자동화`보다 `AP owner + payment-run visibility + blockage-first next step`이 맞다.
- 다음 개발 우선순위는 계속 Primary다.
