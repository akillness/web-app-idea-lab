# Platform Collection Status

| Platform | Status | Notes |
|---|---|---|
| Reddit | Partial-Strong | Direct live Reddit page access is still inconsistent, but this loop recovered multiple usable pain posts through the PullPush Reddit mirror plus indexed URLs. Best source this loop. |
| Threads | Weak Partial | Re-tested with targeted `site:threads.net` searches; still no meaningful net-new signals for VoC/churn/support or creator payment ops. |
| X | Partial | Direct reading remains constrained, but Yahoo indexed snippets again produced usable post-level evidence for churn analysis, Monday-morning review workflow, and creator invoice/payment pain. |
| web_search / web_extract | Blocked | Re-tested this loop; both still return `401 Invalid API key`. |

## Current blockers
- `web_search` / `web_extract`: `401 Invalid API key` (confirmed again this loop)
- Direct Reddit page fetches remain unreliable from this environment even when post URLs are known
- X / Threads direct reading: login wall, captcha, or anti-bot friction
- Threads indexed coverage remains weak for focused product-idea discovery

## This loop's fallback that worked
1. Use **PullPush Reddit mirror** for Reddit submission discovery and quote extraction.
2. Use **Yahoo Search HTML indexed snippets** for `site:x.com ...` and `site:threads.net ...` queries.
3. Label evidence explicitly:
   - `PullPush mirror`: mirror/indexed Reddit recovery, not live-page verification
   - `Yahoo indexed snippet`: search snippet + URL recovery, not direct X/Threads post verification
4. Prefer workflow-specific queries over generic idea terms:
   - VoC side: `support tickets`, `feature request`, `customer support`, `churn`, `Monday morning`, `enterprise commitments`
   - Creator side: `deliverables`, `invoice`, `payment follow-up`, `overdue`, `brand deal status`, `WhatsApp`

## This loop's strongest recoveries
- **Reddit / PullPush mirror**
  - support teams forward unstructured customer requests to product/dev, creating roadmap chaos
  - customer-success teams say valuable insights are buried in support conversations with no systematic extraction layer
  - churn reduction advice repeatedly points to capturing reasons, segmenting by ARR/ICP, and linking feedback to product changes
  - creator / influencer / UGC communities still manage deals in spreadsheets + Notion + email, especially around deliverables and payment status
  - creators repeatedly mention 30/60/90-day payment windows, repeated follow-up, and fear of not getting paid after delivery
- **X / Yahoo indexed snippets**
  - founders know churn rate but not **why** customers leave because evidence sits across surveys, support tickets, and Stripe fields
  - PMs still spend Monday morning manually reading support tickets, Slack complaints, and churn notes to guess priorities
  - creator/freelancer invoice chasing is explicit enough that some founders are productizing follow-up scripts and recovery workflows
  - creators still send pseudo-invoices through WhatsApp/chat instead of structured invoice systems

## Reliability notes
- **High confidence**: URL + specific snippet text recovered in the same run, or PullPush mirror content directly recovered
- **Medium confidence**: indexed URL recovered and pain inferred from snippet/vendor-led post
- **Low confidence**: generic or low-context indexed result, especially on Threads
