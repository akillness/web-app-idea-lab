# System Design Prompt — Voice-of-Customer Repository

## Prompt
```text
You are designing the first MVP of a B2B SaaS product called Voice-of-Customer Repository.

Context:
The product helps early-stage SaaS teams collect customer conversations and turn them into evidence-backed product and messaging decisions, while separating generic demand from explicit customer commitments under volatile roadmaps.

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
2. Show how the system distinguishes generic demand, named customer commitments, and intentionally uncommitted requests.
3. Define a dedicated customer-commitments workflow that is separate from both the discovery/theme backlog and the release-plan surface, including what fields and states are needed to manage promise hygiene.
4. Propose a minimal information architecture.
5. Propose the backend data model.
6. Define the AI pipeline for:
   - extraction
   - tagging
   - theme clustering
   - decision brief generation
7. Specify what should be synchronous vs asynchronous.
8. Include error handling and confidence/traceability design.
9. Explain how source evidence should be shown so the user can trust outputs.
10. Provide a realistic MVP implementation plan for a small team.
11. Define the ranking/scoring logic that decides which themes are promoted into the weekly decision brief.
12. Define how commitment-risk and next-90-days uncertainty should be represented in both the data model and the brief UX.
13. Define the storage model for snippet-level evidence traceability.
14. Clearly distinguish raw extraction, normalized signal, clustered theme, and promoted brief recommendation.
15. Define how the product should represent `near-term commitment`, `roadmap theme only`, and `timing still ambiguous` without collapsing them into one roadmap state.
16. Define a roadmap-communication contract that distinguishes `direction_only` bucket language from `working_horizon` bucket language and explains how the system answers the stakeholder question: `when is later?` safely.

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
- External update / ambiguity-closure UX
- Roadmap communication contract (`direction_only` vs `working_horizon`)
- MVP implementation phases
- Open questions
```