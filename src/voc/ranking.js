const WEIGHTS = Object.freeze({
  frequency: 20,
  severity: 20,
  arrImportance: 20,
  commitmentRisk: 20,
  customerConcentration: 10,
  recency: 5,
  priorityOverride: 5,
});

const ALLOWED_PRIORITY_OVERRIDE_REASONS = Object.freeze([
  'customer_commitment',
  'churn_risk',
  'strategic_segment',
  'company_objective',
  'technical_foundation',
]);

const METRIC_NAMES = Object.freeze(Object.keys(WEIGHTS));

function clampMetric(value, name) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new TypeError(`Metric ${name} must be a number.`);
  }

  if (!Number.isInteger(value)) {
    throw new TypeError(`Metric ${name} must be an integer.`);
  }

  if (value < 0 || value > 100) {
    throw new RangeError(`Metric ${name} must be between 0 and 100.`);
  }

  return value;
}

function normalizeOverrideReasons(reasons) {
  if (reasons == null) {
    return [];
  }

  if (!Array.isArray(reasons)) {
    throw new TypeError('priority_override_reason must be an array when provided.');
  }

  const deduped = [...new Set(reasons)];

  for (const reason of deduped) {
    if (typeof reason !== 'string') {
      throw new TypeError('priority_override_reason values must be strings.');
    }

    if (!ALLOWED_PRIORITY_OVERRIDE_REASONS.includes(reason)) {
      throw new RangeError(
        `priority_override_reason must be one of: ${ALLOWED_PRIORITY_OVERRIDE_REASONS.join(', ')}`,
      );
    }
  }

  return deduped;
}

function assertCompleteMetrics(metrics) {
  if (!metrics || typeof metrics !== 'object') {
    throw new TypeError('Theme metrics are required.');
  }

  for (const metricName of METRIC_NAMES) {
    if (!Object.hasOwn(metrics, metricName)) {
      throw new TypeError(`Metric ${metricName} is required.`);
    }
  }

  for (const metricName of Object.keys(metrics)) {
    if (!METRIC_NAMES.includes(metricName)) {
      throw new RangeError(`Unknown metric ${metricName} is not supported.`);
    }
  }
}

function buildRecommendationLabel(totalScore) {
  if (totalScore >= 70) {
    return 'build_now';
  }

  if (totalScore >= 40) {
    return 'validate_next';
  }

  return 'hold';
}

function assertOverrideConsistency(priorityOverrideScore, overrideReasons) {
  if (priorityOverrideScore > 0 && overrideReasons.length === 0) {
    throw new RangeError(
      'priorityOverride must be 0 unless at least one priority_override_reason is provided.',
    );
  }

  if (overrideReasons.length > 0 && priorityOverrideScore <= 0) {
    throw new RangeError(
      'priorityOverride must be greater than 0 when priority_override_reason is provided.',
    );
  }
}

function scoreTheme(theme) {
  if (!theme || typeof theme !== 'object') {
    throw new TypeError('Theme input is required.');
  }

  assertCompleteMetrics(theme.metrics);

  const overrideReasons = normalizeOverrideReasons(theme.priority_override_reason);
  const scoreBreakdown = {};

  for (const metricName of METRIC_NAMES) {
    const rawValue = clampMetric(theme.metrics[metricName], metricName);
    scoreBreakdown[metricName] = (rawValue / 100) * WEIGHTS[metricName];
  }

  assertOverrideConsistency(theme.metrics.priorityOverride, overrideReasons);

  const totalScore = Object.values(scoreBreakdown).reduce((sum, value) => sum + value, 0);

  return {
    ...theme,
    metrics: { ...theme.metrics },
    scoreBreakdown,
    totalScore,
    priority_override_reason: overrideReasons,
    recommendation: buildRecommendationLabel(totalScore),
  };
}

function compareRankOrder(left, right) {
  if (right.totalScore !== left.totalScore) {
    return right.totalScore - left.totalScore;
  }

  const leftId = String(left.id ?? '');
  const rightId = String(right.id ?? '');

  if (leftId !== rightId) {
    return leftId.localeCompare(rightId);
  }

  return String(left.label ?? '').localeCompare(String(right.label ?? ''));
}

function rankThemes(themes) {
  if (!Array.isArray(themes)) {
    throw new TypeError('Themes must be an array.');
  }

  return themes
    .map(scoreTheme)
    .sort(compareRankOrder)
    .map((theme, index) => ({
      ...theme,
      rank: index + 1,
    }));
}

module.exports = {
  WEIGHTS,
  ALLOWED_PRIORITY_OVERRIDE_REASONS,
  scoreTheme,
  rankThemes,
};
