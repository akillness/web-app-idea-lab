const THEME_KEYWORDS = [
  { label: "access-controls", keywords: ["permission", "permissions", "role-based", "audit log"] },
  { label: "identity-provisioning", keywords: ["sso", "scim", "provisioning"] },
  { label: "analytics-reporting", keywords: ["analytics", "dashboard", "report", "reporting"] },
  { label: "integrations-sync", keywords: ["salesforce", "sync", "integration", "export"] },
  { label: "reliability-imports", keywords: ["timeout", "reliability", "import", "manual export"] },
  { label: "onboarding-friction", keywords: ["onboarding", "setup", "stalling"] },
  { label: "roadmap-clarity", keywords: ["when", "later", "roadmap", "direction", "why-not-now"] }
];

const ARR_WEIGHTS = {
  "150k+": 1,
  "50k-150k": 0.7,
  "10k-50k": 0.45,
  "<10k": 0.2
};

const DEFAULT_THEME = "general-feedback";

function normalizeText(value = "") {
  return value.toLowerCase();
}

function unique(items) {
  return [...new Set(items)];
}

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function titleizeTheme(label) {
  return label
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function extractThemes(rawText) {
  const text = normalizeText(rawText);
  const themes = THEME_KEYWORDS.filter(({ keywords }) => keywords.some((keyword) => text.includes(keyword))).map(
    ({ label }) => label
  );

  return themes.length ? unique(themes) : [DEFAULT_THEME];
}

export function extractRecordInsights(record) {
  const text = normalizeText(record.rawText);
  const themes = extractThemes(record.rawText);
  const severity = clamp(
    0.35 +
      (/(blocker|urgent|stalled|churn risk|spiked)/.test(text) ? 0.35 : 0) +
      (/(manual|timeout|security|renewal)/.test(text) ? 0.15 : 0) +
      (record.sourcePreset === "support ticket" ? 0.1 : 0)
  );
  const commitmentRisk = clamp(
    (/(promise|promised|commit|date|quarter|friday|when the|when is later|roadmap response)/.test(text) ? 0.7 : 0) +
      (/(do not commit|directional only|safe explanation)/.test(text) ? 0.2 : 0)
  );
  const recencyScore = clamp((Date.parse(record.uploadedAt) - Date.parse("2026-03-20T00:00:00Z")) / (14 * 86400000));
  const arrWeight = ARR_WEIGHTS[record.arrBand] ?? 0.3;
  const overrideReasons = unique([
    /(churn risk|renewal)/.test(text) ? "churn risk" : null,
    /(strategic segment|segment push)/.test(text) ? "strategic segment" : null,
    /(promise|promised|commit|date|quarter|when is later|roadmap)/.test(text) ? "customer commitment" : null,
    /(foundation|reliability|timeout|manual export)/.test(text) ? "technical foundation" : null
  ].filter(Boolean));

  let questionType = null;
  if (/(when is later|when the|when can|date)/.test(text)) {
    questionType = "when_is_later";
  } else if (/why not now/.test(text)) {
    questionType = "why_not_now";
  } else if (/commit/.test(text)) {
    questionType = "can_you_commit";
  }

  return {
    ...record,
    themes,
    severity,
    commitmentRisk,
    recencyScore,
    arrWeight,
    overrideReasons,
    questionType,
    evidenceSnippet: record.rawText.slice(0, 180)
  };
}

function buildAccounts(processedRecords) {
  const byAccount = new Map();

  for (const record of processedRecords) {
    const existing = byAccount.get(record.accountName) ?? {
      accountName: record.accountName,
      segment: record.segment,
      arrBand: record.arrBand,
      recordCount: 0,
      openCommitmentCount: 0,
      themes: new Set(),
      topSeverity: 0,
      evidence: []
    };

    existing.recordCount += 1;
    existing.openCommitmentCount += record.commitmentRisk >= 0.7 ? 1 : 0;
    existing.topSeverity = Math.max(existing.topSeverity, record.severity);
    record.themes.forEach((theme) => existing.themes.add(theme));
    existing.evidence.push(record.evidenceSnippet);
    byAccount.set(record.accountName, existing);
  }

  return [...byAccount.values()]
    .map((account) => ({
      ...account,
      themes: [...account.themes].map(titleizeTheme),
      evidenceSummary: account.evidence[0]
    }))
    .sort((a, b) => b.topSeverity - a.topSeverity || b.openCommitmentCount - a.openCommitmentCount);
}

function buildThemes(processedRecords) {
  const byTheme = new Map();

  for (const record of processedRecords) {
    for (const theme of record.themes) {
      const existing = byTheme.get(theme) ?? {
        id: theme,
        canonicalLabel: titleizeTheme(theme),
        linkedAccounts: new Set(),
        evidence: [],
        frequency: 0,
        severityTotal: 0,
        arrWeight: 0,
        commitmentRisk: 0,
        recencyScore: 0,
        overrideReasons: new Set()
      };

      existing.frequency += 1;
      existing.severityTotal += record.severity;
      existing.arrWeight = Math.max(existing.arrWeight, record.arrWeight);
      existing.commitmentRisk = Math.max(existing.commitmentRisk, record.commitmentRisk);
      existing.recencyScore = Math.max(existing.recencyScore, record.recencyScore);
      existing.linkedAccounts.add(record.accountName);
      record.overrideReasons.forEach((reason) => existing.overrideReasons.add(reason));
      existing.evidence.push({ accountName: record.accountName, snippet: record.evidenceSnippet });
      byTheme.set(theme, existing);
    }
  }

  return [...byTheme.values()]
    .map((theme) => {
      const customerConcentration = clamp(theme.linkedAccounts.size / 4);
      const severityScore = clamp(theme.severityTotal / theme.frequency);
      const overrideScore = clamp(theme.overrideReasons.size / 4);
      const totalScore =
        severityScore * 20 +
        clamp(theme.frequency / 4) * 20 +
        theme.arrWeight * 20 +
        theme.commitmentRisk * 20 +
        customerConcentration * 10 +
        theme.recencyScore * 5 +
        overrideScore * 5;

      return {
        id: theme.id,
        canonicalLabel: theme.canonicalLabel,
        linkedAccounts: [...theme.linkedAccounts],
        frequency: theme.frequency,
        severityScore: Number(severityScore.toFixed(2)),
        revenueRiskScore: Number(theme.arrWeight.toFixed(2)),
        commitmentRiskScore: Number(theme.commitmentRisk.toFixed(2)),
        recencyScore: Number(theme.recencyScore.toFixed(2)),
        overrideScore: Number(overrideScore.toFixed(2)),
        totalScore: Number(totalScore.toFixed(1)),
        overrideReasons: [...theme.overrideReasons],
        whyThisJumped: `${theme.canonicalLabel} moved up because ${theme.linkedAccounts.size} account(s) mention it, including high-value accounts, and the latest evidence contains elevated risk cues.`,
        whyNotNow:
          theme.commitmentRisk > 0.6
            ? "Keep the external response directional until delivery confidence is higher."
            : "Lower urgency or weaker account concentration keeps this behind current must-fix work.",
        topEvidence: theme.evidence.slice(0, 2)
      };
    })
    .sort((a, b) => b.totalScore - a.totalScore);
}

function buildDecisionQueue(themes) {
  return themes.slice(0, 3).map((theme, index) => ({
    queueRank: index + 1,
    themeId: theme.id,
    canonicalLabel: theme.canonicalLabel,
    recommendationType: index === 0 ? "build_now" : index === 1 ? "validate_next" : "hold",
    whyBuildNext: `${theme.canonicalLabel} is the clearest build-next candidate because it combines strong account evidence with explainable urgency.`,
    whyNotAlternative: theme.whyNotNow,
    linkedAccountIds: theme.linkedAccounts,
    confidence: index === 0 ? "high" : index === 1 ? "medium" : "medium"
  }));
}

function buildCommitmentQueue(processedRecords) {
  return processedRecords
    .filter((record) => record.commitmentRisk >= 0.7 || record.questionType)
    .map((record) => ({
      accountName: record.accountName,
      questionType: record.questionType ?? "follow_up_needed",
      riskLevel: record.commitmentRisk > 0.85 ? "high" : "medium",
      suggestedAnswer:
        record.questionType === "when_is_later"
          ? "We are actively validating this area and will share a firmer near-term update only when delivery confidence is high."
          : "We are prioritizing this direction, but we are not committing to a date until the underlying scope is stable.",
      suggestedSafeWording:
        "Use directional language: 'This is in active evaluation' or 'This moved higher in priority' instead of giving a dated promise.",
      owner: record.segment === "enterprise" ? "PM + Sales" : "PM",
      nextActionAt: "next weekly review",
      evidenceSnippet: record.evidenceSnippet
    }));
}

function buildBrief(themes, accounts, commitments) {
  const topTheme = themes[0];
  const riskAccount = accounts[0];
  const secondTheme = themes[1];

  return {
    title: "Weekly decision brief",
    whatGotWorse: topTheme
      ? `${topTheme.canonicalLabel} surfaced as the sharpest pain this week.`
      : "No sharp deterioration detected.",
    segmentAtRisk: riskAccount ? `${riskAccount.segment} accounts led by ${riskAccount.accountName}.` : "No segment flagged.",
    accountConcentrationRisk: topTheme
      ? `${topTheme.linkedAccounts.join(", ")} concentrate the top-ranked theme.`
      : "No concentration risk detected.",
    commitmentsAtRisk: commitments.length
      ? `${commitments.length} commitment/explanation item(s) need safer wording this week.`
      : "No commitment-risk items detected.",
    recommendedActionsNow: topTheme
      ? [`Investigate ${topTheme.canonicalLabel}.`, `Prepare a safe customer-facing explanation for ${topTheme.linkedAccounts[0]}.`]
      : [],
    priorityOverridesAndWhy: topTheme?.overrideReasons.length
      ? topTheme.overrideReasons
      : ["No overrides applied"],
    whyThisJumped: topTheme?.whyThisJumped ?? "No theme jumps this week.",
    whyNotNow: secondTheme?.whyNotNow ?? "No deferred alternative recorded.",
    buildNextRecommendation: topTheme
      ? `Build next: ${topTheme.canonicalLabel}.`
      : "No build-next recommendation yet.",
    strategyTimeTax: commitments.length
      ? `High-touch explanation work is concentrated in ${commitments.map((item) => item.accountName).join(", ")}.`
      : "Minimal strategy-time tax detected."
  };
}

function buildUpdateDraft(themes) {
  const [nowTheme, nextTheme, laterTheme] = themes;
  return {
    nowText: nowTheme
      ? `Now: we are actively improving ${nowTheme.canonicalLabel.toLowerCase()} based on repeated customer evidence.`
      : "Now: no near-term commitment drafted.",
    nextText: nextTheme
      ? `Next: ${nextTheme.canonicalLabel.toLowerCase()} remains a high-priority direction, but we are keeping timing flexible while we validate scope.`
      : "Next: no additional direction drafted.",
    laterText: laterTheme
      ? `Later: ${laterTheme.canonicalLabel.toLowerCase()} is on the roadmap as a directional area rather than a scheduled commitment.`
      : "Later: no later-stage direction drafted.",
    bucketDefinitionNote:
      "Only 'Now' can imply a near-term commitment. 'Next' and 'Later' are directional buckets, not dated promises.",
    ambiguityNote:
      "If asked for timing, respond with confidence level and validation status instead of a calendar promise.",
    answerWhenIsLater:
      "Later means the problem is recognized, but we will only share timing after the current priority set is validated.",
    answerWhyNotCommitted:
      "We avoid dated commitments until we have enough delivery confidence to support them responsibly."
  };
}

export function buildMarkdownSnapshot(dashboard) {
  const themeLines = dashboard.themes
    .slice(0, 3)
    .map((theme) => `- ${theme.canonicalLabel} (score ${theme.totalScore}) — ${theme.whyThisJumped}`)
    .join("\n");
  const commitmentLines = dashboard.commitments.length
    ? dashboard.commitments.map((item) => `- ${item.accountName}: ${item.suggestedAnswer}`).join("\n")
    : "- No commitment-risk items right now";

  return `# Weekly VoC Snapshot\n\n## Build next\n${dashboard.brief.buildNextRecommendation}\n\n## Top themes\n${themeLines}\n\n## Commitments\n${commitmentLines}\n\n## Safe update draft\n- ${dashboard.updateDraft.nowText}\n- ${dashboard.updateDraft.nextText}\n- ${dashboard.updateDraft.laterText}`;
}

export function buildDashboard(records) {
  const processedRecords = records.map(extractRecordInsights);
  const accounts = buildAccounts(processedRecords);
  const themes = buildThemes(processedRecords);
  const decisionQueue = buildDecisionQueue(themes);
  const commitments = buildCommitmentQueue(processedRecords);
  const brief = buildBrief(themes, accounts, commitments);
  const updateDraft = buildUpdateDraft(themes);

  return {
    records: processedRecords,
    accounts,
    themes,
    decisionQueue,
    commitments,
    brief,
    updateDraft,
    markdown: ""
  };
}
