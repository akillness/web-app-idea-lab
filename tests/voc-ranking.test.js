const test = require('node:test');
const assert = require('node:assert/strict');

const {
  ALLOWED_OVERRIDE_REASONS,
  SCORE_WEIGHTS,
  rankThemes,
  scoreTheme,
} = require('../src/voc/ranking');

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

test('exports the documented override taxonomy and score weights', () => {
  assert.deepEqual(ALLOWED_OVERRIDE_REASONS, [
    'customer commitment',
    'churn risk',
    'strategic segment',
    'company objective',
    'technical foundation',
  ]);

  assert.equal(
    Object.values(SCORE_WEIGHTS).reduce((sum, value) => sum + value, 0),
    100
  );
});

test('scores a theme with deterministic weighted breakdowns', () => {
  const rankedTheme = scoreTheme(buildTheme());

  assert.deepEqual(rankedTheme.scoreBreakdown, {
    frequency: 18,
    severity: 16,
    accountImportance: 19,
    commitmentRisk: 15,
    customerConcentration: 6,
    recency: 4,
    priorityOverride: 5,
  });
  assert.equal(rankedTheme.totalScore, 83);
  assert.equal(rankedTheme.recommendationType, 'build_now');
  assert.equal(rankedTheme.evidenceGatePassed, true);
  assert.equal(rankedTheme.confidence, 'high');
});

test('rejects invalid override reasons outside the documented taxonomy', () => {
  assert.throws(
    () =>
      scoreTheme(
        buildTheme({
          priorityOverrideReasons: ['pet feature'],
        })
      ),
    /Invalid priority override reasons/
  );
});

test('holds themes with no linked account evidence even if their score is high', () => {
  const rankedTheme = scoreTheme(
    buildTheme({
      linkedAccountIds: [],
      evidenceCount: 0,
    })
  );

  assert.equal(rankedTheme.totalScore, 83);
  assert.equal(rankedTheme.recommendationType, 'hold');
  assert.equal(rankedTheme.evidenceGatePassed, false);
  assert.match(rankedTheme.reason, /Linked account evidence is required/);
});

test('ranks themes in descending score order and assigns queue ranks', () => {
  const rankedThemes = rankThemes([
    buildTheme({
      id: 'hold-theme',
      label: 'Low-signal reporting export',
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
    buildTheme({
      id: 'validate-theme',
      label: 'Commitment-safe roadmap wording helper',
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
      id: 'build-theme',
    }),
  ]);

  assert.deepEqual(
    rankedThemes.map((theme) => ({
      id: theme.id,
      queueRank: theme.queueRank,
      recommendationType: theme.recommendationType,
    })),
    [
      { id: 'build-theme', queueRank: 1, recommendationType: 'build_now' },
      { id: 'validate-theme', queueRank: 2, recommendationType: 'validate_next' },
      { id: 'hold-theme', queueRank: 3, recommendationType: 'hold' },
    ]
  );
});

test('uses deterministic tie-breakers when themes have the same score and linked-account count', () => {
  const tiedMetrics = {
    frequency: 0.5,
    severity: 0.5,
    accountImportance: 0.5,
    commitmentRisk: 0.5,
    customerConcentration: 0.5,
    recency: 0.5,
  };

  const rankedById = rankThemes([
    buildTheme({
      id: 'z-theme',
      label: 'Zeta',
      priorityOverrideReasons: [],
      metrics: tiedMetrics,
      linkedAccountIds: ['beta-account'],
      evidenceCount: 1,
    }),
    buildTheme({
      id: 'a-theme',
      label: 'Alpha',
      priorityOverrideReasons: [],
      metrics: tiedMetrics,
      linkedAccountIds: ['alpha-account'],
      evidenceCount: 1,
    }),
  ]);

  assert.deepEqual(rankedById.map((theme) => theme.id), ['a-theme', 'z-theme']);

  const rankedByAccountCount = rankThemes([
    buildTheme({
      id: 'two-accounts',
      label: 'Two accounts',
      priorityOverrideReasons: [],
      metrics: tiedMetrics,
      linkedAccountIds: ['b', 'c'],
      evidenceCount: 2,
    }),
    buildTheme({
      id: 'one-account',
      label: 'One account',
      priorityOverrideReasons: [],
      metrics: tiedMetrics,
      linkedAccountIds: ['a'],
      evidenceCount: 2,
    }),
  ]);

  assert.deepEqual(rankedByAccountCount.map((theme) => theme.id), ['two-accounts', 'one-account']);
});

test('falls back to label and then original input order when tie-breakers stay equal', () => {
  const tiedMetrics = {
    frequency: 0.4,
    severity: 0.4,
    accountImportance: 0.4,
    commitmentRisk: 0.4,
    customerConcentration: 0.4,
    recency: 0.4,
  };

  const rankedByLabel = rankThemes([
    buildTheme({
      id: null,
      label: 'Zulu',
      priorityOverrideReasons: [],
      metrics: tiedMetrics,
      linkedAccountIds: ['shared'],
      evidenceCount: 1,
    }),
    buildTheme({
      id: null,
      label: 'Alpha',
      priorityOverrideReasons: [],
      metrics: tiedMetrics,
      linkedAccountIds: ['shared'],
      evidenceCount: 1,
    }),
  ]);

  assert.deepEqual(rankedByLabel.map((theme) => theme.label), ['Alpha', 'Zulu']);

  const rankedByOriginalOrder = rankThemes([
    buildTheme({
      id: null,
      label: 'Same label',
      priorityOverrideReasons: [],
      metrics: tiedMetrics,
      linkedAccountIds: ['shared'],
      evidenceCount: 1,
    }),
    buildTheme({
      id: null,
      label: 'Same label',
      priorityOverrideReasons: [],
      metrics: tiedMetrics,
      linkedAccountIds: ['shared'],
      evidenceCount: 2,
    }),
  ]);

  assert.deepEqual(rankedByOriginalOrder.map((theme) => theme.evidenceCount), [1, 2]);
});

test('rejects invalid threshold configuration before scoring', () => {
  assert.throws(
    () =>
      scoreTheme(buildTheme(), {
        thresholds: {
          buildNow: 60,
          validateNext: 75,
        },
      }),
    /cannot be greater than/
  );

  assert.throws(
    () =>
      scoreTheme(buildTheme(), {
        thresholds: {
          buildNow: 'high',
          validateNext: 20,
        },
      }),
    /must be a finite number/
  );
});
