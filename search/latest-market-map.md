# Latest Market Map

**Updated**: 2026-04-02

## 목적
이번 루프에서 다시 확인한 **최신 유효 신호만**으로 현재 아이디어 순위와 이유를 다시 고정한다.

## 이번 루프 핵심 신호

### 1) Primary 후보 — Voice-of-Customer Repository
- **Direct page retrieval**: Productboard 페이지 제목은 `Building Product Roadmaps Around Customer Insights`, 메타 설명은 customer insights를 `product planning`과 `business outcomes`에 연결한다고 적는다. 시장 메시지 자체가 이미 **feedback storage → planning translation** 쪽으로 이동했다.  
  - https://www.productboard.com/blog/5-benefits-of-building-product-roadmaps-around-customer-insights/
- **Direct page retrieval**: UserJot 페이지 제목은 `Top 8 Feedback Tools for B2B SaaS in 2026`, 메타 설명은 `CRM integrations`, `revenue-based prioritization`, `enterprise features`를 전면에 둔다. 즉 경쟁 축은 inbox형 수집보다 **account context + revenue weighting**이다.  
  - https://userjot.com/blog/top-8-feedback-tools-b2b-saas-2025
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/ProductManagement` 2025-05-13 결과는 `Closest I've seen is some combo of AI tagging + sentiment + clustering, but nothing that nails the “what to build next” piece automatically.`라고 노출한다. 대체재는 정리까지는 해도 **decision translation / build-next recommendation**을 못 닫는다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20ProductManagement%20%22what%20to%20build%20next%22%20AI%20clustering%20feedback
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: 같은 검색 결과의 `r/ProductManagement` 2024-01-21 글은 `... clustering them by common theme and prioritizing that way.`를 노출한다. 운영 기본형은 여전히 **tag → cluster → manual prioritization**이다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20ProductManagement%20%22what%20to%20build%20next%22%20AI%20clustering%20feedback
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: 같은 검색 결과의 `r/ycombinator` 2026-02-12 글은 `Even if you can figure out what to build next ... the real work ...`라고 노출한다. pain은 우선순위 계산만이 아니라 **customer commitments / explanation work가 strategy 시간을 잡아먹는 운영 오버헤드**까지 포함한다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20ProductManagement%20%22what%20to%20build%20next%22%20AI%20clustering%20feedback
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/ProductManagement` 2025-02-26 결과는 `Okay, but WHEN is 'Later'?`를 노출한다. `now/next/later`는 여전히 쓰이지만, **bucket explanation + ambiguity-closing answer**가 빠져 있다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20ProductManagement%20%22when%20is%20later%22%20roadmap%20%22now%20next%20later%22
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: 같은 검색 결과에서 `r/ProductManagement` 2025-06-17, `r/ProductOwner` 2025-06-22, `r/jira` 2024-08-22까지 비슷한 문구가 반복 노출된다. 즉 `later가 언제냐`는 질문은 PM 한 팀의 사소한 이슈가 아니라 **여러 역할/도구 표면에서 반복되는 expectation-management workload**다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20ProductManagement%20%22when%20is%20later%22%20roadmap%20%22now%20next%20later%22
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/ProductManagement` 2023-04-28 결과는 `How to not be on every customer roadmap call? ... We do have customer facing versions of the roadmaps ...`를 노출한다. 즉 최신 pain은 단순 roadmap artifact 부족이 아니라 **같은 설명을 반복 호출받는 customer-roadmap communication burden**까지 포함한다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20ProductManagement%20%22customer%20roadmap%20call%22%20PM

### 2) Backup 후보 — Creator Deal CRM
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/freelance` 2017-09-19 결과는 `It gives accounts payable time to process and audit your invoice.`를 노출한다. delay의 상당 부분은 ghosting보다 **AP review latency**다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20%22process%20and%20audit%20your%20invoice%22%20%22payment%20run%22%20freelance
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/freelance` 2021-01-15 결과는 `accounts payable department`와 `payment run`을 함께 언급한다. 핵심은 독촉 문구보다 **named AP owner + pay-run visibility**다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20%22payment%20run%22%20%22accounts%20payable%22%20freelance
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/PartneredYoutube` 2025-06-02 결과는 `Ask to speak to accounts payable`를 노출한다. creator-side pain도 결국 **AP owner 확보**와 **직접 추적** 쪽이 더 강하다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20PartneredYoutube%20%22accounts%20payable%22%20follow%20up%20again
- **Yahoo Japan indexed snippet (browser-rendered, high confidence)**: `r/AccountingDepartment` 2024-04-30 결과는 `We currently have a very manual AP process when it comes to payments, but we're about to switch to using the payment run option in our software.`를 노출한다. blockage는 creator-side follow-up만의 문제가 아니라 payer-side에서도 여전히 **manual AP process + payment run transition**에 묶여 있다.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20%22payment%20run%22%20%22accounts%20payable%22%20freelance
- **Yahoo Japan indexed snippet (browser-rendered, low confidence / zero-result caveat)**: `accounts payable + invoice destination + creator freelance` 정밀 검색은 exact-match 기준 유의미한 workflow 결과를 거의 회수하지 못했다. 즉 `invoice destination` pain은 제품 운영 필드로는 중요하지만, 현재 시점에서는 **강한 demand thesis보다 design hypothesis에 가깝다**.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20%22accounts%20payable%22%20%22invoice%20destination%22%20creator%20freelance
- **Yahoo Japan indexed snippet (browser-rendered, low confidence)**: `remittance proof` 검색은 사실상 세금/해외송금 문맥 한 건만 회수됐다. `remittance-proof`는 운영적으로는 유용하지만 현재 creator collections 시장에서 **핵심 전면 wedge라고 보기엔 증거가 얇다**.  
  - https://search.yahoo.co.jp/search?p=site%3Areddit.com%20%22remittance%20proof%22%20freelance%20invoice%20payment
- **Direct page retrieval**: Chaser 페이지 제목은 `Automated email payment reminders`, 메타 설명은 `Streamline your accounts receivable process with Chaser`다. reminder automation은 이미 뚜렷한 카테고리라서, 빈 곳은 자동 리마인더보다 **blockage visibility + next-step clarity**다.  
  - https://www.chaserhq.com/features/email

## 현재 순위
1. Voice-of-Customer Repository
2. Creator Deal CRM

## 순위 유지 이유
### 1) Voice-of-Customer Repository
이번 루프에서도 가장 강한 쪽은 VoC다.
- 시장 요구가 `feedback 저장`보다 **planning translation / build-next decision / account-aware prioritization** 쪽으로 더 선명하다.
- 실제 운영은 여전히 `tag + cluster + manual prioritization`과 `formal tool + personal explanation work` 조합에 머물러 있다.
- 빈 곳은 계속 같다: **정리된 신호를 what-to-build-next와 why-now/why-not-now 설명으로 바꾸는 레이어**가 없다.
- roadmap 커뮤니케이션은 `when is later?`와 `왜 이걸 아직 약속 못 하느냐`를 닫아줄 **bucket explanation + ambiguity-closing answer**가 부족하다.
- 이번 루프에선 여기에 더해 `customer roadmap call` 부담까지 드러났다. 즉 제품 기회는 요약이 아니라 **반복 설명/commitment 대응 부담까지 줄이는 운영 레이어**다.

### 2) Creator Deal CRM
backup pain도 여전히 선명하지만 더 좁다.
- reminder automation 자체는 이미 카테고리화돼 있다.
- 실제 운영 pain은 `AP review`, `manual payment run`, `AP owner 확보`, `다음으로 누구에게 무엇을 보낼지`에 집중된다.
- 반면 `invoice destination`, `remittance-proof`는 제품 필드로는 유지할 가치가 있지만, 이번 재검색 기준 **핵심 시장 wedge를 세우는 증거는 아직 얇다**.
- 그래서 현재는 넓은 CRM보다 **collections operating layer**로 잡는 편이 맞다.

## 이번 루프 판단
- **순위 변경 없음**
- Primary는 여전히 `shared store 이후 decision layer`가 맞고, 이번엔 여기에 **customer-roadmap communication burden / strategy-time tax reduction** 필요성이 더 선명해졌다.
- Backup은 계속 `독촉 자동화`보다 `AP owner + payment-run visibility + blockage-first recovery queue`가 맞다.
- Backup 세부 필드 중 `invoice destination`, `remittance-proof`는 유지하되 핵심 wedge로는 과장하지 않는다.
- 다음 개발 우선순위는 계속 Primary다.
