# Platform Collection Status

| Platform | Status | Notes |
|---|---|---|
| Reddit | Partial-Strong | This loop's best Reddit recoveries again came from **Yahoo indexed Reddit snippets**. Net-new snippets showed not just spreadsheet intake but also **fill-in-the-blank JTBD request templates**, **JIRA grooming fields like area / impact / effort**, **Productboard being used mainly for quarterly planning instead of live discovery**, **quarterly reprioritization between customer commitments**, **high-level roadmap + release/sprint plan + progress report** as the no-hard-date workaround, and `r/freelance` collections rituals like **pre-due reminders**, **late-fee clauses**, **hold-work-until-paid**, and **AP-list delay pressure**. |
| Threads | Weak Partial | Re-tested with the focused Yahoo query `site:threads.net creator invoice payment follow up brand deal`; Yahoo returned **no results** again. A narrower quoted query `site:threads.net "creator invoice" "follow up" "brand deal"` also returned **no results**. Threads still adds little usable signal for this loop's creator payment workflow research. |
| X | Partial | Direct reading remains constrained, but Yahoo indexed snippets still added useful signal this loop: `decision problem, not feedback problem`, creator invoice-chasing framed as an explicit **day 3 / day 7 / day 30** follow-up cadence, persistent `late payment / underpayment / ghosting`, **professional invoice template + net 30 + late fee + auto-reminder** framing, and **WhatsApp-style invoicing** that highlights workflow immaturity. Fresh creator workflow detail this loop came more from Reddit than X. |
| web_search / web_extract | Blocked | Re-tested this loop; both still return `401 Invalid API key`. |

## Current blockers
- `web_search` / `web_extract`: `401 Invalid API key` again this loop
- Direct Reddit live-page verification remains unreliable from this environment even when URLs are known
- X / Threads direct reading still hits login wall, captcha, or anti-bot friction
- Threads indexed coverage remains weak for focused product-idea discovery; the targeted creator invoice/payment query again returned Yahoo **zero results**, and the narrower quoted variant did too
- Yahoo pages can still be ad-heavy, so browser snapshots/vision remain the practical fallback for readable snippets
- Some Yahoo X queries remain ad-heavy or noisy; the practical workaround is narrower quoted queries (for example `"decision problem" "feedback problem"`) rather than broad workflow terms

## This loop's fallback that worked
1. Use **Yahoo indexed Reddit snippets** for Reddit workflow research when live page access is flaky.
2. Use **Yahoo indexed X snippets** for founder / PM / creator workflow capture.
3. Use **browser snapshots + vision** to skip ad-heavy result pages and recover visible organic snippets.
4. Label evidence explicitly:
   - `Yahoo indexed snippet`: search snippet + URL recovery, not direct post verification
   - `browser-rendered indexed snippet`: snippet recovered from a rendered search page when raw extraction is unreliable
5. Prefer workflow-language queries over generic idea words:
   - VoC side: `support tickets`, `feature requests`, `ProductBoard`, `Jira`, `Monday morning`, `churn`, `decision problem`, `resource time`
   - Creator side: `late payments`, `follow up`, `invoice reminder`, `underpayment`, `ghosting`, `payment terms`

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
  - new this loop on `r/freelance`: some operators send a **friendly reminder a week before due date**, some send another **day before due date** and enforce a **20% late fee**, some explicitly **pause more work until the invoice is paid**, and some note that small vendors get pushed to the **bottom of the AP list**
- **X / Yahoo indexed snippets**
  - founders do not have a feedback shortage; they have a decision problem once support, churn, and NPS signals pile up
  - creator/freelancer payment pain keeps showing up as awkward chasing, automated reminder demand, late payments, underpayments, and ghosting
  - new this loop: invoice chasing is explicit enough to show a **day 3 / day 7 / day 30** sequence demand
  - new this loop: a **professional invoice template with payment terms, late fees, and auto-reminders** is explicitly framed as speeding collections
  - new this loop: some creators still invoice in **WhatsApp message** format, which points to invoice-readiness / professionalism gaps before collections even begin
- **Threads / Yahoo**
  - the focused creator payment query again produced zero usable indexed results, and the narrower quoted query did too, so Threads remains a blocker signal rather than a product-signal source

## Reliability notes
- **High confidence**: Yahoo query returned a readable URL + snippet in the same run
- **Medium confidence**: browser-rendered snippet captured clearly, but direct destination verification stayed blocked
- **Low confidence**: generic or low-context indexed result, especially on Threads