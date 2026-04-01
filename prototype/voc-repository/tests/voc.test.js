import test from "node:test";
import assert from "node:assert/strict";

import { buildDashboard, extractRecordInsights } from "../src/lib/voc.js";
import { sampleRecords } from "../src/data/sample-records.js";

test("enterprise commitment-heavy theme ranks at the top", () => {
  const dashboard = buildDashboard(sampleRecords);

  assert.equal(dashboard.themes[0].canonicalLabel, "Roadmap Clarity");
  assert.ok(dashboard.themes[0].totalScore >= dashboard.themes[1].totalScore);
  assert.ok(dashboard.decisionQueue[0].canonicalLabel.length > 0);
});

test("update draft keeps next and later directional instead of dated", () => {
  const dashboard = buildDashboard(sampleRecords);
  const combined = `${dashboard.updateDraft.nextText} ${dashboard.updateDraft.laterText}`.toLowerCase();

  assert.match(combined, /direction|flexible|scheduled commitment/);
  assert.doesNotMatch(combined, /q[1-4]|january|february|march|april|may|june|july|august|september|october|november|december|\d{4}/);
});

test("records with timing questions enter the commitment queue", () => {
  const record = extractRecordInsights({
    id: "rec-extra",
    sourcePreset: "call note",
    rawText: "Customer asked when this lands and wants a roadmap date for later.",
    uploadedAt: "2026-04-02T12:00:00Z",
    accountName: "Orbit Cloud",
    segment: "enterprise",
    arrBand: "150k+"
  });

  assert.equal(record.questionType, "when_is_later");
  assert.ok(record.commitmentRisk >= 0.7);
});
