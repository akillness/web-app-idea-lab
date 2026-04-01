# Develop File — Support-to-Product Decision Hub

**Idea status**: Derived candidate  
**Purpose**: support/CS inbound를 그대로 backlog에 넣지 않고, decision-ready intake layer로 바꾸는 MVP 개발 문서.

## 1. Product goal
support, CS, sales에서 들어오는 요청을 dedupe하고 context를 붙여서 product decision queue로 바꾼다.

핵심 질문:
1. 지금 들어오는 요청 중 무엇이 반복되는가?
2. 어떤 요청이 실제 product problem이고 어떤 것은 one-off인가?
3. 누가 요청했고 어떤 account importance가 붙는가?
4. planning queue로 넘겨야 할 것은 무엇인가?

## 2. ICP
- B2B SaaS 팀의 PM / support lead / founder
- Jira/Productboard/Spreadsheet를 같이 쓰는 팀
- support-origin request noise가 큰 팀

## 3. MVP promise
사용자는 raw inbox를 넣고 아래 산출물을 받아야 한다.
- normalized request list
- duplicate cluster
- account/value-aware prioritization suggestion
- planning handoff queue

## 4. Core flow
1. ticket/note/request 업로드
2. request extraction
3. duplicate merge + canonical issue 생성
4. impact/effort/requester/account context 정리
5. planning-ready queue 생성

## 5. Main screens
- Intake Inbox
- Duplicate Cluster View
- Priority Queue
- Planning Handoff Export

## 6. Required entities
- `requests`
- `request_clusters`
- `accounts`
- `priority_scores`
- `handoff_items`

## 7. MVP rules
- execution backlog와 discovery queue 분리
- source evidence 유지
- ARR/account importance를 optional field로 수용
- Jira sync 없이 export-first

## 8. Build order
1. intake
2. dedupe clustering
3. priority scoring
4. export queue

## 9. Success criteria
- support-origin noise가 줄었다는 피드백
- weekly planning 전에 사람이 정리하는 시간이 감소
- duplicate request 정리가 유용하다는 반응

## 10. Key risk
Productboard/Jira 보조툴처럼만 보이면 가치가 약해진다. decision translation이 핵심이어야 한다.
