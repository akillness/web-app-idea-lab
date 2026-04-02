import { weeklyBrief } from '../lib/sample-data'
import ExportButton from './ExportButton'

export default function BriefsPage() {
  const brief = weeklyBrief

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">주간 브리프</h2>
          <p className="mt-1 text-sm text-slate-400">
            기준 주차 종료일 {brief.week_ending}
          </p>
        </div>
        <ExportButton brief={brief} />
      </div>

      {/* Strategy tax banner */}
      <div className="bg-amber-950 border border-amber-800 rounded-lg px-5 py-4 mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">
            이번 주 전략 부담
          </p>
          <p className="text-sm text-amber-200 mt-0.5">
            약속 관리와 이슈 확대 대응으로 소모된 엔지니어링 시간
          </p>
        </div>
        <p className="text-3xl font-bold text-amber-400 shrink-0">{brief.strategy_tax_hours}h</p>
      </div>

      <div className="flex flex-col gap-5">
        {/* 더 악화된 항목 */}
        <section className="bg-slate-800 border border-red-900 rounded-xl p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-red-400 mb-3">
            더 악화된 항목
          </h3>
          <ul className="flex flex-col gap-2">
            {brief.what_got_worse.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 위험 세그먼트 */}
        <section className="bg-slate-800 border border-orange-900 rounded-xl p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-orange-400 mb-3">
            위험 세그먼트
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">{brief.segment_at_risk}</p>
        </section>

        {/* 위험한 약속 */}
        <section className="bg-slate-800 border border-yellow-900 rounded-xl p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-yellow-400 mb-3">
            위험한 약속
          </h3>
          <ul className="flex flex-col gap-2">
            {brief.commitments_at_risk.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-yellow-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 권장 액션 */}
        <section className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">
            권장 액션
          </h3>
          <ol className="flex flex-col gap-2 list-decimal list-inside">
            {brief.recommended_actions.map((item, i) => (
              <li key={i} className="text-sm text-slate-300 leading-relaxed">
                {item}
              </li>
            ))}
          </ol>
        </section>

        {/* 다음 개발 추천 */}
        <section className="bg-emerald-950 border border-emerald-700 rounded-xl p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-400 mb-1">
            다음 개발 추천
          </h3>
          <p className="text-2xl font-bold text-white mt-1">{brief.build_next_recommendation}</p>
        </section>

        {/* 왜 우선순위가 올라왔나 */}
        <section className="bg-slate-800 border border-emerald-900 rounded-xl p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-400 mb-3">
            왜 우선순위가 올라왔나
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">{brief.why_this_jumped}</p>
        </section>

        {/* 지금 바로 하지 않는 이유 */}
        <section className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-3">
            지금 바로 하지 않는 이유
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">{brief.why_not_now}</p>
        </section>

        {/* 의사결정 추적 */}
        <section className="bg-slate-900 border border-slate-700 rounded-xl p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-3">
            의사결정 추적
          </h3>
          <p className="text-xs font-mono text-slate-400 leading-relaxed">{brief.decision_trace}</p>
        </section>
      </div>
    </div>
  )
}
