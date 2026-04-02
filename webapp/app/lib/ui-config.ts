import type { SignalType, RecommendationType } from './sample-data'

export const signalBadge: Record<SignalType, string> = {
  feature_request: 'bg-blue-900 text-blue-300 border-blue-800',
  support_escalation: 'bg-orange-900 text-orange-300 border-orange-800',
  churn_risk: 'bg-red-900 text-red-300 border-red-800',
  sales_commitment: 'bg-yellow-900 text-yellow-300 border-yellow-800',
  rfp: 'bg-purple-900 text-purple-300 border-purple-800',
}

export const signalLabel: Record<SignalType, string> = {
  feature_request: 'Feature Request',
  support_escalation: 'Support Escalation',
  churn_risk: 'Churn Risk',
  sales_commitment: 'Sales Commitment',
  rfp: 'RFP',
}

export const recConfig: Record<RecommendationType, {
  label: string
  badge: string
  bar: string
  row: string
}> = {
  build_now: {
    label: 'Build Now',
    badge: 'bg-emerald-900 text-emerald-300 border-emerald-700',
    bar: 'bg-emerald-500',
    row: 'border-l-4 border-l-emerald-500',
  },
  validate_next: {
    label: 'Validate Next',
    badge: 'bg-blue-900 text-blue-300 border-blue-700',
    bar: 'bg-blue-500',
    row: 'border-l-4 border-l-blue-500',
  },
  hold: {
    label: 'Hold',
    badge: 'bg-slate-700 text-slate-400 border-slate-600',
    bar: 'bg-slate-500',
    row: 'border-l-4 border-l-slate-600',
  },
}
