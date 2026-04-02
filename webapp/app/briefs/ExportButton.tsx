'use client'

import { WeeklyBrief } from '../lib/sample-data'

function buildMarkdown(brief: WeeklyBrief): string {
  const lines: string[] = []
  lines.push(`# VOC 주간 브리프 — 기준일 ${brief.week_ending}`)
  lines.push('')
  lines.push('## 더 악화된 항목')
  brief.what_got_worse.forEach((item) => lines.push(`- ${item}`))
  lines.push('')
  lines.push('## 위험 세그먼트')
  lines.push(brief.segment_at_risk)
  lines.push('')
  lines.push('## 위험한 약속')
  brief.commitments_at_risk.forEach((item) => lines.push(`- ${item}`))
  lines.push('')
  lines.push('## 권장 액션')
  brief.recommended_actions.forEach((item) => lines.push(`- ${item}`))
  lines.push('')
  lines.push('## 다음 개발 추천')
  lines.push(`**${brief.build_next_recommendation}**`)
  lines.push('')
  lines.push('## 왜 우선순위가 올라왔나')
  lines.push(brief.why_this_jumped)
  lines.push('')
  lines.push('## 지금 바로 하지 않는 이유')
  lines.push(brief.why_not_now)
  lines.push('')
  lines.push('## 이번 주 전략 부담')
  lines.push(`${brief.strategy_tax_hours} 엔지니어링 시간`)
  lines.push('')
  lines.push('## 의사결정 추적')
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
      마크다운으로 내보내기
    </button>
  )
}
