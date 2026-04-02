import { weeklyBrief, accounts } from '../lib/sample-data'

export default function CommitmentsPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">약속 리스크</h2>
        <p className="mt-1 text-sm text-slate-400">
          {weeklyBrief.commitments_at_risk.length} 개 항목 · 이번 주 위험 감지
        </p>
      </div>

      {/* Risk summary banner */}
      <div className="bg-red-950 border border-red-800 rounded-lg px-5 py-4 mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-red-400 mb-1">
          약속 리스크 요약
        </p>
        <p className="text-sm text-red-200">{weeklyBrief.why_not_now}</p>
      </div>

      {/* Commitment items */}
      <div className="flex flex-col gap-3">
        {weeklyBrief.commitments_at_risk.map((item, i) => (
          <div key={i} className="bg-slate-800 border border-red-900/50 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-2" />
              <div>
                <p className="text-sm text-white font-medium">{item}</p>
                <p className="text-xs text-slate-500 mt-1">이번 주 감지된 리스크</p>
              </div>
              <span className="ml-auto text-xs bg-red-900 text-red-300 border border-red-700 px-2 py-0.5 rounded-full font-medium">
                위험
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 열린 약속이 있는 계정 */}
      <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mt-8 mb-3">
        열린 약속이 있는 계정
      </h3>
      <div className="bg-slate-800 border border-slate-700 rounded-lg divide-y divide-slate-700">
        {accounts.filter(a => a.open_commitment_count > 0).map(account => (
          <div key={account.id} className="px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">{account.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">{account.arr_band} · {account.health_risk_level} risk</p>
            </div>
            <span className="text-sm font-bold text-yellow-400">
              {account.open_commitment_count}개 열림
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
