# Platform Collection Status

| Platform | Status | Notes |
|---|---|---|
| Reddit | Partial | 반복 pain 패턴 정리 완료. 직접 게시글 추출은 bot/security block으로 실패. |
| Threads | Blocked | direct source collection 실패. Threads-origin 자료는 차기 루프에서 별도 우회/도구 복구 필요. |
| X | Partial | 반복 수요 패턴 및 검색 링크 정리 완료. 개별 포스트 추출은 API/tool 제한으로 미완. |

## Current blockers
- `web_search` / `web_extract`: 401 Invalid API key
- Browser route: Reddit network security block, DuckDuckGo captcha, Google/Bing challenge
