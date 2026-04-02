# Primary Idea — Voice-of-Customer Repository

**Status**: Active primary idea  
**Updated**: 2026-04-02

## One-line definition
초기 B2B SaaS 팀의 support / churn / feature request / customer commitment / RFP pressure evidence를 **customer-level evidence board, 주간 의사결정 브리프, build-next queue, commitment-safe update draft, sales/CS/support 대응용 explanation pack**으로 바꿔주는 decision + explanation layer.

## 핵심 문제
팀은 feedback가 없는 게 아니라 너무 많다. 문제는 evidence가 Productboard, Jira, support queue, Slack, notes, CRM에 흩어져 있고, 그걸 매주 다시 읽어 **무엇이 악화됐는지 / 어떤 계정과 세그먼트가 위험한지 / 왜 어떤 항목이 점프했는지 / 무엇을 약속하면 안 되는지 / 무엇을 다음에 만들어야 하는지**로 번역하는 레이어가 없다는 점이다.

또한 시장은 이미 tagging/AI clustering과 customer-level view를 탐색하고 있지만, 실제 팀은 여전히 shared store 이후 단계에서 멈춘다. 최신 사용자 언어도 `tag + cluster + manual prioritization` 운영을 반복하고, 현업 조합도 `Pendo/Aha 같은 요청 저장소 + support data + 개인 노트/설명 작업`처럼 끊겨 있다. 즉 부족한 것은 수집 기능보다 **account-aware decision translation**이며, 더 구체적으로는 **정리된 signal을 what-to-build-next 판단과 why-now/why-not-now 설명으로 바꾸는 operating layer**다. 이번 재확인에서는 여기서 한 단계 더 나아가, **sales가 계약/엔터프라이즈 딜 과정에서 사실상 commitments를 팔아버리는 상황**, **3~12개월짜리 날짜 요구**, **repeated customer roadmap call**, 그리고 **RFP/revenue asks와 strategic roadmap 사이를 설명 가능한 방식으로 중재해야 하는 우선순위 override 문제**까지 product/CS/founder 시간을 잡아먹는다는 점이 더 선명해졌다. 추가로 support 현장도 별도 아이디어가 아니라, **major-account roadmap guarantee와 escalation pressure를 decision layer로 바로 연결해야 하는 relay surface**로 보는 편이 맞다는 신호가 확인됐다.

## 누구를 위한 제품인가
- 10~100명 B2B SaaS 팀
- founder-led product / sales / CS 조직
- support와 churn signal은 많은데 weekly review artifact가 약한 팀
- enterprise deal과 revenue pressure 때문에 roadmap/commitment 설명 부담이 커진 팀

## 가장 중요한 pain
1. raw feedback가 쌓여도 decision queue로 번역되지 않는다.
2. support / churn / sales / commitment evidence가 분리되어 보여 account-level 판단이 느리다.
3. roadmap direction과 dated promise를 안전하게 분리하지 못한다.
4. `now/next/later`를 써도 결국 "그래서 later가 언제냐"는 질문을 다시 받는다.
5. priority override 이유(대형 고객 약속, churn risk, company objective, RFP pressure)가 설명 가능한 형태로 남지 않는다.
6. enterprise RFP/revenue ask와 strategic roadmap 사이의 충돌을 `왜 이번엔 override됐는지 / 왜 안 됐는지` 수준으로 설명하지 못한다.
7. user-facing 팀이 모은 signal과 product/leadership의 우선순위 언어가 끊겨 있다.
8. bucket definition(`now`, `next`, `later`가 각각 어느 범위를 뜻하는지)과 bucket mode(방향성 표현인지 실제 약속인지)가 분리돼 있지 않다.
9. `what should we build next?`와 `왜 이게 지금 점프했는가?`를 같은 evidence graph에서 설명하지 못한다.
10. customer commitment를 관리하고 roadmap/priority 설명을 반복하는 일이 전략 시간을 잡아먹는다.
11. PM/founder가 반복적인 customer roadmap call이나 `later가 언제냐`류 질문에 끌려들어간다.
12. sales가 만든 commitment expectation과 product의 실제 confidence level을 같은 화면에서 맞추지 못한다.
13. enterprise 고객이 3~12개월짜리 날짜를 요구할 때, deflect/general wording과 linked evidence 기반 설명 사이에 제품화된 중간 레이어가 없다.

## 제품이 제공해야 하는 핵심 결과물
- customer-level evidence board
- weekly decision brief
- what got worse this week
- segment / account at risk
- commitment risk this quarter
- priority override explanation
- RFP-vs-strategy trade-off note
- why this jumped / why not now explanation
- what should we build next answer
- near-term commitments only 규칙이 반영된 update draft
- now/next/later-safe external update draft
- bucket definition note + ambiguity-closing answer
- commitment-overhead queue
- customer-roadmap communication queue
- sales/CS/support reusable explanation pack
- contract / RFP pressure trace
- support escalation relay queue

## 왜 지금 이 아이디어를 유지하는가
- 신호 밀도가 가장 높다.
- pain이 개인 생산성 문제가 아니라 팀 의사결정 문제다.
- output artifact가 뚜렷하고 검증 가능하다.
- account/revenue weighting 덕분에 B2B 팀 단위 과금 논리가 자연스럽다.
- 현재 대체재들은 tagging/AI clustering과 customer-level view까지는 가도 `what to build next`, `why behind priorities`, `commitment-safe explanation`을 충분히 닫아주지 못한다.
- 이번 재확인으로 `sales-sold commitments`, `enterprise date pressure`, `repeated roadmap explanation work`, `RFP-vs-strategy override trade-off`, `support escalation relay`까지 한꺼번에 잡는 제품 표면이 더 또렷해졌다.
- 즉 최근 신호상 줄여줘야 하는 것은 `결정`뿐 아니라 `결정을 고객/세일즈/서포트/경영진에게 안전하게 설명하고 override 이유를 방어하는 운영 비용`이다.

## 제품 wedge
"고객 피드백 저장소"가 아니라 **support/churn/request/commitment를 customer-level evidence board와 weekly operating artifact로 바꾸고, sales/customer-facing expectation pressure까지 흡수하는 decision system**.

## 하지 말아야 할 것
- generic note repository
- full helpdesk replacement
- roadmap system-of-record
- benchmark product first
- Jira/Productboard deep integration first

## 성공 판단 기준
- 팀이 weekly brief를 실제 회의 artifact로 사용한다.
- 무엇이 악화됐는지 / 무엇이 위험한지 / 왜 우선순위가 바뀌었는지 / 무엇을 아직 약속하면 안 되는지가 한 장에서 읽힌다.
- customer-level evidence board가 account context를 설명하는 기본 화면이 된다.
- customer-safe update draft가 CSM/founder 커뮤니케이션에 실제로 쓰인다.
- `what should we build next?` 질문에 linked evidence 기반으로 답을 시작할 수 있다.
- commitments를 설명하는 데 쓰는 운영 시간이 줄었다는 반응이 나온다.
- sales/CS가 enterprise 고객의 날짜 요구나 계약성 expectation에 답할 때 ad-hoc 설명 대신 재사용 가능한 explanation pack을 쓴다.
