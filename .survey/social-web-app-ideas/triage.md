# Triage
- Problem: Reddit, Threads, X에서 반복적으로 보이는 사용자 pain 신호를 기반으로 웹/앱 제품 아이디어를 발굴하고 실행 가능한 형태로 구조화한다.
- Audience: 인디해커, 초기 스타트업, 1인 운영자, 크리에이터, 소상공인
- Why now: founder-led distribution, creator economy, AI-assisted workflow demand가 커졌고 기존 툴은 point-solution이 많아 통합/실행 레이어가 비어 있다.

## 조사 메모
- `web_search` / `web_extract`는 이번 루프도 `401 Invalid API key`로 실패했다.
- Reddit live page 접근은 여전히 불안정하지만, 이번 루프에서는 **Yahoo indexed Reddit snippets**로 더 구체적인 PM intake/grooming workflow와 commitment-handling ritual을 회수했다.
- 새로 확인된 Reddit 신호:
  - `formal request intake process` 논의에서 **fill-in-the-blank JTBD template**로 문제 이해를 강제한다는 흐름이 보였다.
  - `What info to ask for in Feature Requests` 논의에서 여전히 **JIRA feature request project + area / impact / effort** 같은 수동 grooming 필드가 보였다.
  - `How do you use Productboard successfully?` 논의에서는 **Productboard가 quarterly planning에는 쓰이지만 ongoing discovery / backlog weighing에는 오히려 무겁다**는 신호가 보였다.
  - `How do I respond to emails loosely and not give timelines ...` / `Realistically, how often do you actually hit your feature ...` 쪽에서는 **90일 이상 scope/date commitment를 잠그기 어렵고, 3개월 roadmap도 2주 단위로 흔들린다**는 현실이 더 분명해졌다.
  - `How to track feature requests for enterprise clients?`에서는 **feature request가 너무 많아 Sales/CSM이 commitments 사이 우선순위를 분기마다 다시 조정한다**는 운영 현실이 드러났다.
  - `Product commitments`에서는 **날짜 약속은 비현실적이므로 high-level roadmap + release/sprint plan + progress report로 보완하라**는 식의 commitment communication ritual이 보였다.
- 기존 **PullPush Reddit mirror** 근거는 여전히 유효하며, live verification 대체 경로로 계속 사용 중이다.
- X는 direct verification 대신 **Yahoo indexed snippet** 기반으로 회수했다.
- 이번 루프 X에서는 creator pain 쪽이 더 실무적으로 구체화됐다.
  - `invoice chasing`에 대해 **day 3 / day 7 / day 30** cadence를 제시하는 제품화 framing이 보였다.
  - 여전히 **late payment / underpayment / ghosting**이 반복되고,
  - 일부 creators는 아직도 **WhatsApp account-number message** 수준으로 invoicing하고 있어 workflow immaturity가 선명하다.
- Creator 쪽에서는 `invoice creation`보다 **payment chasing timing**, **collections visibility**, **invoice readiness professionalism**이 더 선명한 pain으로 강화됐다.
- 특히 이번 루프에는 **`not some scribbled note` 수준의 professional invoice + net 30 + late fee + auto-reminder** framing이 추가돼, 문제의 시작점이 collections 이후가 아니라 invoice setup 품질에도 있음을 더 분명히 보여줬다.
- 추가로 Reddit `r/freelance` indexed snippets에서는 **due date 일주일 전 friendly reminder**, **due date 전날 reminder + 20% late fee**, **첫 인보이스/연체 시 추가 작업을 멈추는 hold-work rule**, **작은 벤더가 AP list 맨 아래로 밀리는 현실**이 보였다.
- Threads는 `site:threads.net` 기반 재탐색에서도 유의미한 net-new signal을 거의 주지 못했고, creator invoice/payment query는 이번 루프도 Yahoo에서 **검색 결과 0건**이었다. 이번에는 더 좁힌 quoted query `site:threads.net "creator invoice" "follow up" "brand deal"`도 **검색 결과 0건**이었다.
- 따라서 현재 조사 레이어는 `Reddit = indexed snippet + PullPush mirror`, `X = indexed snippet`, `Threads = weak/blocked` 조합으로 운영 중이다.