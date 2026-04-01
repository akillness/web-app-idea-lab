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
- `src/voc/ranking.js`는 theme metrics를 ranked build-next queue로 변환한다.
- 런타임 의존성은 없고, Node 내장 테스트 러너만 사용한다.
- 가중치는 정확히 다음을 사용한다: frequency 20, severity 20, ARR/account importance 20, commitment risk 20, customer concentration 10, recency 5, priority override 5.
- `priority_override_reason` 허용값: `customer_commitment`, `churn_risk`, `strategic_segment`, `company_objective`, `technical_foundation`.
- 출력에는 theme별 `scoreBreakdown`, `totalScore`, `recommendation`, `rank`가 포함된다.

## Verification
```bash
npm test
```
