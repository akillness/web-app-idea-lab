# Build Prompt — Voice-of-Customer Repository

## Purpose
아래 프롬프트는 AI 코딩 에이전트에게 바로 전달해 초기 MVP를 설계/구현하도록 하기 위한 실행 문서다.

## Prompt
```text
Build an MVP for a B2B SaaS product called "Voice-of-Customer Repository".

Goal:
Create a product that helps early-stage SaaS teams turn scattered customer conversations into structured evidence for product and messaging decisions.

Target users:
- Founders
- Product managers
- Product marketers
- Customer success / support leads
at 10–100 person B2B SaaS teams.

Core problem:
Customer interviews, sales calls, support tickets, churn notes, cancellation surveys, and review snippets are scattered across notes, docs, support tools, and billing exports. Teams can collect data, but they struggle to turn that raw customer signal into recurring pain clusters, objections, feature requests, churn reasons, and decision-ready summaries.

Product wedge:
Do NOT build a generic note-taking app.
Do NOT build a full CRM or helpdesk.
Build an evidence layer that:
1. accepts transcript/text uploads or paste input,
2. extracts structured tags such as segment, JTBD, pain point, objection, feature request, churn reason, churn risk,
3. groups recurring themes,
4. generates a concise decision brief recommending what product/message/support changes deserve attention.

Primary user outcome:
The MVP's main output is NOT a repository UI. It is a weekly decision brief generated from messy feedback sources.
The brief must:
1. synthesize cross-record patterns rather than single-record summaries,
2. rank issues by frequency + severity + segment concentration + source diversity,
3. show only source-linked claims,
4. recommend concrete product/message/support actions.

MVP scope:
- single workspace
- upload/paste text records
- AI-assisted tagging pipeline
- recurring theme summary dashboard or list
- evidence detail view with linked source snippets
- export to markdown

Out of scope:
- real-time integrations with Intercom/Zendesk/Gong
- complex permissions/roles
- automation hub behavior
- enterprise analytics
- polished billing/auth stack beyond what is necessary for MVP

Implementation contract for coding agent:
1. Use these canonical entities:
   - conversation_records
   - record_extractions
   - evidence_spans
   - themes
   - brief_generations
   - brief_items
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
6. Weekly decision brief contract:
   - generate 3-5 ranked brief items per run
   - each brief item must include:
     - title
     - decision_type: product | messaging | sales_enablement | support
     - recommendation
     - why_now
     - confidence: high | medium | low
     - impacted_segments
     - supporting_theme_ids
     - supporting_evidence: at least 2 quoted snippets from different records when possible
     - counterevidence_or_gaps
   - theme priority score should use:
     - frequency across records
     - average severity
     - segment concentration
     - recency
     - source diversity
7. Start with fixtures and local-first iteration:
   - seed at least 10 sample conversation records
   - include one sample extraction output, one theme output, and one brief output in the repo

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
- the output is clearly more decision-oriented than a generic transcript summary

Engineering preference:
Favor a simple stack and fast iteration. Choose implementation details that make it easy to test with real sample transcripts quickly.
```

## Example payloads to anchor implementation
```text
Sample conversation record:
{
  "title": "Support call - pricing confusion",
  "source_type": "support_ticket",
  "customer_segment": "seed-stage B2B SaaS",
  "content": "We like the product, but the pricing page makes it hard to know which plan includes API access..."
}

Sample extraction output:
{
  "record_id": "rec_001",
  "jtbd": "evaluate pricing and plan fit",
  "pain_points": ["pricing confusion", "unclear API entitlement"],
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
- Why it matters: repeated pre-purchase confusion is slowing conversion
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
