from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from voc_repository import export_weekly_decision_brief
from voc_repository.models import DecisionQueueItem


def test_export_weekly_decision_brief_renders_expected_sections_for_mixed_queue() -> None:
    queue = [
        DecisionQueueItem(
            theme_id="theme-risk",
            canonical_label="Roadmap trust recovery",
            queue_rank=2,
            recommendation_type="validate_next",
            total_score=74.2,
            why_build_next="Validate next because trust risk is increasing across renewals.",
            why_not_alternative="Not build_now because confirmation is still thin outside the top segment.",
            linked_account_ids=("acct-2", "acct-5"),
            linked_override_reasons=("renewal pressure",),
            trace_record_ids=("rec-2", "rec-5"),
            trace_signal_ids=("sig-2", "sig-5"),
            trace_evidence_spans=("Repeated roadmap-date frustration", "CS escalated timeline ambiguity"),
            confidence=0.72,
        ),
        DecisionQueueItem(
            theme_id="theme-export",
            canonical_label="Scheduled exports",
            queue_rank=1,
            recommendation_type="build_now",
            total_score=88.6,
            why_build_next="Build now because export pain is concentrated in high-value accounts and recency is high.",
            why_not_alternative="Alternatives rank lower because this theme has broader evidence and stronger urgency.",
            linked_account_ids=("acct-1", "acct-3", "acct-4"),
            linked_override_reasons=("active enterprise RFP", "sales-made commitment"),
            trace_record_ids=("rec-1", "rec-3"),
            trace_signal_ids=("sig-1", "sig-3"),
            trace_evidence_spans=("Need automated CSV delivery before renewal", "RFP requires scheduled exports"),
            confidence=0.94,
        ),
        DecisionQueueItem(
            theme_id="theme-polish",
            canonical_label="Dashboard polish",
            queue_rank=3,
            recommendation_type="hold",
            total_score=31.0,
            why_build_next="Hold because the signal is weak and mostly cosmetic.",
            why_not_alternative="Not prioritized because higher-value themes tie directly to churn and commitments.",
            linked_account_ids=("acct-9",),
            linked_override_reasons=(),
            trace_record_ids=("rec-9",),
            trace_signal_ids=("sig-9",),
            trace_evidence_spans=("One admin asked for visual cleanup",),
            confidence=0.33,
        ),
    ]

    brief = export_weekly_decision_brief(queue)

    assert brief == """# Weekly Decision Brief\n\n## What got worse\n- Current priority pressure: Scheduled exports (#1, score 88.60, confidence 0.94, linked accounts 3).\n- Current priority pressure: Roadmap trust recovery (#2, score 74.20, confidence 0.72, linked accounts 2).\n\n## Build next\n- Scheduled exports (#1, `build_now`): Build now because export pain is concentrated in high-value accounts and recency is high.\n\n## Why not now\n- Roadmap trust recovery: Not build_now because confirmation is still thin outside the top segment.\n- Dashboard polish: Not prioritized because higher-value themes tie directly to churn and commitments.\n\n## Evidence highlights\n- Scheduled exports: Need automated CSV delivery before renewal; RFP requires scheduled exports\n- Roadmap trust recovery: Repeated roadmap-date frustration; CS escalated timeline ambiguity\n- Dashboard polish: One admin asked for visual cleanup\n"""


def test_export_weekly_decision_brief_returns_empty_state_when_queue_missing() -> None:
    brief = export_weekly_decision_brief([])

    assert brief == """# Weekly Decision Brief\n\n## What got worse\n- No current priority pressure is captured yet.\n\n## Build next\n- Nothing is ready to build next yet.\n\n## Why not now\n- No defer/hold rationale is available until themes are ranked.\n\n## Evidence highlights\n- No supporting evidence highlights are available yet.\n"""


def test_export_weekly_decision_brief_groups_validate_and_hold_reasons_together() -> None:
    queue = [
        DecisionQueueItem(
            theme_id="theme-a",
            canonical_label="API usage alerts",
            queue_rank=1,
            recommendation_type="validate_next",
            total_score=67.0,
            why_build_next="Validate next because alerting demand is rising.",
            why_not_alternative="Not build_now because account coverage is still narrow.",
            linked_account_ids=("acct-a",),
            linked_override_reasons=(),
            trace_record_ids=(),
            trace_signal_ids=(),
            trace_evidence_spans=(),
            confidence=0.68,
        ),
        DecisionQueueItem(
            theme_id="theme-b",
            canonical_label="Theme taxonomy cleanup",
            queue_rank=2,
            recommendation_type="hold",
            total_score=25.0,
            why_build_next="Hold because this is internal polish.",
            why_not_alternative="Not prioritized because customer-facing pressure is elsewhere.",
            linked_account_ids=(),
            linked_override_reasons=(),
            trace_record_ids=("rec-b",),
            trace_signal_ids=("sig-b",),
            trace_evidence_spans=("Ops team requested cleaner labels",),
            confidence=0.21,
        ),
    ]

    brief = export_weekly_decision_brief(queue)

    assert "## Build next\n- Nothing is ready to build next yet." in brief
    assert "- API usage alerts: Not build_now because account coverage is still narrow." in brief
    assert "- Theme taxonomy cleanup: Not prioritized because customer-facing pressure is elsewhere." in brief
    assert "- API usage alerts: No decision trace available." in brief


def test_export_weekly_decision_brief_uses_canonical_tiebreakers_for_equal_queue_ranks() -> None:
    queue = [
        DecisionQueueItem(
            theme_id="theme-zebra",
            canonical_label="Beta workflows",
            queue_rank=1,
            recommendation_type="build_now",
            total_score=82.0,
            why_build_next="Build now because demand is concentrated.",
            why_not_alternative="Alternatives are weaker.",
            linked_account_ids=("acct-z",),
            linked_override_reasons=(),
            trace_record_ids=("rec-z",),
            trace_signal_ids=("sig-z",),
            trace_evidence_spans=("Beta customers asked for workflow automation",),
            confidence=0.81,
        ),
        DecisionQueueItem(
            theme_id="theme-alpha-2",
            canonical_label="Alpha workflows",
            queue_rank=1,
            recommendation_type="build_now",
            total_score=83.0,
            why_build_next="Build now because demand is urgent.",
            why_not_alternative="Alternatives are weaker.",
            linked_account_ids=("acct-a",),
            linked_override_reasons=(),
            trace_record_ids=("rec-a",),
            trace_signal_ids=("sig-a",),
            trace_evidence_spans=("Alpha team asked for workflow automation",),
            confidence=0.82,
        ),
        DecisionQueueItem(
            theme_id="theme-alpha-1",
            canonical_label="Alpha workflows",
            queue_rank=1,
            recommendation_type="validate_next",
            total_score=80.0,
            why_build_next="Validate because evidence is still emerging.",
            why_not_alternative="Need more confirmation before build_now.",
            linked_account_ids=("acct-b",),
            linked_override_reasons=(),
            trace_record_ids=("rec-b",),
            trace_signal_ids=("sig-b",),
            trace_evidence_spans=("Another alpha account reported the same workflow gap",),
            confidence=0.77,
        ),
    ]

    brief = export_weekly_decision_brief(queue)

    assert brief.index("- Current priority pressure: Alpha workflows (#1, score 80.00") < brief.index(
        "- Current priority pressure: Alpha workflows (#1, score 83.00"
    ) < brief.index("- Current priority pressure: Beta workflows (#1, score 82.00")
    assert brief.index("- Alpha workflows (#1, `build_now`): Build now because demand is urgent.") < brief.index(
        "- Beta workflows (#1, `build_now`): Build now because demand is concentrated."
    )
    assert brief.index("- Alpha workflows: Another alpha account reported the same workflow gap") < brief.index(
        "- Alpha workflows: Alpha team asked for workflow automation"
    ) < brief.index("- Beta workflows: Beta customers asked for workflow automation")


def test_export_weekly_decision_brief_distinguishes_blank_evidence_spans_from_missing_trace_tuples() -> None:
    queue = [
        DecisionQueueItem(
            theme_id="theme-blank",
            canonical_label="Blank evidence capture",
            queue_rank=1,
            recommendation_type="build_now",
            total_score=76.0,
            why_build_next="Build now because the queue score is strong.",
            why_not_alternative="Alternatives are weaker.",
            linked_account_ids=("acct-1",),
            linked_override_reasons=(),
            trace_record_ids=("rec-1",),
            trace_signal_ids=("sig-1",),
            trace_evidence_spans=("",),
            confidence=0.75,
        ),
        DecisionQueueItem(
            theme_id="theme-missing",
            canonical_label="Missing trace capture",
            queue_rank=2,
            recommendation_type="hold",
            total_score=20.0,
            why_build_next="Hold because the signal is weak.",
            why_not_alternative="No clear customer pressure yet.",
            linked_account_ids=(),
            linked_override_reasons=(),
            trace_record_ids=(),
            trace_signal_ids=(),
            trace_evidence_spans=(),
            confidence=0.20,
        ),
    ]

    brief = export_weekly_decision_brief(queue)

    assert "- Blank evidence capture: No evidence span captured." in brief
    assert "- Missing trace capture: No decision trace available." in brief
