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
    if (!ALLOWED_PRIORITY_OVERRIDE_REASONS.includes(reason)) {
      throw new RangeError(
        `priority_override_reason must be one of: ${ALLOWED_PRIORITY_OVERRIDE_REASONS.join(', ')}`,
      );
    }
  }

  return deduped;
}

function buildRecommendation(totalScore) {
  if (totalScore >= 70) {
    return { label: 'build_now', rationale: 'High combined urgency and account impact.' };
  }

  if (totalScore >= 40) {
    return { label: 'validate_next', rationale: 'Worth near-term validation or scoped delivery.' };
  }

  return { label: 'hold', rationale: 'Track for evidence growth before committing capacity.' };
}

function scoreTheme(theme) {
  if (!theme || typeof theme !== 'object') {
    throw new TypeError('Theme input is required.');
  }

  if (!theme.metrics || typeof theme.metrics !== 'object') {
    throw new TypeError('Theme metrics are required.');
  }

  const overrideReasons = normalizeOverrideReasons(theme.priority_override_reason);
  const scoreBreakdown = {};

  for (const metricName of METRIC_NAMES) {
    const rawValue = clampMetric(theme.metrics[metricName] ?? 0, metricName);
    scoreBreakdown[metricName] = Number(((rawValue / 100) * WEIGHTS[metricName]).toFixed(2));
  }

  if (overrideReasons.length > 0 && scoreBreakdown.priorityOverride <= 0) {
    throw new RangeError(
      'priority override metric must be greater than 0 when priority_override_reason is present.',
    );
  }

  const totalScore = Number(
    Object.values(scoreBreakdown)
      .reduce((sum, value) => sum + value, 0)
      .toFixed(2),
  );

  return {
    ...theme,
    scoreBreakdown,
    totalScore,
    priority_override_reason: overrideReasons,
    recommendation: buildRecommendation(totalScore),
  };
}

function rankThemes(themes) {
  if (!Array.isArray(themes)) {
    throw new TypeError('Themes must be an array.');
  }

  return themes
    .map(scoreTheme)
    .sort((left, right) => {
      if (right.totalScore !== left.totalScore) {
        return right.totalScore - left.totalScore;
      }

      return String(left.id ?? left.label ?? '').localeCompare(String(right.id ?? right.label ?? ''));
    })
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
