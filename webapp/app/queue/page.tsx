import { decisionQueue, RecommendationType } from '../lib/sample-data'
import { recConfig } from '../lib/ui-config'

export default function QueuePage() {
  const sorted = [...decisionQueue].sort((a, b) => a.rank - b.rank)

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">빌드 큐</h2>
        <p className="mt-1 text-sm text-slate-400">
          {decisionQueue.length} 개 항목 · 약속 리스크와 ARR 영향 기준 정렬
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-6">
        {(['build_now', 'validate_next', 'hold'] as RecommendationType[]).map((rec) => {
          const cfg = recConfig[rec]
          const count = decisionQueue.filter((d) => d.recommendation === rec).length
          return (
            <span
              key={rec}
              className={`inline-flex items-center gap-1.5 border text-xs px-3 py-1 rounded-full font-medium ${cfg.badge}`}
            >
              {cfg.label}
              <span className="opacity-60">({count})</span>
            </span>
          )
        })}
      </div>

      {/* Queue table */}
      <div className="flex flex-col gap-3">
        {sorted.map((item) => {
          const cfg = recConfig[item.recommendation]
          return (
            <details
              key={item.id}
              className={`bg-slate-800 border border-slate-700 rounded-xl overflow-hidden ${cfg.row} group`}
            >
              <summary className="cursor-pointer select-none list-none px-5 py-4">
                {/* Summary row */}
                <div className="flex items-start gap-4">
                  {/* Rank */}
                  <span className="text-2xl font-bold text-slate-600 w-8 shrink-0 text-right">
                    {item.rank}
                  </span>

                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-white">{item.theme_name}</h3>
                      <span className={`border text-xs px-2 py-0.5 rounded-full font-medium ${cfg.badge}`}>
                        {cfg.label}
                      </span>
                    </div>

                    {/* Score bar */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${cfg.bar}`}
                          style={{ width: `${item.total_score * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400 shrink-0">
                        {(item.total_score * 100).toFixed(0)} / 100
                      </span>
                    </div>

                    {/* Linked accounts */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.linked_accounts.map((acc) => (
                        <span
                          key={acc}
                          className="text-xs bg-slate-700 text-slate-300 border border-slate-600 px-2 py-0.5 rounded"
                        >
                          {acc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expand hint */}
                  <span className="text-xs text-slate-600 shrink-0 self-center group-open:hidden">
                    상세
                  </span>
                </div>
              </summary>

              {/* Evidence drawer */}
              <div className="border-t border-slate-700 px-5 py-4 bg-slate-900">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400 mb-2">
                      왜 다음 개발인가
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.why_build_next}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                      왜 다른 대안이 아닌가
                    </p>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.why_not_alternative}</p>
                  </div>
                </div>
              </div>
            </details>
          )
        })}
      </div>
    </div>
  )
}
