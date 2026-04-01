# Develop File — Churn Decision Copilot

**Idea status**: Derived candidate  
**Purpose**: churn dashboard가 아니라 churn reason / segment / avoidability / unit-econ impact를 decision artifact로 바꾸는 MVP 개발 문서.

## 1. Product goal
단순 churn rate를 넘어서, 왜 이탈이 생겼고 어떤 조치가 필요한지 weekly decision surface로 보여준다.

## 2. ICP
- B2B SaaS founder
- CS lead
- PM
- retention pressure가 있는 small SaaS team

## 3. MVP promise
사용자는 churn/cancellation/support evidence를 넣으면 아래를 얻어야 한다.
- avoidable vs non-actionable churn split
- segment별 churn reason cluster
- ARR / lifecycle / ICP importance context
- recommended retention actions

## 4. Core flow
1. churn notes / survey / support evidence 업로드
2. reason extraction
3. segment + ARR context 연결
4. avoidability 판단
5. weekly churn decision brief 생성

## 5. Main screens
- Churn Inbox
- Reason Cluster Board
- At-Risk Segment View
- Weekly Churn Brief

## 6. Required entities
- `churn_records`
- `reason_clusters`
- `accounts`
- `risk_items`
- `retention_actions`

## 7. MVP rules
- rate chart보다 reason/action 우선
- source evidence 필수
- ARR/ICP/lifecycle context를 optional but visible하게
- benchmark 기능은 제외

## 8. Build order
1. churn record intake
2. reason extraction
3. cluster board
4. weekly brief

## 9. Success criteria
- founder가 churn meeting 전에 이 문서를 먼저 본다.
- avoidable churn이 실제 action item으로 연결된다.
- churn dashboard보다 더 useful하다는 피드백 확보

## 10. Key risk
standalone 제품으로는 intake breadth가 약할 수 있다. VoC module로 붙는 형태가 더 자연스러울 수 있다.
