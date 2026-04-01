# Build Prompt — Voice-of-Customer Repository

## Purpose
아래 프롬프트는 AI 코딩 에이전트에게 바로 전달해 초기 MVP를 설계/구현하도록 하기 위한 실행 문서다.

## Prompt
```text
Build an MVP for a B2B SaaS product called "Voice-of-Customer Repository".

Goal:
Create a product that helps early-stage SaaS teams turn scattered support, feature-request, and churn evidence into structured weekly decisions.

Important framing:
Optimize the MVP for a Monday-morning review ritual. Users upload the last week's support tickets, churn notes, cancellation reasons, feature-request context, feedback emails, and interview/call notes, then receive a health-and-risk decision brief before the weekly prioritization meeting.
Also support a quarterly planning use case: teams should be able to separate generic feature demand from named customer commitments already made by sales, success, or product, then review which commitments deserve escalation, reaffirmation, de-prioritization, or explicit non-commitment in the next 90 days.
The MVP should also support customer-facing expectation management when hard dates are unrealistic: generate update-ready language using high-level roadmap, release-plan, sprint-plan, or explicit non-commitment framing instead of false certainty.
Keep roadmap themes and release-plan specifics distinct. A roadmap theme must never silently become a dated promise.
Assume now/next/later buckets alone are not enough. Users will still ask "when is later?" so the system should explicitly state why timing is still ambiguous, what is near-term committed, and what is only safe to communicate as a theme or progress update.
Treat roadmap communication maturity as a first-class output. For any customer-facing roadmap or commitment-related item, the MVP must force the agent to classify the safest communication level as one of: now_committed, next_candidate, later_exploratory, release_window_defined, or no_date_safe. Each classification must include a plain-language explanation of what is known, what is not yet firm, and what can be said externally without creating a false promise.
Do not treat now/next/later as empty labels. The MVP must support team-defined bucket semantics, with a sensible default such as: `now = recently shipped through ~2 months out`, `next = next quarter`, `later = ~6–12 months`. Every customer-facing item using these buckets must store both the chosen bucket and the active bucket-definition snapshot used when the wording was generated.
Assume many teams already use Productboard/Jira/spreadsheets for planning, but those tools do not fully solve ongoing discovery, commitment hygiene, or roadmap-volatility communication.

Target users:
- Founders
- Product managers
- Product marketers
- Customer success / support leads
at 10–100 person B2B SaaS teams.

Core problem:
Customer interviews, sales calls, support tickets, churn notes, cancellation surveys, and feature requests are scattered across notes, docs, support tools, Slack, spreadsheets, ProductBoard, Jira, and billing exports. Teams do not have a feedback shortage; they have a decision problem. They can collect data, but they struggle to turn that raw customer signal into recurring pains, objections, feature requests, churn reasons, revenue/segment risk, and decision-ready summaries.

Product wedge:
Do NOT build a generic note-taking app.
Do NOT build a full CRM or helpdesk.
Build an evidence layer that:
1. accepts transcript/text uploads or paste input,
2. extracts structured tags such as segment, ARR/ICP importance, JTBD, pain point, objection, feature request, churn reason, churn risk,
3. preserves the original customer wording plus normalized reasoning,
4. normalizes messy requests into PM-ready fields such as JTBD / use case / desired outcome / impacted area / impact / effort,
5. preserves queue separation between raw support evidence, triaged planning candidates, explicit customer commitments, and execution backlog references,
6. treats named customer commitments as a dedicated operating flow with their own owner, target window, confidence, and risk state,
7. captures when an item is being promoted because of a legitimate priority override such as external customer commitment, customer shipment, priority company objective, technology inflection, or market timing,
8. groups recurring themes,
9. generates a concise Monday-morning decision brief recommending what product/message/support changes deserve attention.

The MVP should help a team answer these Monday-morning questions quickly:
1. What customer problems worsened this week?
2. Which support or feature-request patterns are flooding the team without enough context?
3. Which signals are still raw support evidence versus already triaged planning candidates versus actual committed work?
4. Which churn or cancellation reasons are becoming concentrated in a specific segment?
5. Which churn is likely avoidable versus non-actionable or bad-fit churn?
6. What product, messaging, or support change deserves action now?
7. Which customer-facing feature commitments are accumulating risk or conflict with current quarterly priorities?
8. What should stay intentionally uncommitted in the next 90 days because the evidence is weak, the roadmap is volatile, or bandwidth is uncertain?
9. Which requests are tied to strategically important customers or enough revenue/resource impact to justify immediate attention?
10. Which customer-facing updates should be framed as roadmap themes versus release-plan specifics right now?
11. Which roadmap items are generating avoidable ambiguity because the team has only a theme, not a near-term commitment?
12. Which items are rising because the evidence is strong versus because an explicit external commitment or shipment pressure is forcing a priority override?

Primary user outcome:
The MVP's main output is NOT a repository UI. It is a weekly decision brief generated from messy feedback sources.
Treat the ideal default surface as a single Monday-morning view that answers: what is healthy, what is at risk, and what deserves action now.
The brief must:
1. synthesize cross-record patterns rather than single-record summaries,
2. rank issues by frequency + severity + segment concentration + source diversity,
3. show only source-linked claims,
4. recommend concrete product/message/support actions,
5. default to the structure: Health overview -> Risk review -> Ranked actions -> Commitments to revisit -> Evidence and gaps.

MVP scope:
- single workspace
- upload/paste text records
- AI-assisted tagging pipeline
- Monday-morning review dashboard with health/risk summary, ranked themes, and linked evidence
- evidence detail view with linked source snippets
- export to markdown

Out of scope:
- real-time integrations with Intercom/Zendesk/Gong
- complex permissions/roles
- automation hub behavior
- external peer benchmarking / percentile network as a v1 requirement
- polished billing/auth stack beyond what is necessary for MVP

Roadmap Communication Contract:
1. Treat customer-facing roadmap wording as a small state machine, not freeform copy.
   - `direction_only`: safe to express intention/direction, but no operational horizon should be implied.
   - `bucket_with_horizon`: safe to use `now` / `next` / `later` only when the active bucket definition is shown or recoverable.
   - `release_window_defined`: safe to communicate a bounded release window without a hard date.
   - `committed_date`: use only when the team has explicitly accepted date risk.
   - `no_date_safe`: the system must avoid date-like language and explain why.
2. For every customer-facing item, require these fields in storage and output:
   - `bucket_mode` = `direction_only | working_horizon | none`
   - `chosen_bucket`
   - `chosen_bucket_definition`
   - `customer_safe_answer_to_when`
   - `reason_not_committed`
   - `next_reassessment_trigger`
   - `priority_override_reason`
   - `priority_override_note`
   - `override_review_at`
3. Enforce rendering rules:
   - any item labeled `next` or `later` must also show what that label means in the current workspace
   - any `direction_only` item must explicitly say that the label expresses intention, not schedule certainty
   - any item without a safe horizon must generate `no_date_safe` wording instead of vague bucket text
4. Example output behaviors the MVP must support:
   - `direction_only later`: "This is still a later-theme item. We are signaling direction, not a delivery window yet, because scope and sequencing are still moving."
   - `working_horizon later`: "This is currently in our later bucket, which for this team means roughly 6–12 months out. That is a planning horizon, not a fixed delivery promise, and it may move as near-term commitments change."
   - `no_date_safe`: "We are actively evaluating this area, but we do not have a reliable delivery window yet. The safest update right now is that it remains under review rather than committed."

Implementation contract for coding agent:
1. Use these canonical entities:
   - conversation_records
   - record_extractions
   - evidence_spans
   - themes
   - brief_generations
   - brief_items
   - benchmark_groups
   - source_contexts

   For churn and cancellation-related records, preserve normalization context. Distinguish raw wording from normalized churn reasons and attach context such as plan tier, segment, lifecycle stage, ARR band, benchmark group, and time window so teams do not overreact to anecdotal churn signals.

   For support and feature-request-related records, preserve request context. Distinguish raw asks from inferred problem, JTBD/use case, desired outcome, impacted area, expected value, urgency, account importance, requesting customer(s), revenue importance when known, and rough resource-cost / implementation-effort context when available.
   Also preserve workflow-state context so the system knows whether a record is still raw support evidence, already triaged into a planning candidate, linked to an active execution item, or already being communicated as a customer-facing commitment.

   For enterprise-facing feature-request records, also preserve commitment context. Track whether the request reflects a named commitment already made to an account, who made that commitment, target quarter if known, commitment confidence (confirmed | implied | uncertain), renewal or expansion risk, and whether multiple accounts are asking for the same committed capability.
   For roadmap-communication-related records and outputs, also preserve communication maturity context. Track current_customer_language, safest_update_level (now_committed | next_candidate | later_exploratory | release_window_defined | no_date_safe), timing_confidence, blocking_unknowns, recommended_external_wording, chosen_bucket, chosen_bucket_definition, bucket_definition_source (team_default | workspace_override | item_override), bucket_mode (direction_only | working_horizon | none), customer_safe_answer_to_when, reason_not_committed, and next_reassessment_trigger so roadmap themes do not get misread as dated delivery commitments.
   For churn and cancellation-related records, also classify whether the signal appears avoidable/actionable, non-actionable/bad-fit, or still unclear. The brief should avoid escalating churn themes that are mostly bad-fit noise unless they cluster in a strategically important segment.
2. Support these minimum routes:
   - POST /records
   - GET /records
   - GET /records/:id
   - POST /records/:id/extract
   - POST /themes/rebuild
   - GET /themes
   - GET /themes/:id
   - POST /briefs
   - GET /briefs/:id
3. Use async job states:
   - pending
   - processing
   - complete
   - failed
4. Minimum UI surfaces:
   - records list
   - record detail with source text + extracted tags
   - theme list with counts and linked evidence
   - brief view with recommendation markdown
5. Preserve evidence traceability:
   - every extracted signal must link back to source record ids and quoted snippets
   - every normalized theme must preserve at least one raw example phrase
6. Weekly decision brief contract:
   - generate 3-5 ranked brief items per run
   - brief item must include:
     - title
     - decision_type: product | messaging | sales_enablement | support | commitment_management
     - recommendation
     - why_now
     - actionable_now: yes | no | monitor
     - confidence: high | medium | low
     - impacted_segments
     - supporting_theme_ids
     - supporting_evidence: at least 2 quoted snippets from different records when possible
     - counterevidence_or_gaps
     - commitment_risk_summary when enterprise commitments are involved
     - update_mode: roadmap_theme | release_plan_update | explicit_non_commitment | at_risk_progress_report
     - safest_update_level: now_committed | next_candidate | later_exploratory | release_window_defined | no_date_safe
     - timing_explanation: what is firm, what is still ambiguous, and why
     - recommended_external_wording: 1-3 sentences a PM/CSM can send without overcommitting
     - chosen_bucket: the selected `now|next|later` bucket when used
     - chosen_bucket_definition: the active `now/next/later` semantics used for this wording
     - bucket_mode: whether this wording is `direction_only`, `working_horizon`, or `none`
     - customer_safe_answer_to_when: 1-2 sentences directly answering timing pressure without creating a false promise
     - reason_not_committed: the concrete blocker that prevents stronger promise language
     - next_reassessment_trigger: what change would justify revisiting the wording
   - theme priority score should use:
     - frequency across records
     - average severity
     - segment concentration
     - recency
     - source diversity
     - account importance when available
     - request-linked revenue importance when available
     - rough resource-cost pressure when available
     - commitment pressure when available
   - include at least one explicit section or flag in the brief for: committed features at risk this quarter
   - include at least one explicit section or flag in the brief for: requests that should remain intentionally uncommitted for the next 90 days
   - include at least one explicit section or flag in the brief for: roadmap themes that should not yet be communicated as dated release promises
   - include at least one explicit section or flag in the brief for: ambiguous later-stage items that still need a safe progress-update explanation
7. Start with fixtures and local-first iteration:
   - seed at least 10 sample conversation records
   - include one sample extraction output, one theme output, and one brief output in the repo
   - ensure at least one seeded case covers support-request chaos, one covers churn-segmentation ambiguity, and one covers an enterprise commitment that conflicts with current roadmap capacity

Suggested artifacts to produce:
1. product spec
2. information architecture
3. data model
4. tagging pipeline design
5. MVP implementation plan
6. prompt templates for extraction/tagging/summary
7. simple UI flow
8. validation checklist

Success criteria:
- a user can input 10+ customer conversation records
- the system can show recurring pains and objections with source evidence
- the system can produce a weekly markdown brief with 3-5 ranked decisions
- every brief item links to underlying themes and quoted source snippets
- at least one brief item shows a cross-record pattern from multiple sources
- the system distinguishes raw churn anecdotes from recurring normalized churn patterns
- the system distinguishes raw feature asks from the underlying product problem and account context
- the system separates general demand from explicit customer commitments and can surface which commitments should be revisited in quarterly prioritization
- the system never outputs a roadmap theme or now/next/later label without also explaining communication safety, timing ambiguity, and the safest customer-facing wording
- the output is clearly more decision-oriented than a generic transcript summary

Engineering preference:
Favor a simple stack and fast iteration. Choose implementation details that make it easy to test with real sample transcripts quickly.
```

## Example payloads to anchor implementation
```text
Sample conversation record:
{
  "title": "Support thread - pricing confusion and API access",
  "source_type": "support_ticket",
  "customer_segment": "seed-stage B2B SaaS",
  "account_importance": "mid_arr",
  "content": "We like the product, but the pricing page makes it hard to know which plan includes API access..."
}

Sample extraction output:
{
  "record_id": "rec_001",
  "jtbd": "evaluate pricing and plan fit",
  "pain_points": ["pricing confusion", "unclear API entitlement"],
  "underlying_problem": "buyers cannot map plan differences to operational needs",
  "objections": ["cannot justify upgrade without API clarity"],
  "feature_requests": [],
  "churn_risk": "medium",
  "evidence_quotes": [
    "the pricing page makes it hard to know which plan includes API access"
  ]
}

Sample theme output:
{
  "theme": "Pricing clarity gap",
  "record_count": 4,
  "segments": ["seed-stage B2B SaaS", "Series A SaaS"],
  "linked_record_ids": ["rec_001", "rec_004", "rec_009", "rec_010"]
}

Sample brief output:
# Weekly Decision Brief
- Theme: Pricing clarity gap
- Why it matters: repeated pre-purchase confusion is slowing conversion and creating support burden
- Recommended action: rewrite pricing page API entitlement copy and test a comparison table
- Evidence: 4 records, including support_ticket rec_001
```

## Immediate follow-up prompt
```text
Using the above product definition, generate:
1. a technical spec,
2. a JSON schema for stored conversation records and extracted signals,
3. prompt templates for extraction and clustering,
4. a barebones MVP task list ordered by fastest validation path.
```