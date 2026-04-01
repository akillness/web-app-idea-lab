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
Customer interviews, sales calls, support tickets, and review snippets are scattered across notes, docs, and support tools. Teams can collect data, but they struggle to turn that raw customer signal into recurring pain clusters, objections, feature requests, and decision-ready summaries.

Product wedge:
Do NOT build a generic note-taking app.
Do NOT build a full CRM or helpdesk.
Build an evidence layer that:
1. accepts transcript/text uploads or paste input,
2. extracts structured tags such as segment, JTBD, pain point, objection, feature request, churn risk,
3. groups recurring themes,
4. generates a concise decision brief recommending what product/message changes deserve attention.

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
- the system can produce a short decision brief in markdown
- the output is clearly more decision-oriented than a generic transcript summary

Engineering preference:
Favor a simple stack and fast iteration. Choose implementation details that make it easy to test with real sample transcripts quickly.
```

## Immediate follow-up prompt
```text
Using the above product definition, generate:
1. a technical spec,
2. a JSON schema for stored conversation records and extracted signals,
3. prompt templates for extraction and clustering,
4. a barebones MVP task list ordered by fastest validation path.
```
