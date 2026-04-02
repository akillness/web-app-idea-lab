from __future__ import annotations

from dataclasses import dataclass, field
from typing import Literal

RecommendationType = Literal["build_now", "validate_next", "hold"]
SignalType = Literal["feature_request", "support_escalation", "churn_risk", "sales_commitment", "rfp"]


@dataclass(frozen=True, slots=True)
class AccountEvidence:
    """Minimal account-level evidence linked to a theme."""

    account_id: str
    account_name: str
    arr_importance: float
    severity: float = 0.0
    commitment_risk: float = 0.0
    is_recent: bool = True


@dataclass(frozen=True, slots=True)
class ThemeEvidenceInput:
    """Minimal ranking contract for a build-next theme candidate."""

    theme_id: str
    canonical_label: str
    frequency: float
    severity: float
    arr_importance: float
    commitment_risk: float
    customer_concentration: float
    recency: float
    priority_override: float
    linked_accounts: tuple[AccountEvidence, ...] = field(default_factory=tuple)
    override_reasons: tuple[str, ...] = field(default_factory=tuple)


@dataclass(frozen=True, slots=True)
class DecisionQueueItem:
    """Ranked queue output for build-next decisions."""

    theme_id: str
    canonical_label: str
    queue_rank: int
    recommendation_type: RecommendationType
    total_score: float
    why_build_next: str
    why_not_alternative: str
    linked_account_ids: tuple[str, ...]
    linked_override_reasons: tuple[str, ...]
    confidence: float


@dataclass(frozen=True, slots=True)
class RawRecord:
    """Normalized raw record contract before theme assembly."""

    record_id: str
    source_type: str
    source_preset: str
    account_id: str
    account_name: str
    arr_importance: float
    recency: float
    capture_origin: str = "manual_paste"
    segment: str = ""


@dataclass(frozen=True, slots=True)
class ExtractedSignal:
    """Structured signal extracted from a raw record."""

    signal_id: str
    record_id: str
    theme_id: str
    canonical_label: str
    signal_type: SignalType
    severity: float
    commitment_risk: float
    priority_override: float = 0.0
    override_reason: str = ""
    evidence_span: str = ""
