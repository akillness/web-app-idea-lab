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
    { label: 'Total Records', value: totalRecords, sub: 'this week', color: 'text-blue-400' },
    { label: 'Active Accounts', value: activeAccounts, sub: `${criticalAccounts} critical`, color: 'text-emerald-400' },
    { label: 'Themes Tracked', value: themesTracked, sub: `${buildNowCount} build now`, color: 'text-violet-400' },
    { label: 'Build Queue', value: buildQueueItems, sub: 'ranked items', color: 'text-amber-400' },
  ]

  const quickLinks = [
    {
      href: '/records',
      title: 'Records',
      desc: 'Browse all VOC signals by account, type, and severity.',
      badge: `${totalRecords} records`,
      badgeColor: 'bg-blue-900 text-blue-300',
    },
    {
      href: '/accounts',
      title: 'Accounts',
      desc: 'Account health, open commitments, and risk levels.',
      badge: `${highRiskAccounts} at risk`,
      badgeColor: 'bg-red-900 text-red-300',
    },
    {
      href: '/themes',
      title: 'Themes',
      desc: 'Ranked pain themes with score breakdowns.',
      badge: `${buildNowCount} build now`,
      badgeColor: 'bg-emerald-900 text-emerald-300',
    },
    {
      href: '/briefs',
      title: 'Weekly Brief',
      desc: 'This week\'s decision brief and strategy summary.',
      badge: 'Apr 4, 2026',
      badgeColor: 'bg-slate-700 text-slate-300',
    },
    {
      href: '/queue',
      title: 'Build Queue',
      desc: 'Prioritized build decisions with evidence.',
      badge: `${buildQueueItems} items`,
      badgeColor: 'bg-violet-900 text-violet-300',
    },
  ]

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <p className="mt-1 text-sm text-slate-400">
          Voice-of-Customer signals, ranked themes, and build decisions — week of Apr 4, 2026
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
            Strategy Tax This Week
          </p>
          <p className="text-sm text-amber-200 mt-0.5">
            Overhead from managing unresolved commitments and escalations
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-amber-400">{strategyTaxHours}h</p>
          <p className="text-xs text-amber-600">engineering hours</p>
        </div>
      </div>

      {/* Quick links */}
      <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-3">
        Navigate
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
          Commitments at Risk
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
