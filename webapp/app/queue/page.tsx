import { decisionQueue, RecommendationType } from '../lib/sample-data'

const recConfig: Record<RecommendationType, { label: string; row: string; badge: string; bar: string }> = {
  build_now: {
    label: 'Build Now',
    row: 'border-l-4 border-l-emerald-500',
    badge: 'bg-emerald-900 text-emerald-300 border-emerald-700',
    bar: 'bg-emerald-500',
  },
  validate_next: {
    label: 'Validate Next',
    row: 'border-l-4 border-l-blue-500',
    badge: 'bg-blue-900 text-blue-300 border-blue-700',
    bar: 'bg-blue-500',
  },
  hold: {
    label: 'Hold',
    row: 'border-l-4 border-l-slate-600',
    badge: 'bg-slate-700 text-slate-400 border-slate-600',
    bar: 'bg-slate-500',
  },
}

export default function QueuePage() {
  const sorted = [...decisionQueue].sort((a, b) => a.rank - b.rank)

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Build Queue</h2>
        <p className="mt-1 text-sm text-slate-400">
          {decisionQueue.length} items ranked by commitment risk and ARR impact
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
                    Details
                  </span>
                </div>
              </summary>

              {/* Evidence drawer */}
              <div className="border-t border-slate-700 px-5 py-4 bg-slate-900">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400 mb-2">
                      Why Build Next
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.why_build_next}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                      Why Not the Alternative
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
