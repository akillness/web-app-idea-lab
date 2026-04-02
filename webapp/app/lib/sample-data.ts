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
    top_pain_themes: ['데이터 내보내기 지연', 'SSO 연동'],
    latest_signal_type: 'churn_risk',
    evidence_summary:
      'Acme Corp는 1분기에 데이터 내보내기 지연으로 두 차례 이슈를 확대했다. 조달 담당자는 2분기 안에 SSO 지원이 없으면 갱신이 흔들릴 수 있다고 언급했다.',
  },
  {
    id: 'acc-002',
    name: 'TechFlow',
    arr_band: '$250K–$500K',
    arr_value: 380000,
    health_risk_level: 'high',
    open_commitment_count: 2,
    top_pain_themes: ['API 요청 한도', '대량 작업'],
    latest_signal_type: 'sales_commitment',
    evidence_summary:
      'TechFlow는 야간 동기화 작업에서 API 요청 한도에 막혀 있다. 세일즈는 계약에서 더 높은 한도를 약속했지만 엔지니어링은 아직 반영하지 못했다.',
  },
  {
    id: 'acc-003',
    name: 'DataPulse',
    arr_band: '$100K–$250K',
    arr_value: 175000,
    health_risk_level: 'medium',
    open_commitment_count: 1,
    top_pain_themes: ['맞춤형 대시보드', '웹훅 안정성'],
    latest_signal_type: 'feature_request',
    evidence_summary:
      'DataPulse는 3개월째 맞춤형 대시보드 레이아웃을 요청하고 있다. 웹훅 재시도 로직에 대한 열린 약속도 아직 해결되지 않았다.',
  },
  {
    id: 'acc-004',
    name: 'ScaleUp',
    arr_band: '$50K–$100K',
    arr_value: 82000,
    health_risk_level: 'low',
    open_commitment_count: 0,
    top_pain_themes: ['온보딩 UX', '권한 관리'],
    latest_signal_type: 'rfp',
    evidence_summary:
      'ScaleUp은 현재 건강한 상태다. 엔터프라이즈 확장을 위해 역할 기반 접근 제어에 대한 RFP 질문을 보냈고, 열린 약속은 없다.',
  },
  {
    id: 'acc-005',
    name: 'EnterpriseX',
    arr_band: '$1M+',
    arr_value: 1400000,
    health_risk_level: 'high',
    open_commitment_count: 3,
    top_pain_themes: ['SSO 연동', '감사 로그', '데이터 리전'],
    latest_signal_type: 'support_escalation',
    evidence_summary:
      'EnterpriseX는 가장 큰 계정이며 지난주 감사 로그 내보내기 부재로 이슈를 확대했다. SSO, 감사 로그, EU 데이터 리전 관련 약속 3건이 지연 중이다.',
  },
]

// ── Records ────────────────────────────────────────────────────────────────

export const records: VocRecord[] = [
  {
    id: 'rec-001',
    account_id: 'acc-001',
    account_name: 'Acme Corp',
    source_type: '지원 티켓',
    signal_type: 'support_escalation',
    severity: 5,
    status: 'in_review',
    summary: '데이터 내보내기 작업이 30초 뒤 시간 초과되어 SLA를 위반하고 있다.',
    date: '2026-03-28',
  },
  {
    id: 'rec-002',
    account_id: 'acc-001',
    account_name: 'Acme Corp',
    source_type: '세일즈 콜',
    signal_type: 'churn_risk',
    severity: 5,
    status: 'triaged',
    summary: '2분기 종료 전 SSO가 제공되지 않으면 갱신이 위험하다.',
    date: '2026-03-25',
  },
  {
    id: 'rec-003',
    account_id: 'acc-001',
    account_name: 'Acme Corp',
    source_type: 'NPS 설문',
    signal_type: 'feature_request',
    severity: 3,
    status: 'new',
    summary: 'CSV와 Parquet 내보내기 형식을 요청했다.',
    date: '2026-03-20',
  },
  {
    id: 'rec-004',
    account_id: 'acc-002',
    account_name: 'TechFlow',
    source_type: '계약 부속 문서',
    signal_type: 'sales_commitment',
    severity: 4,
    status: 'in_review',
    summary: '세일즈가 4월 15일까지 API 요청 한도를 10배 늘리겠다고 약속했다.',
    date: '2026-03-18',
  },
  {
    id: 'rec-005',
    account_id: 'acc-002',
    account_name: 'TechFlow',
    source_type: '지원 티켓',
    signal_type: 'support_escalation',
    severity: 4,
    status: 'triaged',
    summary: '요청 한도에 걸리면 야간 동기화가 실패해 데이터 정합성 위험이 생긴다.',
    date: '2026-03-29',
  },
  {
    id: 'rec-006',
    account_id: 'acc-002',
    account_name: 'TechFlow',
    source_type: '제품 인터뷰',
    signal_type: 'feature_request',
    severity: 3,
    status: 'new',
    summary: '마이그레이션 도구에 대량 삭제/대량 수정 엔드포인트가 필요하다.',
    date: '2026-03-22',
  },
  {
    id: 'rec-007',
    account_id: 'acc-003',
    account_name: 'DataPulse',
    source_type: '인앱 피드백',
    signal_type: 'feature_request',
    severity: 2,
    status: 'new',
    summary: '맞춤형 위젯 배치와 저장된 대시보드 뷰가 필요하다.',
    date: '2026-03-15',
  },
  {
    id: 'rec-008',
    account_id: 'acc-003',
    account_name: 'DataPulse',
    source_type: '지원 티켓',
    signal_type: 'support_escalation',
    severity: 3,
    status: 'resolved',
    summary: '웹훅이 연속 3건 전달에 실패했다.',
    date: '2026-03-10',
  },
  {
    id: 'rec-009',
    account_id: 'acc-004',
    account_name: 'ScaleUp',
    source_type: 'RFP 문서',
    signal_type: 'rfp',
    severity: 2,
    status: 'triaged',
    summary: 'RFP에서 부서 단위 격리를 지원하는 RBAC를 요구한다.',
    date: '2026-03-26',
  },
  {
    id: 'rec-010',
    account_id: 'acc-004',
    account_name: 'ScaleUp',
    source_type: '온보딩 콜',
    signal_type: 'feature_request',
    severity: 1,
    status: 'resolved',
    summary: '온보딩 마법사가 너무 길어 3단계로 줄였으면 한다.',
    date: '2026-03-05',
  },
  {
    id: 'rec-011',
    account_id: 'acc-005',
    account_name: 'EnterpriseX',
    source_type: '지원 티켓',
    signal_type: 'support_escalation',
    severity: 5,
    status: 'in_review',
    summary: 'SIEM 호환 형식으로 감사 로그를 내보낼 수 없다.',
    date: '2026-03-30',
  },
  {
    id: 'rec-012',
    account_id: 'acc-005',
    account_name: 'EnterpriseX',
    source_type: '법무 검토',
    signal_type: 'sales_commitment',
    severity: 5,
    status: 'triaged',
    summary: 'GDPR 준수를 위해 EU 데이터 리전이 필요하며 이미 약속된 상태다.',
    date: '2026-03-12',
  },
  {
    id: 'rec-013',
    account_id: 'acc-005',
    account_name: 'EnterpriseX',
    source_type: '세일즈 콜',
    signal_type: 'sales_commitment',
    severity: 4,
    status: 'triaged',
    summary: '5월 엔터프라이즈 롤아웃 전에 SAML SSO를 제공하기로 약속했다.',
    date: '2026-03-08',
  },
  {
    id: 'rec-014',
    account_id: 'acc-005',
    account_name: 'EnterpriseX',
    source_type: 'QBR 메모',
    signal_type: 'churn_risk',
    severity: 4,
    status: 'in_review',
    summary: '임원 스폰서가 경쟁사 검토를 시작했다고 알렸다.',
    date: '2026-03-27',
  },
  {
    id: 'rec-015',
    account_id: 'acc-001',
    account_name: 'Acme Corp',
    source_type: 'RFP 문서',
    signal_type: 'rfp',
    severity: 3,
    status: 'new',
    summary: 'RFP에서 SOC 2 Type II와 SSO를 필수 조건으로 요구한다.',
    date: '2026-03-31',
  },
]

// ── Themes ─────────────────────────────────────────────────────────────────

export const themes: Theme[] = [
  {
    id: 'thm-001',
    name: 'SSO 연동',
    score: { frequency: 0.9, severity: 0.95, arr_importance: 0.98, commitment_risk: 0.92 },
    total_score: 0.94,
    recommendation: 'build_now',
    why_jumped:
      '$1M 이상 계정 두 곳에서 SSO 약속이 지연 중이다. 이번 주 경쟁사로 넘어갈 위험도 커졌다.',
    why_not_now: null,
    evidence_count: 5,
  },
  {
    id: 'thm-002',
    name: '데이터 내보내기 지연',
    score: { frequency: 0.85, severity: 0.9, arr_importance: 0.75, commitment_risk: 0.7 },
    total_score: 0.8,
    recommendation: 'build_now',
    why_jumped:
      'Acme Corp에서 SLA 위반을 보고했고, 이 테마로 인한 지원 비용이 30일 만에 두 배가 됐다.',
    why_not_now: null,
    evidence_count: 4,
  },
  {
    id: 'thm-003',
    name: '감사 로그',
    score: { frequency: 0.7, severity: 0.88, arr_importance: 0.95, commitment_risk: 0.85 },
    total_score: 0.845,
    recommendation: 'build_now',
    why_jumped:
      '지난주 EnterpriseX가 이슈를 확대했고, 감사 로그 내보내기가 SIEM 파이프라인의 막힘 요인이다.',
    why_not_now: null,
    evidence_count: 3,
  },
  {
    id: 'thm-004',
    name: 'API 요청 한도',
    score: { frequency: 0.75, severity: 0.8, arr_importance: 0.65, commitment_risk: 0.78 },
    total_score: 0.745,
    recommendation: 'validate_next',
    why_jumped:
      'TechFlow 관련 세일즈 약속이 지연 중이며, 다른 세 계정도 인터뷰에서 한도 문제를 언급했다.',
    why_not_now:
      '상위 한도 제공은 인프라 비용 이슈라서 약속 전에 규모 산정이 필요하다.',
    evidence_count: 4,
  },
  {
    id: 'thm-005',
    name: 'Data Residency (EU)',
    score: { frequency: 0.5, severity: 0.85, arr_importance: 0.9, commitment_risk: 0.88 },
    total_score: 0.78,
    recommendation: 'validate_next',
    why_jumped:
      'EnterpriseX 법무팀이 GDPR 리스크를 제기했고, 다른 잠재 고객 한 곳도 EU 리전을 요구한다.',
    why_not_now:
      '멀티 리전 아키텍처에 대한 인프라 결정이 필요하며 리드타임은 6주 이상이다.',
    evidence_count: 3,
  },
  {
    id: 'thm-006',
    name: '맞춤형 대시보드',
    score: { frequency: 0.6, severity: 0.4, arr_importance: 0.45, commitment_risk: 0.2 },
    total_score: 0.41,
    recommendation: 'hold',
    why_jumped: 'DataPulse에서 90일 동안 반복적으로 요청한 기능이다.',
    why_not_now:
      '위험한 ARR은 없고 중견 시장/낮은 심각도라서 컴플라이언스 이슈보다 우선순위가 낮다.',
    evidence_count: 3,
  },
  {
    id: 'thm-007',
    name: 'Role-Based Access Control',
    score: { frequency: 0.55, severity: 0.5, arr_importance: 0.55, commitment_risk: 0.35 },
    total_score: 0.49,
    recommendation: 'validate_next',
    why_jumped:
      'ScaleUp RFP와 다른 잠재 고객 두 곳이 같은 주에 부서 단위 RBAC를 요청했다.',
    why_not_now:
      '현재 직접적인 이탈 위험은 없으므로 개발 약속 전에 설계를 검증하는 편이 낫다.',
    evidence_count: 3,
  },
  {
    id: 'thm-008',
    name: '웹훅 안정성',
    score: { frequency: 0.45, severity: 0.5, arr_importance: 0.35, commitment_risk: 0.25 },
    total_score: 0.39,
    recommendation: 'hold',
    why_jumped: 'DataPulse 지원 이슈는 해결됐지만 근본적인 재시도 로직은 아직 없다.',
    why_not_now:
      '이 심각도로 영향받는 계정은 하나뿐이므로 다음 인프라 스프린트에서 다루면 된다.',
    evidence_count: 2,
  },
]

// ── Decision Queue ─────────────────────────────────────────────────────────

export const decisionQueue: DecisionQueueItem[] = [
  {
    id: 'dq-001',
    rank: 1,
    theme_name: 'SSO 연동',
    recommendation: 'build_now',
    total_score: 0.94,
    why_build_next:
      '치명적 계정 두 곳에서 SSO 약속이 지연 중이다. 이탈 위험은 명확하고 2분기 안에 결정된다. 경쟁사도 이번 달 SSO를 적극 시연 중이다.',
    why_not_alternative:
      '맞춤형 대시보드는 요청 수는 더 많지만 위험한 ARR이 없고, 웹훅 안정성은 단일 계정 이슈다. 둘 다 SSO의 긴급성과는 비교되지 않는다.',
    linked_accounts: ['EnterpriseX', 'Acme Corp'],
  },
  {
    id: 'dq-002',
    rank: 2,
    theme_name: '감사 로그',
    recommendation: 'build_now',
    total_score: 0.845,
    why_build_next:
      'EnterpriseX($1.4M ARR)는 감사 로그 내보내기가 없어 SIEM 연동이 막혀 있다. 컴플라이언스 마감도 실제로 존재한다.',
    why_not_alternative:
      'API 요청 한도 문제는 더 작은 ARR에 영향을 주고 우회책도 있다. 데이터 리전은 먼저 아키텍처 결정이 필요하다.',
    linked_accounts: ['EnterpriseX'],
  },
  {
    id: 'dq-003',
    rank: 3,
    theme_name: '데이터 내보내기 지연',
    recommendation: 'build_now',
    total_score: 0.8,
    why_build_next:
      'Acme Corp에서 실제 SLA 위반이 발생했고 지원 비용도 빠르게 늘고 있다. 수정 범위는 비교적 명확하다(쿼리 최적화 + 스트리밍).',
    why_not_alternative:
      '데이터 리전은 ARR 중요도는 높지만 구현 시간이 길다. 내보내기 지연은 1스프린트 내 배포가 가능하다.',
    linked_accounts: ['Acme Corp'],
  },
  {
    id: 'dq-004',
    rank: 4,
    theme_name: 'API 요청 한도',
    recommendation: 'validate_next',
    total_score: 0.745,
    why_build_next:
      'TechFlow 관련 약속이 지연 중이고 다른 세 계정도 한도 문제를 언급했다. 상위 티어 비용을 먼저 검증해야 한다.',
    why_not_alternative:
      '비용 모델이 불명확해 지금 바로 개발하지 않는다. 맞춤형 대시보드처럼 보류가 아니라 RBAC와 요청 한도 둘 다 검증 후보에 가깝다.',
    linked_accounts: ['TechFlow'],
  },
  {
    id: 'dq-005',
    rank: 5,
    theme_name: 'Data Residency (EU)',
    recommendation: 'validate_next',
    total_score: 0.78,
    why_build_next:
      'EnterpriseX의 GDPR 준수에 필요하다. 일정 약속 전에 멀티 리전 아키텍처를 검증해야 한다.',
    why_not_alternative:
      '인프라 리드타임이 6주 이상이고 아키텍처 결정도 열려 있어 즉시 개발로 두지 않는다.',
    linked_accounts: ['EnterpriseX'],
  },
]

// ── Weekly Brief ───────────────────────────────────────────────────────────

export const weeklyBrief: WeeklyBrief = {
  week_ending: '2026-04-04',
  what_got_worse: [
    'EnterpriseX 감사 로그 이슈가 확대되어 SIEM 파이프라인이 막혔다.',
    'Acme Corp의 이탈 신호가 다시 커졌고, 갱신 논의가 임원 레벨로 올라갔다.',
    'TechFlow의 야간 동기화 실패 건수가 지난주 대비 3배 늘었다.',
  ],
  segment_at_risk:
    '엔터프라이즈(>$500K ARR) 계정 2곳 모두가 현재 "높음" 또는 "치명" 리스크 상태다. 합산 위험 ARR은 $2.15M이다.',
  commitments_at_risk: [
    'SSO 연동 — EnterpriseX (3월 31일 마감, 지연)',
    'SSO 연동 — Acme Corp (4월 15일 마감, 2주 남음)',
    'API 요청 한도 상향 — TechFlow (4월 15일 마감, 2주 남음)',
    'EU 데이터 리전 — EnterpriseX (5월 1일 마감, 4주 남음)',
    '감사 로그 내보내기 — EnterpriseX (구두 약속, 날짜 미정)',
  ],
  recommended_actions: [
    'SSO 스프린트를 즉시 시작하고 이번 주 엔지니어 2명을 배정한다.',
    '10일 안에 EnterpriseX의 감사 로그 내보내기 막힘을 해소한다.',
    '데이터 내보내기 지연을 수정하고 쿼리 스트리밍 기반 1스프린트 해결을 목표로 한다.',
    '4월 10일까지 API 요청 한도 비용 모델을 검증한 뒤 TechFlow에 약속한다.',
  ],
  build_next_recommendation: 'SSO 연동',
  why_this_jumped:
    '이번 주 SSO가 최상단으로 올라온 이유는 EnterpriseX와 Acme Corp 모두가 이를 갱신의 명시적 조건으로 걸었기 때문이다. 경쟁사도 적극적으로 SSO를 시연하고 있어 긴급도가 "중요" 수준을 넘어 "생존" 수준으로 올라갔다. 위험 ARR 합계는 $2.15M이다.',
  why_not_now:
    '맞춤형 대시보드와 웹훅 안정성은 계속 보류다. 둘 다 직접 위험한 ARR이 없고, 지금 개발하면 컴플라이언스 핵심 항목에 써야 할 엔지니어링 여력을 소모한다.',
  strategy_tax_hours: 14,
  decision_trace:
    '신호 수집: 이번 주 15개 기록 → 심각도와 ARR 기준 분류 → 바로 개발 항목 3개 도출 → 약속 리스크 × ARR 기준 정렬 → SSO가 3주 연속 1위 → 브리프 생성.',
}
