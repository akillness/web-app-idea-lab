from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from voc_repository import export_build_next_queue_markdown
from voc_repository.models import DecisionQueueItem


def test_export_build_next_queue_markdown_renders_summary_and_ranked_items() -> None:
    queue = [
        DecisionQueueItem(
            theme_id="theme-export",
            canonical_label="Export automation",
            queue_rank=2,
            recommendation_type="validate_next",
            total_score=66.25,
            why_build_next="Validate next because Export automation needs one more round of confirmation.",
            why_not_alternative="Not build_now because Export automation remains below the build threshold.",
            linked_account_ids=("acct-2",),
            linked_override_reasons=(),
            trace_record_ids=("rec-2",),
            trace_signal_ids=("sig-2",),
            trace_evidence_spans=("Need scheduled CSV exports.",),
            confidence=0.65,
        ),
        DecisionQueueItem(
            theme_id="theme-roadmap",
            canonical_label="Commitment-safe roadmap updates",
            queue_rank=1,
            recommendation_type="build_now",
            total_score=91.4,
            why_build_next="Build now because roadmap pressure is highest.",
            why_not_alternative="Alternatives rank lower because this item has stronger evidence.",
            linked_account_ids=("acct-1", "acct-3"),
            linked_override_reasons=("active enterprise RFP", "sales-made commitment"),
            trace_record_ids=("rec-1", "rec-3"),
            trace_signal_ids=("sig-1", "sig-3"),
            trace_evidence_spans=("Renewal deadline pressure", "Committed roadmap date"),
            confidence=0.96,
        ),
    ]

    markdown = export_build_next_queue_markdown(queue)

    assert markdown == """# Build-Next Queue\n\n## Summary\n- Total items: 2\n- Build now: 1\n- Validate next: 1\n- Hold: 0\n- Top recommendation: #1 Commitment-safe roadmap updates (build_now, score 91.40, confidence 0.96)\n\n## Ranked Items\n\n### #1 Commitment-safe roadmap updates\n- Theme ID: `theme-roadmap`\n- Recommendation: `build_now`\n- Score: 91.40\n- Confidence: 0.96\n- Why build next: Build now because roadmap pressure is highest.\n- Why not alternative: Alternatives rank lower because this item has stronger evidence.\n- Linked accounts: `acct-1`, `acct-3`\n- Override reasons: active enterprise RFP; sales-made commitment\n- Decision trace:\n  - record `rec-1` / signal `sig-1`: Renewal deadline pressure\n  - record `rec-3` / signal `sig-3`: Committed roadmap date\n\n### #2 Export automation\n- Theme ID: `theme-export`\n- Recommendation: `validate_next`\n- Score: 66.25\n- Confidence: 0.65\n- Why build next: Validate next because Export automation needs one more round of confirmation.\n- Why not alternative: Not build_now because Export automation remains below the build threshold.\n- Linked accounts: `acct-2`\n- Override reasons: None\n- Decision trace:\n  - record `rec-2` / signal `sig-2`: Need scheduled CSV exports.\n"""


def test_export_build_next_queue_markdown_returns_shareable_empty_state() -> None:
    markdown = export_build_next_queue_markdown([])

    assert markdown == """# Build-Next Queue\n\n_No ranked themes are ready yet. Share this update as: \"No build-next themes are currently ranked. Add more evidence to generate the next queue.\"_\n"""


def test_export_build_next_queue_markdown_breaks_duplicate_rank_ties_deterministically() -> None:
    queue = [
        DecisionQueueItem(
            theme_id="theme-zebra",
            canonical_label="Zebra workflows",
            queue_rank=1,
            recommendation_type="validate_next",
            total_score=62.0,
            why_build_next="Validate next because Zebra workflows need more confirmation.",
            why_not_alternative="Not build_now because Zebra workflows remain below the build threshold.",
            linked_account_ids=("acct-z",),
            linked_override_reasons=(),
            trace_record_ids=(),
            trace_signal_ids=(),
            trace_evidence_spans=(),
            confidence=0.61,
        ),
        DecisionQueueItem(
            theme_id="theme-alpha",
            canonical_label="Alpha workflows",
            queue_rank=1,
            recommendation_type="build_now",
            total_score=75.0,
            why_build_next="Build now because Alpha workflows have stronger evidence.",
            why_not_alternative="Alternatives rank lower because Alpha workflows have a stronger score.",
            linked_account_ids=("acct-a",),
            linked_override_reasons=(),
            trace_record_ids=("rec-a",),
            trace_signal_ids=("sig-a",),
            trace_evidence_spans=("alpha trace",),
            confidence=0.78,
        ),
    ]

    markdown = export_build_next_queue_markdown(queue)

    assert markdown.index("### #1 Alpha workflows") < markdown.index("### #1 Zebra workflows")


def test_export_build_next_queue_markdown_handles_missing_optional_trace_fields() -> None:
    queue = [
        DecisionQueueItem(
            theme_id="theme-sync",
            canonical_label="CRM sync hardening",
            queue_rank=1,
            recommendation_type="hold",
            total_score=34.0,
            why_build_next="Hold because evidence is still weak.",
            why_not_alternative="Not prioritized over alternatives because the score is low.",
            linked_account_ids=(),
            linked_override_reasons=(),
            trace_record_ids=("rec-10",),
            trace_signal_ids=("sig-10",),
            trace_evidence_spans=("",),
            confidence=0.26,
        )
    ]

    markdown = export_build_next_queue_markdown(queue)

    assert "- Linked accounts: None" in markdown
    assert "- Override reasons: None" in markdown
    assert "  - record `rec-10` / signal `sig-10`: No evidence span captured." in markdown


def test_export_build_next_queue_markdown_handles_missing_trace_tuples() -> None:
    queue = [
        DecisionQueueItem(
            theme_id="theme-no-trace",
            canonical_label="No trace theme",
            queue_rank=3,
            recommendation_type="hold",
            total_score=20.0,
            why_build_next="Hold because trace capture is incomplete.",
            why_not_alternative="Not prioritized because stronger themes exist.",
            linked_account_ids=(),
            linked_override_reasons=(),
            trace_record_ids=(),
            trace_signal_ids=(),
            trace_evidence_spans=(),
            confidence=0.15,
        )
    ]

    markdown = export_build_next_queue_markdown(queue)

    assert "  - No decision trace available." in markdown
