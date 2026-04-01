# Primary Idea — Voice-of-Customer Repository

**Status**: Active primary idea  
**Updated**: 2026-04-02

## One-line definition
초기 B2B SaaS 팀의 support / churn / feature request / customer commitment 데이터를 **월요일 아침 의사결정 브리프**로 바꿔주는 decision layer.

## 핵심 문제
팀은 feedback가 없는 게 아니라 너무 많다. 문제는 그 evidence가 흩어져 있고, 무엇이 진짜 product problem인지/어떤 세그먼트가 위험한지/무엇을 말하거나 만들지 결정하는 레이어가 없다.

## 누구를 위한 제품인가
- 10~100명 B2B SaaS 팀
- founder-led product / sales 조직
- support와 churn signal은 많지만 weekly review가 약한 팀

## 가장 중요한 pain
1. raw request가 쌓이지만 decision queue로 번역되지 않는다.
2. support / churn / sales / commitment evidence가 분리되어 보인다.
3. roadmap theme와 dated promise를 안전하게 분리하지 못한다.
4. 주간 회의 전에 사람이 여러 시스템을 오가며 다시 판단한다.

## 제품이 제공해야 하는 핵심 결과물
- weekly decision brief
- what got worse this week
- segment at risk
- commitment risk this quarter
- now/next/later-safe external update draft

## 왜 지금 이 아이디어를 유지하는가
- 신호 밀도가 가장 높다.
- pain이 개인 productivity가 아니라 팀 의사결정 문제다.
- 출력물이 명확하고 검증 가능하다.
- B2B 팀 단위 구독 모델이 자연스럽다.

## 제품 wedge
"고객 대화 저장소"가 아니라 **support/churn/request/commitment를 decision artifact로 바꾸는 weekly operating layer**.

## 하지 말아야 할 것
- generic note repository
- full helpdesk replacement
- roadmap system-of-record
- benchmark product first
- Jira/Productboard deep integration first

## 성공 판단 기준
- 팀이 weekly brief를 실제 회의 artifact로 사용한다.
- 무엇이 악화됐는지/무엇이 위험한지 한 장에서 읽힌다.
- date promise를 덜 위험하게 만드는 customer-safe update draft가 유용하다는 반응이 나온다.
