const test = require('node:test');
const assert = require('node:assert/strict');

const { generateDecisionQueue } = require('../src/voc/decision-queue');

function buildTheme(overrides = {}) {
  return {
    id: 'theme-1',
    label: 'Slack export for support evidence',
    metrics: {
      frequency: 0.9,
      severity: 0.8,
      accountImportance: 0.95,
      commitmentRisk: 0.75,
      customerConcentration: 0.6,
      recency: 0.8,
    },
    linkedAccountIds: ['acme', 'globex'],
    evidenceCount: 4,
    priorityOverrideReasons: ['churn risk', 'company objective'],
    ...overrides,
  };
}

test('generates decision queue items aligned to ranked theme output and spec fields', () => {
  const queue = generateDecisionQueue([
    buildTheme({
      id: 'build-theme',
      label: 'Shared inbox audit trail',
    }),
    buildTheme({
      id: 'validate-theme',
      label: 'Roadmap confidence explainer',
      metrics: {
        frequency: 0.55,
        severity: 0.5,
        accountImportance: 0.5,
        commitmentRisk: 0.5,
        customerConcentration: 0.4,
        recency: 0.4,
      },
      linkedAccountIds: ['acme'],
      evidenceCount: 2,
      priorityOverrideReasons: ['customer commitment'],
    }),
    buildTheme({
      id: 'hold-theme',
      label: 'Nice-to-have export format',
      metrics: {
        frequency: 0.3,
        severity: 0.25,
        accountImportance: 0.35,
        commitmentRisk: 0.2,
        customerConcentration: 0.3,
        recency: 0.3,
      },
      linkedAccountIds: ['solo-account'],
      evidenceCount: 1,
      priorityOverrideReasons: [],
    }),
  ]);

  assert.deepEqual(
    queue.map((item) => ({
      themeId: item.theme_id,
      queueRank: item.queue_rank,
      recommendationType: item.recommendation_type,
      confidence: item.confidence,
    })),
    [
      {
        themeId: 'build-theme',
        queueRank: 1,
        recommendationType: 'build_now',
        confidence: 'high',
      },
      {
        themeId: 'validate-theme',
        queueRank: 2,
        recommendationType: 'validate_next',
        confidence: 'medium',
      },
      {
        themeId: 'hold-theme',
        queueRank: 3,
        recommendationType: 'hold',
        confidence: 'medium',
      },
    ]
  );

  assert.match(queue[0].id, /^decision-build-theme$/);
  assert.deepEqual(queue[0].linked_override_reasons, ['churn risk', 'company objective']);
  assert.deepEqual(queue[0].linked_account_ids, ['acme', 'globex']);
  assert.match(queue[0].why_build_next, /jumped now/i);
  assert.match(queue[0].why_build_next, /2 linked account/);
  assert.match(queue[0].why_not_alternative, /validate-theme/);
});

test('keeps build_now gated by linked account evidence even for high scoring themes', () => {
  const queue = generateDecisionQueue([
    buildTheme({
      id: 'high-score-no-evidence',
      linkedAccountIds: [],
      evidenceCount: 0,
    }),
  ]);

  assert.equal(queue[0].recommendation_type, 'validate_next');
  assert.equal(queue[0].confidence, 'medium');
  assert.deepEqual(queue[0].linked_account_ids, []);
  assert.match(queue[0].why_build_next, /linked account evidence/i);
  assert.doesNotMatch(queue[0].why_build_next, /build_now/);
});

test('accepts pre-ranked themes and uses their queue order when already scored', () => {
  const queue = generateDecisionQueue([
    {
      id: 'theme-b',
      label: 'Beta theme',
      queueRank: 1,
      totalScore: 80,
      recommendationType: 'build_now',
      confidence: 'high',
      linkedAccountIds: ['beta-account'],
      priorityOverrideReasons: [],
      scoreBreakdown: {
        frequency: 16,
        severity: 16,
        accountImportance: 16,
        commitmentRisk: 16,
        customerConcentration: 8,
        recency: 4,
        priorityOverride: 4,
      },
      evidenceCount: 3,
      evidenceGatePassed: true,
    },
    {
      id: 'theme-a',
      label: 'Alpha theme',
      queueRank: 2,
      totalScore: 60,
      recommendationType: 'validate_next',
      confidence: 'medium',
      linkedAccountIds: ['alpha-account'],
      priorityOverrideReasons: ['technical foundation'],
      scoreBreakdown: {
        frequency: 12,
        severity: 12,
        accountImportance: 12,
        commitmentRisk: 12,
        customerConcentration: 6,
        recency: 3,
        priorityOverride: 3,
      },
      evidenceCount: 2,
      evidenceGatePassed: true,
    },
  ]);

  assert.deepEqual(
    queue.map((item) => ({ themeId: item.theme_id, queueRank: item.queue_rank })),
    [
      { themeId: 'theme-b', queueRank: 1 },
      { themeId: 'theme-a', queueRank: 2 },
    ]
  );
  assert.match(queue[0].why_not_alternative, /theme-a/);
  assert.match(queue[1].why_not_alternative, /No lower-ranked alternative/);
});
