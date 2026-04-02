# Web App Idea Lab

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

## 실행 가능한 코드 슬라이스
- `src/voc/ranking.js` — Voice-of-Customer primary idea용 deterministic ranking engine
- `tests/voc-ranking.test.js` — score weight, override taxonomy, queue ranking 검증
- `package.json` — built-in `node:test` 기반 최소 실행 환경

### 빠른 실행
```bash
npm test
```

### Ranking input contract
- `metrics`는 아래 7개 키를 **모두** 포함해야 한다: `frequency`, `severity`, `arrImportance`, `commitmentRisk`, `customerConcentration`, `recency`, `priorityOverride`
- 각 metric 값은 `0`~`100` 숫자여야 한다.
- 허용된 override taxonomy: `customer commitment`, `churn risk`, `strategic segment`, `company objective`, `technical foundation`
- `overrideReasons`가 있으면 `metrics.priorityOverride`는 `0`보다 커야 한다.
- `metrics.priorityOverride`가 `0`보다 크면 `overrideReasons`가 반드시 있어야 한다.
- `linkedAccountCount === 0`이면 높은 점수여도 recommendation은 `hold`로 내려가며 `missing_account_evidence` 상태를 반환한다.
- 정렬은 `totalScore` 내림차순 → `commitmentRisk` raw 점수 → `arrImportance` raw 점수 → `canonicalLabel` 순으로 고정한다.

## 운영 원칙
- 단계별 최신 파일만 유지한다.
- 루프 과정 로그, 중간 메모, 반복 토론 파일은 남기지 않는다.
- 새로운 evidence가 생기면 기존 최신 파일을 **덮어써서 갱신**한다.
- 목표는 `명확한 아이디어 + 세밀한 개발 계획`이다.

## 현재 결론
- Primary idea: **Voice-of-Customer Repository**
- Backup idea: **Creator Deal CRM**
