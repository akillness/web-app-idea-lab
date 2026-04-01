# Triage
- Problem: Reddit, Threads, X에서 반복적으로 보이는 사용자 pain 신호를 기반으로 웹/앱 제품 아이디어를 발굴하고 실행 가능한 형태로 구조화한다.
- Audience: 인디해커, 초기 스타트업, 1인 운영자, 크리에이터, 소상공인
- Why now: founder-led distribution, creator economy, AI-assisted workflow demand가 커졌고 기존 툴은 point-solution이 많아 통합/실행 레이어가 비어 있다.

## 조사 메모
- `web_search` / `web_extract`는 이번 루프도 `401 Invalid API key`로 실패했다.
- Reddit live page 접근은 여전히 불안정하지만, 이번 루프에서는 **PullPush Reddit mirror**를 통해 커뮤니티 pain 문장을 다수 회수했다.
- X는 direct verification 대신 **Yahoo indexed snippet** 기반으로 회수했다.
- Threads는 `site:threads.net` 기반 재탐색에서도 유의미한 net-new signal을 거의 주지 못했다.
- 따라서 현재 조사 레이어는 `Reddit = PullPush mirror`, `X = indexed snippet`, `Threads = weak/blocked` 조합으로 운영 중이다.
