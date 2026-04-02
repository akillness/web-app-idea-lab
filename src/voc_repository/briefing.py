from __future__ import annotations

from voc_repository.models import DecisionQueueItem


def export_weekly_decision_brief(queue: list[DecisionQueueItem]) -> str:
    """Export a deterministic weekly decision brief from ranked queue items."""

    if not queue:
        return (
            "# Weekly Decision Brief\n\n"
            "## What got worse\n"
            "- No current priority pressure is captured yet.\n\n"
            "## Build next\n"
            "- Nothing is ready to build next yet.\n\n"
            "## Why not now\n"
            "- No defer/hold rationale is available until themes are ranked.\n\n"
            "## Evidence highlights\n"
            "- No supporting evidence highlights are available yet.\n"
        )

    ranked_queue = sorted(queue, key=lambda item: (item.queue_rank, item.canonical_label, item.theme_id))
    worsening_items = [item for item in ranked_queue if item.recommendation_type in {"build_now", "validate_next"}]
    build_next_items = [item for item in ranked_queue if item.recommendation_type == "build_now"]
    why_not_now_items = [item for item in ranked_queue if item.recommendation_type in {"validate_next", "hold"}]

    lines = [
        "# Weekly Decision Brief",
        "",
        "## What got worse",
        *_format_what_got_worse(worsening_items),
        "",
        "## Build next",
        *_format_build_next(build_next_items),
        "",
        "## Why not now",
        *_format_why_not_now(why_not_now_items),
        "",
        "## Evidence highlights",
        *_format_evidence_highlights(ranked_queue),
    ]

    return "\n".join(lines) + "\n"


def _format_what_got_worse(items: list[DecisionQueueItem]) -> list[str]:
    if not items:
        return ["- No current priority pressure is captured yet."]

    return [
        (
            f"- Current priority pressure: {item.canonical_label} (#{item.queue_rank}, "
            f"score {item.total_score:.2f}, confidence {item.confidence:.2f}, "
            f"linked accounts {len(item.linked_account_ids)})."
        )
        for item in items
    ]


def _format_build_next(items: list[DecisionQueueItem]) -> list[str]:
    if not items:
        return ["- Nothing is ready to build next yet."]

    return [
        f"- {item.canonical_label} (#{item.queue_rank}, `{item.recommendation_type}`): {item.why_build_next}"
        for item in items
    ]


def _format_why_not_now(items: list[DecisionQueueItem]) -> list[str]:
    if not items:
        return ["- No defer/hold rationale is available until themes are ranked."]

    return [f"- {item.canonical_label}: {item.why_not_alternative}" for item in items]


def _format_evidence_highlights(items: list[DecisionQueueItem]) -> list[str]:
    highlights: list[str] = []
    for item in items:
        if item.trace_evidence_spans:
            detail = "; ".join(span or "No evidence span captured." for span in item.trace_evidence_spans)
        else:
            detail = "No decision trace available."
        highlights.append(f"- {item.canonical_label}: {detail}")

    if not highlights:
        return ["- No supporting evidence highlights are available yet."]
    return highlights
