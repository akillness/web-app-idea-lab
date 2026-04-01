# Platform Collection Status

| Platform | Status | Notes |
|---|---|---|
| Reddit | Partial | Direct browser/curl access blocked by Reddit network policy. Search-indexed snippets via Brave/Yahoo were recoverable and now linked in survey docs. |
| Threads | Weak Partial | Direct page access lands on login wall. Yahoo indexed results are mostly generic/low-context, so usable signal quality is poor. |
| X | Partial | Direct in-browser reading is constrained, but Yahoo indexed snippets produced usable post-level evidence this loop. |
| web_search / web_extract | Blocked | Both still return `401 Invalid API key`. |

## Current blockers
- `web_search` / `web_extract`: `401 Invalid API key`
- Reddit direct access: browser + curl both hit network/security block
- X / Threads direct reading: login wall, captcha, or anti-bot friction
- Brave browser path sometimes escalates to captcha; usable results were inconsistent

## This loop's fallback that worked
1. Use Yahoo Search HTML results for `site:x.com ...` and selected `site:reddit.com ...` queries.
2. Use Brave Search HTML only when it returns indexed snippets without captcha; treat as opportunistic, not reliable.
3. Record every recovered post URL as `indexed snippet`, not `directly verified source`, unless the raw post page was actually opened.

## Reliability notes
- **High confidence**: URL existence + search-indexed snippet text recovered in same run
- **Medium confidence**: platform inferred from search result but original page not opened
- **Low confidence**: generic Threads result pages with almost no snippet context
