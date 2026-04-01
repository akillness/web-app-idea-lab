# Web App Idea Lab

Social platforms에서 웹/앱 아이디어를 지속 수집하고, 구조화하고, 합의된 내용을 바로 실행 가능한 프롬프트/스펙으로 문서화하는 저장소.

## 목적
- Reddit / Threads / X에서 떠오르는 니즈와 아이디어 신호 수집
- survey 방식으로 출처 기반 리서치 축적
- BMAD 방식으로 아이디어를 구체화
- 멀티에이전트 토론으로 합의안 도출
- technical-writing 방식으로 바로 적용 가능한 프롬프트/기술 문서 생성

## 구조
- `.survey/` — 조사 산출물
- `research/` — 플랫폼별 원문 요약과 선별 결과
- `ideas/` — 구체화된 아이디어 문서
- `consensus/` — 토론 로그와 합의안
- `prompts/` — 바로 실행 가능한 프롬프트/실행 문서
- `logs/` — 작업 히스토리

## 운영 루프
1. 30분마다 소셜 소스 조사
2. 후보 아이디어 업데이트 및 중복 제거
3. 상위 후보 구체화
4. 멀티에이전트 토론/합의
5. 문서 갱신 후 GitHub push

## 핵심 문서
- `docs/voc-repository-tech-spec.md`
- `docs/voc-repository-json-schema.md`
- `docs/voc-repository-mvp-tasklist.md`
- `prompts/voc-repository-build-prompt.md`
- `prompts/voc-repository-system-design-prompt.md`
- `prompts/voc-repository-extraction-prompts.md`
