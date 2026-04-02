import { themes, RecommendationType } from '../lib/sample-data'

const recConfig: Record<RecommendationType, { label: string; badge: string; bar: string }> = {
  build_now: {
    label: 'Build Now',
    badge: 'bg-emerald-900 text-emerald-300 border-emerald-700',
    bar: 'bg-emerald-500',
  },
  validate_next: {
    label: 'Validate Next',
    badge: 'bg-blue-900 text-blue-300 border-blue-700',
    bar: 'bg-blue-500',
  },
  hold: {
    label: 'Hold',
    badge: 'bg-slate-700 text-slate-400 border-slate-600',
    bar: 'bg-slate-500',
  },
}

const scoreFields: { key: keyof import('../lib/sample-data').ThemeScore; label: string; color: string }[] = [
  { key: 'frequency', label: 'Frequency', color: 'bg-blue-500' },
  { key: 'severity', label: 'Severity', color: 'bg-red-500' },
  { key: 'arr_importance', label: 'ARR Importance', color: 'bg-amber-500' },
  { key: 'commitment_risk', label: 'Commitment Risk', color: 'bg-purple-500' },
]

export default function ThemesPage() {
  const sorted = [...themes].sort((a, b) => b.total_score - a.total_score)

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Themes</h2>
        <p className="mt-1 text-sm text-slate-400">
          {themes.length} themes ranked by composite score
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-6">
        {(['build_now', 'validate_next', 'hold'] as RecommendationType[]).map((rec) => {
          const cfg = recConfig[rec]
          const count = themes.filter((t) => t.recommendation === rec).length
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

      {/* Theme list */}
      <div className="flex flex-col gap-4">
        {sorted.map((theme, idx) => {
          const cfg = recConfig[theme.recommendation]
          return (
            <div key={theme.id} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
              {/* Row 1: rank + name + badge + evidence count */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-slate-600 w-7 text-right">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-white">{theme.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {theme.evidence_count} evidence items
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`border text-xs px-2.5 py-1 rounded-full font-semibold ${cfg.badge}`}>
                    {cfg.label}
                  </span>
                </div>
              </div>

              {/* Total score bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-500">Total Score</span>
                  <span className="text-xs font-bold text-white">
                    {(theme.total_score * 100).toFixed(0)}
                  </span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${cfg.bar}`}
                    style={{ width: `${theme.total_score * 100}%` }}
                  />
                </div>
              </div>

              {/* Score breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {scoreFields.map((field) => {
                  const val = theme.score[field.key]
                  return (
                    <div key={field.key}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-500">{field.label}</span>
                        <span className="text-xs text-slate-400">{(val * 100).toFixed(0)}</span>
                      </div>
                      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${field.color}`}
                          style={{ width: `${val * 100}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Why jumped */}
              <div className="bg-slate-900 rounded-lg px-4 py-3 mb-3">
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-1">
                  Why This Jumped
                </p>
                <p className="text-sm text-slate-300">{theme.why_jumped}</p>
              </div>

              {/* Why not now (hold / validate) */}
              {theme.why_not_now && (
                <div className="bg-slate-900 rounded-lg px-4 py-3">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                    Why Not Now
                  </p>
                  <p className="text-sm text-slate-400">{theme.why_not_now}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
