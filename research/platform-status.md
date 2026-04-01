# Platform Collection Status

| Platform | Status | Notes |
|---|---|---|
| Reddit | Partial-Strong | This loop's best Reddit recoveries came from **Yahoo indexed Reddit snippets**. Fresh snippets showed teams still using Google Forms + spreadsheets for intake, checking spreadsheets weekly, pushing ProductBoard insights into Jira, trying to tie dollars/resource time back to requests, and struggling when enterprise request tracking lives in multiple spreadsheets. |
| Threads | Weak Partial | Re-tested with the focused Yahoo query `site:threads.net creator invoice payment follow up brand deal`; Yahoo returned **no results** again. Threads still adds little usable signal for this loop's creator payment workflow research. |
| X | Partial | Direct reading remains constrained, but Yahoo indexed snippets added useful net-new signal this loop: `decision problem, not feedback problem`, multi-tool Monday triage across support/Intercom/Slack/Salesforce, churn benchmark curiosity, unit-economics pressure, automated reminder ideas, and creator late-payment / underpayment / ghosting pain. |
| web_search / web_extract | Blocked | Re-tested this loop; both still return `401 Invalid API key`. |

## Current blockers
- `web_search` / `web_extract`: `401 Invalid API key` again this loop
- Direct Reddit live-page verification remains unreliable from this environment even when URLs are known
- X / Threads direct reading still hits login wall, captcha, or anti-bot friction
- Threads indexed coverage remains weak for focused product-idea discovery; the targeted creator invoice/payment query again returned Yahoo **zero results**
- Yahoo pages can still be ad-heavy, so browser snapshots/vision remain the practical fallback for readable snippets

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
  - teams still collect feature requests through Google Forms / spreadsheets with weekly review rituals
  - PM teams push insights from Slack / email / meetings into ProductBoard and then into Jira, showing that the workflow is still cross-tool and manual
  - some teams explicitly want to tie dollars or resource time back to feature requests and track which customers asked for them
  - enterprise-client request tracking becomes messy enough that multiple spreadsheets distort prioritization and roadmap intent
- **X / Yahoo indexed snippets**
  - founders do not have a feedback shortage; they have a decision problem once support, churn, and NPS signals pile up
  - PMs still spend Monday morning hopping across support tickets, Intercom, Slack, and Salesforce before deciding what matters
  - some operators want one Monday-morning view, while others ask whether their churn is normal versus peers
  - churn pressure is linked to unit economics (`7% churn`, `$20 ARPU`, CAC ceiling), which raises the cost of bad prioritization
  - creator/freelancer payment pain keeps showing up as awkward chasing, automated reminder demand, late payments, underpayments, and ghosting
- **Threads / Yahoo**
  - the focused creator payment query again produced zero usable indexed results, so Threads remains a blocker signal rather than a product-signal source

## Reliability notes
- **High confidence**: Yahoo query returned a readable URL + snippet in the same run
- **Medium confidence**: browser-rendered snippet captured clearly, but direct destination verification stayed blocked
- **Low confidence**: generic or low-context indexed result, especially on Threads
