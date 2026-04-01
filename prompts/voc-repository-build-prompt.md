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
Also support a quarterly planning use case: teams should be able to separate generic feature demand from named customer commitments already made by sales, success, or product, then review which commitments deserve escalation, reaffirmation, or de-prioritization in the next quarter.

Target users:
- Founders
- Product managers
- Product marketers
- Customer success / support leads
at 10–100 person B2B SaaS teams.

Core problem:
Customer interviews, sales calls, support tickets, churn notes, cancellation surveys, and feature requests are scattered across notes, docs, support tools, Slack, Jira, and billing exports. Teams can collect data, but they struggle to turn that raw customer signal into recurring pains, objections, feature requests, churn reasons, and decision-ready summaries.

Product wedge:
Do NOT build a generic note-taking app.
Do NOT build a full CRM or helpdesk.
Build an evidence layer that:
1. accepts transcript/text uploads or paste input,
2. extracts structured tags such as segment, ARR/ICP importance, JTBD, pain point, objection, feature request, churn reason, churn risk,
3. preserves the original customer wording plus normalized reasoning,
4. groups recurring themes,
5. generates a concise Monday-morning decision brief recommending what product/message/support changes deserve attention.

The MVP should help a team answer these Monday-morning questions quickly:
1. What customer problems worsened this week?
2. Which support or feature-request patterns are flooding the team without enough context?
3. Which churn or cancellation reasons are becoming concentrated in a specific segment?
4. Which churn is likely avoidable versus non-actionable or bad-fit churn?
5. What product, messaging, or support change deserves action now?
6. Which customer-facing feature commitments are accumulating risk or conflict with current quarterly priorities?

Primary user outcome:
The MVP's main output is NOT a repository UI. It is a weekly decision brief generated from messy feedback sources.
Treat the ideal default surface as a single Monday-morning view that answers: what is healthy, what is at risk, and what deserves action now.
The brief must:
1. synthesize cross-record patterns rather than single-record summaries,
2. rank issues by frequency + severity + segment concentration + source diversity,
3. show only source-linked claims,
4. recommend concrete product/message/support actions,
5. default to the structure: Health overview -> Risk review -> Ranked actions -> Evidence and gaps.

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

   For support and feature-request-related records, preserve request context. Distinguish raw asks from inferred problem, expected value, urgency, and account importance.

   For enterprise-facing feature-request records, also preserve commitment context. Track whether the request reflects a named commitment already made to an account, who made that commitment, target quarter if known, commitment confidence (confirmed | implied | uncertain), renewal or expansion risk, and whether multiple accounts are asking for the same committed capability.
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
     - decision_type: product | messaging | sales_enablement | support
     - recommendation
     - why_now
     - confidence: high | medium | low
     - impacted_segments
     - supporting_theme_ids
     - supporting_evidence: at least 2 quoted snippets from different records when possible
     - counterevidence_or_gaps
     - commitment_risk_summary when enterprise commitments are involved
   - theme priority score should use:
     - frequency across records
     - average severity
     - segment concentration
     - recency
     - source diversity
     - account importance when available
     - commitment pressure when available
   - include at least one explicit section or flag in the brief for: committed features at risk this quarter
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
