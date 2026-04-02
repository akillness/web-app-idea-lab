import { records, SignalType, RecordStatus } from '../lib/sample-data'

const signalBadge: Record<SignalType, string> = {
  feature_request: 'bg-blue-900 text-blue-300 border-blue-800',
  support_escalation: 'bg-orange-900 text-orange-300 border-orange-800',
  churn_risk: 'bg-red-900 text-red-300 border-red-800',
  sales_commitment: 'bg-yellow-900 text-yellow-300 border-yellow-800',
  rfp: 'bg-purple-900 text-purple-300 border-purple-800',
}

const signalLabel: Record<SignalType, string> = {
  feature_request: 'Feature Request',
  support_escalation: 'Support Escalation',
  churn_risk: 'Churn Risk',
  sales_commitment: 'Sales Commitment',
  rfp: 'RFP',
}

const statusBadge: Record<RecordStatus, string> = {
  new: 'bg-slate-700 text-slate-300',
  triaged: 'bg-sky-900 text-sky-300',
  in_review: 'bg-amber-900 text-amber-300',
  resolved: 'bg-emerald-900 text-emerald-300',
}

const severityColor = (s: number) => {
  if (s >= 5) return 'text-red-400'
  if (s >= 4) return 'text-orange-400'
  if (s >= 3) return 'text-yellow-400'
  return 'text-slate-400'
}

const signalTypes: SignalType[] = [
  'feature_request',
  'support_escalation',
  'churn_risk',
  'sales_commitment',
  'rfp',
]

export default function RecordsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Records</h2>
        <p className="mt-1 text-sm text-slate-400">
          {records.length} VOC signals across all accounts
        </p>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-xs text-slate-500 self-center mr-1">Filter:</span>
        {signalTypes.map((type) => {
          const count = records.filter((r) => r.signal_type === type).length
          return (
            <span
              key={type}
              className={`inline-flex items-center gap-1.5 border text-xs px-3 py-1 rounded-full font-medium ${signalBadge[type]}`}
            >
              {signalLabel[type]}
              <span className="opacity-70">({count})</span>
            </span>
          )
        })}
      </div>

      {/* Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-900 text-left">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">ID</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Account</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Source Type</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Signal Type</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Severity</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Status</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Summary</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec, i) => (
                <tr
                  key={rec.id}
                  className={`border-t border-slate-700 ${i % 2 === 0 ? 'bg-slate-800' : 'bg-slate-900'} hover:bg-slate-700 transition-colors`}
                >
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{rec.id}</td>
                  <td className="px-4 py-3 font-medium text-white whitespace-nowrap">{rec.account_name}</td>
                  <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{rec.source_type}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex border text-xs px-2 py-0.5 rounded-full font-medium ${signalBadge[rec.signal_type]}`}>
                      {signalLabel[rec.signal_type]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-bold text-base ${severityColor(rec.severity)}`}>
                      {rec.severity}
                    </span>
                    <span className="text-slate-600 text-xs">/5</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${statusBadge[rec.status]}`}>
                      {rec.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-300 max-w-xs truncate" title={rec.summary}>
                    {rec.summary}
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{rec.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary counts by signal type */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
        {signalTypes.map((type) => {
          const count = records.filter((r) => r.signal_type === type).length
          return (
            <div key={type} className={`border rounded-lg px-3 py-3 ${signalBadge[type]}`}>
              <p className="text-lg font-bold">{count}</p>
              <p className="text-xs opacity-80 mt-0.5">{signalLabel[type]}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
