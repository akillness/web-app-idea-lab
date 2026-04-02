from __future__ import annotations

from voc_repository.models import DecisionQueueItem, RecommendationType, ThemeEvidenceInput

WEIGHTS: dict[str, int] = {
    "frequency": 20,
    "severity": 20,
    "arr_importance": 20,
    "commitment_risk": 20,
    "customer_concentration": 10,
    "recency": 5,
    "priority_override": 5,
}


class RankingError(ValueError):
    """Raised when ranking inputs are outside the supported prototype range."""


def rank_build_next_queue(themes: list[ThemeEvidenceInput]) -> list[DecisionQueueItem]:
    """Return ranked build-next queue items using the documented weight spec.

    All score components are expected on a normalized 0.0-1.0 scale.
    """

    scored = [(_score_theme(theme), theme) for theme in themes]
    scored.sort(
        key=lambda item: (
            item[0],
            item[1].commitment_risk,
            item[1].arr_importance,
            item[1].frequency,
            item[1].canonical_label,
        ),
        reverse=True,
    )

    queue: list[DecisionQueueItem] = []
    for rank, (total_score, theme) in enumerate(scored, start=1):
        linked_account_ids = tuple(account.account_id for account in theme.linked_accounts)
        recommendation = _recommendation_type(theme, total_score, linked_account_ids)
        queue.append(
            DecisionQueueItem(
                theme_id=theme.theme_id,
                canonical_label=theme.canonical_label,
                queue_rank=rank,
                recommendation_type=recommendation,
                total_score=round(total_score, 2),
                why_build_next=_why_build_next(theme, recommendation, total_score, linked_account_ids),
                why_not_alternative=_why_not_alternative(theme, recommendation, total_score, linked_account_ids),
                linked_account_ids=linked_account_ids,
                linked_override_reasons=tuple(theme.override_reasons),
                confidence=_confidence(theme, total_score, linked_account_ids),
            )
        )
    return queue


def _score_theme(theme: ThemeEvidenceInput) -> float:
    _validate_theme(theme)
    return sum(getattr(theme, field_name) * weight for field_name, weight in WEIGHTS.items())


def _validate_theme(theme: ThemeEvidenceInput) -> None:
    for field_name in WEIGHTS:
        value = getattr(theme, field_name)
        if not 0.0 <= value <= 1.0:
            raise RankingError(
                f"{theme.theme_id}.{field_name} must be between 0.0 and 1.0; got {value!r}"
            )


def _recommendation_type(
    theme: ThemeEvidenceInput,
    total_score: float,
    linked_account_ids: tuple[str, ...],
) -> RecommendationType:
    if not linked_account_ids:
        if total_score >= 45.0:
            return "validate_next"
        return "hold"
    if total_score >= 70.0:
        return "build_now"
    if total_score >= 45.0:
        return "validate_next"
    return "hold"


def _why_build_next(
    theme: ThemeEvidenceInput,
    recommendation: str,
    total_score: float,
    linked_account_ids: tuple[str, ...],
) -> str:
    override_text = _format_override_reasons(theme.override_reasons)
    if recommendation == "build_now":
        return (
            f"Build now because {theme.canonical_label} scored {total_score:.1f}/100 across frequency, severity, "
            f"ARR importance, commitment risk, customer concentration, recency, and priority override; "
            f"linked evidence exists for accounts [{', '.join(linked_account_ids)}]{override_text}."
        )
    if recommendation == "validate_next" and not linked_account_ids:
        return (
            f"Validate next because {theme.canonical_label} scored {total_score:.1f}/100, but build_now is blocked "
            f"until linked account evidence exists{override_text}."
        )
    if recommendation == "validate_next":
        return (
            f"Validate next because {theme.canonical_label} scored {total_score:.1f}/100 with linked evidence for "
            f"accounts [{', '.join(linked_account_ids)}], but the score is below the build_now threshold{override_text}."
        )
    return (
        f"Hold because {theme.canonical_label} scored {total_score:.1f}/100 and does not clear the validate_next "
        f"threshold{override_text}."
    )


def _why_not_alternative(
    theme: ThemeEvidenceInput,
    recommendation: str,
    total_score: float,
    linked_account_ids: tuple[str, ...],
) -> str:
    if recommendation == "build_now":
        return (
            f"Alternatives rank lower because {theme.canonical_label} combines stronger weighted evidence and linked "
            f"accounts [{', '.join(linked_account_ids)}] at {total_score:.1f}/100."
        )
    if recommendation == "validate_next" and not linked_account_ids:
        return (
            f"Not build_now because {theme.canonical_label} has no linked account evidence, so the evidence gate forces "
            f"validation before promotion despite a {total_score:.1f}/100 score."
        )
    if recommendation == "validate_next":
        return (
            f"Not build_now because {theme.canonical_label} remains below the 70.0 build_now threshold at "
            f"{total_score:.1f}/100."
        )
    return (
        f"Not prioritized over alternatives because {theme.canonical_label} remains below the 45.0 validate_next "
        f"threshold at {total_score:.1f}/100."
    )


def _format_override_reasons(override_reasons: tuple[str, ...]) -> str:
    if not override_reasons:
        return ""
    return f"; override reasons: {', '.join(override_reasons)}"


def _confidence(
    theme: ThemeEvidenceInput,
    total_score: float,
    linked_account_ids: tuple[str, ...],
) -> float:
    score_factor = (total_score / 100.0) * 0.75
    linked_evidence_bonus = 0.15 if linked_account_ids else 0.0
    override_bonus = 0.10 if theme.override_reasons else 0.0
    confidence = score_factor + linked_evidence_bonus + override_bonus
    return round(min(confidence, 1.0), 2)
