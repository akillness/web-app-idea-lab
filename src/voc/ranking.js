const SCORE_WEIGHTS = Object.freeze({
  frequency: 20,
  severity: 20,
  accountImportance: 20,
  commitmentRisk: 20,
  customerConcentration: 10,
  recency: 5,
  priorityOverride: 5,
});

const ALLOWED_OVERRIDE_REASONS = Object.freeze([
  'customer commitment',
  'churn risk',
  'strategic segment',
  'company objective',
  'technical foundation',
]);

const DEFAULT_THRESHOLDS = Object.freeze({
  buildNow: 70,
  validateNext: 45,
});

function assertFiniteNumber(value, label) {
  if (typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value)) {
    throw new TypeError(`${label} must be a finite number.`);
  }
}

function assertPlainObject(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError(`${label} must be a plain object.`);
  }
}

function assertNormalizedMetric(value, label) {
  if (typeof value !== 'number' || Number.isNaN(value) || value < 0 || value > 1) {
    throw new RangeError(`${label} must be a number between 0 and 1.`);
  }
}

function round(value) {
  return Math.round(value * 100) / 100;
}

function compareLexically(left, right) {
  if (left === right) {
    return 0;
  }

  return left < right ? -1 : 1;
}

function normalizeOverrideReasons(reasons = []) {
  if (!Array.isArray(reasons)) {
    throw new TypeError('priorityOverrideReasons must be an array.');
  }

  const uniqueReasons = [...new Set(reasons.map((reason) => String(reason).trim()))].filter(Boolean);
  const invalidReasons = uniqueReasons.filter((reason) => !ALLOWED_OVERRIDE_REASONS.includes(reason));

  if (invalidReasons.length > 0) {
    throw new RangeError(
      `Invalid priority override reasons: ${invalidReasons.join(', ')}. Allowed reasons: ${ALLOWED_OVERRIDE_REASONS.join(', ')}.`
    );
  }

  return uniqueReasons;
}

function normalizeLinkedAccountIds(linkedAccountIds = []) {
  if (!Array.isArray(linkedAccountIds)) {
    throw new TypeError('linkedAccountIds must be an array.');
  }

  return [...new Set(linkedAccountIds.map((accountId) => String(accountId).trim()))].filter(Boolean);
}

function validateTheme(theme) {
  assertPlainObject(theme, 'theme');
  assertPlainObject(theme.metrics, 'theme.metrics');

  for (const metricName of [
    'frequency',
    'severity',
    'accountImportance',
    'commitmentRisk',
    'customerConcentration',
    'recency',
  ]) {
    assertNormalizedMetric(theme.metrics[metricName], `theme.metrics.${metricName}`);
  }

  const evidenceCount = theme.evidenceCount ?? 0;
  if (!Number.isInteger(evidenceCount) || evidenceCount < 0) {
    throw new RangeError('theme.evidenceCount must be a non-negative integer when provided.');
  }

  return {
    id: String(theme.id ?? '').trim() || null,
    label: String(theme.label ?? '').trim() || 'Untitled theme',
    metrics: { ...theme.metrics },
    linkedAccountIds: normalizeLinkedAccountIds(theme.linkedAccountIds),
    priorityOverrideReasons: normalizeOverrideReasons(theme.priorityOverrideReasons),
    evidenceCount,
  };
}

function scorePriorityOverride(reasons) {
  if (reasons.length === 0) {
    return 0;
  }

  const normalizedStrength = Math.min(reasons.length, 2) / 2;
  return round(normalizedStrength * SCORE_WEIGHTS.priorityOverride);
}

function buildScoreBreakdown(metrics, overrideScore) {
  return {
    frequency: round(metrics.frequency * SCORE_WEIGHTS.frequency),
    severity: round(metrics.severity * SCORE_WEIGHTS.severity),
    accountImportance: round(metrics.accountImportance * SCORE_WEIGHTS.accountImportance),
    commitmentRisk: round(metrics.commitmentRisk * SCORE_WEIGHTS.commitmentRisk),
    customerConcentration: round(metrics.customerConcentration * SCORE_WEIGHTS.customerConcentration),
    recency: round(metrics.recency * SCORE_WEIGHTS.recency),
    priorityOverride: overrideScore,
  };
}

function calculateWeightedTotal(metrics, overrideScore) {
  return round(
    metrics.frequency * SCORE_WEIGHTS.frequency +
      metrics.severity * SCORE_WEIGHTS.severity +
      metrics.accountImportance * SCORE_WEIGHTS.accountImportance +
      metrics.commitmentRisk * SCORE_WEIGHTS.commitmentRisk +
      metrics.customerConcentration * SCORE_WEIGHTS.customerConcentration +
      metrics.recency * SCORE_WEIGHTS.recency +
      overrideScore
  );
}

function validateThresholds(thresholds) {
  assertPlainObject(thresholds, 'thresholds');
  assertFiniteNumber(thresholds.buildNow, 'thresholds.buildNow');
  assertFiniteNumber(thresholds.validateNext, 'thresholds.validateNext');

  if (thresholds.buildNow < 0 || thresholds.buildNow > 100) {
    throw new RangeError('thresholds.buildNow must be between 0 and 100.');
  }

  if (thresholds.validateNext < 0 || thresholds.validateNext > 100) {
    throw new RangeError('thresholds.validateNext must be between 0 and 100.');
  }

  if (thresholds.validateNext > thresholds.buildNow) {
    throw new RangeError('thresholds.validateNext cannot be greater than thresholds.buildNow.');
  }

  return thresholds;
}

function deriveRecommendation(totalScore, hasEvidence, thresholds = DEFAULT_THRESHOLDS) {
  if (!hasEvidence) {
    if (totalScore >= thresholds.validateNext) {
      return {
        recommendationType: 'validate_next',
        confidence: totalScore >= thresholds.buildNow ? 'medium' : 'low',
        evidenceGatePassed: false,
        reason: 'Score is strong enough to validate, but linked account evidence is still required before promoting a theme to build_now.',
      };
    }

    return {
      recommendationType: 'hold',
      confidence: 'low',
      evidenceGatePassed: false,
      reason: 'Linked account evidence is required before promoting a theme into the build-next queue.',
    };
  }

  if (totalScore >= thresholds.buildNow) {
    return {
      recommendationType: 'build_now',
      confidence: 'high',
      evidenceGatePassed: true,
      reason: 'Strong evidence and weighted scoring justify immediate build-next consideration.',
    };
  }

  if (totalScore >= thresholds.validateNext) {
    return {
      recommendationType: 'validate_next',
      confidence: 'medium',
      evidenceGatePassed: true,
      reason: 'Evidence is sufficient, but the score suggests validation before immediate commitment.',
    };
  }

  return {
    recommendationType: 'hold',
    confidence: 'medium',
    evidenceGatePassed: true,
    reason: 'Theme has supporting evidence, but the weighted score is still below the validation threshold.',
  };
}

function scoreTheme(theme, options = {}) {
  const normalizedTheme = validateTheme(theme);
  const thresholds = validateThresholds({
    ...DEFAULT_THRESHOLDS,
    ...(options.thresholds || {}),
  });

  const overrideScore = scorePriorityOverride(normalizedTheme.priorityOverrideReasons);
  const scoreBreakdown = buildScoreBreakdown(normalizedTheme.metrics, overrideScore);
  const totalScore = calculateWeightedTotal(normalizedTheme.metrics, overrideScore);
  const hasEvidence = normalizedTheme.linkedAccountIds.length > 0 && normalizedTheme.evidenceCount > 0;
  const recommendation = deriveRecommendation(totalScore, hasEvidence, thresholds);

  return {
    ...normalizedTheme,
    scoreBreakdown,
    totalScore,
    ...recommendation,
  };
}

function rankThemes(themes, options = {}) {
  if (!Array.isArray(themes)) {
    throw new TypeError('themes must be an array.');
  }

  return themes
    .map((theme, index) => ({
      ...scoreTheme(theme, options),
      originalIndex: index,
    }))
    .sort((left, right) => {
      if (right.totalScore !== left.totalScore) {
        return right.totalScore - left.totalScore;
      }

      if (right.linkedAccountIds.length !== left.linkedAccountIds.length) {
        return right.linkedAccountIds.length - left.linkedAccountIds.length;
      }

      const idComparison = compareLexically(left.id || '', right.id || '');
      if (idComparison !== 0) {
        return idComparison;
      }

      const labelComparison = compareLexically(left.label, right.label);
      if (labelComparison !== 0) {
        return labelComparison;
      }

      return left.originalIndex - right.originalIndex;
    })
    .map((theme, index) => ({
      ...theme,
      queueRank: index + 1,
    }))
    .map(({ originalIndex, ...theme }) => theme);
}

module.exports = {
  ALLOWED_OVERRIDE_REASONS,
  DEFAULT_THRESHOLDS,
  SCORE_WEIGHTS,
  rankThemes,
  scoreTheme,
  validateTheme,
};
