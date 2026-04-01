# Platform Collection Status

| Platform | Status | Notes |
|---|---|---|
| Reddit | Partial-Strong | This loop's best Reddit recoveries again came from **Yahoo indexed Reddit snippets**. Net-new snippets showed not just spreadsheet intake but also **fill-in-the-blank JTBD request templates** and **JIRA grooming fields like area / impact / effort**, which sharpens the VoC wedge toward structured intake + decision prep. |
| Threads | Weak Partial | Re-tested with the focused Yahoo query `site:threads.net creator invoice payment follow up brand deal`; Yahoo returned **no results** again. Threads still adds little usable signal for this loop's creator payment workflow research. |
| X | Partial | Direct reading remains constrained, but Yahoo indexed snippets added useful net-new signal this loop: `decision problem, not feedback problem`, creator invoice-chasing framed as an explicit **day 3 / day 7 / day 30** follow-up cadence, persistent `late payment / underpayment / ghosting`, and even **WhatsApp-style invoicing** that highlights workflow immaturity. |
| web_search / web_extract | Blocked | Re-tested this loop; both still return `401 Invalid API key`. |

## Current blockers
- `web_search` / `web_extract`: `401 Invalid API key` again this loop
- Direct Reddit live-page verification remains unreliable from this environment even when URLs are known
- X / Threads direct reading still hits login wall, captcha, or anti-bot friction
- Threads indexed coverage remains weak for focused product-idea discovery; the targeted creator invoice/payment query again returned Yahoo **zero results**
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
- **X / Yahoo indexed snippets**
  - founders do not have a feedback shortage; they have a decision problem once support, churn, and NPS signals pile up
  - creator/freelancer payment pain keeps showing up as awkward chasing, automated reminder demand, late payments, underpayments, and ghosting
  - new this loop: invoice chasing is explicit enough to show a **day 3 / day 7 / day 30** sequence demand
  - new this loop: some creators still invoice in **WhatsApp message** format, which points to invoice-readiness / professionalism gaps before collections even begin
- **Threads / Yahoo**
  - the focused creator payment query again produced zero usable indexed results, so Threads remains a blocker signal rather than a product-signal source

## Reliability notes
- **High confidence**: Yahoo query returned a readable URL + snippet in the same run
- **Medium confidence**: browser-rendered snippet captured clearly, but direct destination verification stayed blocked
- **Low confidence**: generic or low-context indexed result, especially on Threads
