export const sampleRecords = [
  {
    id: "rec-001",
    sourceType: "ticket",
    sourcePreset: "support ticket",
    captureOrigin: "system",
    accountName: "Northstar Health",
    customerName: "Avery",
    segment: "enterprise",
    arrBand: "150k+",
    rawText:
      "Our onboarding keeps stalling because SSO provisioning is manual. Security is asking for SCIM, audit logs, and role-based permissions before renewal. The team says this is now a blocker and churn risk if we cannot clarify direction this quarter.",
    uploadedAt: "2026-04-01T10:00:00Z"
  },
  {
    id: "rec-002",
    sourceType: "call-note",
    sourcePreset: "call note",
    captureOrigin: "meeting_note",
    accountName: "Northstar Health",
    customerName: "Avery",
    segment: "enterprise",
    arrBand: "150k+",
    rawText:
      "Customer asked again when the permissions work will move from later to now. Sales promised an update after the Q2 planning review and wants safer wording for the roadmap response.",
    uploadedAt: "2026-04-02T08:30:00Z"
  },
  {
    id: "rec-003",
    sourceType: "crm-note",
    sourcePreset: "CRM note",
    captureOrigin: "manual_paste",
    accountName: "Bluebird Analytics",
    customerName: "Jules",
    segment: "mid-market",
    arrBand: "50k-150k",
    rawText:
      "Expansion deal depends on Salesforce sync and cleaner analytics exports. They can live with current reports for a few weeks, but manual export work is eating their ops team. This is tied to a strategic segment push.",
    uploadedAt: "2026-03-30T16:45:00Z"
  },
  {
    id: "rec-004",
    sourceType: "slack",
    sourcePreset: "Slack paste",
    captureOrigin: "personal_note",
    accountName: "Comet Freight",
    customerName: "Mina",
    segment: "commercial",
    arrBand: "10k-50k",
    rawText:
      "Support volume spiked after another import timeout. Reliability is hurting onboarding, but there is no explicit promise out yet. Team mostly needs a short why-not-now explanation for lower priority requests.",
    uploadedAt: "2026-03-29T12:15:00Z"
  },
  {
    id: "rec-005",
    sourceType: "survey",
    sourcePreset: "survey",
    captureOrigin: "system",
    accountName: "Bluebird Analytics",
    customerName: "Jules",
    segment: "mid-market",
    arrBand: "50k-150k",
    rawText:
      "Admins want better dashboards, usage analytics, and self-serve reporting. Not a churn signal yet, but this theme keeps showing up across multiple teams.",
    uploadedAt: "2026-03-28T09:10:00Z"
  },
  {
    id: "rec-006",
    sourceType: "roadmap-note",
    sourcePreset: "roadmap/customer commitment note",
    captureOrigin: "manual_paste",
    accountName: "Northstar Health",
    customerName: "Avery",
    segment: "enterprise",
    arrBand: "150k+",
    rawText:
      "Internal note: do not commit to a date for SCIM yet. Keep next/later directional only, but answer why permissions work jumped ahead of analytics. Customer needs a safe explanation by Friday.",
    uploadedAt: "2026-04-02T09:00:00Z"
  }
];
