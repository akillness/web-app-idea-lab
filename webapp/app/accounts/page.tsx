'use client'

import Link from 'next/link'
import { useState } from 'react'
import { accounts, records, HealthRiskLevel, SignalType } from '../lib/sample-data'
import { signalBadge, signalLabel } from '../lib/ui-config'

const riskConfig: Record<HealthRiskLevel, { label: string; color: string; dot: string }> = {
  critical: { label: '치명', color: 'border-red-700 bg-red-950', dot: 'bg-red-500' },
  high: { label: '높음', color: 'border-orange-700 bg-orange-950', dot: 'bg-orange-500' },
  medium: { label: '보통', color: 'border-yellow-700 bg-yellow-950', dot: 'bg-yellow-500' },
  low: { label: '낮음', color: 'border-emerald-700 bg-emerald-950', dot: 'bg-emerald-500' },
}

const riskTextColor: Record<HealthRiskLevel, string> = {
  critical: 'text-red-400',
  high: 'text-orange-400',
  medium: 'text-yellow-400',
  low: 'text-emerald-400',
}

const riskButtonActive: Record<HealthRiskLevel, string> = {
  critical: 'bg-red-950 border-red-700 text-red-400',
  high: 'bg-orange-950 border-orange-700 text-orange-400',
  medium: 'bg-yellow-950 border-yellow-700 text-yellow-400',
  low: 'bg-emerald-950 border-emerald-700 text-emerald-400',
}

const signalColor: Record<SignalType, string> = {
  feature_request: 'text-blue-400',
  support_escalation: 'text-orange-400',
  churn_risk: 'text-red-400',
  sales_commitment: 'text-yellow-400',
  rfp: 'text-purple-400',
}

function formatArr(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`
  return `$${value}`
}

export default function AccountsPage() {
  const [activeRisk, setActiveRisk] = useState<HealthRiskLevel | null>(null)
  const sorted = [...accounts]
    .sort((a, b) => b.arr_value - a.arr_value)
    .filter((a) => activeRisk === null || a.health_risk_level === activeRisk)

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">계정</h2>
        <p className="mt-1 text-sm text-slate-400">
          {accounts.length} 개 계정 · ARR 높은 순 정렬
        </p>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveRisk(null)}
          className={`text-xs px-3 py-1 rounded-full border font-medium transition-colors ${
            activeRisk === null
              ? 'bg-slate-600 border-slate-500 text-white'
              : 'border-slate-600 text-slate-400 hover:text-white hover:border-slate-500'
          }`}
         >
          전체
        </button>
        {(['critical', 'high', 'medium', 'low'] as HealthRiskLevel[]).map((level) => {
          const cfg = riskConfig[level]
          return (
            <button
              key={level}
              onClick={() => setActiveRisk(activeRisk === level ? null : level)}
              className={`text-xs px-3 py-1 rounded-full border font-medium transition-opacity ${
                activeRisk === level
                  ? riskButtonActive[level]
                  : 'border-slate-600 text-slate-400 hover:text-white hover:border-slate-500'
              } ${activeRisk !== null && activeRisk !== level ? 'opacity-40' : 'opacity-100'}`}
            >
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${cfg.dot} mr-1.5`} />
              {cfg.label}
            </button>
          )
        })}
      </div>

      {/* 위험 legend */}
      <div className="flex flex-wrap gap-3 mb-6">
        {(['critical', 'high', 'medium', 'low'] as HealthRiskLevel[]).map((level) => {
          const cfg = riskConfig[level]
          const count = accounts.filter((a) => a.health_risk_level === level).length
          return (
            <div key={level} className="flex items-center gap-2 text-sm">
              <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
              <span className={riskTextColor[level]}>{cfg.label}</span>
              <span className="text-slate-500">({count})</span>
            </div>
          )
        })}
      </div>

      {/* Account cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {sorted.map((account) => {
          const cfg = riskConfig[account.health_risk_level]
          const linkedRecords = records.filter((r) => r.account_id === account.id)
          return (
            <details
              key={account.id}
              className={`border rounded-xl overflow-hidden ${cfg.color} group`}
            >
              <summary className="cursor-pointer select-none list-none p-5">
                {/* Card header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base font-semibold text-white">{account.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{account.arr_band}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">{formatArr(account.arr_value)}</p>
                    <div className="flex items-center gap-1.5 mt-0.5 justify-end">
                      <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                      <span className={`text-xs font-medium ${riskTextColor[account.health_risk_level]}`}>
                        {cfg.label} 위험
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-4 mb-3">
                  <div>
                    <p className="text-xs text-slate-500">열린 약속</p>
                    <p className={`text-lg font-bold ${account.open_commitment_count > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {account.open_commitment_count}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">최근 신호</p>
                    <p className={`text-xs font-medium mt-0.5 ${signalColor[account.latest_signal_type]}`}>
                      {signalLabel[account.latest_signal_type]}
                    </p>
                  </div>
                </div>

                {/* Top pain themes */}
                <div>
                  <p className="text-xs text-slate-500 mb-1.5">핵심 불편 테마</p>
                  <div className="flex flex-wrap gap-1.5">
                    {account.top_pain_themes.map((theme) => (
                      <span
                        key={theme}
                        className="text-xs bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-500 mt-3 group-open:hidden">
                  클릭해서 근거 요약 펼치기
                </p>
              </summary>

              {/* Expanded evidence */}
              <div className="px-5 pb-5 border-t border-slate-700 mt-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mt-4 mb-2">
                  근거 요약
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {account.evidence_summary}
                </p>

                {/* 연결된 기록 */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      연결된 기록
                    </p>
                    <Link
                      href={`/records?account=${account.id}`}
                      className="text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      전체 보기 →
                    </Link>
                  </div>
                  {linkedRecords.length === 0 ? (
                    <p className="text-xs text-slate-500">연결된 기록 없음</p>
                  ) : (
                    <div className="space-y-1.5">
                      {linkedRecords.map((rec) => (
                        <div
                          key={rec.id}
                          className="flex items-start gap-2 bg-slate-800/60 rounded px-3 py-2"
                        >
                          <span className={`inline-flex border text-xs px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap ${signalBadge[rec.signal_type]}`}>
                            {signalLabel[rec.signal_type]}
                          </span>
                          <span className="text-xs font-bold text-slate-300 shrink-0">
                            {rec.severity}/5
                          </span>
                          <span className="text-xs text-slate-400 truncate" title={rec.summary}>
                            {rec.summary.length > 60 ? rec.summary.slice(0, 60) + '…' : rec.summary}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </details>
          )
        })}
      </div>
    </div>
  )
}
