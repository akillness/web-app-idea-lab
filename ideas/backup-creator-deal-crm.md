# Backup Idea — Creator Deal CRM

**Status**: Active backup idea  
**Updated**: 2026-04-02

## One-line definition
크리에이터와 소형 에이전시의 deal 이후 단계에서 **invoice readiness, AP routing, AP review lead time, pay-run visibility, overdue follow-up**를 관리하는 collections-first cash-ops tool.

## 핵심 문제
크리에이터가 deal을 따온 뒤 실제 돈이 들어오기까지의 과정은 여전히 시트, DM, 이메일, 메모에 흩어져 있다. 가장 큰 pain은 관계 관리가 아니라 `지금 돈이 어디서 막혔는지`를 모르는 것이다. 실제 blockage는 ghosting뿐 아니라 AP contact 부재, vendor onboarding 누락, payment terms 오해, pay-run miss에서 자주 나온다. 이번 재확인에서는 여기에 더해 **AP가 invoice를 process/audit하는 리드타임 자체**, **pay-run에 맞추기 위해 invoice를 미리 넣는 운영 습관**, 그리고 경우에 따라 **invoice가 monthly payment-run cutoff 시점에 이미 overdue/ready 상태여야 그 사이클에 실린다**는 운영 현실이 보여서, 독촉 이전 단계의 timing control도 제품 표면으로 잡아야 한다는 점이 더 분명해졌다.

`invoice destination`과 `remittance-proof`도 운영 필드로는 유의미하지만, 현재 시장 wedge를 세우는 핵심은 여전히 **AP owner + AP review + payment run + blockage recovery**다.

## 누구를 위한 제품인가
- 월 브랜드딜이 꾸준한 솔로 크리에이터
- invoice follow-up가 많은 freelancer
- 소형 creator agency 운영자

## 가장 중요한 pain
1. deliverable → invoice sent → paid 구간이 가장 위험한데 가장 구조화돼 있지 않다.
2. AP contact, invoice destination, PO/reference, payment terms가 deal memory에서 빠진다.
3. promised payment date와 실제 입금 사이 추적이 약하다.
4. underpaid / ghosted / pay-run miss / onboarding blocked 같은 상태가 분리되지 않는다.
5. follow-up copy보다 `오늘 누구에게 무엇을 보내야 하는지`가 더 중요하다.
6. overdue follow-up 전에 `named AP owner`와 `현재 pay-run 상태`를 확인하는 운영 단계가 별도로 필요하다.
7. `언제 독촉할지` 못지않게 `언제 invoice를 먼저 넣어야 pay-run을 안 놓치는지`가 중요하다.
8. AP가 아직 invoice를 검토/감사 중인지, 이미 pay-run을 놓친 건지 구분이 안 되면 다음 행동이 잘못된다.
9. 어떤 payer는 invoice가 monthly payment-run cutoff 시점에 이미 overdue/ready 상태여야 처리하므로, cutoff 역산 없이 follow-up만 하면 한 사이클이 통째로 밀린다.

## 제품이 제공해야 하는 핵심 결과물
- today collections queue
- invoice readiness checklist
- AP / project-owner routing map
- AP review / processing timer
- overdue cadence tracking
- promised-payment miss tracker
- pay-run miss recovery queue
- remittance-proof / partial-payment tracking
- next-step recommendation
- invoice-ahead recommendation for pay-run-sensitive deals
- payment-run cutoff risk warning

## 왜 지금 backup으로 유지하는가
- pain은 매우 선명하다.
- broad CRM보다 collections wedge가 훨씬 날카롭다.
- reminder automation 카테고리는 이미 보이지만, blockage visibility와 routing/AP-owner verification 레이어는 아직 덜 정리돼 있다.
- 이번 재확인으로 `AP review lead time`과 `invoice in advance` 같은 실무 workaround가 보여서, 제품은 단순 chase tool보다 **timing-aware collections operating layer**로 잡는 편이 맞다.
- 다만 ICP가 solo creator / freelancer / small agency로 아직 섞여 있어 primary보다 우선순위가 낮다.
- `invoice destination`, `remittance-proof`는 제품 내부 필드로는 유지하되 현재는 **보조 운영 필드**로 두는 편이 맞다.

## 제품 wedge
"creator CRM"이 아니라 **collections visibility + payment-stage clarity + AP-routing control + pay-run timing control**.

자동 리마인더 자체는 이미 보이는 만큼, wedge는 `독촉 자동화`보다 **현재 blockage를 드러내고 다음 조치를 큐로 보여주며 pay-run을 놓치지 않게 하는 operating layer**에 둔다.

## 하지 말아야 할 것
- creator discovery CRM
- contract/e-sign suite first
- accounting platform first
- auto-send automation first
- marketplace/network product

## 성공 판단 기준
- 사용자가 시트 대신 오늘의 회수 큐를 이 제품에서 본다.
- overdue / underpaid / ghosted / blocked 상태 분리가 유용하다는 반응이 나온다.
- invoice readiness checklist와 routing 정보가 실제 cash leak를 줄이는 데 도움된다는 피드백이 나온다.
- `누구에게 보내야 하는지`와 `payment run을 놓쳤는지`가 빠르게 읽힌다는 반응이 나온다.
- pay-run-sensitive deal에서 `invoice를 미리 넣어야 한다`는 추천이 실제 지연 방지에 도움이 된다는 반응이 나온다.
