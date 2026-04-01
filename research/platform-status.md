# Platform Collection Status

| Platform | Status | Notes |
|---|---|---|
| Reddit | Partial-Strong | This loop's strongest Reddit recoveries again came from **Yahoo Japan indexed Reddit snippets** plus prior **PullPush comment recovery with a browser-like user-agent**. The freshest VoC additions now do four complementary things: one indexed PM result framed **Now as recently shipped through ~2 months out, Next as next quarter, and Later as ~6–12 months**; another multi-year roadmapping snippet framed **now/next/later as a flexibility + intention device rather than a literal schedule**; a ProductManagement result explicitly said teams keep **a separate flow for customer commitments**; and a fresh indexed result said prioritization shifts when work is tied to **external customer commitments, customer shipments, priority company objectives, technology inflections, or market timing**. Another result tied the same issue to business execution by asking whether the business can **close deals, plan effectively, or meet customer commitments**. Together these make it clearer that the product needs not just **bucket-definition / bucket-mode semantics** and a **distinct commitment workflow**, but also an explicit **priority-override rubric** instead of silent exception handling. A fresh `Content vs Process` snippet added one more layer: **customer commitments can directly consume strategy time**, so the primary product should expose not just override logic but also the strategy-tax created by commitment handling. The creator side still held the strongest payment-stage detail, and this loop added one more useful nomenclature signal: a Reddit indexed result on `Client asking for a paid invoice?` explicitly described the paid-invoice receipt artifact as **remittance advice**. That strengthens the case for storing proof artifact type rather than a generic proof flag alone. The creator side still held the strongest payment-stage detail: **PO number reuse on late-payment reminders**, **payment terms and late-fee accrual should already be defined in the contract**, **some freelancers discuss >3-days-late = 1% compounded daily fee rules**, **vendor onboarding / payment-system setup alone can push payment back ~6 weeks**, **large organizations can insert recruiter/intermediary billing chains so approved work still sits ~90 days away from payment**, **creator deals commonly normalize net-30 / net-60 and sometimes net-90 terms**, and **missed payment can reflect invoice booking / pay-run delays, not only bad clients**. Fresh indexed snippets also added that some freelancers **invoice in advance so AP has time to process/audit the invoice**, and that **AP navigation depends heavily on whether the direct client understands the internal payment path**. Earlier Reddit signals still held on the VoC side (**Google Form → spreadsheet**, **JTBD intake template**, **JIRA area / impact / ef... [truncated]
| Threads | Weak Partial | Re-tested via **Yahoo Japan**. A targeted quoted query (`site:threads.net "payment clause" creator late fee`) surfaced **three indexed results**, with **two materially useful** creator-payment snippets: `@counselforcreators` on **explicit due timing + late fee**, and `@thetrademarkattorney_` on **adding a late payment clause improving cash flow more than sending more reminders**. The third result was generic conditional-clause noise, so Threads remains **weak / directional evidence**, but it is no longer a one-snippet lane. |
| X | Partial | Direct reading remains constrained. This loop's broad re-test again produced noisy/profile-heavy Yahoo Japan results rather than fresh post-level workflow detail, while the quoted query `site:x.com "late payments" "weak payment systems"` cleanly recovered the single Ruul framing result. The strongest X evidence still remains creator invoice-chasing framed as **day 3 / day 7 / day 30** follow-up cadence, persistent `late payment / underpayment / ghosting`, **professional invoice template + net 30 + late fee + auto-reminder** framing, **WhatsApp-style invoicing**, and the directly re-tested **Ruul (@ruulnow)** snippet reframing the root cause as **weak payment systems, not only bad clients**. X still helps confirm direction, but this loop did not add a ranking-changing organic snippet beyond that framing. |
| web_search / web_extract | Blocked | Re-tested this loop; both still return `401 Invalid API key`. |

## Current blockers
- `web_search` / `web_extract`: `401 Invalid API key` again this loop
- Direct Reddit live-page verification remains unreliable from this environment even when URLs are known
- Reddit recovery got better only after switching to **PullPush API requests with a browser-like user-agent**; default requests can still 403
- X / Threads direct reading still hits login wall, captcha, or anti-bot friction
- Yahoo global search was flaky from this environment; **Yahoo Japan browser search** remained the more reliable fallback when indexed search was needed
- Some creator payment queries become too narrow and return hard zeroes (for example `site:reddit.com/r/freelance invoice pay run booked AP PO number late payment`), so broad workflow-language queries plus prior PullPush recovery remain more effective for accounting-stage blockage evidence
- Fresh creator evidence showed that AP-processing snippets often surface better under queries like `accounts payable`, `process and audit your invoice`, `invoice in advance`, and `direct client` than under generic `late payment` queries alone
- A fresh targeted creator query (`site:reddit.com/r/freelance invoice portal AP instructions late payment`) returned **0 Yahoo Japan results**, so invoice-portal/AP-submission-path evidence is still more design hypothesis than strong social proof
- Threads indexed coverage remains weak for focused product-idea discovery; even after improvement to **2 materially useful results** on the targeted clause query, coverage is still too thin to treat as strong evidence
- Yahoo pages can still be ad-heavy, so browser snapshots/vision remain the practical fallback
- Some X queries still return zero or noisy results until narrowed into quoted pain-language terms; this loop's cleanest X recovery came from an exact quoted query rather than a broad workflow search
- Even when X broad queries return non-zero results, they can degrade into profile pages/help-center results rather than post-level workflow evidence; this loop's X re-test did exactly that

## This loop's fallback that worked
1. Use **Yahoo Japan indexed Reddit snippets** for Reddit workflow research when live page access is flaky.
2. Use **Yahoo Japan indexed X snippets** for founder / PM / creator workflow capture.
3. Use **browser snapshots + vision** to skip ad-heavy result pages and recover visible organic snippets.
4. Label evidence explicitly:
   - `Yahoo indexed snippet`: search snippet + URL recovery, not direct post verification
   - `browser-rendered indexed snippet`: snippet recovered from a rendered search page when raw extraction is unreliable
5. Prefer workflow-language queries over generic idea words:
   - VoC side: `support tickets`, `feature requests`, `ProductBoard`, `Jira`, `Monday morning`, `roadmap`, `now/next/later`, `release plan`, `commitments`
   - Creator side: `late payments`, `follow up`, `invoice reminder`, `underpayment`, `ghosting`, `payment terms`, `late fee`, `accounts payable`, `invoice in advance`, `pay run`, `process and audit your invoice`

## This loop's strongest recoveries
- **VoC / discussion-index recoveries**
  - one PM-oriented discussion argued that customer needs should not just fall into Jira tickets; a proper discovery layer needs **complete observability of customer interactions** across calls, presales notes, forum posts, Zendesk tickets, and services interactions
  - a fresh Yahoo Japan indexed Reddit result (`Content vs Process`) added that **time for strategy can be the first thing lost while trying to meet customer commitments**, which sharpens the primary wedge toward strategy-protection rather than generic prioritization rhetoric
  - one operational discussion described support-origin requests being **triaged with automation + AI** before responsible teams include them in planning/milestones, which reinforces the Monday-morning decision-brief wedge more than a generic repository wedge
  - another discussion argued teams need a **separate support issue queue and project-management issue queue**, because `who reported it / what version / what happened` is structurally different from `what are we building next / who owns it / what branch/version`
  - one older PM discussion explicitly framed both **release schedule** and **product roadmap** as customer-facing commitments, reinforcing that VoC products need a safer communication layer, not just insight storage
  - a fresh Yahoo Japan indexed Reddit result made `now / next / later` more operational by defining **Now as recently shipped through ~2 months out, Next as next quarter, and Later as ~6–12 months**, which is a better default communication scaffold than empty bucket labels
  - another fresh Yahoo Japan indexed Reddit result said work gets reprioritized when it is tied to **external customer commitments, customer shipments, priority company objectives, technology inflections, or market timing**, which strengthens the case for a thin **priority-override layer** rather than a generic scoring-only system
  - one more fresh Yahoo Japan indexed PM result (`Tips for dealing with requestors that don't take 'no'`) added that some commitment conflicts eventually become **an executive decision**, sharpening the need for an explicit **escalation-owner / decision-owner** field instead of only a score or rationale
- **Reddit / PullPush recoveries for creator cash ops**
  - some freelancers lose **~6 weeks** before normal collections even start because vendor onboarding and payment-system setup are slow
  - large organizations can insert **recruiter/intermediary billing chains**, so approved work may still sit **~90 days** away from payment
  - creator/sponsor workflows commonly normalize **net-30 / net-60 and sometimes net-90** payment terms, while upfront payment stays uncommon
  - some late invoices are delayed because they were **not properly booked** or missed a pay run, showing that collections visibility needs internal payment-state awareness, not just reminder cadence
  - prior creator signals still held: **pre-due reminders**, **late-fee clauses**, **hold-work-until-paid**, **AP + project-owner dual-send**, **PO/reference recovery**, **professional invoice quality**, and **weak payment systems**
  - fresh Yahoo Japan indexed Reddit snippets added that **AP may need time to process and audit an invoice**, **invoicing in advance can be necessary just to get into the AP cycle**, and **successful AP navigation depends partly on whether the direct client knows the internal process**
  - this loop's extra creator indexed snippets added that users often need to **separately track the AP contact and the actual invoice destination**, may need to request **payment documentation / receipt** even after a client claims payment was sent, and sometimes operate on a **two-weeks-later re-nudge cadence** after the first overdue follow-up
- **X / Yahoo indexed snippets**
  - founders do not have a feedback shortage; they have a decision problem once support, churn, and NPS signals pile up
  - creator/freelancer payment pain keeps showing up as awkward chasing, automated reminder demand, late payments, underpayments, and ghosting
  - invoice chasing is explicit enough to show a **day 3 / day 7 / day 30** sequence demand
  - a **professional invoice template with payment terms, late fees, and auto-reminders** is explicitly framed as speeding collections
  - some creators still invoice in **WhatsApp message** format, which points to invoice-readiness / professionalism gaps before collections even begin
  - at least one indexed X result reframed the root cause as **weak payment systems, not just bad clients**, nudging the creator backup toward clause/setup clarity and system discipline
- **Threads / Yahoo**
  - the targeted quoted query surfaced **two materially useful** indexed Threads results: **@counselforcreators** on a solid clause with explicit due timing + late fee, and **@thetrademarkattorney_** on late-payment clauses improving cash flow more than reminder intensity; a third result existed but was generic contract-clause noise, so Threads remains weak evidence rather than a strong discovery lane
- **Targeted creator zero-result recovery**
  - the query `site:reddit.com/r/freelance invoice portal AP instructions late payment` returned **0 Yahoo Japan results**, so AP-portal/submission-path friction remains plausible but thinly evidenced from current social lanes

## Reliability notes
- **High confidence**: Yahoo query returned a readable URL + snippet in the same run
- **Medium confidence**: browser-rendered snippet captured clearly, but direct destination verification stayed blocked
- **Low confidence**: generic or low-context indexed result, especially on Threads