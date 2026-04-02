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

## 현재 구현 중인 코드 슬라이스
- `src/voc/ranking.js` — Voice-of-Customer idea용 weighted ranking engine
- `tests/voc-ranking.test.js` — ranking engine executable tests
- `package.json` — dependency-light Node test harness (`npm test` → built-in `node:test`)

## 빠른 실행
```bash
npm test
```

## Ranking engine contract
- 입력 metrics는 `0..1` 범위의 normalized score여야 한다.
- score weight는 `20 / 20 / 20 / 20 / 10 / 5 / 5`로 고정된다.
- override taxonomy는 `customer commitment`, `churn risk`, `strategic segment`, `company objective`, `technical foundation`만 허용한다.
- linked account evidence가 없으면 high score여도 `build_now`로 승격하지 않는다.
- 기본 threshold는 `buildNow=70`, `validateNext=45`이며 `0..100` 범위를 벗어나거나 역전되면 validation error를 낸다.
- 동점일 때는 linked account count → `id` → `label` → original input order 순서로 deterministic 정렬한다.

## 운영 원칙
- 단계별 최신 파일만 유지한다.
- 루프 과정 로그, 중간 메모, 반복 토론 파일은 남기지 않는다.
- 새로운 evidence가 생기면 기존 최신 파일을 **덮어써서 갱신**한다.
- 목표는 `명확한 아이디어 + 세밀한 개발 계획`이다.

## 현재 결론
- Primary idea: **Voice-of-Customer Repository**
- Backup idea: **Creator Deal CRM**
