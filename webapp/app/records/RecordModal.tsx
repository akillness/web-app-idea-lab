'use client'

import { useState } from 'react'
import type { VocRecord, SignalType, RecordStatus } from '../lib/sample-data'

type SourceType =
  | 'support ticket'
  | 'CRM note'
  | 'call note'
  | 'Slack paste'
  | 'review'
  | 'survey'

interface FormState {
  account_name: string
  source_type: SourceType
  signal_type: SignalType
  severity: number
  summary: string
}

const defaultForm: FormState = {
  account_name: '',
  source_type: 'support ticket',
  signal_type: 'feature_request',
  severity: 3,
  summary: '',
}

interface Props {
  onClose: () => void
  onSubmit: (record: VocRecord) => void
}

export default function RecordModal({ onClose, onSubmit }: Props) {
  const [form, setForm] = useState<FormState>(defaultForm)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const today = new Date().toISOString().split('T')[0]
    const newRecord: VocRecord = {
      id: `rec-${Date.now()}`,
      account_id: 'acct-custom',
      account_name: form.account_name,
      source_type: form.source_type,
      signal_type: form.signal_type,
      severity: form.severity,
      status: 'new' as RecordStatus,
      summary: form.summary,
      date: today,
    }
    onSubmit(newRecord)
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">Add Record</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-xl leading-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Account Name */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Account Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={form.account_name}
              onChange={(e) => setForm({ ...form, account_name: e.target.value })}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
              placeholder="e.g. Acme Corp"
            />
          </div>

          {/* Source Type */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Source Type</label>
            <select
              value={form.source_type}
              onChange={(e) => setForm({ ...form, source_type: e.target.value as SourceType })}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-slate-400"
            >
              <option value="support ticket">Support Ticket</option>
              <option value="CRM note">CRM Note</option>
              <option value="call note">Call Note</option>
              <option value="Slack paste">Slack Paste</option>
              <option value="review">Review</option>
              <option value="survey">Survey</option>
            </select>
          </div>

          {/* Signal Type */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Signal Type</label>
            <select
              value={form.signal_type}
              onChange={(e) => setForm({ ...form, signal_type: e.target.value as SignalType })}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-slate-400"
            >
              <option value="feature_request">Feature Request</option>
              <option value="support_escalation">Support Escalation</option>
              <option value="churn_risk">Churn Risk</option>
              <option value="sales_commitment">Sales Commitment</option>
              <option value="rfp">RFP</option>
            </select>
          </div>

          {/* Severity */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Severity (1–5)
            </label>
            <input
              type="number"
              min={1}
              max={5}
              value={form.severity}
              onChange={(e) => setForm({ ...form, severity: Number(e.target.value) })}
              className="w-24 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-slate-400"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Summary <span className="text-red-400">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 resize-none"
              placeholder="Describe the signal..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-300 hover:text-white border border-slate-600 rounded-lg hover:border-slate-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              Add Record
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
