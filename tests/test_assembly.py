from __future__ import annotations

import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from voc_repository.assembly import AssemblyError, assemble_theme_evidence
from voc_repository.models import ExtractedSignal, RawRecord
from voc_repository.ranking import rank_build_next_queue


def _record(
    record_id: str,
    account_id: str,
    account_name: str,
    *,
    arr_importance: float,
    recency: float,
    source_preset: str = "support ticket",
) -> RawRecord:
    return RawRecord(
        record_id=record_id,
        source_type="support",
        source_preset=source_preset,
        account_id=account_id,
        account_name=account_name,
        arr_importance=arr_importance,
        recency=recency,
    )


def _signal(
    signal_id: str,
    record_id: str,
    theme_id: str,
    canonical_label: str,
    *,
    severity: float,
    commitment_risk: float,
    priority_override: float = 0.0,
    override_reason: str = "",
    evidence_span: str = "",
) -> ExtractedSignal:
    return ExtractedSignal(
        signal_id=signal_id,
        record_id=record_id,
        theme_id=theme_id,
        canonical_label=canonical_label,
        signal_type="feature_request",
        severity=severity,
        commitment_risk=commitment_risk,
        priority_override=priority_override,
        override_reason=override_reason,
        evidence_span=evidence_span,
    )


def test_assemble_theme_evidence_aggregates_linked_accounts_and_override_reasons() -> None:
    assembled = assemble_theme_evidence(
        records=[
            _record("rec-1", "acct-1", "Acme", arr_importance=0.95, recency=0.9),
            _record("rec-2", "acct-1", "Acme", arr_importance=0.95, recency=0.8),
            _record("rec-3", "acct-2", "Bravo", arr_importance=0.55, recency=0.4),
        ],
        signals=[
            _signal(
                "sig-1",
                "rec-1",
                "theme-roadmap",
                "Commitment-safe roadmap updates",
                severity=0.9,
                commitment_risk=0.95,
                priority_override=0.8,
                override_reason="active enterprise RFP",
                evidence_span="Customer asked for roadmap-safe commits by Q2.",
            ),
            _signal(
                "sig-2",
                "rec-2",
                "theme-roadmap",
                "Commitment-safe roadmap updates",
                severity=0.8,
                commitment_risk=0.85,
                priority_override=0.6,
                override_reason="sales-made commitment",
                evidence_span="Sales committed to delivery in renewal thread.",
            ),
            _signal(
                "sig-3",
                "rec-3",
                "theme-export",
                "Export automation",
                severity=0.5,
                commitment_risk=0.3,
                evidence_span="Need scheduled CSV exports.",
            ),
        ],
    )

    assert [theme.theme_id for theme in assembled] == ["theme-roadmap", "theme-export"]

    roadmap = assembled[0]
    assert roadmap.frequency == 0.6667
    assert roadmap.severity == 0.85
    assert roadmap.arr_importance == 0.95
    assert roadmap.commitment_risk == 0.95
    assert roadmap.customer_concentration == 1.0
    assert roadmap.recency == 0.85
    assert roadmap.priority_override == 0.8
    assert roadmap.override_reasons == ("active enterprise RFP", "sales-made commitment")
    assert roadmap.trace_record_ids == ("rec-1", "rec-2")
    assert roadmap.trace_signal_ids == ("sig-1", "sig-2")
    assert roadmap.trace_evidence_spans == (
        "Customer asked for roadmap-safe commits by Q2.",
        "Sales committed to delivery in renewal thread.",
    )
    assert roadmap.linked_accounts[0].account_id == "acct-1"
    assert roadmap.linked_accounts[0].is_recent is True

    export = assembled[1]
    assert export.frequency == 0.3333
    assert export.linked_accounts[0].account_id == "acct-2"
    assert export.linked_accounts[0].is_recent is False


def test_assemble_theme_evidence_collects_trace_fields_in_deterministic_order() -> None:
    assembled = assemble_theme_evidence(
        records=[
            _record("rec-2", "acct-2", "Bravo", arr_importance=0.8, recency=0.8),
            _record("rec-1", "acct-1", "Acme", arr_importance=0.9, recency=0.9),
            _record("rec-3", "acct-3", "Cyan", arr_importance=0.7, recency=0.7),
        ],
        signals=[
            _signal(
                "sig-2",
                "rec-2",
                "theme-roadmap",
                "Commitment-safe roadmap updates",
                severity=0.8,
                commitment_risk=0.8,
                evidence_span="",
            ),
            _signal(
                "sig-3",
                "rec-3",
                "theme-roadmap",
                "Commitment-safe roadmap updates",
                severity=0.7,
                commitment_risk=0.7,
                evidence_span="third trace span",
            ),
            _signal(
                "sig-1",
                "rec-1",
                "theme-roadmap",
                "Commitment-safe roadmap updates",
                severity=0.9,
                commitment_risk=0.9,
                evidence_span="first trace span",
            ),
        ],
    )

    assert assembled[0].trace_record_ids == ("rec-1", "rec-2", "rec-3")
    assert assembled[0].trace_signal_ids == ("sig-1", "sig-2", "sig-3")
    assert assembled[0].trace_evidence_spans == (
        "first trace span",
        "",
        "third trace span",
    )


def test_assemble_theme_evidence_uses_max_account_values_across_repeated_records() -> None:
    assembled = assemble_theme_evidence(
        records=[
            _record("rec-1", "acct-1", "Acme", arr_importance=0.55, recency=0.3),
            _record("rec-2", "acct-1", "Acme", arr_importance=0.95, recency=0.92),
        ],
        signals=[
            _signal(
                "sig-1",
                "rec-1",
                "theme-roadmap",
                "Commitment-safe roadmap updates",
                severity=0.4,
                commitment_risk=0.5,
            ),
            _signal(
                "sig-2",
                "rec-2",
                "theme-roadmap",
                "Commitment-safe roadmap updates",
                severity=0.9,
                commitment_risk=0.95,
            ),
        ],
    )

    account = assembled[0].linked_accounts[0]
    assert assembled[0].arr_importance == 0.95
    assert account.arr_importance == 0.95
    assert account.severity == 0.9
    assert account.commitment_risk == 0.95
    assert account.is_recent is True


def test_assemble_theme_evidence_feeds_ranker_end_to_end() -> None:
    assembled = assemble_theme_evidence(
        records=[
            _record("rec-1", "acct-1", "Acme", arr_importance=1.0, recency=0.95),
            _record("rec-2", "acct-2", "Bravo", arr_importance=0.9, recency=0.9, source_preset="sales commitment note"),
            _record("rec-3", "acct-3", "Cyan", arr_importance=0.45, recency=0.45),
        ],
        signals=[
            _signal(
                "sig-1",
                "rec-1",
                "theme-roadmap",
                "Commitment-safe roadmap updates",
                severity=0.95,
                commitment_risk=1.0,
                priority_override=0.8,
                override_reason="strategic account date pressure",
            ),
            _signal(
                "sig-2",
                "rec-2",
                "theme-roadmap",
                "Commitment-safe roadmap updates",
                severity=0.85,
                commitment_risk=0.9,
                priority_override=0.7,
                override_reason="sales-made commitment",
            ),
            _signal(
                "sig-3",
                "rec-3",
                "theme-export",
                "Export automation",
                severity=0.5,
                commitment_risk=0.25,
            ),
        ],
    )

    queue = rank_build_next_queue(assembled)

    assert [item.theme_id for item in queue] == ["theme-roadmap", "theme-export"]
    assert queue[0].recommendation_type == "build_now"
    assert queue[0].linked_account_ids == ("acct-1", "acct-2")
    assert "override reasons: sales-made commitment, strategic account date pressure" in queue[0].why_build_next
    assert queue[1].recommendation_type == "hold"


def test_assemble_theme_evidence_sorts_override_reasons_deterministically() -> None:
    assembled = assemble_theme_evidence(
        records=[
            _record("rec-1", "acct-1", "Acme", arr_importance=0.9, recency=0.9),
            _record("rec-2", "acct-2", "Bravo", arr_importance=0.8, recency=0.8),
        ],
        signals=[
            _signal(
                "sig-1",
                "rec-1",
                "theme-roadmap",
                "Commitment-safe roadmap updates",
                severity=0.8,
                commitment_risk=0.8,
                override_reason="zeta escalation",
            ),
            _signal(
                "sig-2",
                "rec-2",
                "theme-roadmap",
                "Commitment-safe roadmap updates",
                severity=0.7,
                commitment_risk=0.7,
                override_reason="alpha commitment",
            ),
        ],
    )

    assert assembled[0].override_reasons == ("alpha commitment", "zeta escalation")


def test_assemble_theme_evidence_returns_empty_list_for_empty_signal_set() -> None:
    assert assemble_theme_evidence(records=[_record("rec-1", "acct-1", "Acme", arr_importance=0.8, recency=0.8)], signals=[]) == []


def test_assemble_theme_evidence_validates_records_even_when_signal_set_is_empty() -> None:
    with pytest.raises(AssemblyError, match="record rec-1 arr_importance must be between 0.0 and 1.0"):
        assemble_theme_evidence(records=[_record("rec-1", "acct-1", "Acme", arr_importance=1.2, recency=0.8)], signals=[])


def test_assemble_theme_evidence_rejects_unknown_record_references() -> None:
    with pytest.raises(AssemblyError, match="references unknown record_id missing-record"):
        assemble_theme_evidence(
            records=[_record("rec-1", "acct-1", "Acme", arr_importance=0.8, recency=0.8)],
            signals=[
                _signal(
                    "sig-1",
                    "missing-record",
                    "theme-roadmap",
                    "Commitment-safe roadmap updates",
                    severity=0.8,
                    commitment_risk=0.8,
                )
            ],
        )


def test_assemble_theme_evidence_rejects_duplicate_record_ids() -> None:
    with pytest.raises(AssemblyError, match="record_id values must be unique"):
        assemble_theme_evidence(
            records=[
                _record("rec-1", "acct-1", "Acme", arr_importance=0.8, recency=0.8),
                _record("rec-1", "acct-2", "Bravo", arr_importance=0.6, recency=0.5),
            ],
            signals=[
                _signal(
                    "sig-1",
                    "rec-1",
                    "theme-roadmap",
                    "Commitment-safe roadmap updates",
                    severity=0.8,
                    commitment_risk=0.8,
                )
            ],
        )


def test_assemble_theme_evidence_rejects_duplicate_signal_ids() -> None:
    with pytest.raises(AssemblyError, match="signal_id values must be unique"):
        assemble_theme_evidence(
            records=[
                _record("rec-1", "acct-1", "Acme", arr_importance=0.8, recency=0.8),
                _record("rec-2", "acct-2", "Bravo", arr_importance=0.7, recency=0.7),
            ],
            signals=[
                _signal(
                    "sig-1",
                    "rec-1",
                    "theme-roadmap",
                    "Commitment-safe roadmap updates",
                    severity=0.8,
                    commitment_risk=0.8,
                ),
                _signal(
                    "sig-1",
                    "rec-2",
                    "theme-export",
                    "Export automation",
                    severity=0.9,
                    commitment_risk=0.9,
                ),
            ],
        )


def test_assemble_theme_evidence_rejects_duplicate_record_theme_pairs() -> None:
    with pytest.raises(AssemblyError, match="already has evidence for theme theme-roadmap"):
        assemble_theme_evidence(
            records=[_record("rec-1", "acct-1", "Acme", arr_importance=0.8, recency=0.8)],
            signals=[
                _signal(
                    "sig-1",
                    "rec-1",
                    "theme-roadmap",
                    "Commitment-safe roadmap updates",
                    severity=0.8,
                    commitment_risk=0.8,
                ),
                _signal(
                    "sig-2",
                    "rec-1",
                    "theme-roadmap",
                    "Commitment-safe roadmap updates",
                    severity=0.9,
                    commitment_risk=0.9,
                ),
            ],
        )


def test_assemble_theme_evidence_rejects_inconsistent_account_names() -> None:
    with pytest.raises(AssemblyError, match="has inconsistent account_name values"):
        assemble_theme_evidence(
            records=[
                _record("rec-1", "acct-1", "Acme", arr_importance=0.8, recency=0.8),
                _record("rec-2", "acct-1", "ACME Corp", arr_importance=0.9, recency=0.9),
            ],
            signals=[
                _signal(
                    "sig-1",
                    "rec-1",
                    "theme-roadmap",
                    "Commitment-safe roadmap updates",
                    severity=0.8,
                    commitment_risk=0.8,
                ),
                _signal(
                    "sig-2",
                    "rec-2",
                    "theme-export",
                    "Export automation",
                    severity=0.7,
                    commitment_risk=0.6,
                ),
            ],
        )


def test_assemble_theme_evidence_rejects_out_of_range_normalized_inputs() -> None:
    with pytest.raises(AssemblyError, match="record rec-1 arr_importance must be between 0.0 and 1.0"):
        assemble_theme_evidence(
            records=[_record("rec-1", "acct-1", "Acme", arr_importance=1.2, recency=0.8)],
            signals=[
                _signal(
                    "sig-1",
                    "rec-1",
                    "theme-roadmap",
                    "Commitment-safe roadmap updates",
                    severity=0.8,
                    commitment_risk=0.8,
                )
            ],
        )


def test_assemble_theme_evidence_rejects_inconsistent_labels_for_same_theme() -> None:
    with pytest.raises(AssemblyError, match="has inconsistent canonical_label values"):
        assemble_theme_evidence(
            records=[
                _record("rec-1", "acct-1", "Acme", arr_importance=0.8, recency=0.8),
                _record("rec-2", "acct-2", "Bravo", arr_importance=0.7, recency=0.7),
            ],
            signals=[
                _signal(
                    "sig-1",
                    "rec-1",
                    "theme-roadmap",
                    "Commitment-safe roadmap updates",
                    severity=0.8,
                    commitment_risk=0.8,
                ),
                _signal(
                    "sig-2",
                    "rec-2",
                    "theme-roadmap",
                    "Roadmap commitments",
                    severity=0.7,
                    commitment_risk=0.7,
                ),
            ],
        )
