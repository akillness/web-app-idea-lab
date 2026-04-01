# Platform Collection Status

| Platform | Status | Notes |
|---|---|---|
| Reddit | Partial | Direct browser/curl access is still unreliable. Search-indexed snippets via Yahoo remain the most usable fallback for title + excerpt + URL recovery. |
| Threads | Weak Partial | Direct page access still lands on login wall, and this loop's Yahoo queries returned **0 parseable result blocks** for targeted idea-search queries. |
| X | Partial | Direct reading is still constrained, but Yahoo indexed snippets again produced usable post-level evidence for churn, weekly risk review, and creator payment pain. |
| web_search / web_extract | Blocked | Re-tested this loop; both still return `401 Invalid API key`. |

## Current blockers
- `web_search` / `web_extract`: `401 Invalid API key` (confirmed again this loop)
- Reddit direct access: browser/curl still inconsistent or blocked by platform/network policy
- X / Threads direct reading: login wall, captcha, or anti-bot friction
- Threads indexed coverage remains weak for focused product-idea discovery

## This loop's fallback that worked
1. Use Yahoo Search HTML results for `site:x.com ...` and `site:reddit.com ...` queries.
2. Parse indexed snippets only; label them as `indexed snippet`, not direct verification.
3. Prefer queries with explicit workflow nouns:
   - VoC side: `churn`, `support tickets`, `cancellation`, `Monday view`, `feedback`
   - Creator side: `invoice`, `deposit`, `payment terms`, `overdue`, `WhatsApp`
4. This loop's strongest recoveries were:
   - X indexed snippet: founders know churn rate but not **why** customers leave; the evidence sits in surveys/support tickets/Stripe fields
   - X indexed snippet: founders often do not know whether churn is **normal** without benchmark context
   - X indexed snippet: teams want one **Monday-morning health / risk view** instead of digging through Slack
   - Reddit indexed snippet: cancellation-flow feedback is a **treasure trove of insights** when collected at cancel time
   - Reddit indexed snippet: teams want support workflows inside the customer workflow, not another detached tool
   - X / Reddit indexed snippets: creator payment pain still centers on invoices, deposits, overdue follow-up, and manual chasing

## Reliability notes
- **High confidence**: URL + snippet recovered in the same run
- **Medium confidence**: platform inferred but original page not opened
- **Low confidence**: generic or low-context indexed result, especially on Threads
