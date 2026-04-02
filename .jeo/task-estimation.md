# Task Estimation — VOC Repository Web App
**Date**: 2026-04-02 | **Method**: Story Points (Fibonacci) + T-Shirt Sizing | **Velocity**: ~13 SP/day

---

## Completed Sprint (Phase 1)

| # | Task | SP | Size | Status |
|---|------|----|------|--------|
| 1 | Scaffold Next.js 14 + Tailwind + static export | 2 | S | ✅ Done |
| 2 | Sample data layer (TypeScript typed) | 3 | M | ✅ Done |
| 3 | Dashboard page + stat cards | 2 | S | ✅ Done |
| 4 | Records page + signal type badges | 3 | M | ✅ Done |
| 5 | Accounts evidence board | 3 | M | ✅ Done |
| 6 | Themes ranked board + score bars | 3 | M | ✅ Done |
| 7 | Weekly brief + Markdown export | 3 | M | ✅ Done |
| 8 | Build queue + evidence drawer | 2 | S | ✅ Done |
| 9 | GitHub Actions CI/CD deploy | 2 | S | ✅ Done |
| 10 | README badges + architecture diagram | 1 | XS | ✅ Done |
| 11 | Functional filter chips (Records) | 2 | S | ✅ Done |
| 12 | Active nav state via usePathname | 1 | XS | ✅ Done |
| 13 | Shared ui-config + dead CSS cleanup | 1 | XS | ✅ Done |
| 14 | Playwright E2E test suite (49 tests) | 3 | M | ✅ Done |
| 15 | Playwriter screenshots (6 routes) | 1 | XS | ✅ Done |
| **Total** | | **32 SP** | | |

---

## Next Sprint (Phase 2 — Backlog)

### High Priority

| # | Task | SP | Size | Risk | Blocked By |
|---|------|----|------|------|-----------|
| B1 | Record intake form (paste + source chips) | 5 | M | Low | — |
| B2 | Account → Record drill-down navigation | 3 | M | Low | — |
| B3 | Commitment tracking queue `/commitments` | 3 | M | Low | — |
| B4 | Interactive theme search/filter | 2 | S | Low | — |
| B5 | Account health risk filter on accounts page | 2 | S | Low | — |

### Medium Priority

| # | Task | SP | Size | Risk | Blocked By |
|---|------|----|------|------|-----------|
| B6 | External update draft `/updates` (now/next/later) | 8 | L | Medium | B1 (data) |
| B7 | Answer pack reuse view `/answers` | 5 | M | Medium | B3 |
| B8 | Exec/revenue roadmap pack `/views/revenue-roadmap` | 5 | M | Low | — |
| B9 | Support relay queue `/queue/support-relay` | 3 | M | Low | — |

### Low Priority / Future

| # | Task | SP | Size | Risk | Notes |
|---|------|----|------|------|-------|
| B10 | Real API backend (replace sample data) | 13 | XL | High | Needs backend decision |
| B11 | Auth / multi-user sessions | 8 | L | High | Needs B10 |
| B12 | Productboard/Jira sync integration | 13 | XL | High | Out of MVP scope |
| B13 | Real-time signal ingestion | 13 | XL | High | Out of MVP scope |

---

## Risk Adjustment

| Risk Factor | Multiplier | Applies To |
|-------------|-----------|-----------|
| Static export → SPA constraint | 1.0× | All client features |
| No backend (JSON only) | 1.2× | B1, B6, B7 |
| TypeScript strict mode | 1.0× | All |
| Tailwind v4 API differences | 1.1× | All styling |

### Adjusted Phase 2 estimate

```
High Priority (B1–B5):   15 SP × 1.1 = 17 SP → ~1.5 days
Medium Priority (B6–B9): 21 SP × 1.2 = 26 SP → ~2 days
Phase 2 total: ~43 SP → ~3.5 days @ 13 SP/day
```

---

## Definition of Done

- [ ] `npm run build` passes (0 errors)
- [ ] `npx tsc --noEmit` passes (0 type errors)
- [ ] `npm run lint` passes
- [ ] E2E tests pass for affected routes
- [ ] Screenshot updated if UI changed
- [ ] PR created and CI badge green
