const { rankThemes } = require('./ranking');

function assertThemeArray(themes) {
  if (!Array.isArray(themes)) {
    throw new TypeError('themes must be an array.');
  }
}

function round(value) {
  return Math.round(value * 100) / 100;
}

function isRankedTheme(theme) {
  return Boolean(
    theme &&
      typeof theme === 'object' &&
      Number.isFinite(theme.totalScore) &&
      Number.isInteger(theme.queueRank) &&
      typeof theme.recommendationType === 'string'
  );
}

function normalizeRankedThemes(themes, options = {}) {
  assertThemeArray(themes);

  if (themes.every(isRankedTheme)) {
    return [...themes].sort((left, right) => left.queueRank - right.queueRank);
  }

  return rankThemes(themes, options);
}

function getTopContributors(scoreBreakdown = {}) {
  return Object.entries(scoreBreakdown)
    .filter(([, value]) => typeof value === 'number' && value > 0)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 2)
    .map(([key]) => key);
}

function formatContributorLabel(contributor) {
  const labels = {
    accountImportance: 'account importance',
    commitmentRisk: 'commitment risk',
    customerConcentration: 'customer concentration',
    frequency: 'frequency',
    priorityOverride: 'priority override',
    recency: 'recency',
    severity: 'severity',
  };

  return labels[contributor] || contributor;
}

function formatList(values) {
  if (values.length === 0) {
    return '';
  }

  if (values.length === 1) {
    return values[0];
  }

  if (values.length === 2) {
    return `${values[0]} and ${values[1]}`;
  }

  return `${values.slice(0, -1).join(', ')}, and ${values[values.length - 1]}`;
}

function buildWhyBuildNext(theme) {
  const accountCount = theme.linkedAccountIds.length;
  const contributorLabels = getTopContributors(theme.scoreBreakdown).map(formatContributorLabel);
  const contributorText = contributorLabels.length > 0 ? ` led by ${formatList(contributorLabels)}` : '';
  const overrideText =
    theme.priorityOverrideReasons.length > 0
      ? ` Override reasons: ${formatList(theme.priorityOverrideReasons)}.`
      : '';

  if (theme.recommendationType === 'build_now') {
    return `${theme.label} jumped now because it reached score ${round(theme.totalScore)} with ${accountCount} linked account evidence point${accountCount === 1 ? '' : 's'}${contributorText}.${overrideText}`.trim();
  }

  if (theme.recommendationType === 'validate_next') {
    if (accountCount === 0 || theme.evidenceGatePassed === false) {
      return `${theme.label} is still validate_next because linked account evidence is required before it can move into the build-next slot, even though the weighted score reached ${round(theme.totalScore)}.`;
    }

    return `${theme.label} stays in validate_next because it has enough signal to investigate further, but score ${round(theme.totalScore)} still trails the immediate build threshold${contributorText}.`;
  }

  return `${theme.label} remains on hold because score ${round(theme.totalScore)} is still below the validation threshold despite ${accountCount} linked account${accountCount === 1 ? '' : 's'}${contributorText}.`;
}

function buildAlternativeComparison(theme, alternative) {
  if (!alternative) {
    return 'No lower-ranked alternative remains behind this item in the current queue.';
  }

  const scoreGap = round(theme.totalScore - alternative.totalScore);
  const accountGap = theme.linkedAccountIds.length - alternative.linkedAccountIds.length;
  const overrideGap = theme.priorityOverrideReasons.length - alternative.priorityOverrideReasons.length;
  const reasons = [];

  if (scoreGap > 0) {
    reasons.push(`a higher weighted score (${round(theme.totalScore)} vs ${round(alternative.totalScore)})`);
  }

  if (accountGap > 0) {
    reasons.push(`more linked account evidence (${theme.linkedAccountIds.length} vs ${alternative.linkedAccountIds.length})`);
  }

  if (overrideGap > 0) {
    reasons.push(`more override support (${theme.priorityOverrideReasons.length} vs ${alternative.priorityOverrideReasons.length} override reasons)`);
  }

  if (reasons.length === 0) {
    reasons.push('the current ranked tie-breakers keep it ahead');
  }

  return `${theme.id || theme.label} stays ahead of ${alternative.id || alternative.label} because it has ${formatList(reasons)}.`;
}

function toDecisionQueueItem(theme, index, rankedThemes) {
  return {
    id: `decision-${theme.id || `rank-${index + 1}`}`,
    theme_id: theme.id,
    queue_rank: theme.queueRank,
    recommendation_type: theme.recommendationType,
    why_build_next: buildWhyBuildNext(theme),
    why_not_alternative: buildAlternativeComparison(theme, rankedThemes[index + 1]),
    linked_override_reasons: [...theme.priorityOverrideReasons],
    linked_account_ids: [...theme.linkedAccountIds],
    confidence: theme.confidence,
  };
}

function generateDecisionQueue(themes, options = {}) {
  const rankedThemes = normalizeRankedThemes(themes, options);
  return rankedThemes.map((theme, index) => toDecisionQueueItem(theme, index, rankedThemes));
}

module.exports = {
  generateDecisionQueue,
};
