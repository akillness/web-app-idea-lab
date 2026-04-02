'use client'

import { WeeklyBrief } from '../lib/sample-data'

function buildMarkdown(brief: WeeklyBrief): string {
  const lines: string[] = []
  lines.push(`# VOC Weekly Brief — Week Ending ${brief.week_ending}`)
  lines.push('')
  lines.push('## What Got Worse')
  brief.what_got_worse.forEach((item) => lines.push(`- ${item}`))
  lines.push('')
  lines.push('## Segment at Risk')
  lines.push(brief.segment_at_risk)
  lines.push('')
  lines.push('## Commitments at Risk')
  brief.commitments_at_risk.forEach((item) => lines.push(`- ${item}`))
  lines.push('')
  lines.push('## Recommended Actions')
  brief.recommended_actions.forEach((item) => lines.push(`- ${item}`))
  lines.push('')
  lines.push('## Build Next Recommendation')
  lines.push(`**${brief.build_next_recommendation}**`)
  lines.push('')
  lines.push('## Why This Jumped')
  lines.push(brief.why_this_jumped)
  lines.push('')
  lines.push('## Why Not Now')
  lines.push(brief.why_not_now)
  lines.push('')
  lines.push('## Strategy Tax This Week')
  lines.push(`${brief.strategy_tax_hours} engineering hours`)
  lines.push('')
  lines.push('## Decision Trace')
  lines.push(brief.decision_trace)
  return lines.join('\n')
}

export default function ExportButton({ brief }: { brief: WeeklyBrief }) {
  function handleExport() {
    const md = buildMarkdown(brief)
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `voc-brief-${brief.week_ending}.md`
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 0)
  }

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
    >
      Export as Markdown
    </button>
  )
}
