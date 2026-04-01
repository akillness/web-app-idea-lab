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
```

## 3. Decision Brief Prompt
```text
You are generating a product decision brief from clustered customer evidence.

Input:
Recurring themes with frequencies, segment context, and evidence.

Output:
Write a concise markdown brief with these sections:
- Top recurring pains
- Important objections
- Feature requests worth monitoring
- Message/positioning implications
- Recommended next actions
- Source-backed evidence highlights

Rules:
- Be concrete and evidence-based.
- Distinguish between high-confidence and weak-signal conclusions.
- Avoid pretending certainty where evidence is thin.
- Optimize for product and messaging decisions, not generic summary.
```
