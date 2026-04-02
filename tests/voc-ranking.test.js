const test = require('node:test');
const assert = require('node:assert/strict');

const {
  rankThemes,
  scoreTheme,
} = require('../src/voc/ranking');

test('scoreTheme uses the documented weight table to calculate total score', () => {
  const ranked = scoreTheme({
    id: 'theme-1',
    canonicalLabel: 'Slack triage gaps',
    linkedAccountCount: 3,
    overrideReasons: ['customer commitment', 'strategic segment'],
    metrics: {
      frequency: 90,
      severity: 80,
      arrImportance: 70,
      commitmentRisk: 60,
      customerConcentration: 50,
      recency: 40,
      priorityOverride: 100,
    },
  });

  assert.equal(ranked.totalScore, 72);
  assert.equal(ranked.scoreBreakdown.frequency.contribution, 18);
  assert.equal(ranked.scoreBreakdown.priorityOverride.contribution, 5);
  assert.equal(ranked.recommendationType, 'build_now');
  assert.equal(ranked.evidenceStatus, 'account_evidence_linked');
});

test('scoreTheme normalizes and deduplicates allowed override reasons', () => {
  const ranked = scoreTheme({
    id: 'theme-1b',
    canonicalLabel: 'Enterprise escalation requests',
    linkedAccountCount: 1,
    overrideReasons: [' Churn Risk ', 'churn risk', 'company objective'],
    metrics: {
      frequency: 50,
      severity: 55,
      arrImportance: 80,
      commitmentRisk: 70,
      customerConcentration: 40,
      recency: 60,
      priorityOverride: 65,
    },
  });

  assert.deepEqual(ranked.overrideReasons, ['churn risk', 'company objective']);
});

test('scoreTheme rejects override reasons outside the allowed taxonomy', () => {
  assert.throws(
    () =>
      scoreTheme({
        id: 'theme-2',
        canonicalLabel: 'Roadmap churn pressure',
        linkedAccountCount: 2,
        overrideReasons: ['random ask'],
        metrics: {
          frequency: 70,
          severity: 70,
          arrImportance: 70,
          commitmentRisk: 70,
          customerConcentration: 70,
          recency: 70,
          priorityOverride: 70,
        },
      }),
    /unsupported values: random ask/,
  );
});

test('scoreTheme rejects missing metric keys instead of silently defaulting them', () => {
  assert.throws(
    () =>
      scoreTheme({
        id: 'theme-2b',
        canonicalLabel: 'Missing metric payload',
        linkedAccountCount: 1,
        overrideReasons: [],
        metrics: {
          frequency: 70,
          severity: 70,
          arrImportance: 70,
          commitmentRisk: 70,
          customerConcentration: 70,
          recency: 70,
        },
      }),
    /missing required keys: priorityOverride/,
  );
});

test('scoreTheme rejects unsupported metric keys to catch typos early', () => {
  assert.throws(
    () =>
      scoreTheme({
        id: 'theme-2c',
        canonicalLabel: 'Typo metric payload',
        linkedAccountCount: 1,
        overrideReasons: [],
        metrics: {
          frequency: 70,
          severity: 70,
          arrImportance: 70,
          commitmentRisk: 70,
          customerConcentration: 70,
          recency: 70,
          priorityOverride: 0,
          severtity: 99,
        },
      }),
    /unsupported keys: severtity/,
  );
});

test('scoreTheme rejects inconsistent override scoring when reasons are present without score', () => {
  assert.throws(
    () =>
      scoreTheme({
        id: 'theme-2d',
        canonicalLabel: 'Unscored override reasons',
        linkedAccountCount: 1,
        overrideReasons: ['customer commitment'],
        metrics: {
          frequency: 70,
          severity: 65,
          arrImportance: 75,
          commitmentRisk: 80,
          customerConcentration: 55,
          recency: 45,
          priorityOverride: 0,
        },
      }),
    /priorityOverride must be greater than 0/,
  );
});

test('scoreTheme rejects inconsistent override scoring when score is present without reasons', () => {
  assert.throws(
    () =>
      scoreTheme({
        id: 'theme-2e',
        canonicalLabel: 'Unexplained override score',
        linkedAccountCount: 1,
        overrideReasons: [],
        metrics: {
          frequency: 70,
          severity: 65,
          arrImportance: 75,
          commitmentRisk: 80,
          customerConcentration: 55,
          recency: 45,
          priorityOverride: 20,
        },
      }),
    /overrideReasons must be provided/,
  );
});

test('scoreTheme rejects invalid linkedAccountCount values', () => {
  assert.throws(
    () =>
      scoreTheme({
        id: 'theme-2f',
        canonicalLabel: 'Bad account count',
        linkedAccountCount: 1.5,
        overrideReasons: [],
        metrics: {
          frequency: 70,
          severity: 65,
          arrImportance: 75,
          commitmentRisk: 80,
          customerConcentration: 55,
          recency: 45,
          priorityOverride: 0,
        },
      }),
    /linkedAccountCount must be an integer/,
  );
});

test('rankThemes sorts descending and gates recommendations on linked account evidence', () => {
  const ranked = rankThemes([
    {
      id: 'theme-3',
      canonicalLabel: 'Later-date promise confusion',
      linkedAccountCount: 0,
      overrideReasons: ['customer commitment'],
      metrics: {
        frequency: 95,
        severity: 90,
        arrImportance: 90,
        commitmentRisk: 95,
        customerConcentration: 70,
        recency: 75,
        priorityOverride: 90,
      },
    },
    {
      id: 'theme-1',
      canonicalLabel: 'Enterprise export gaps',
      linkedAccountCount: 4,
      overrideReasons: ['churn risk'],
      metrics: {
        frequency: 90,
        severity: 85,
        arrImportance: 95,
        commitmentRisk: 75,
        customerConcentration: 60,
        recency: 70,
        priorityOverride: 80,
      },
    },
    {
      id: 'theme-2',
      canonicalLabel: 'SMB survey noise',
      linkedAccountCount: 2,
      overrideReasons: [],
      metrics: {
        frequency: 55,
        severity: 45,
        arrImportance: 35,
        commitmentRisk: 25,
        customerConcentration: 20,
        recency: 30,
        priorityOverride: 0,
      },
    },
  ]);

  assert.deepEqual(
    ranked.map((theme) => ({
      id: theme.id,
      queueRank: theme.queueRank,
      recommendationType: theme.recommendationType,
      evidenceStatus: theme.evidenceStatus,
    })),
    [
      {
        id: 'theme-3',
        queueRank: 1,
        recommendationType: 'hold',
        evidenceStatus: 'missing_account_evidence',
      },
      {
        id: 'theme-1',
        queueRank: 2,
        recommendationType: 'build_now',
        evidenceStatus: 'account_evidence_linked',
      },
      {
        id: 'theme-2',
        queueRank: 3,
        recommendationType: 'hold',
        evidenceStatus: 'account_evidence_linked',
      },
    ],
  );
});

test('rankThemes uses commitment risk, ARR importance, then label as deterministic tie-breakers', () => {
  const ranked = rankThemes([
    {
      id: 'theme-b',
      canonicalLabel: 'Beta reliability work',
      linkedAccountCount: 2,
      overrideReasons: [],
      metrics: {
        frequency: 60,
        severity: 60,
        arrImportance: 50,
        commitmentRisk: 60,
        customerConcentration: 30,
        recency: 20,
        priorityOverride: 0,
      },
    },
    {
      id: 'theme-a',
      canonicalLabel: 'Alpha reliability work',
      linkedAccountCount: 2,
      overrideReasons: [],
      metrics: {
        frequency: 60,
        severity: 60,
        arrImportance: 50,
        commitmentRisk: 60,
        customerConcentration: 30,
        recency: 20,
        priorityOverride: 0,
      },
    },
    {
      id: 'theme-c',
      canonicalLabel: 'Commitment-heavy reliability work',
      linkedAccountCount: 2,
      overrideReasons: [],
      metrics: {
        frequency: 60,
        severity: 60,
        arrImportance: 55,
        commitmentRisk: 65,
        customerConcentration: 20,
        recency: 10,
        priorityOverride: 0,
      },
    },
  ]);

  assert.deepEqual(
    ranked.map((theme) => theme.id),
    ['theme-c', 'theme-a', 'theme-b'],
  );
});
