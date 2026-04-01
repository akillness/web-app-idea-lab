# Primary Idea — Voice-of-Customer Repository

**Status**: Active primary idea  
**Updated**: 2026-04-02

## One-line definition
초기 B2B SaaS 팀의 support / churn / feature request / customer commitment evidence를 **주간 의사결정 브리프, priority rationale, commitment-safe update draft**로 바꿔주는 decision layer.

## 핵심 문제
팀은 feedback가 없는 게 아니라 너무 많다. 문제는 evidence가 Productboard, Jira, support queue, Slack, notes, CRM에 흩어져 있고, 그걸 매주 다시 읽어 **무엇이 악화됐는지 / 어떤 계정과 세그먼트가 위험한지 / 왜 어떤 항목이 점프했는지 / 무엇을 약속하면 안 되는지**로 번역하는 레이어가 없다는 점이다.

## 누구를 위한 제품인가
- 10~100명 B2B SaaS 팀
- founder-led product / sales / CS 조직
- support와 churn signal은 많은데 weekly review artifact가 약한 팀

## 가장 중요한 pain
1. raw feedback가 쌓여도 decision queue로 번역되지 않는다.
2. support / churn / sales / commitment evidence가 분리되어 보여 account-level 판단이 느리다.
3. roadmap direction과 dated promise를 안전하게 분리하지 못한다.
4. `now/next/later`를 써도 결국 "그래서 later가 언제냐"는 질문을 다시 받는다.
5. priority override 이유(대형 고객 약속, churn risk, company objective)가 설명 가능한 형태로 남지 않는다.
6. user-facing 팀이 모은 signal과 product/leadership의 우선순위 언어가 끊겨 있다.

## 제품이 제공해야 하는 핵심 결과물
- weekly decision brief
- what got worse this week
- segment / account at risk
- commitment risk this quarter
- priority override explanation
- why this jumped / why not now explanation
- near-term commitments only 규칙이 반영된 update draft
- now/next/later-safe external update draft

## 왜 지금 이 아이디어를 유지하는가
- 신호 밀도가 가장 높다.
- pain이 개인 생산성 문제가 아니라 팀 의사결정 문제다.
- output artifact가 뚜렷하고 검증 가능하다.
- account/revenue weighting 덕분에 B2B 팀 단위 과금 논리가 자연스럽다.
- 현재 대체재들은 tagging/AI clustering까진 가도 `what to build next`와 `why behind priorities`를 충분히 닫아주지 못한다.

## 제품 wedge
"고객 피드백 저장소"가 아니라 **support/churn/request/commitment를 weekly operating artifact와 priority rationale로 바꾸는 decision system**.

## 하지 말아야 할 것
- generic note repository
- full helpdesk replacement
- roadmap system-of-record
- benchmark product first
- Jira/Productboard deep integration first

## 성공 판단 기준
- 팀이 weekly brief를 실제 회의 artifact로 사용한다.
- 무엇이 악화됐는지 / 무엇이 위험한지 / 왜 우선순위가 바뀌었는지 / 무엇을 아직 약속하면 안 되는지가 한 장에서 읽힌다.
- customer-safe update draft가 CSM/founder 커뮤니케이션에 실제로 쓰인다.
