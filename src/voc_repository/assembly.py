from __future__ import annotations

from collections import defaultdict
from collections.abc import Iterable

from voc_repository.models import AccountEvidence, ExtractedSignal, RawRecord, ThemeEvidenceInput


class AssemblyError(ValueError):
    """Raised when raw evidence cannot be assembled into ranking inputs."""



def assemble_theme_evidence(
    records: list[RawRecord],
    signals: list[ExtractedSignal],
) -> list[ThemeEvidenceInput]:
    """Aggregate raw records and extracted signals into ranker-ready theme evidence."""

    record_by_id = {record.record_id: record for record in records}
    if len(record_by_id) != len(records):
        raise AssemblyError("record_id values must be unique")

    account_name_by_id: dict[str, str] = {}
    for record in records:
        _validate_normalized_value(f"record {record.record_id} arr_importance", record.arr_importance)
        _validate_normalized_value(f"record {record.record_id} recency", record.recency)
        known_account_name = account_name_by_id.setdefault(record.account_id, record.account_name)
        if known_account_name != record.account_name:
            raise AssemblyError(
                f"account_id {record.account_id} has inconsistent account_name values: "
                f"{known_account_name!r} vs {record.account_name!r}"
            )

    if not signals:
        return []

    grouped: dict[str, list[ExtractedSignal]] = defaultdict(list)
    seen_signal_ids: set[str] = set()
    seen_record_theme_pairs: set[tuple[str, str]] = set()
    for signal in signals:
        if signal.signal_id in seen_signal_ids:
            raise AssemblyError(f"signal_id values must be unique; got duplicate {signal.signal_id}")
        seen_signal_ids.add(signal.signal_id)
        if signal.record_id not in record_by_id:
            raise AssemblyError(f"signal {signal.signal_id} references unknown record_id {signal.record_id}")
        _validate_normalized_value(f"signal {signal.signal_id} severity", signal.severity)
        _validate_normalized_value(f"signal {signal.signal_id} commitment_risk", signal.commitment_risk)
        _validate_normalized_value(f"signal {signal.signal_id} priority_override", signal.priority_override)

        record_theme_pair = (signal.record_id, signal.theme_id)
        if record_theme_pair in seen_record_theme_pairs:
            raise AssemblyError(
                f"record {signal.record_id} already has evidence for theme {signal.theme_id}; "
                "merge duplicate same-theme signals before assembly"
            )
        seen_record_theme_pairs.add(record_theme_pair)
        grouped[signal.theme_id].append(signal)

    total_signal_count = len(signals)
    assembled: list[ThemeEvidenceInput] = []
    for theme_id, theme_signals in sorted(grouped.items()):
        theme_signals = sorted(
            theme_signals,
            key=lambda signal: (signal.record_id, signal.signal_id, signal.evidence_span),
        )
        canonical_label = theme_signals[0].canonical_label
        if any(signal.canonical_label != canonical_label for signal in theme_signals[1:]):
            raise AssemblyError(f"theme {theme_id} has inconsistent canonical_label values")

        account_signal_counts: dict[str, int] = defaultdict(int)
        account_records: dict[str, list[RawRecord]] = defaultdict(list)
        account_signals: dict[str, list[ExtractedSignal]] = defaultdict(list)
        seen_override_reasons: set[str] = set()
        linked_records: list[RawRecord] = []

        for signal in theme_signals:
            record = record_by_id[signal.record_id]
            linked_records.append(record)
            account_signal_counts[record.account_id] += 1
            account_records[record.account_id].append(record)
            account_signals[record.account_id].append(signal)
            if signal.override_reason:
                seen_override_reasons.add(signal.override_reason)

        override_reasons = sorted(seen_override_reasons)
        linked_accounts = tuple(_build_linked_accounts(account_records, account_signals))
        trace_record_ids = tuple(signal.record_id for signal in theme_signals)
        trace_signal_ids = tuple(signal.signal_id for signal in theme_signals)
        trace_evidence_spans = tuple(signal.evidence_span for signal in theme_signals)
        frequency = len(theme_signals) / total_signal_count
        severity = _average(signal.severity for signal in theme_signals)
        arr_importance = max(account.arr_importance for account in linked_accounts)
        commitment_risk = max(signal.commitment_risk for signal in theme_signals)
        customer_concentration = max(account_signal_counts.values()) / len(theme_signals)
        recency = _average(record.recency for record in linked_records)
        priority_override = max(signal.priority_override for signal in theme_signals)

        assembled.append(
            ThemeEvidenceInput(
                theme_id=theme_id,
                canonical_label=canonical_label,
                frequency=round(frequency, 4),
                severity=round(severity, 4),
                arr_importance=round(arr_importance, 4),
                commitment_risk=round(commitment_risk, 4),
                customer_concentration=round(customer_concentration, 4),
                recency=round(recency, 4),
                priority_override=round(priority_override, 4),
                linked_accounts=linked_accounts,
                override_reasons=tuple(override_reasons),
                trace_record_ids=trace_record_ids,
                trace_signal_ids=trace_signal_ids,
                trace_evidence_spans=trace_evidence_spans,
            )
        )

    assembled.sort(
        key=lambda theme: (
            -theme.frequency,
            -theme.commitment_risk,
            -theme.arr_importance,
            theme.canonical_label,
        )
    )
    return assembled



def _build_linked_accounts(
    account_records: dict[str, list[RawRecord]],
    account_signals: dict[str, list[ExtractedSignal]],
) -> list[AccountEvidence]:
    linked_accounts: list[AccountEvidence] = []
    for account_id in sorted(account_records):
        records_for_account = account_records[account_id]
        signals_for_account = account_signals[account_id]
        linked_accounts.append(
            AccountEvidence(
                account_id=account_id,
                account_name=records_for_account[0].account_name,
                arr_importance=max(record.arr_importance for record in records_for_account),
                severity=max(signal.severity for signal in signals_for_account),
                commitment_risk=max(signal.commitment_risk for signal in signals_for_account),
                is_recent=any(record.recency >= 0.6 for record in records_for_account),
            )
        )
    return linked_accounts



def _validate_normalized_value(label: str, value: float) -> None:
    if not 0.0 <= value <= 1.0:
        raise AssemblyError(f"{label} must be between 0.0 and 1.0; got {value!r}")



def _average(values: Iterable[float]) -> float:
    values = tuple(values)
    if not values:
        raise AssemblyError("cannot average an empty value set")
    return sum(values) / len(values)
