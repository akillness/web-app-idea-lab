const test = require('node:test');
const assert = require('node:assert/strict');
const {
  rankThemes,
  scoreTheme,
  WEIGHTS,
  ALLOWED_PRIORITY_OVERRIDE_REASONS,
} = require('../src/voc/ranking');

test('exports the exact ranking weights and allowed override reasons', () => {
  assert.deepEqual(WEIGHTS, {
    frequency: 20,
    severity: 20,
    arrImportance: 20,
    commitmentRisk: 20,
    customerConcentration: 10,
    recency: 5,
    priorityOverride: 5,
  });

  assert.deepEqual(ALLOWED_PRIORITY_OVERRIDE_REASONS, [
    'customer_commitment',
    'churn_risk',
    'strategic_segment',
    'company_objective',
    'technical_foundation',
  ]);
});

test('scoreTheme emits a weighted score breakdown using all ranking dimensions', () => {
  const scored = scoreTheme({
    id: 'theme-1',
    label: 'Bulk exports',
    metrics: {
      frequency: 100,
      severity: 50,
      arrImportance: 80,
      commitmentRisk: 25,
      customerConcentration: 40,
      recency: 60,
      priorityOverride: 100,
    },
    priority_override_reason: ['customer_commitment'],
  });

  assert.equal(scored.totalScore, 63);
  assert.deepEqual(scored.scoreBreakdown, {
    frequency: 20,
    severity: 10,
    arrImportance: 16,
    commitmentRisk: 5,
    customerConcentration: 4,
    recency: 3,
    priorityOverride: 5,
  });
  assert.equal(scored.recommendation.label, 'validate_next');
});

test('priority override reasons are validated and require override score support', () => {
  assert.throws(
    () => scoreTheme({
      id: 'theme-2',
      label: 'Audit logs',
      metrics: {
        frequency: 10,
        severity: 10,
        arrImportance: 10,
        commitmentRisk: 10,
        customerConcentration: 10,
        recency: 10,
        priorityOverride: 0,
      },
      priority_override_reason: ['random_reason'],
    }),
    /priority_override_reason/i,
  );

  assert.throws(
    () => scoreTheme({
      id: 'theme-3',
      label: 'Workflow templates',
      metrics: {
        frequency: 10,
        severity: 10,
        arrImportance: 10,
        commitmentRisk: 10,
        customerConcentration: 10,
        recency: 10,
        priorityOverride: 0,
      },
      priority_override_reason: ['company_objective'],
    }),
    /priority override metric/i,
  );
});

test('rankThemes returns a build-next queue ordered by descending score', () => {
  const ranked = rankThemes([
    {
      id: 'theme-low',
      label: 'Dark mode',
      metrics: {
        frequency: 20,
        severity: 20,
        arrImportance: 15,
        commitmentRisk: 10,
        customerConcentration: 10,
        recency: 10,
        priorityOverride: 0,
      },
      priority_override_reason: [],
    },
    {
      id: 'theme-high',
      label: 'SSO',
      metrics: {
        frequency: 90,
        severity: 95,
        arrImportance: 100,
        commitmentRisk: 80,
        customerConcentration: 70,
        recency: 80,
        priorityOverride: 100,
      },
      priority_override_reason: ['strategic_segment'],
    },
    {
      id: 'theme-mid',
      label: 'Search filters',
      metrics: {
        frequency: 60,
        severity: 55,
        arrImportance: 50,
        commitmentRisk: 40,
        customerConcentration: 30,
        recency: 30,
        priorityOverride: 0,
      },
      priority_override_reason: [],
    },
  ]);

  assert.deepEqual(
    ranked.map((item) => ({ id: item.id, rank: item.rank, label: item.recommendation.label })),
    [
      { id: 'theme-high', rank: 1, label: 'build_now' },
      { id: 'theme-mid', rank: 2, label: 'validate_next' },
      { id: 'theme-low', rank: 3, label: 'hold' },
    ],
  );
});

test('recommendation thresholds are stable at score boundaries', () => {
  const buildNow = scoreTheme({
    id: 'theme-build',
    label: 'Enterprise controls',
    metrics: {
      frequency: 100,
      severity: 100,
      arrImportance: 75,
      commitmentRisk: 75,
      customerConcentration: 0,
      recency: 0,
      priorityOverride: 0,
    },
    priority_override_reason: [],
  });

  const validateNext = scoreTheme({
    id: 'theme-validate',
    label: 'Import mapping',
    metrics: {
      frequency: 50,
      severity: 50,
      arrImportance: 50,
      commitmentRisk: 50,
      customerConcentration: 0,
      recency: 0,
      priorityOverride: 0,
    },
    priority_override_reason: [],
  });

  const hold = scoreTheme({
    id: 'theme-hold',
    label: 'Emoji reactions',
    metrics: {
      frequency: 25,
      severity: 25,
      arrImportance: 25,
      commitmentRisk: 25,
      customerConcentration: 25,
      recency: 0,
      priorityOverride: 0,
    },
    priority_override_reason: [],
  });

  assert.equal(buildNow.totalScore, 70);
  assert.equal(buildNow.recommendation.label, 'build_now');
  assert.equal(validateNext.totalScore, 40);
  assert.equal(validateNext.recommendation.label, 'validate_next');
  assert.equal(hold.totalScore, 22.5);
  assert.equal(hold.recommendation.label, 'hold');
});
