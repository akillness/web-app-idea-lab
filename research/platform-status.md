# Platform Collection Status

| Platform | Status | Notes |
|---|---|---|
| Reddit | Partial-Strong | This loop's strongest Reddit recoveries again came from **Yahoo Japan indexed Reddit snippets** plus prior **PullPush comment recovery with a browser-like user-agent**. The freshest VoC additions now do four complementary things: one indexed PM result framed **Now as recently shipped through ~2 months out, Next as next quarter, and Later as ~6–12 months**; another multi-year roadmapping snippet framed **now/next/later as a flexibility + intention device rather than a literal schedule**; a ProductManagement result explicitly said teams keep **a separate flow for customer commitments**; and a fresh indexed result said prioritization shifts when work is tied to **external customer commitments, customer shipments, priority company objectives, technology inflections, or market timing**. Another result tied the same issue to business execution by asking whether the business can **close deals, plan effectively, or meet customer commitments**. Together these make it clearer that the product needs not just **bucket-definition / bucket-mode semantics** and a **distinct commitment workflow**, but also an explicit **priority-override rubric** instead of silent exception handling. The creator side still held the strongest payment-stage detail: **PO number reuse on late-payment reminders**, **payment terms and late-fee accrual should already be defined in the contract**, **some freelancers discuss >3-days-late = 1% compounded daily fee rules**, **vendor onboarding / payment-system setup alone can push payment back ~6 weeks**, **large organizations can insert recruiter/intermediary billing chains so approved work still sits ~90 days away from payment**, **creator deals commonly normalize net-30 / net-60 and sometimes net-90 terms**, and **missed payment can reflect invoice booking / pay-run delays, not only bad clients**. Earlier Reddit signals still held on the VoC side (**Google Form → spreadsheet**, **JTBD intake template**, **JIRA area / impact / ef... [truncated]
| Threads | Weak Partial | Re-tested via **Yahoo Japan**. A targeted quoted query (`site:threads.net "payment clause" creator late fee`) surfaced **two indexed results**, but only one was materially useful: `@counselforcreators` with a payment-clause snippet emphasizing **explicit due timing + late fee**. The second result was a more generic contract/dispute clause reference, so Threads remains **weak / directional evidence**, not community-level workflow breadth. |
| X | Partial | Direct reading remains constrained, but Yahoo Japan indexed snippets still added useful signal: creator invoice-chasing framed as an explicit **day 3 / day 7 / day 30** follow-up cadence, persistent `late payment / underpayment / ghosting`, **professional invoice template + net 30 + late fee + auto-reminder** framing, **WhatsApp-style invoicing**, and a directly re-tested result from **Ruul (@ruulnow)** reframing the root cause as **weak payment systems, not only bad clients**. That pushes the creator backup further toward payment-system clarity rather than generic CRM. |
| web_search / web_extract | Blocked | Re-tested this loop; both still return `401 Invalid API key`. |

## Current blockers
- `web_search` / `web_extract`: `401 Invalid API key` again this loop
- Direct Reddit live-page verification remains unreliable from this environment even when URLs are known
- Reddit recovery got better only after switching to **PullPush API requests with a browser-like user-agent**; default requests can still 403
- X / Threads direct reading still hits login wall, captcha, or anti-bot friction
- Yahoo global search was flaky from this environment; **Yahoo Japan browser search** remained the more reliable fallback when indexed search was needed
- Some creator payment queries become too narrow and return hard zeroes (for example `site:reddit.com/r/freelance invoice pay run booked AP PO number late payment`), so broad workflow-language queries plus prior PullPush recovery remain more effective for accounting-stage blockage evidence
- A fresh targeted creator query (`site:reddit.com/r/freelance invoice portal AP instructions late payment`) returned **0 Yahoo Japan results**, so invoice-portal/AP-submission-path evidence is still more design hypothesis than strong social proof
- Threads indexed coverage remains weak for focused product-idea discovery; even a targeted Yahoo Japan query only surfaced **one materially useful** creator-payment result, so coverage is too thin to treat as strong evidence
- Yahoo pages can still be ad-heavy, so browser snapshots/vision remain the practical fallback
- Some X queries still return zero or noisy results until narrowed into quoted pain-language terms

## This loop's fallback that worked
1. Use **Yahoo Japan indexed Reddit snippets** for Reddit workflow research when live page access is flaky.
2. Use **Yahoo Japan indexed X snippets** for founder / PM / creator workflow capture.
3. Use **browser snapshots + vision** to skip ad-heavy result pages and recover visible organic snippets.
4. Label evidence explicitly:
   - `Yahoo indexed snippet`: search snippet + URL recovery, not direct post verification
   - `browser-rendered indexed snippet`: snippet recovered from a rendered search page when raw extraction is unreliable
5. Prefer workflow-language queries over generic idea words:
   - VoC side: `support tickets`, `feature requests`, `ProductBoard`, `Jira`, `Monday morning`, `roadmap`, `now/next/later`, `release plan`, `commitments`
   - Creator side: `late payments`, `follow up`, `invoice reminder`, `underpayment`, `ghosting`, `payment terms`, `late fee`

## This loop's strongest recoveries
- **VoC / discussion-index recoveries**
  - one PM-oriented discussion argued that customer needs should not just fall into Jira tickets; a proper discovery layer needs **complete observability of customer interactions** across calls, presales notes, forum posts, Zendesk tickets, and services interactions
  - one operational discussion described support-origin requests being **triaged with automation + AI** before responsible teams include them in planning/milestones, which reinforces the Monday-morning decision-brief wedge more than a generic repository wedge
  - another discussion argued teams need a **separate support issue queue and project-management issue queue**, because `who reported it / what version / what happened` is structurally different from `what are we building next / who owns it / what branch/version`
  - one older PM discussion explicitly framed both **release schedule** and **product roadmap** as customer-facing commitments, reinforcing that VoC products need a safer communication layer, not just insight storage
  - a fresh Yahoo Japan indexed Reddit result made `now / next / later` more operational by defining **Now as recently shipped through ~2 months out, Next as next quarter, and Later as ~6–12 months**, which is a better default communication scaffold than empty bucket labels
  - another fresh Yahoo Japan indexed Reddit result said work gets reprioritized when it is tied to **external customer commitments, customer shipments, priority company objectives, technology inflections, or market timing**, which strengthens the case for a thin **priority-override layer** rather than a generic scoring-only system
- **Reddit / PullPush recoveries for creator cash ops**
  - some freelancers lose **~6 weeks** before normal collections even start because vendor onboarding and payment-system setup are slow
  - large organizations can insert **recruiter/intermediary billing chains**, so approved work may still sit **~90 days** away from payment
  - creator/sponsor workflows commonly normalize **net-30 / net-60 and sometimes net-90** payment terms, while upfront payment stays uncommon
  - some late invoices are delayed because they were **not properly booked** or missed a pay run, showing that collections visibility needs internal payment-state awareness, not just reminder cadence
  - prior creator signals still held: **pre-due reminders**, **late-fee clauses**, **hold-work-until-paid**, **AP + project-owner dual-send**, **PO/reference recovery**, **professional invoice quality**, and **weak payment systems**
- **X / Yahoo indexed snippets**
  - founders do not have a feedback shortage; they have a decision problem once support, churn, and NPS signals pile up
  - creator/freelancer payment pain keeps showing up as awkward chasing, automated reminder demand, late payments, underpayments, and ghosting
  - invoice chasing is explicit enough to show a **day 3 / day 7 / day 30** sequence demand
  - a **professional invoice template with payment terms, late fees, and auto-reminders** is explicitly framed as speeding collections
  - some creators still invoice in **WhatsApp message** format, which points to invoice-readiness / professionalism gaps before collections even begin
  - at least one indexed X result reframed the root cause as **weak payment systems, not just bad clients**, nudging the creator backup toward clause/setup clarity and system discipline
- **Threads / Yahoo**
  - the targeted quoted query still only surfaced one materially useful indexed Threads result from **@counselforcreators** about a **solid payment clause** with explicit due timing + late fee; a second result existed but was generic contract-clause noise, so Threads remains weak evidence rather than a strong discovery lane
- **Targeted creator zero-result recovery**
  - the query `site:reddit.com/r/freelance invoice portal AP instructions late payment` returned **0 Yahoo Japan results**, so AP-portal/submission-path friction remains plausible but thinly evidenced from current social lanes

## Reliability notes
- **High confidence**: Yahoo query returned a readable URL + snippet in the same run
- **Medium confidence**: browser-rendered snippet captured clearly, but direct destination verification stayed blocked
- **Low confidence**: generic or low-context indexed result, especially on Threads