from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from voc_repository.models import AccountEvidence, ThemeEvidenceInput
from voc_repository.ranking import RankingError, rank_build_next_queue


def _account(account_id: str, account_name: str, arr_importance: float = 0.8) -> AccountEvidence:
    return AccountEvidence(account_id=account_id, account_name=account_name, arr_importance=arr_importance)


def test_rank_build_next_queue_orders_highest_weighted_theme_first() -> None:
    queue = rank_build_next_queue(
        [
            ThemeEvidenceInput(
                theme_id="theme-export",
                canonical_label="Export automation",
                frequency=0.65,
                severity=0.6,
                arr_importance=0.55,
                commitment_risk=0.45,
                customer_concentration=0.35,
                recency=0.6,
                priority_override=0.0,
                linked_accounts=(_account("acct-2", "Bravo"),),
            ),
            ThemeEvidenceInput(
                theme_id="theme-commitment",
                canonical_label="Commitment-safe roadmap updates",
                frequency=0.95,
                severity=0.9,
                arr_importance=0.9,
                commitment_risk=0.95,
                customer_concentration=0.7,
                recency=0.8,
                priority_override=0.4,
                linked_accounts=(
                    _account("acct-1", "Acme", arr_importance=1.0),
                    _account("acct-3", "Cyan", arr_importance=0.9),
                ),
            ),
        ]
    )

    assert [item.theme_id for item in queue] == ["theme-commitment", "theme-export"]
    assert queue[0].recommendation_type == "build_now"
    assert queue[0].linked_account_ids == ("acct-1", "acct-3")
    assert "Build now because Commitment-safe roadmap updates scored" in queue[0].why_build_next


def test_theme_without_linked_account_evidence_never_becomes_build_now() -> None:
    queue = rank_build_next_queue(
        [
            ThemeEvidenceInput(
                theme_id="theme-unlinked",
                canonical_label="Unlinked enterprise export request",
                frequency=1.0,
                severity=1.0,
                arr_importance=1.0,
                commitment_risk=1.0,
                customer_concentration=1.0,
                recency=1.0,
                priority_override=1.0,
                linked_accounts=(),
            )
        ]
    )

    assert queue[0].total_score == 100.0
    assert queue[0].recommendation_type == "validate_next"
    assert queue[0].linked_account_ids == ()
    assert "build_now is blocked until linked account evidence exists" in queue[0].why_build_next
    assert "has no linked account evidence" in queue[0].why_not_alternative


def test_override_reasons_propagate_to_output_and_explanations() -> None:
    queue = rank_build_next_queue(
        [
            ThemeEvidenceInput(
                theme_id="theme-rfp",
                canonical_label="RFP audit logs",
                frequency=0.75,
                severity=0.7,
                arr_importance=0.95,
                commitment_risk=0.9,
                customer_concentration=0.6,
                recency=0.7,
                priority_override=0.8,
                linked_accounts=(_account("acct-rfp", "Delta", arr_importance=0.95),),
                override_reasons=("active enterprise RFP", "sales-made commitment"),
            )
        ]
    )

    item = queue[0]
    assert item.linked_override_reasons == ("active enterprise RFP", "sales-made commitment")
    assert "override reasons: active enterprise RFP, sales-made commitment" in item.why_build_next
    assert item.confidence >= 0.8


def test_low_scoring_theme_becomes_hold() -> None:
    queue = rank_build_next_queue(
        [
            ThemeEvidenceInput(
                theme_id="theme-low",
                canonical_label="Minor UX polish",
                frequency=0.2,
                severity=0.2,
                arr_importance=0.2,
                commitment_risk=0.1,
                customer_concentration=0.1,
                recency=0.1,
                priority_override=0.0,
                linked_accounts=(_account("acct-low", "Echo", arr_importance=0.2),),
            )
        ]
    )

    assert queue[0].recommendation_type == "hold"
    assert "does not clear the validate_next threshold" in queue[0].why_build_next


def test_invalid_weight_input_raises_ranking_error() -> None:
    try:
        rank_build_next_queue(
            [
                ThemeEvidenceInput(
                    theme_id="theme-invalid",
                    canonical_label="Out of range score",
                    frequency=1.1,
                    severity=0.5,
                    arr_importance=0.5,
                    commitment_risk=0.5,
                    customer_concentration=0.5,
                    recency=0.5,
                    priority_override=0.5,
                    linked_accounts=(_account("acct-invalid", "Foxtrot"),),
                )
            ]
        )
    except RankingError as exc:
        assert "theme-invalid.frequency must be between 0.0 and 1.0" in str(exc)
    else:
        raise AssertionError("RankingError was not raised for out-of-range input")
