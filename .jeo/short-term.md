# JEO Short-Term — Current Delivery Slice

**Updated**: 2026-04-02  
**Slice**: VOC Repository MVP Web App

## System slice
- Next.js 14 static export with 6 routes
- Sample data layer (TypeScript typed)
- GitHub Actions CI/CD → GitHub Pages

## Unit-test plan
- [x] `npm run build` — zero errors
- [x] `npx tsc --noEmit` — zero type errors
- [x] ESLint — zero errors
- [ ] All 6 routes render correct content
- [ ] Markdown export works (briefs page)
- [ ] Score bars visible on themes page

## Flow/browser verification plan
- [ ] Navigate to each of 6 routes — no blank pages
- [ ] Records page: signal type filter chips work
- [ ] Themes page: score bars render proportionally
- [ ] Briefs page: export button downloads .md file
- [ ] Queue page: evidence drawer expands

## Exit criteria
- Build passes, TS passes, lint passes
- GitHub Actions workflow file present
- README badges pointing to correct URLs
- Git history shows incremental commits
