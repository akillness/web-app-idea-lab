# Platform Collection Status

| Platform | Status | Notes |
|---|---|---|
| Reddit | Partial-Strong | Direct live Reddit page access is still inconsistent, but this loop recovered usable pain posts through Yahoo indexed Reddit results plus prior PullPush-style mirror recovery. Best source again this loop, especially for enterprise commitment, roadmap-date pressure, and `product commitments` process pain. |
| Threads | Weak Partial | Re-tested with targeted `site:threads.net` searches; creator invoice/payment query again produced zero usable Yahoo results, and no meaningful net-new signals appeared for VoC/churn/support either. |
| X | Partial | Direct reading remains constrained, but Yahoo indexed snippets plus browser-rendered Yahoo result capture produced usable evidence for churn analysis, Monday-morning review workflow, multi-dataset evidence cleanup, and creator payment-follow-up timing pain. |
| web_search / web_extract | Blocked | Re-tested this loop; both still return `401 Invalid API key`. |

## Current blockers
- `web_search` / `web_extract`: `401 Invalid API key` (confirmed again this loop)
- Direct Reddit page fetches remain unreliable from this environment even when post URLs are known
- X / Threads direct reading: login wall, captcha, or anti-bot friction
- Threads indexed coverage remains weak for focused product-idea discovery; this loop's creator invoice/payment query returned Yahoo **zero results** rather than usable organic snippets
- Yahoo X searches can still be ad-heavy, so browser vision was useful to separate ads from organic payment-chasing results
- `curl`/direct HTML fetches were not dependable here for search-result extraction, so browser-based Yahoo snapshots were the reliable fallback

## This loop's fallback that worked
1. Use **PullPush Reddit mirror** for Reddit submission discovery and quote extraction.
2. Use **Yahoo Search HTML indexed snippets** for `site:x.com ...` and `site:threads.net ...` queries.
3. Use **browser-based Yahoo search snapshots** when tool/API access is blocked and direct terminal fetches are flaky.
4. Label evidence explicitly:
   - `PullPush mirror`: mirror/indexed Reddit recovery, not live-page verification
   - `Yahoo indexed snippet`: search snippet + URL recovery, not direct X/Threads post verification
5. Prefer workflow-specific queries over generic idea terms:
   - VoC side: `support tickets`, `feature request`, `customer support`, `churn`, `Monday morning`, `enterprise commitments`
   - Creator side: `deliverables`, `invoice`, `payment follow-up`, `overdue`, `brand deal status`, `WhatsApp`

## This loop's strongest recoveries
- **Reddit / PullPush mirror**
  - support teams forward unstructured customer requests to product/dev, creating roadmap chaos
  - customer-success teams say valuable insights are buried in support conversations with no systematic extraction layer
  - churn reduction advice repeatedly points to capturing reasons, segmenting by ARR/ICP, and linking feedback to product changes
  - creator / influencer / UGC communities still manage deals in spreadsheets + Notion + email, especially around deliverables and payment status
  - creators repeatedly mention 30/60/90-day payment windows, repeated follow-up, and fear of not getting paid after delivery
- **Reddit / Yahoo indexed snippets**
  - PM teams explicitly describe too many enterprise deals and too many feature requests, forcing quarterly prioritization between commitments
  - PMs ask how to track customer commitments with deadlines once promises are made to close business
  - enterprise SaaS PMs describe customers demanding roadmap dates even when the feature is not near-term, reinforcing the need for commitment-risk tracking rather than raw request logging
  - creators still ask basic first-deal invoicing questions, which suggests invoice workflow setup is still under-structured
  - creators repeatedly treat usage-rights pricing as ambiguous and negotiable rather than stored, reusable deal memory
- **X / Yahoo indexed snippets**
  - founders know churn rate but not **why** customers leave because evidence sits across surveys, support tickets, and Stripe fields
  - some founders also want to know whether churn is `normal`, which shows benchmark curiosity, but the operational pain still starts with fragmented evidence
  - PMs still spend Monday morning manually reading support tickets, Slack complaints, and churn notes to guess priorities
  - another X snippet now explicitly frames the desired output as **one Monday-morning view** showing what is healthy, what is at risk, and what needs immediate attention
  - churn analysis examples still involve **hundreds of customers, hundreds of support tickets, activity logs, and messy datasets**, which reinforces the value of evidence cleanup before decision-making
  - creator/freelancer invoice chasing is explicit enough that some founders are productizing follow-up scripts and recovery workflows
  - creators still send pseudo-invoices through WhatsApp/chat instead of structured invoice systems
  - a fresh creator-payment framing showed up again: freelancers do not want more tabs; they want money to land on time, which reinforces collections visibility over generic CRM breadth
- **X / browser-rendered indexed snippets**
  - one visible result says freelancers lose money to late payments because nobody followed up at the right time
  - another says the hard part is not sending the invoice but chasing the payment

## Reliability notes
- **High confidence**: URL + specific snippet text recovered in the same run, or PullPush mirror content directly recovered
- **Medium confidence**: indexed URL recovered and pain inferred from snippet/vendor-led post
- **Low confidence**: generic or low-context indexed result, especially on Threads
