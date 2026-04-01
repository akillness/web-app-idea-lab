# System Design Prompt — Voice-of-Customer Repository

## Prompt
```text
You are designing the first MVP of a B2B SaaS product called Voice-of-Customer Repository.

Context:
The product helps early-stage SaaS teams collect customer conversations and turn them into evidence-backed product and messaging decisions.

Target users:
- founders
- product managers
- product marketers
- support/customer success leads
at 10–100 person B2B SaaS teams.

Your task:
Produce a practical MVP system design that is optimized for speed of validation, not enterprise completeness.

Requirements:
1. Define the core user journey from raw transcript upload to decision brief output.
2. Propose a minimal information architecture.
3. Propose the backend data model.
4. Define the AI pipeline for:
   - extraction
   - tagging
   - theme clustering
   - decision brief generation
5. Specify what should be synchronous vs asynchronous.
6. Include error handling and confidence/traceability design.
7. Explain how source evidence should be shown so the user can trust outputs.
8. Provide a realistic MVP implementation plan for a small team.
9. Define the ranking/scoring logic that decides which themes are promoted into the weekly decision brief.
10. Define the storage model for snippet-level evidence traceability.
11. Clearly distinguish raw extraction, normalized signal, clustered theme, and promoted brief recommendation.

Constraints:
- Prefer a simple web app stack.
- Avoid real-time third-party integrations.
- Assume initial input is manual paste/upload only.
- Favor editable, inspectable outputs over black-box automation.
- Keep the MVP shippable in a short cycle.

Output format:
- Overview
- Core user flow
- Information architecture
- Data model
- AI pipeline
- Async jobs
- Error handling
- Evidence and trust UX
- MVP implementation phases
- Open questions
```
