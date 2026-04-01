import { sampleRecords } from "./data/sample-records.js";
import { buildDashboard, buildMarkdownSnapshot } from "./lib/voc.js";

const STORAGE_KEY = "voc-repository-prototype-records";

function loadRecords() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return sampleRecords;

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : sampleRecords;
  } catch {
    return sampleRecords;
  }
}

function saveRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function formatPercent(value) {
  return `${Math.round(value * 100)}%`;
}

function renderList(container, items, renderer) {
  container.innerHTML = items.map(renderer).join("");
}

function createRecordId() {
  return `rec-${crypto.randomUUID().slice(0, 8)}`;
}

const state = {
  records: loadRecords()
};

const metricsEl = document.querySelector("#metrics");
const accountsEl = document.querySelector("#accounts-grid");
const themesEl = document.querySelector("#themes-grid");
const queueEl = document.querySelector("#queue-grid");
const commitmentsEl = document.querySelector("#commitment-grid");
const briefEl = document.querySelector("#brief-grid");
const updatesEl = document.querySelector("#updates-grid");
const markdownEl = document.querySelector("#markdown-output");
const formEl = document.querySelector("#record-form");
const resetEl = document.querySelector("#reset-records");
const seedEl = document.querySelector("#seed-summary");

function render() {
  const dashboard = buildDashboard(state.records);
  const markdown = buildMarkdownSnapshot(dashboard);

  metricsEl.innerHTML = `
    <article class="metric-card">
      <span class="metric-label">Records</span>
      <strong>${dashboard.records.length}</strong>
    </article>
    <article class="metric-card">
      <span class="metric-label">Accounts at risk</span>
      <strong>${dashboard.accounts.filter((account) => account.topSeverity >= 0.65).length}</strong>
    </article>
    <article class="metric-card">
      <span class="metric-label">Themes ranked</span>
      <strong>${dashboard.themes.length}</strong>
    </article>
    <article class="metric-card">
      <span class="metric-label">Commitment queue</span>
      <strong>${dashboard.commitments.length}</strong>
    </article>
  `;

  renderList(
    accountsEl,
    dashboard.accounts,
    (account) => `
      <article class="card">
        <div class="card-header">
          <h3>${account.accountName}</h3>
          <span class="pill">${account.segment}</span>
        </div>
        <p class="meta">ARR ${account.arrBand} · Records ${account.recordCount} · Commitments ${account.openCommitmentCount}</p>
        <p>${account.evidenceSummary}</p>
        <p class="meta">Themes: ${account.themes.join(", ")}</p>
      </article>
    `
  );

  renderList(
    themesEl,
    dashboard.themes,
    (theme) => `
      <article class="card">
        <div class="card-header">
          <h3>${theme.canonicalLabel}</h3>
          <span class="score">${theme.totalScore}</span>
        </div>
        <p class="meta">Accounts: ${theme.linkedAccounts.join(", ")}</p>
        <div class="progress-row">
          <span>Severity ${formatPercent(theme.severityScore)}</span>
          <span>Commitment ${formatPercent(theme.commitmentRiskScore)}</span>
        </div>
        <p><strong>Why this jumped:</strong> ${theme.whyThisJumped}</p>
        <p><strong>Why not now:</strong> ${theme.whyNotNow}</p>
      </article>
    `
  );

  renderList(
    queueEl,
    dashboard.decisionQueue,
    (item) => `
      <article class="card">
        <div class="card-header">
          <h3>#${item.queueRank} ${item.canonicalLabel}</h3>
          <span class="pill">${item.recommendationType}</span>
        </div>
        <p>${item.whyBuildNext}</p>
        <p class="meta">Why not alternatives: ${item.whyNotAlternative}</p>
      </article>
    `
  );

  renderList(
    commitmentsEl,
    dashboard.commitments,
    (item) => `
      <article class="card">
        <div class="card-header">
          <h3>${item.accountName}</h3>
          <span class="pill pill-warning">${item.riskLevel}</span>
        </div>
        <p><strong>Question:</strong> ${item.questionType}</p>
        <p><strong>Suggested answer:</strong> ${item.suggestedAnswer}</p>
        <p class="meta">Owner: ${item.owner} · Next action: ${item.nextActionAt}</p>
      </article>
    `
  );

  briefEl.innerHTML = `
    <article class="card card-brief">
      <h3>${dashboard.brief.title}</h3>
      <ul>
        <li><strong>What got worse:</strong> ${dashboard.brief.whatGotWorse}</li>
        <li><strong>Segment at risk:</strong> ${dashboard.brief.segmentAtRisk}</li>
        <li><strong>Account concentration:</strong> ${dashboard.brief.accountConcentrationRisk}</li>
        <li><strong>Commitments at risk:</strong> ${dashboard.brief.commitmentsAtRisk}</li>
        <li><strong>Build next:</strong> ${dashboard.brief.buildNextRecommendation}</li>
        <li><strong>Why this jumped:</strong> ${dashboard.brief.whyThisJumped}</li>
        <li><strong>Why not now:</strong> ${dashboard.brief.whyNotNow}</li>
        <li><strong>Strategy-time tax:</strong> ${dashboard.brief.strategyTimeTax}</li>
      </ul>
    </article>
  `;

  updatesEl.innerHTML = `
    <article class="card">
      <h3>Commitment-safe update draft</h3>
      <p>${dashboard.updateDraft.nowText}</p>
      <p>${dashboard.updateDraft.nextText}</p>
      <p>${dashboard.updateDraft.laterText}</p>
      <p class="meta">${dashboard.updateDraft.bucketDefinitionNote}</p>
      <p class="meta">${dashboard.updateDraft.ambiguityNote}</p>
    </article>
  `;

  markdownEl.value = markdown;
  seedEl.textContent = `Loaded ${state.records.length} records. Add messy notes and watch the decision artifacts update immediately.`;
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(formEl);

  const record = {
    id: createRecordId(),
    sourceType: formData.get("sourcePreset"),
    sourcePreset: formData.get("sourcePreset"),
    captureOrigin: "manual_paste",
    accountName: formData.get("accountName").trim(),
    customerName: formData.get("customerName").trim() || "Unknown",
    segment: formData.get("segment"),
    arrBand: formData.get("arrBand"),
    rawText: formData.get("rawText").trim(),
    uploadedAt: new Date().toISOString()
  };

  if (!record.accountName || !record.rawText) {
    return;
  }

  state.records = [record, ...state.records];
  saveRecords(state.records);
  formEl.reset();
  render();
});

resetEl.addEventListener("click", () => {
  state.records = sampleRecords;
  saveRecords(state.records);
  render();
});

render();
