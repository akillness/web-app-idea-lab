from __future__ import annotations

import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from voc_repository.pipeline import (
    PipelineError,
    build_next_queue_from_payload,
    build_next_queue_markdown_from_payload,
    load_payload,
)


def _payload() -> dict[str, object]:
    return {
        "records": [
            {
                "record_id": "rec-1",
                "source_type": "support",
                "source_preset": "support ticket",
                "account_id": "acct-1",
                "account_name": "Acme",
                "arr_importance": 0.95,
                "recency": 0.9,
            },
            {
                "record_id": "rec-2",
                "source_type": "sales",
                "source_preset": "sales commitment note",
                "account_id": "acct-2",
                "account_name": "Bravo",
                "arr_importance": 0.9,
                "recency": 0.85,
            },
            {
                "record_id": "rec-3",
                "source_type": "support",
                "source_preset": "support ticket",
                "account_id": "acct-3",
                "account_name": "Cyan",
                "arr_importance": 0.4,
                "recency": 0.3,
            },
        ],
        "signals": [
            {
                "signal_id": "sig-1",
                "record_id": "rec-1",
                "theme_id": "theme-roadmap",
                "canonical_label": "Commitment-safe roadmap updates",
                "signal_type": "support_escalation",
                "severity": 0.95,
                "commitment_risk": 1.0,
                "priority_override": 0.8,
                "override_reason": "renewal pressure",
                "evidence_span": "Customer asked for safer roadmap guidance before renewal.",
            },
            {
                "signal_id": "sig-2",
                "record_id": "rec-2",
                "theme_id": "theme-roadmap",
                "canonical_label": "Commitment-safe roadmap updates",
                "signal_type": "sales_commitment",
                "severity": 0.85,
                "commitment_risk": 0.9,
                "priority_override": 0.7,
                "override_reason": "sales-made commitment",
                "evidence_span": "Sales committed to a timeline in deal review.",
            },
            {
                "signal_id": "sig-3",
                "record_id": "rec-3",
                "theme_id": "theme-export",
                "canonical_label": "Export automation",
                "signal_type": "feature_request",
                "severity": 0.45,
                "commitment_risk": 0.2,
                "evidence_span": "Need recurring CSV exports.",
            },
        ],
    }


def test_build_next_queue_from_payload_returns_ranked_queue() -> None:
    queue = build_next_queue_from_payload(_payload())

    assert [item.theme_id for item in queue] == ["theme-roadmap", "theme-export"]
    assert queue[0].recommendation_type == "build_now"
    assert queue[0].linked_account_ids == ("acct-1", "acct-2")

    markdown = build_next_queue_markdown_from_payload(_payload())
    assert "# Build-Next Queue" in markdown
    assert "### #1 Commitment-safe roadmap updates" in markdown
    assert "sales-made commitment" in markdown


def test_build_next_queue_from_payload_rejects_missing_top_level_key() -> None:
    with pytest.raises(PipelineError, match="missing required top-level key 'signals'"):
        build_next_queue_from_payload({"records": []})


def test_build_next_queue_from_payload_rejects_non_numeric_runtime_values() -> None:
    payload = _payload()
    payload["records"][0]["arr_importance"] = "high"

    with pytest.raises(PipelineError, match="field 'arr_importance' must be a number"):
        build_next_queue_from_payload(payload)


def test_load_payload_rejects_invalid_json_and_non_object_top_level(tmp_path: Path) -> None:
    invalid_json_path = tmp_path / "invalid.json"
    invalid_json_path.write_text("{not valid json", encoding="utf-8")
    with pytest.raises(PipelineError, match="is not valid JSON"):
        load_payload(str(invalid_json_path))

    list_payload_path = tmp_path / "list.json"
    list_payload_path.write_text("[]", encoding="utf-8")
    with pytest.raises(PipelineError, match="payload must be a JSON object"):
        load_payload(str(list_payload_path))



def test_build_next_queue_from_payload_rejects_invalid_signal_type() -> None:
    payload = _payload()
    payload["signals"][0]["signal_type"] = "totally_new_signal"

    with pytest.raises(PipelineError, match="field 'signal_type' must be one of"):
        build_next_queue_from_payload(payload)
