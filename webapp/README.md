# VOC Repository Web App

Next.js 기반의 **VOC Repository 제품 데모 앱**이다.  
B2B SaaS 팀이 흩어진 고객 신호를 한 화면에서 읽고, 우선순위를 정하고, 주간 브리프까지 확인할 수 있는 흐름을 정적 데모로 재현한다.

## 이 앱의 목적

이 앱은 아래 질문에 답하기 위해 만들어졌다.

- 어떤 고객/계정에서 지금 리스크가 커지고 있는가?
- 어떤 VOC theme를 바로 build 해야 하는가?
- 어떤 commitment가 위험한가?
- PM / CSM / Leadership가 같은 evidence를 보고 같은 결론을 낼 수 있는가?

즉, 단순 대시보드가 아니라 **VOC → evidence board → prioritization → weekly brief** 흐름을 보여주는 제품 프로토타입이다.

## 어디에 쓰는가

- 제품 컨셉 검증용 데모
- PM / Founder / GTM 팀 내부 설명용 샘플
- GitHub Pages에 올리는 read-only showcase
- 이후 실제 backend/data layer를 붙이기 전 UX 기준점

## 현재 동작 범위

현재는 **typed sample data 기반 read-only demo**다.

가능한 것:
- dashboard / records / accounts / themes / commitments / briefs / queue 화면 탐색
- filter chip, nav state, modal 등 UI interaction 확인
- weekly brief markdown export
- static export 후 GitHub Pages 배포
- Playwright E2E로 주요 경로 회귀 검증

아직 없는 것:
- 실제 DB 연동
- auth
- 실시간 저장
- 서버 액션 기반 데이터 수정

## Stack

- Next.js 16 App Router
- React 19
- TypeScript 5
- Tailwind CSS 4
- Playwright E2E
- Static export via `next build`

## Routes

- `/` — dashboard overview
- `/records` — VOC signal records + intake modal
- `/accounts` — account evidence board
- `/themes` — ranked theme board
- `/briefs` — weekly decision brief + Markdown export
- `/queue` — build-next priority queue
- `/commitments` — at-risk commitments tracker

## 실제로 실행하는 방법

### 1) 개발 서버로 보기

```bash
cd webapp
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 열면 된다.

### 2) GitHub Pages와 같은 방식으로 빌드하기

```bash
cd webapp
npm install
npm run build:pages
npm run preview:pages
```

그다음 `http://localhost:4173/web-app-idea-lab/` 로 접속하면  
GitHub Pages 배포 경로(base path)까지 포함한 실제 동작 형태를 로컬에서 확인할 수 있다.

## 검증 명령

```bash
npm run typecheck
npm run lint
npm run build
npm run build:pages
npm run test:e2e
```

## 배포가 실제로 동작하는 방식

이 프로젝트의 Pages 배포는 **canonical repo** 기준으로 동작한다.

- 배포 대상 repo: `akillness/web-app-idea-lab`
- fork repo: test/lint 중심 검증만 수행
- 실제 Pages deploy job은 canonical repo에서만 수행

이렇게 나눈 이유는 fork 환경에서 Pages API 권한/설정이 없을 수 있어서, PR 검증과 실배포를 분리하기 위해서다.

## GitHub Pages build

배포 workflow는 아래 명령을 기준으로 정적 export를 만든다.

```bash
npm run build:pages
```

이 설정이 route 링크를 아래 project Pages URL에 맞춘다.

- `https://akillness.github.io/web-app-idea-lab/`
