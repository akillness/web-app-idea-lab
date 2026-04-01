# Develop File — Creator Collections Assistant

**Idea status**: Derived candidate  
**Purpose**: creator CRM보다 더 좁은 collections-first wedge를 위한 MVP 개발 문서.

## 1. Product goal
크리에이터/프리랜서가 연체/미수금 회수 과정을 체계적으로 관리하게 한다.

핵심 질문:
1. 오늘 follow-up 해야 할 invoice는 무엇인가?
2. 누구(AP/project owner/intermediary)에게 보내야 하는가?
3. 현재 단계는 reminder / escalation / stop-work 중 무엇인가?
4. 어떤 clause/terms 미비가 회수를 늦추는가?

## 2. ICP
- 솔로 크리에이터
- UGC creator
- invoice follow-up를 수동으로 하는 freelancer

## 3. MVP promise
- today collections queue
- overdue cadence view
- promise missed tracker
- next-step recommendation

## 4. Core flow
1. invoice/deal 등록
2. due date, promised date, AP contact 입력
3. system이 day 3/day 7/day 30 cadence 생성
4. user가 follow-up 수행/기록
5. paid / underpaid / escalated 종료

## 5. Main screens
- Today Queue
- Overdue Buckets
- Deal Collections Detail
- Policy/Clause Checklist

## 6. Required entities
- `collection_cases`
- `contacts`
- `followup_steps`
- `promises`
- `policy_flags`

## 7. MVP rules
- auto-send보다 manual tracking 우선
- routing memory(AP + owner) 우선
- promised date miss를 first-class signal로 취급
- underpaid / ghosted / booked-not-paid 상태 구분

## 8. Build order
1. case tracking
2. cadence queue
3. state transitions
4. next-step recommendation

## 9. Success criteria
- 사용자가 시트 대신 오늘의 회수 큐를 이 제품에서 본다.
- follow-up timing이 유용하다는 반응이 나온다.
- underpaid/ghosted 구분이 가치 있다고 평가된다.

## 10. Key risk
너무 좁아서 총 시장이 작아 보일 수 있다. 하지만 초반 wedge는 좁을수록 강하다.
