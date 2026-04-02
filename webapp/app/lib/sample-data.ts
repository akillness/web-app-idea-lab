// VOC Repository — sample data (no API calls, no fetch)

export type HealthRiskLevel = 'critical' | 'high' | 'medium' | 'low'
export type SignalType =
  | 'feature_request'
  | 'support_escalation'
  | 'churn_risk'
  | 'sales_commitment'
  | 'rfp'
export type RecordStatus = 'new' | 'triaged' | 'in_review' | 'resolved'
export type RecommendationType = 'build_now' | 'validate_next' | 'hold'

export interface Account {
  id: string
  name: string
  arr_band: string
  arr_value: number
  health_risk_level: HealthRiskLevel
  open_commitment_count: number
  top_pain_themes: string[]
  latest_signal_type: SignalType
  evidence_summary: string
}

export interface VocRecord {
  id: string
  account_id: string
  account_name: string
  source_type: string
  signal_type: SignalType
  severity: number // 1-5
  status: RecordStatus
  summary: string
  date: string
}

export interface ThemeScore {
  frequency: number   // 0-1
  severity: number    // 0-1
  arr_importance: number // 0-1
  commitment_risk: number // 0-1
}

export interface Theme {
  id: string
  name: string
  score: ThemeScore
  total_score: number
  recommendation: RecommendationType
  why_jumped: string
  why_not_now: string | null
  evidence_count: number
}

export interface DecisionQueueItem {
  id: string
  rank: number
  theme_name: string
  recommendation: RecommendationType
  total_score: number
  why_build_next: string
  why_not_alternative: string
  linked_accounts: string[]
}

export interface WeeklyBrief {
  week_ending: string
  what_got_worse: string[]
  segment_at_risk: string
  commitments_at_risk: string[]
  recommended_actions: string[]
  build_next_recommendation: string
  why_this_jumped: string
  why_not_now: string
  strategy_tax_hours: number
  decision_trace: string
}

// ── Accounts ───────────────────────────────────────────────────────────────

export const accounts: Account[] = [
  {
    id: 'acc-001',
    name: 'Acme Corp',
    arr_band: '$500K–$1M',
    arr_value: 750000,
    health_risk_level: 'critical',
    open_commitment_count: 4,
    top_pain_themes: ['Data Export Latency', 'SSO Integration'],
    latest_signal_type: 'churn_risk',
    evidence_summary:
      'Acme Corp has escalated twice in Q1 over data export latency exceeding SLA. Their procurement lead signaled renewal may be at risk without SSO support by Q2.',
  },
  {
    id: 'acc-002',
    name: 'TechFlow',
    arr_band: '$250K–$500K',
    arr_value: 380000,
    health_risk_level: 'high',
    open_commitment_count: 2,
    top_pain_themes: ['API Rate Limits', 'Bulk Operations'],
    latest_signal_type: 'sales_commitment',
    evidence_summary:
      'TechFlow is blocked on API rate limits for their nightly sync jobs. Sales committed to a higher tier limit in the contract; engineering has not yet delivered.',
  },
  {
    id: 'acc-003',
    name: 'DataPulse',
    arr_band: '$100K–$250K',
    arr_value: 175000,
    health_risk_level: 'medium',
    open_commitment_count: 1,
    top_pain_themes: ['Custom Dashboards', 'Webhook Reliability'],
    latest_signal_type: 'feature_request',
    evidence_summary:
      'DataPulse has requested custom dashboard layouts for 3 months. Single open commitment for webhook retry logic remains unresolved.',
  },
  {
    id: 'acc-004',
    name: 'ScaleUp',
    arr_band: '$50K–$100K',
    arr_value: 82000,
    health_risk_level: 'low',
    open_commitment_count: 0,
    top_pain_themes: ['Onboarding UX', 'Role Permissions'],
    latest_signal_type: 'rfp',
    evidence_summary:
      'ScaleUp is healthy. They submitted an RFP question around role-based access control for their enterprise expansion. No open commitments.',
  },
  {
    id: 'acc-005',
    name: 'EnterpriseX',
    arr_band: '$1M+',
    arr_value: 1400000,
    health_risk_level: 'high',
    open_commitment_count: 3,
    top_pain_themes: ['SSO Integration', 'Audit Logging', 'Data Residency'],
    latest_signal_type: 'support_escalation',
    evidence_summary:
      'EnterpriseX is our largest account and escalated last week over missing audit log exports. Three commitments are overdue — SSO, audit logs, and EU data residency.',
  },
]

// ── Records ────────────────────────────────────────────────────────────────

export const records: VocRecord[] = [
  {
    id: 'rec-001',
    account_id: 'acc-001',
    account_name: 'Acme Corp',
    source_type: 'Support Ticket',
    signal_type: 'support_escalation',
    severity: 5,
    status: 'in_review',
    summary: 'Data export jobs timing out after 30 seconds — SLA breach.',
    date: '2026-03-28',
  },
  {
    id: 'rec-002',
    account_id: 'acc-001',
    account_name: 'Acme Corp',
    source_type: 'Sales Call',
    signal_type: 'churn_risk',
    severity: 5,
    status: 'triaged',
    summary: 'Renewal at risk unless SSO is delivered before Q2 end.',
    date: '2026-03-25',
  },
  {
    id: 'rec-003',
    account_id: 'acc-001',
    account_name: 'Acme Corp',
    source_type: 'NPS Survey',
    signal_type: 'feature_request',
    severity: 3,
    status: 'new',
    summary: 'Requesting CSV and Parquet export format options.',
    date: '2026-03-20',
  },
  {
    id: 'rec-004',
    account_id: 'acc-002',
    account_name: 'TechFlow',
    source_type: 'Contract Addendum',
    signal_type: 'sales_commitment',
    severity: 4,
    status: 'in_review',
    summary: 'Sales committed 10× API rate limit increase by April 15.',
    date: '2026-03-18',
  },
  {
    id: 'rec-005',
    account_id: 'acc-002',
    account_name: 'TechFlow',
    source_type: 'Support Ticket',
    signal_type: 'support_escalation',
    severity: 4,
    status: 'triaged',
    summary: 'Nightly sync fails when rate limit hit — data integrity risk.',
    date: '2026-03-29',
  },
  {
    id: 'rec-006',
    account_id: 'acc-002',
    account_name: 'TechFlow',
    source_type: 'Product Interview',
    signal_type: 'feature_request',
    severity: 3,
    status: 'new',
    summary: 'Bulk delete and bulk update endpoints needed for migration tool.',
    date: '2026-03-22',
  },
  {
    id: 'rec-007',
    account_id: 'acc-003',
    account_name: 'DataPulse',
    source_type: 'In-App Feedback',
    signal_type: 'feature_request',
    severity: 2,
    status: 'new',
    summary: 'Custom widget layout and saved dashboard views.',
    date: '2026-03-15',
  },
  {
    id: 'rec-008',
    account_id: 'acc-003',
    account_name: 'DataPulse',
    source_type: 'Support Ticket',
    signal_type: 'support_escalation',
    severity: 3,
    status: 'resolved',
    summary: 'Webhook missed delivery on 3 consecutive events.',
    date: '2026-03-10',
  },
  {
    id: 'rec-009',
    account_id: 'acc-004',
    account_name: 'ScaleUp',
    source_type: 'RFP Document',
    signal_type: 'rfp',
    severity: 2,
    status: 'triaged',
    summary: 'RFP asks for RBAC with department-level isolation.',
    date: '2026-03-26',
  },
  {
    id: 'rec-010',
    account_id: 'acc-004',
    account_name: 'ScaleUp',
    source_type: 'Onboarding Call',
    signal_type: 'feature_request',
    severity: 1,
    status: 'resolved',
    summary: 'Onboarding wizard feels too long — reduce to 3 steps.',
    date: '2026-03-05',
  },
  {
    id: 'rec-011',
    account_id: 'acc-005',
    account_name: 'EnterpriseX',
    source_type: 'Support Ticket',
    signal_type: 'support_escalation',
    severity: 5,
    status: 'in_review',
    summary: 'Cannot export audit logs in SIEM-compatible format.',
    date: '2026-03-30',
  },
  {
    id: 'rec-012',
    account_id: 'acc-005',
    account_name: 'EnterpriseX',
    source_type: 'Legal Review',
    signal_type: 'sales_commitment',
    severity: 5,
    status: 'triaged',
    summary: 'EU data residency required for GDPR compliance — committed.',
    date: '2026-03-12',
  },
  {
    id: 'rec-013',
    account_id: 'acc-005',
    account_name: 'EnterpriseX',
    source_type: 'Sales Call',
    signal_type: 'sales_commitment',
    severity: 4,
    status: 'triaged',
    summary: 'SAML SSO promised before enterprise rollout in May.',
    date: '2026-03-08',
  },
  {
    id: 'rec-014',
    account_id: 'acc-005',
    account_name: 'EnterpriseX',
    source_type: 'QBR Notes',
    signal_type: 'churn_risk',
    severity: 4,
    status: 'in_review',
    summary: 'Exec sponsor signaled they are evaluating a competitor.',
    date: '2026-03-27',
  },
  {
    id: 'rec-015',
    account_id: 'acc-001',
    account_name: 'Acme Corp',
    source_type: 'RFP Document',
    signal_type: 'rfp',
    severity: 3,
    status: 'new',
    summary: 'RFP requires SOC 2 Type II and SSO as mandatory criteria.',
    date: '2026-03-31',
  },
]

// ── Themes ─────────────────────────────────────────────────────────────────

export const themes: Theme[] = [
  {
    id: 'thm-001',
    name: 'SSO Integration',
    score: { frequency: 0.9, severity: 0.95, arr_importance: 0.98, commitment_risk: 0.92 },
    total_score: 0.94,
    recommendation: 'build_now',
    why_jumped:
      'Two $1M+ accounts have open SSO commitments overdue. Competitor win risk increased this week.',
    why_not_now: null,
    evidence_count: 5,
  },
  {
    id: 'thm-002',
    name: 'Data Export Latency',
    score: { frequency: 0.85, severity: 0.9, arr_importance: 0.75, commitment_risk: 0.7 },
    total_score: 0.8,
    recommendation: 'build_now',
    why_jumped:
      'SLA breach reported by Acme Corp. Support cost from this theme doubled in 30 days.',
    why_not_now: null,
    evidence_count: 4,
  },
  {
    id: 'thm-003',
    name: 'Audit Logging',
    score: { frequency: 0.7, severity: 0.88, arr_importance: 0.95, commitment_risk: 0.85 },
    total_score: 0.845,
    recommendation: 'build_now',
    why_jumped:
      'EnterpriseX escalation last week. Audit log export is a blocker for their SIEM pipeline.',
    why_not_now: null,
    evidence_count: 3,
  },
  {
    id: 'thm-004',
    name: 'API Rate Limits',
    score: { frequency: 0.75, severity: 0.8, arr_importance: 0.65, commitment_risk: 0.78 },
    total_score: 0.745,
    recommendation: 'validate_next',
    why_jumped:
      'TechFlow sales commitment is overdue. Three other accounts mentioned limits in interviews.',
    why_not_now:
      'Higher-tier limit is an infrastructure cost question. Needs sizing before commit.',
    evidence_count: 4,
  },
  {
    id: 'thm-005',
    name: 'Data Residency (EU)',
    score: { frequency: 0.5, severity: 0.85, arr_importance: 0.9, commitment_risk: 0.88 },
    total_score: 0.78,
    recommendation: 'validate_next',
    why_jumped:
      'EnterpriseX legal flagged GDPR risk. One other prospect also requires EU residency.',
    why_not_now:
      'Requires infrastructure decision on multi-region architecture. 6+ week lead time.',
    evidence_count: 3,
  },
  {
    id: 'thm-006',
    name: 'Custom Dashboards',
    score: { frequency: 0.6, severity: 0.4, arr_importance: 0.45, commitment_risk: 0.2 },
    total_score: 0.41,
    recommendation: 'hold',
    why_jumped: 'Repeated feature requests from DataPulse over 90 days.',
    why_not_now:
      'No ARR at risk. Mid-market segment, low severity. Deprioritized vs. compliance blockers.',
    evidence_count: 3,
  },
  {
    id: 'thm-007',
    name: 'Role-Based Access Control',
    score: { frequency: 0.55, severity: 0.5, arr_importance: 0.55, commitment_risk: 0.35 },
    total_score: 0.49,
    recommendation: 'validate_next',
    why_jumped:
      'ScaleUp RFP and two other prospects asked for department-level RBAC in the same week.',
    why_not_now:
      'No current churn risk attached. Worth validating design before committing to build.',
    evidence_count: 3,
  },
  {
    id: 'thm-008',
    name: 'Webhook Reliability',
    score: { frequency: 0.45, severity: 0.5, arr_importance: 0.35, commitment_risk: 0.25 },
    total_score: 0.39,
    recommendation: 'hold',
    why_jumped: 'DataPulse support ticket resolved, but underlying retry logic still missing.',
    why_not_now:
      'Only one account affected at this severity. Schedule for next infrastructure sprint.',
    evidence_count: 2,
  },
]

// ── Decision Queue ─────────────────────────────────────────────────────────

export const decisionQueue: DecisionQueueItem[] = [
  {
    id: 'dq-001',
    rank: 1,
    theme_name: 'SSO Integration',
    recommendation: 'build_now',
    total_score: 0.94,
    why_build_next:
      'Two critical accounts have overdue SSO commitments. Churn risk is explicit and time-boxed to Q2. Competitor is actively demoing SSO this month.',
    why_not_alternative:
      'Custom Dashboards has more total requests but zero ARR at risk. Webhook Reliability is a single-account issue. Neither competes with SSO urgency.',
    linked_accounts: ['EnterpriseX', 'Acme Corp'],
  },
  {
    id: 'dq-002',
    rank: 2,
    theme_name: 'Audit Logging',
    recommendation: 'build_now',
    total_score: 0.845,
    why_build_next:
      'EnterpriseX ($1.4M ARR) is blocked on SIEM integration without audit log export. Compliance deadline is real.',
    why_not_alternative:
      'API Rate Limits affects a smaller ARR base and has a workaround. Data Residency requires architecture decision first.',
    linked_accounts: ['EnterpriseX'],
  },
  {
    id: 'dq-003',
    rank: 3,
    theme_name: 'Data Export Latency',
    recommendation: 'build_now',
    total_score: 0.8,
    why_build_next:
      'Active SLA breach for Acme Corp. Support cost is accelerating. Fix is targeted (query optimization + streaming).',
    why_not_alternative:
      'Data Residency has higher ARR importance but longer implementation time. Export latency can ship in 1 sprint.',
    linked_accounts: ['Acme Corp'],
  },
  {
    id: 'dq-004',
    rank: 4,
    theme_name: 'API Rate Limits',
    recommendation: 'validate_next',
    total_score: 0.745,
    why_build_next:
      'TechFlow commitment is overdue and three other accounts mentioned limits. Validate infrastructure cost of a higher tier before committing.',
    why_not_alternative:
      'Not building now because the cost model is unknown. Hold for Custom Dashboards does not apply — RBAC and Rate Limits are both validate candidates.',
    linked_accounts: ['TechFlow'],
  },
  {
    id: 'dq-005',
    rank: 5,
    theme_name: 'Data Residency (EU)',
    recommendation: 'validate_next',
    total_score: 0.78,
    why_build_next:
      'Required for GDPR compliance at EnterpriseX. Must validate multi-region architecture before committing timeline.',
    why_not_alternative:
      'Not build_now because infrastructure lead time is 6+ weeks and architectural decision is still open.',
    linked_accounts: ['EnterpriseX'],
  },
]

// ── Weekly Brief ───────────────────────────────────────────────────────────

export const weeklyBrief: WeeklyBrief = {
  week_ending: '2026-04-04',
  what_got_worse: [
    'EnterpriseX audit log escalation opened — SIEM pipeline blocked.',
    'Acme Corp renewed churn signal; renewal conversation moved to executive level.',
    'TechFlow nightly sync failure count increased 3× vs. last week.',
  ],
  segment_at_risk:
    'Enterprise (>$500K ARR) — 2 of 2 enterprise accounts are now at "high" or "critical" risk. Combined ARR at risk: $2.15M.',
  commitments_at_risk: [
    'SSO Integration — EnterpriseX (due March 31, overdue)',
    'SSO Integration — Acme Corp (due April 15, 2 weeks remaining)',
    'API Rate Limit increase — TechFlow (due April 15, 2 weeks remaining)',
    'EU Data Residency — EnterpriseX (due May 1, 4 weeks remaining)',
    'Audit Log Export — EnterpriseX (committed verbally, no date set)',
  ],
  recommended_actions: [
    'Start SSO sprint immediately — assign 2 engineers this week.',
    'Unblock audit log export for EnterpriseX within 10 days.',
    'Fix data export latency — target 1-sprint fix via query streaming.',
    'Validate API rate limit cost model by April 10 before committing to TechFlow.',
  ],
  build_next_recommendation: 'SSO Integration',
  why_this_jumped:
    'SSO moved to the top this week because both EnterpriseX and Acme Corp made it an explicit renewal condition. The competitor actively demoing SSO raises the urgency from "important" to "existential." Combined ARR on the line: $2.15M.',
  why_not_now:
    'Custom Dashboards and Webhook Reliability remain on hold — no ARR is at risk from either, and building them now would consume engineering capacity needed for compliance-critical items.',
  strategy_tax_hours: 14,
  decision_trace:
    'Signal intake: 15 records this week → triaged by severity and ARR → 3 build_now items surfaced → ranked by commitment risk × ARR → SSO ranked #1 for 3rd consecutive week → brief generated.',
}
