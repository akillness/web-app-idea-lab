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

## 운영 원칙
- 단계별 최신 파일만 유지한다.
- 루프 과정 로그, 중간 메모, 반복 토론 파일은 남기지 않는다.
- 새로운 evidence가 생기면 기존 최신 파일을 **덮어써서 갱신**한다.
- 목표는 `명확한 아이디어 + 세밀한 개발 계획`이다.

## 현재 결론
- Primary idea: **Voice-of-Customer Repository**
- Backup idea: **Creator Deal CRM**

## Ranking engine domain core
- `src/voc/ranking.js`는 primary VoC 아이디어의 theme metrics를 scored build-next queue로 변환한다.
- 런타임 의존성은 없고, Node 내장 테스트 러너만 사용한다.
- 가중치는 정확히 다음을 사용한다: frequency 20, severity 20, ARR/account importance 20, commitment risk 20, customer concentration 10, recency 5, priority override 5.
- 코드에서 요구하는 metric 키는 `frequency`, `severity`, `arrImportance`, `commitmentRisk`, `customerConcentration`, `recency`, `priorityOverride`다.
- `priority_override_reason` 허용값: `customer_commitment`, `churn_risk`, `strategic_segment`, `company_objective`, `technical_foundation`.
- `scoreTheme(theme)`는 `scoreBreakdown`, `totalScore`, `recommendation`을 반환하고, `rankThemes(themes)`는 여기에 `rank`를 추가한 정렬 결과를 반환한다.
- 모든 metric은 필수이며 0~100 정수여야 한다. 알 수 없는 metric 키는 거부한다. `priorityOverride` 점수와 `priority_override_reason` 목록은 서로 일치해야 한다.
- tie score는 `id` → `label` lexical order로 고정한다.

## Verification
```bash
npm test
```
