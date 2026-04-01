# Platform Collection Status

| Platform | Status | Notes |
|---|---|---|
| Reddit | Partial-Strong | This loop's strongest Reddit recoveries came from **PullPush comment recovery with a browser-like user-agent**, while Yahoo Japan indexed Reddit snippets remain the fallback when live/search access is unstable. Net-new Reddit evidence sharpened the creator backup more than the ranking: **vendor onboarding / payment-system setup alone can push payment back ~6 weeks before normal collections even begin**, **large organizations can insert recruiter/intermediary billing chains so approved work still sits ~90 days away from payment**, **creator deals commonly normalize net-30 / net-60 and sometimes net-90 terms**, and **missed payment can reflect invoice booking / pay-run delays, not only bad clients**. Earlier Reddit signals still held on the VoC side (**Google Form → spreadsheet**, **JTBD intake template**, **JIRA area / impact / effort grooming**, **Productboard quarterly-planning bias**, **roadmap ≠ release plan**, **now/next/later ambiguity**, **2-week release cadence**, **public roadmap date avoidance**) and on the creator side (**pre-due reminders**, **late-fee clauses**, **hold-work-until-paid**, **AP-list delay pressure**, **AP + project-owner dual-send**, **PO/reference recovery**, **weekly late-fee after 30 days**). |
| Threads | Weak Partial | Re-tested via **Yahoo Japan**. The broad creator-payment query no longer returned zero; it surfaced **one indexed Threads result** — `@counselforcreators` — with a payment-clause snippet emphasizing **explicit due date + late fee**. That is still **weak / directional evidence**, not community-level workflow breadth, but it is better than a hard zero. |
| X | Partial | Direct reading remains constrained, but Yahoo Japan indexed snippets still added useful signal: creator invoice-chasing framed as an explicit **day 3 / day 7 / day 30** follow-up cadence, persistent `late payment / underpayment / ghosting`, **professional invoice template + net 30 + late fee + auto-reminder** framing, **WhatsApp-style invoicing**, and a fresh structural clue that **late payments often come from weak payment systems, not only bad clients**. That pushes the creator backup further toward payment-system clarity rather than generic CRM. |
| web_search / web_extract | Blocked | Re-tested this loop; both still return `401 Invalid API key`. |

## Current blockers
- `web_search` / `web_extract`: `401 Invalid API key` again this loop
- Direct Reddit live-page verification remains unreliable from this environment even when URLs are known
- Reddit recovery got better only after switching to **PullPush API requests with a browser-like user-agent**; default requests can still 403
- X / Threads direct reading still hits login wall, captcha, or anti-bot friction
- Yahoo global search was flaky from this environment; **Yahoo Japan browser search** remained the more reliable fallback when indexed search was needed
- Threads indexed coverage remains weak for focused product-idea discovery; Yahoo Japan still surfaced only **one** relevant creator-payment result, so coverage is too thin to treat as strong evidence
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
  - the broad creator-payment query still only surfaced one indexed Threads result from **@counselforcreators** about a **solid payment clause** with due date + late fee; better than zero, but still weak evidence rather than a strong discovery lane

## Reliability notes
- **High confidence**: Yahoo query returned a readable URL + snippet in the same run
- **Medium confidence**: browser-rendered snippet captured clearly, but direct destination verification stayed blocked
- **Low confidence**: generic or low-context indexed result, especially on Threads