import Link from 'next/link'
import { accounts, records, themes, decisionQueue, weeklyBrief } from './lib/sample-data'

export default function DashboardPage() {
  const totalRecords = records.length
  const activeAccounts = accounts.length
  const themesTracked = themes.length
  const buildQueueItems = decisionQueue.length
  const strategyTaxHours = weeklyBrief.strategy_tax_hours
  const buildNowCount = decisionQueue.filter((d) => d.recommendation === 'build_now').length
  const criticalAccounts = accounts.filter((a) => a.health_risk_level === 'critical').length
  const highRiskAccounts = accounts.filter(
    (a) => a.health_risk_level === 'critical' || a.health_risk_level === 'high',
  ).length

  const statCards = [
    { label: '전체 기록', value: totalRecords, sub: '이번 주', color: 'text-blue-400' },
    { label: '활성 계정', value: activeAccounts, sub: `${criticalAccounts}개 위험`, color: 'text-emerald-400' },
    { label: '추적 중인 테마', value: themesTracked, sub: `${buildNowCount}개 즉시 개발`, color: 'text-violet-400' },
    { label: '빌드 큐', value: buildQueueItems, sub: '우선순위 항목', color: 'text-amber-400' },
  ]

  const quickLinks = [
    {
      href: '/records',
      title: '기록',
      desc: '계정, 유형, 심각도 기준으로 VOC 신호를 확인합니다.',
      badge: `${totalRecords}건`,
      badgeColor: 'bg-blue-900 text-blue-300',
    },
    {
      href: '/accounts',
      title: '계정',
      desc: '계정 건강도, 열린 약속, 리스크 수준을 확인합니다.',
      badge: `${highRiskAccounts}개 위험`,
      badgeColor: 'bg-red-900 text-red-300',
    },
    {
      href: '/themes',
      title: '테마',
      desc: '점수 분해와 함께 우선순위 테마를 확인합니다.',
      badge: `${buildNowCount}개 즉시 개발`,
      badgeColor: 'bg-emerald-900 text-emerald-300',
    },
    {
      href: '/briefs',
      title: '주간 브리프',
      desc: '이번 주 의사결정 브리프와 전략 요약입니다.',
      badge: 'Apr 4, 2026',
      badgeColor: 'bg-slate-700 text-slate-300',
    },
    {
      href: '/queue',
      title: '빌드 큐',
      desc: '근거 기반의 우선순위 개발 결정을 보여줍니다.',
      badge: `${buildQueueItems}개`,
      badgeColor: 'bg-violet-900 text-violet-300',
    },
  ]

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">대시보드</h2>
        <p className="mt-1 text-sm text-slate-400">
          고객의 목소리 신호, 우선순위 테마, 개발 의사결정을 한눈에 보는 2026년 4월 4일 기준 화면
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((card) => (
          <div key={card.label} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <p className="text-xs text-slate-400 uppercase tracking-wide">{card.label}</p>
            <p className={`text-3xl font-bold mt-1 ${card.color}`}>{card.value}</p>
            <p className="text-xs text-slate-500 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Strategy Tax banner */}
      <div className="bg-amber-950 border border-amber-800 rounded-lg px-5 py-4 mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">
            이번 주 전략 부담
          </p>
          <p className="text-sm text-amber-200 mt-0.5">
            미해결 약속과 이슈 확대 대응에 들어가는 추가 운영 비용
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-amber-400">{strategyTaxHours}h</p>
          <p className="text-xs text-amber-600">엔지니어링 시간</p>
        </div>
      </div>

      {/* Quick links */}
      <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-3">
        빠른 이동
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-lg p-4 transition-colors group"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-white group-hover:text-slate-100">
                {link.title}
              </h4>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${link.badgeColor}`}>
                {link.badge}
              </span>
            </div>
            <p className="text-sm text-slate-400">{link.desc}</p>
          </Link>
        ))}
      </div>

      {/* Top commitment risks */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-3">
          위험한 약속
        </h3>
        <div className="bg-slate-800 border border-slate-700 rounded-lg divide-y divide-slate-700">
          {weeklyBrief.commitments_at_risk.map((c, i) => (
            <div key={i} className="px-4 py-3 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              <span className="text-sm text-slate-300">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
