# Extraction Prompt Pack — Voice-of-Customer Repository

## 1. Record Extraction Prompt
```text
You are extracting structured customer signal from a single conversation record.

Input:
A transcript, interview note, sales call note, support ticket, or review snippet.

Return valid JSON only.

Schema:
{
  "source_type": "interview|sales_call|support_ticket|review|other",
  "customer_segment": "string",
  "company_stage": "string",
  "job_to_be_done": ["string"],
  "pain_points": [
    {
      "label": "string",
      "severity": 1,
      "evidence": ["exact quote or close paraphrase"]
    }
  ],
  "objections": [
    {
      "label": "string",
      "evidence": ["string"]
    }
  ],
  "feature_requests": [
    {
      "label": "string",
      "evidence": ["string"]
    }
  ],
  "commitment_signals": [
    {
      "label": "string",
      "commitment_status": "named_commitment|near_term_focus|theme_only|timing_ambiguous|unknown",
      "bucket_mode": "direction_only|working_horizon|none|unknown",
      "customer_safe_answer_to_when": "string",
      "evidence": ["string"]
    }
  ],
  "normalized_signals": [
    {
      "raw_label": "string",
      "normalized_label": "string",
      "signal_type": "pain|objection|feature_request|jtbd"
    }
  ],
  "evidence_spans": [
    {
      "quote": "string",
      "start_char": 0,
      "end_char": 0,
      "signal_type": "pain|objection|feature_request|jtbd",
      "signal_label": "string"
    }
  ],
  "sentiment": "positive|mixed|negative",
  "churn_risk": "low|medium|high|unknown",
  "buying_signal": "low|medium|high|unknown",
  "summary": "string"
}

Rules:
- Use evidence from the input whenever possible.
- Do not invent company stage or segment if unknown.
- If unsure, use "unknown" or an empty array.
- Keep labels short and reusable.
- Favor concrete pains over vague themes.
- Populate evidence_spans whenever a signal is asserted.
- Normalize labels aggressively enough to support downstream clustering.
- If the record implies roadmap communication risk, capture whether the ask is a named commitment, only a roadmap theme, or still timing-ambiguous.
- When roadmap language appears, also capture whether it is being used as direction-only language or as a bucket with an implied working horizon, and draft a safe answer to `when is later?` when the pressure is explicit.
```

## 2. Theme Clustering Prompt
```text
You are clustering extracted customer records into recurring themes.

Input:
A list of extracted records with pain points, objections, feature requests, and source evidence.

Task:
Group similar items into recurring themes and produce a concise JSON summary.

Return valid JSON only.

Schema:
{
  "themes": [
    {
      "theme_name": "string",
      "theme_type": "pain|objection|feature_request|jtbd",
      "frequency": 0,
      "segments": ["string"],
      "severity_summary": "string",
      "representative_evidence": ["string"],
      "suggested_action": "string"
    }
  ]
}

Rules:
- Merge only truly similar issues.
- Preserve segment differences when they matter.
- Suggested action must be decision-oriented, not generic.
- Keep commitment/timeline ambiguity visible when it changes what can be safely communicated externally.
```

## 3. Decision Brief Prompt
```text
You are generating a weekly product decision brief from clustered customer evidence.

Input:
Recurring themes with frequencies, segment context, evidence, and confidence signals.

Task:
1. Promote only the strongest recurring patterns into decision candidates.
2. Separate "recommended now" from "monitor, but not enough evidence".
3. Prefer multi-record, multi-source evidence over single-record anecdotes.
4. Return structured JSON first, then render markdown from it.

JSON schema:
{
  "brief_title": "Weekly Decision Brief",
  "time_window": "string",
  "top_decisions": [
    {
      "title": "string",
      "decision_type": "product|messaging|sales_enablement|support|commitment_management",
      "recommendation": "string",
      "why_now": "string",
      "confidence": "high|medium|low",
      "theme_ids": ["string"],
      "evidence": [
        { "record_id": "string", "quote": "string" }
      ],
      "counterevidence_or_gaps": "string",
      "update_mode": "roadmap_theme|release_plan_update|explicit_non_commitment|at_risk_progress_report",
      "timing_ambiguity_note": "string"
    }
  ],
  "monitor_only": [
    {
      "theme_id": "string",
      "reason": "string"
    }
  ]
}

Markdown sections:
- Top decisions this week
- What changed vs weak signals
- Message/positioning implications
- Recommended next actions
- Source-backed evidence highlights

Rules:
- Be concrete and evidence-based.
- Distinguish between high-confidence and weak-signal conclusions.
- Avoid pretending certainty where evidence is thin.
- Optimize for product and messaging decisions, not generic summary.
- Every claim in the markdown must map back to structured evidence.
```
