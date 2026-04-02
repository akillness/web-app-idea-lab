const SCORE_WEIGHTS = Object.freeze({
  frequency: 20,
  severity: 20,
  arrImportance: 20,
  commitmentRisk: 20,
  customerConcentration: 10,
  recency: 5,
  priorityOverride: 5,
});

const MAX_SCORE = 100;
const ALLOWED_OVERRIDE_REASONS = Object.freeze([
  'customer commitment',
  'churn risk',
  'strategic segment',
  'company objective',
  'technical foundation',
]);

const RECOMMENDATION_THRESHOLDS = Object.freeze({
  build_now: 70,
  validate_next: 45,
});

function assertNonEmptyString(value, fieldName) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new TypeError(`${fieldName} must be a non-empty string.`);
  }
}

function assertScore(value, fieldName) {
  if (!Number.isFinite(value) || value < 0 || value > MAX_SCORE) {
    throw new RangeError(`${fieldName} must be a number between 0 and ${MAX_SCORE}.`);
  }
}

function normalizeOverrideReasons(overrideReasons = []) {
  if (!Array.isArray(overrideReasons)) {
    throw new TypeError('overrideReasons must be an array.');
  }

  const normalized = overrideReasons.map((reason) => {
    assertNonEmptyString(reason, 'overrideReason');
    return reason.trim().toLowerCase();
  });

  const invalidReasons = normalized.filter(
    (reason) => !ALLOWED_OVERRIDE_REASONS.includes(reason),
  );

  if (invalidReasons.length > 0) {
    throw new RangeError(
      `overrideReasons contain unsupported values: ${invalidReasons.join(', ')}.`,
    );
  }

  return [...new Set(normalized)];
}

function normalizeMetrics(metrics = {}) {
  if (!metrics || typeof metrics !== 'object' || Array.isArray(metrics)) {
    throw new TypeError('metrics must be an object.');
  }

  const allowedKeys = Object.keys(SCORE_WEIGHTS);
  const metricKeys = Object.keys(metrics);
  const unknownKeys = metricKeys.filter((key) => !allowedKeys.includes(key));
  const missingKeys = allowedKeys.filter((key) => !metricKeys.includes(key));

  if (unknownKeys.length > 0) {
    throw new RangeError(`metrics contain unsupported keys: ${unknownKeys.join(', ')}.`);
  }

  if (missingKeys.length > 0) {
    throw new RangeError(`metrics are missing required keys: ${missingKeys.join(', ')}.`);
  }

  const normalized = {};

  for (const key of allowedKeys) {
    const value = metrics[key];
    assertScore(value, `metrics.${key}`);
    normalized[key] = value;
  }

  return normalized;
}

function calculateScoreBreakdown(metrics) {
  const scoreBreakdown = {};
  let totalScore = 0;

  for (const [key, weight] of Object.entries(SCORE_WEIGHTS)) {
    const preciseContribution = (metrics[key] * weight) / MAX_SCORE;
    scoreBreakdown[key] = {
      raw: metrics[key],
      weight,
      contribution: Number(preciseContribution.toFixed(2)),
    };
    totalScore += preciseContribution;
  }

  return {
    totalScore: Number(totalScore.toFixed(2)),
    scoreBreakdown,
  };
}

function determineRecommendation({ totalScore, linkedAccountCount }) {
  if (!Number.isInteger(linkedAccountCount) || linkedAccountCount < 0) {
    throw new RangeError('linkedAccountCount must be an integer greater than or equal to 0.');
  }

  if (linkedAccountCount === 0) {
    return {
      recommendationType: 'hold',
      evidenceStatus: 'missing_account_evidence',
    };
  }

  if (totalScore >= RECOMMENDATION_THRESHOLDS.build_now) {
    return {
      recommendationType: 'build_now',
      evidenceStatus: 'account_evidence_linked',
    };
  }

  if (totalScore >= RECOMMENDATION_THRESHOLDS.validate_next) {
    return {
      recommendationType: 'validate_next',
      evidenceStatus: 'account_evidence_linked',
    };
  }

  return {
    recommendationType: 'hold',
    evidenceStatus: 'account_evidence_linked',
  };
}

function scoreTheme(theme) {
  if (!theme || typeof theme !== 'object' || Array.isArray(theme)) {
    throw new TypeError('theme must be an object.');
  }

  const id = theme.id ?? theme.canonicalLabel;
  assertNonEmptyString(id, 'id');
  assertNonEmptyString(theme.canonicalLabel, 'canonicalLabel');

  const overrideReasons = normalizeOverrideReasons(theme.overrideReasons);
  const metrics = normalizeMetrics(theme.metrics);
  const hasOverrideReasons = overrideReasons.length > 0;
  const hasPriorityOverrideScore = metrics.priorityOverride > 0;

  if (hasOverrideReasons && !hasPriorityOverrideScore) {
    throw new RangeError(
      'metrics.priorityOverride must be greater than 0 when overrideReasons are present.',
    );
  }

  if (!hasOverrideReasons && hasPriorityOverrideScore) {
    throw new RangeError(
      'overrideReasons must be provided when metrics.priorityOverride is greater than 0.',
    );
  }

  const { totalScore, scoreBreakdown } = calculateScoreBreakdown(metrics);
  const linkedAccountCount = theme.linkedAccountCount ?? 0;
  const recommendation = determineRecommendation({ totalScore, linkedAccountCount });

  return {
    id: id.trim(),
    canonicalLabel: theme.canonicalLabel.trim(),
    linkedAccountCount,
    overrideReasons,
    totalScore,
    scoreBreakdown,
    recommendationType: recommendation.recommendationType,
    evidenceStatus: recommendation.evidenceStatus,
  };
}

function compareThemes(left, right) {
  return (
    right.totalScore - left.totalScore ||
    right.scoreBreakdown.commitmentRisk.raw - left.scoreBreakdown.commitmentRisk.raw ||
    right.scoreBreakdown.arrImportance.raw - left.scoreBreakdown.arrImportance.raw ||
    left.canonicalLabel.localeCompare(right.canonicalLabel)
  );
}

function rankThemes(themes) {
  if (!Array.isArray(themes)) {
    throw new TypeError('themes must be an array.');
  }

  return themes
    .map((theme) => scoreTheme(theme))
    .sort(compareThemes)
    .map((theme, index) => ({
      ...theme,
      queueRank: index + 1,
    }));
}

module.exports = {
  ALLOWED_OVERRIDE_REASONS,
  RECOMMENDATION_THRESHOLDS,
  SCORE_WEIGHTS,
  calculateScoreBreakdown,
  determineRecommendation,
  normalizeOverrideReasons,
  rankThemes,
  scoreTheme,
};
