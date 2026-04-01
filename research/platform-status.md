# Platform Collection Status

| Platform | Status | Notes |
|---|---|---|
| Reddit | Partial | Direct browser/curl access still blocked by Reddit network policy. Search-indexed snippets via Yahoo remain usable for post title + excerpt + URL recovery. |
| Threads | Weak Partial | Direct page access still lands on login wall. Yahoo indexed results again returned mostly generic or ad-heavy entries with little usable snippet context. |
| X | Partial | Direct in-browser reading is constrained, but Yahoo indexed snippets produced usable post-level evidence again this loop, including founder feedback-decision pain and creator late-payment pain. |
| web_search / web_extract | Blocked | Both still return `401 Invalid API key`. |

## Current blockers
- `web_search` / `web_extract`: `401 Invalid API key`
- Reddit direct access: browser + curl both hit network/security block
- X / Threads direct reading: login wall, captcha, or anti-bot friction
- Yahoo works better than Brave right now, but result quality for Threads is still weak

## This loop's fallback that worked
1. Use Yahoo Search HTML results for `site:x.com ...` and selected `site:reddit.com ...` queries.
2. Treat all recovered social evidence as `indexed snippet`, not `directly verified source`, unless the raw post page was actually opened.
3. Prefer X queries that contain explicit workflow nouns (`support tickets`, `churn`, `NPS`, `invoice`, `late payments`, `WhatsApp`) because they recover higher-context snippets.
4. This loop's strongest recoveries were:
   - X indexed snippet: founders do not have a feedback problem, they have a decision problem
   - X indexed snippet: churn reasons sit in surveys/support tickets/Stripe fields and nobody reads them systematically
   - X indexed snippet: creators still invoice through WhatsApp + bank account text
   - X indexed snippet: late payments / underpayments / ghosting creators are common
   - X indexed snippet: small creative agencies still manage projects over WhatsApp and spreadsheets

## Reliability notes
- **High confidence**: URL existence + search-indexed snippet text recovered in same run
- **Medium confidence**: platform inferred from search result but original page not opened
- **Low confidence**: generic or low-context indexed result, especially on Threads
