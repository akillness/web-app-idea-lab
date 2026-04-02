from __future__ import annotations

from voc_repository.models import DecisionQueueItem


def export_build_next_queue_markdown(queue: list[DecisionQueueItem]) -> str:
    """Export ranked build-next queue items as deterministic markdown."""

    if not queue:
        return (
            "# Build-Next Queue\n\n"
            "_No ranked themes are ready yet. Share this update as: \"No build-next themes are currently ranked. "
            "Add more evidence to generate the next queue.\"_\n"
        )

    ranked_queue = sorted(queue, key=lambda item: item.queue_rank)
    build_now_count = sum(1 for item in ranked_queue if item.recommendation_type == "build_now")
    validate_next_count = sum(1 for item in ranked_queue if item.recommendation_type == "validate_next")
    hold_count = sum(1 for item in ranked_queue if item.recommendation_type == "hold")
    top_item = ranked_queue[0]

    lines = [
        "# Build-Next Queue",
        "",
        "## Summary",
        f"- Total items: {len(ranked_queue)}",
        f"- Build now: {build_now_count}",
        f"- Validate next: {validate_next_count}",
        f"- Hold: {hold_count}",
        (
            f"- Top recommendation: #{top_item.queue_rank} {top_item.canonical_label} "
            f"({top_item.recommendation_type}, score {top_item.total_score:.2f}, confidence {top_item.confidence:.2f})"
        ),
        "",
        "## Ranked Items",
        "",
    ]

    for item in ranked_queue:
        lines.extend(
            [
                f"### #{item.queue_rank} {item.canonical_label}",
                f"- Theme ID: `{item.theme_id}`",
                f"- Recommendation: `{item.recommendation_type}`",
                f"- Score: {item.total_score:.2f}",
                f"- Confidence: {item.confidence:.2f}",
                f"- Why build next: {item.why_build_next}",
                f"- Why not alternative: {item.why_not_alternative}",
                f"- Linked accounts: {_format_linked_accounts(item.linked_account_ids)}",
                f"- Override reasons: {_format_override_reasons(item.linked_override_reasons)}",
                "- Decision trace:",
                *_format_trace_lines(item),
                "",
            ]
        )

    return "\n".join(lines)


def _format_linked_accounts(linked_account_ids: tuple[str, ...]) -> str:
    if not linked_account_ids:
        return "None"
    return ", ".join(f"`{account_id}`" for account_id in linked_account_ids)


def _format_override_reasons(override_reasons: tuple[str, ...]) -> str:
    if not override_reasons:
        return "None"
    return "; ".join(override_reasons)


def _format_trace_lines(item: DecisionQueueItem) -> list[str]:
    trace_lines: list[str] = []
    for record_id, signal_id, evidence_span in zip(
        item.trace_record_ids,
        item.trace_signal_ids,
        item.trace_evidence_spans,
        strict=True,
    ):
        detail = evidence_span or "No evidence span captured."
        trace_lines.append(f"  - record `{record_id}` / signal `{signal_id}`: {detail}")

    if not trace_lines:
        trace_lines.append("  - No decision trace available.")
    return trace_lines
