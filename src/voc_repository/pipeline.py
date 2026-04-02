from __future__ import annotations

import json
from dataclasses import MISSING, fields
from numbers import Real
from typing import Any, Mapping

from voc_repository.assembly import AssemblyError, assemble_theme_evidence
from voc_repository.markdown import export_build_next_queue_markdown
from voc_repository.models import DecisionQueueItem, ExtractedSignal, RawRecord
from voc_repository.ranking import RankingError, rank_build_next_queue


class PipelineError(ValueError):
    """Raised when a raw JSON payload cannot be converted into a build-next queue."""


DATACLASS_TYPES = {
    "records": RawRecord,
    "signals": ExtractedSignal,
}


def build_next_queue_from_payload(payload: Mapping[str, Any]) -> list[DecisionQueueItem]:
    """Convert a raw payload into ranked build-next queue items."""

    normalized_payload = _normalize_payload(payload)
    try:
        assembled = assemble_theme_evidence(
            records=normalized_payload["records"],
            signals=normalized_payload["signals"],
        )
        return rank_build_next_queue(assembled)
    except (AssemblyError, RankingError, TypeError, ValueError) as exc:
        raise PipelineError(f"payload could not be converted into a build-next queue: {exc}") from exc


def build_next_queue_markdown_from_payload(payload: Mapping[str, Any]) -> str:
    """Convert a raw payload into exported build-next queue markdown."""

    queue = build_next_queue_from_payload(payload)
    return export_build_next_queue_markdown(queue)


def load_payload(path: str) -> dict[str, Any]:
    """Load a JSON payload from disk."""

    try:
        with open(path, "r", encoding="utf-8") as handle:
            payload = json.load(handle)
    except OSError as exc:
        raise PipelineError(f"unable to read payload file {path!r}: {exc}") from exc
    except json.JSONDecodeError as exc:
        raise PipelineError(f"payload file {path!r} is not valid JSON: {exc.msg}") from exc

    if not isinstance(payload, dict):
        raise PipelineError("payload must be a JSON object with top-level keys 'records' and 'signals'")
    return payload


def _normalize_payload(payload: Mapping[str, Any]) -> dict[str, list[RawRecord] | list[ExtractedSignal]]:
    if not isinstance(payload, Mapping):
        raise PipelineError("payload must be a mapping with top-level keys 'records' and 'signals'")

    normalized: dict[str, list[RawRecord] | list[ExtractedSignal]] = {}
    for key, model_type in DATACLASS_TYPES.items():
        if key not in payload:
            raise PipelineError(f"payload is missing required top-level key {key!r}")
        raw_items = payload[key]
        if not isinstance(raw_items, list):
            raise PipelineError(f"payload field {key!r} must be a list")
        normalized[key] = [_coerce_dataclass_item(model_type, item, key, index) for index, item in enumerate(raw_items)]
    return normalized


def _coerce_dataclass_item(model_type: type[RawRecord] | type[ExtractedSignal], item: Any, key: str, index: int) -> RawRecord | ExtractedSignal:
    if not isinstance(item, Mapping):
        raise PipelineError(f"payload field {key!r} item {index} must be an object")

    model_fields = tuple(fields(model_type))
    field_names = {field.name for field in model_fields}
    missing_fields = sorted(
        field.name
        for field in model_fields
        if field.name not in item and field.default is MISSING and field.default_factory is MISSING
    )
    if missing_fields:
        raise PipelineError(
            f"payload field {key!r} item {index} is missing required fields: {', '.join(missing_fields)}"
        )

    unexpected_fields = sorted(field_name for field_name in item if field_name not in field_names)
    if unexpected_fields:
        raise PipelineError(
            f"payload field {key!r} item {index} has unexpected fields: {', '.join(unexpected_fields)}"
        )

    _validate_runtime_types(model_type, item, key, index)

    try:
        return model_type(**item)
    except (TypeError, ValueError, AssemblyError, RankingError) as exc:
        raise PipelineError(f"payload field {key!r} item {index} could not be converted: {exc}") from exc


STRING_FIELDS_BY_MODEL = {
    RawRecord: {
        "record_id",
        "source_type",
        "source_preset",
        "account_id",
        "account_name",
        "capture_origin",
        "segment",
    },
    ExtractedSignal: {
        "signal_id",
        "record_id",
        "theme_id",
        "canonical_label",
        "signal_type",
        "override_reason",
        "evidence_span",
    },
}

FLOAT_FIELDS_BY_MODEL = {
    RawRecord: {"arr_importance", "recency"},
    ExtractedSignal: {"severity", "commitment_risk", "priority_override"},
}

ALLOWED_SIGNAL_TYPES = {
    "feature_request",
    "support_escalation",
    "churn_risk",
    "sales_commitment",
    "rfp",
}


def _validate_runtime_types(
    model_type: type[RawRecord] | type[ExtractedSignal],
    item: Mapping[str, Any],
    key: str,
    index: int,
) -> None:
    for field_name in STRING_FIELDS_BY_MODEL[model_type]:
        if field_name not in item:
            continue
        value = item[field_name]
        if not isinstance(value, str):
            raise PipelineError(
                f"payload field {key!r} item {index} field {field_name!r} must be a string"
            )

    for field_name in FLOAT_FIELDS_BY_MODEL[model_type]:
        if field_name not in item:
            continue
        value = item[field_name]
        if isinstance(value, bool) or not isinstance(value, Real):
            raise PipelineError(
                f"payload field {key!r} item {index} field {field_name!r} must be a number"
            )

    if model_type is ExtractedSignal and item["signal_type"] not in ALLOWED_SIGNAL_TYPES:
        allowed_signal_types = ", ".join(sorted(ALLOWED_SIGNAL_TYPES))
        raise PipelineError(
            f"payload field {key!r} item {index} field 'signal_type' must be one of: {allowed_signal_types}"
        )
