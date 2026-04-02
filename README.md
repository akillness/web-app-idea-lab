# Web App Idea Lab

[![Deploy VOC Repository](https://github.com/akillness/web-app-idea-lab/actions/workflows/deploy.yml/badge.svg)](https://github.com/akillness/web-app-idea-lab/actions/workflows/deploy.yml)
[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen?logo=github)](https://akillness.github.io/web-app-idea-lab/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## VOC Repository — Live Web App

> **B2B SaaS 팀을 위한 Voice-of-Customer 의사결정 시스템**
>
> Support / churn / feature request / commitment records를 **customer-level evidence board, 주간 의사결정 브리프, ranked build-next queue, commitment-safe update draft**로 바꿔주는 decision + explanation layer.

### 🚀 Live Demo
**[https://akillness.github.io/web-app-idea-lab/](https://akillness.github.io/web-app-idea-lab/)**

### 📱 App Screens

| Screen | Description |
|--------|-------------|
| **Dashboard** | Stats overview, strategy-tax metric, quick navigation |
| **Records** | Customer signal records with source type & severity |
| **Accounts** | Customer-level evidence board with ARR & risk |
| **Themes** | Ranked theme board with why-this-jumped rationale |
| **Briefs** | Weekly decision brief with markdown export |
| **Build Queue** | Ranked build-next decision queue with linked evidence |

### 🏗 Architecture

```
web-app-idea-lab/
├── webapp/              # Next.js 14 web app (GitHub Pages)
│   ├── app/
│   │   ├── lib/sample-data.ts   # Typed VOC sample data
│   │   ├── records/             # Signal records view
│   │   ├── accounts/            # Customer evidence board
│   │   ├── themes/              # Ranked theme board
│   │   ├── briefs/              # Weekly decision brief
│   │   └── queue/               # Build-next queue
│   └── next.config.mjs          # Static export config
├── src/voc_repository/  # Python CLI (existing)
├── .github/workflows/   # CI/CD → GitHub Pages
└── develop/             # Development plans
```

### ⚡ Local Development

```bash
cd webapp
npm install
npm run dev        # http://localhost:3000
npm run build      # Static export to /out
```

---

혼란 줄이기 위해 저장소를 **3단계 산출물 구조**로 단순화했다.

## 구조
1. `search/` — 최신 검색/시장 신호 요약
2. `ideas/` — 현재 유지하는 명확한 아이디어 정의
3. `develop/` — 실제 개발 착수용 최신 계획

## 현재 유지하는 최신 산출물
### Search
- `search/latest-market-map.md`

### Ideas
- `ideas/primary-voc-repository.md`
- `ideas/backup-creator-deal-crm.md`

### Develop
- `develop/primary-voc-repository.md`
- `develop/backup-creator-deal-crm.md`

## 운영 원칙
- 단계별 최신 파일만 유지한다.
- 루프 과정 로그, 중간 메모, 반복 토론 파일은 남기지 않는다.
- 새로운 evidence가 생기면 기존 최신 파일을 **덮어써서 갱신**한다.
- 목표는 `명확한 아이디어 + 세밀한 개발 계획`이다.

## 현재 결론
- Primary idea: **Voice-of-Customer Repository**
- Backup idea: **Creator Deal CRM**

## VOC build-next queue CLI
`voc_repository` 패키지는 raw evidence JSON을 ranked build-next queue markdown으로 바꾸는 작은 파이프라인/CLI를 포함한다.

### Minimal payload example
```json
{
  "records": [
    {
      "record_id": "rec-1",
      "source_type": "support",
      "source_preset": "support ticket",
      "account_id": "acct-1",
      "account_name": "Acme",
      "arr_importance": 0.95,
      "recency": 0.9
    }
  ],
  "signals": [
    {
      "signal_id": "sig-1",
      "record_id": "rec-1",
      "theme_id": "theme-roadmap",
      "canonical_label": "Commitment-safe roadmap updates",
      "signal_type": "support_escalation",
      "severity": 0.95,
      "commitment_risk": 1.0,
      "priority_override": 0.8,
      "override_reason": "renewal pressure",
      "evidence_span": "Customer asked for safer roadmap guidance before renewal."
    }
  ]
}
```

### Usage
```bash
python -m voc_repository.cli payload.json
python -m voc_repository.cli payload.json --output build-next-queue.md
```

`signals[].signal_type`는 아래 값만 허용한다.
- `feature_request`
- `support_escalation`
- `churn_risk`
- `sales_commitment`
- `rfp`

설치된 패키지에서는 console script도 사용할 수 있다.

```bash
voc-build-next-queue payload.json
```
