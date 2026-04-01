# Platform Collection Status

| Platform | Status | Notes |
|---|---|---|
| Reddit | Partial-Strong | This loop's best Reddit recoveries came from **Yahoo Japan indexed Reddit snippets** after Yahoo global stayed unreliable. Net-new snippets strengthened not just spreadsheet intake but also roadmap-language pain: **now/next/later only creates near-term commitments**, **customers still ask "when is later?" even after timeline disclaimers**, and **NOW/NEXT/LATER roadmaps can still feel unclear or non-committal to SaaS customers**. Prior signals around **fill-in-the-blank JTBD request templates**, **JIRA grooming fields like area / impact / effort**, **Productboard being used mainly for quarterly planning instead of live discovery**, **quarterly reprioritization between customer commitments**, **high-level roadmap + release-plan + progress-report language**, **roadmap ≠ release plan**, **public roadmaps should avoid dates unless delivery confidence is proven**, and **real SaaS release cadence can be every 2 weeks** still held. `r/freelance` evidence on **pre-due reminders**, **late-fee clauses**, **hold-work-until-paid**, and **AP-list delay pressure** remains relevant. |
| Threads | Weak Partial | Re-tested via **Yahoo Japan**. The broad creator-payment query no longer returned zero; it surfaced **one indexed Threads result** — `@counselforcreators` — with a payment-clause snippet emphasizing **explicit due date + late fee**. That is still **weak / directional evidence**, not community-level workflow breadth, but it is better than a hard zero. |
| X | Partial | Direct reading remains constrained, but Yahoo Japan indexed snippets still added useful signal: creator invoice-chasing framed as an explicit **day 3 / day 7 / day 30** follow-up cadence, persistent `late payment / underpayment / ghosting`, **professional invoice template + net 30 + late fee + auto-reminder** framing, **WhatsApp-style invoicing**, and a fresh structural clue that **late payments often come from weak payment systems, not only bad clients**. That pushes the creator backup further toward payment-system clarity rather than generic CRM. |
| web_search / web_extract | Blocked | Re-tested this loop; both still return `401 Invalid API key`. |

## Current blockers
- `web_search` / `web_extract`: `401 Invalid API key` again this loop
- Direct Reddit live-page verification remains unreliable from this environment even when URLs are known
- X / Threads direct reading still hits login wall, captcha, or anti-bot friction
- Yahoo global search was flaky from this environment; **Yahoo Japan browser search** became the more reliable fallback this loop
- Threads indexed coverage remains weak for focused product-idea discovery; Yahoo Japan surfaced only **one** relevant creator-payment result, so coverage is still too thin to treat as strong evidence
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
- **Reddit / Yahoo indexed snippets**
  - teams still collect feature requests through Google Forms + spreadsheets with weekly review rituals
  - PM teams push insights from Slack / email / meetings into ProductBoard and then into Jira, showing that the workflow is still cross-tool and manual
  - some teams explicitly want to tie dollars or resource time back to feature requests and track which customers asked for them
  - enterprise-client request tracking becomes messy enough that multiple spreadsheets distort prioritization and roadmap intent
  - new this loop: some teams formalize intake with a **fill-in-the-blank JTBD template** to stop solution-first requests
  - new this loop: some teams still groom raw requests in **JIRA using area / impact / effort fields**, showing that decision prep is still manual
  - new this loop: some PMs say **Productboard works mostly for quarterly planning but is hard for actual discovery / backlog weighing**
  - new this loop: some teams explicitly avoid locking scope and dates more than **90 days** in advance, and even a 3-month roadmap can shift every **two weeks**
  - new this loop: some teams have **too many deals and too many feature requests**, so Sales/CSM reprioritize commitments **every quarter**
  - new this loop: one workaround for unrealistic dates is **high-level roadmap + release/sprint plan + progress reports** instead of hard delivery promises
  - new this loop: some PMs explicitly distinguish **roadmap themes** from **release plans**, warning that a roadmap is not a start/end-date timeline
  - new this loop: one snippet says a **public roadmap should stay at now / next / soon / later** level and avoid dates unless the team has a proven delivery history
  - new this loop: one release-planning snippet describes **shipping features as soon as ready** with a concrete **2-week SaaS release cadence**, reinforcing how fast internal shipping rhythm can diverge from customer-facing commitment language
  - new this loop: **now/next/later only creates near-term commitments**, which clarifies why a roadmap surface still needs a separate commitment/risk layer
  - new this loop: even when teams say **"this does not correspond with a literal timeline,"** customers still ask **when "later" actually means**, so disclaimer text alone does not solve expectation management
  - new this loop: some SaaS teams report that **NOW/NEXT/LATER roadmaps still feel low-clarity / low-commitment** to customers, which strengthens the need for a safer external update mode than generic roadmap buckets
  - new this loop on `r/freelance`: some operators send a **friendly reminder a week before due date**, some send another **day before due date** and enforce a **20% late fee**, some explicitly **pause more work until the invoice is paid**, and some note that small vendors get pushed to the **bottom of the AP list**
- **X / Yahoo indexed snippets**
  - founders do not have a feedback shortage; they have a decision problem once support, churn, and NPS signals pile up
  - creator/freelancer payment pain keeps showing up as awkward chasing, automated reminder demand, late payments, underpayments, and ghosting
  - new this loop: invoice chasing is explicit enough to show a **day 3 / day 7 / day 30** sequence demand
  - new this loop: a **professional invoice template with payment terms, late fees, and auto-reminders** is explicitly framed as speeding collections
  - new this loop: some creators still invoice in **WhatsApp message** format, which points to invoice-readiness / professionalism gaps before collections even begin
  - new this loop: at least one indexed X result reframed the root cause as **weak payment systems, not just bad clients**, nudging the creator backup toward clause/setup clarity and system discipline
- **Threads / Yahoo**
  - the broad creator-payment query surfaced one indexed Threads result from **@counselforcreators** about a **solid payment clause** with due date + late fee; still weak evidence, but no longer a complete zero-result lane

## Reliability notes
- **High confidence**: Yahoo query returned a readable URL + snippet in the same run
- **Medium confidence**: browser-rendered snippet captured clearly, but direct destination verification stayed blocked
- **Low confidence**: generic or low-context indexed result, especially on Threads