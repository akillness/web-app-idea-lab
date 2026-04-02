# JEO Long-Term — VOC Repository Web App

**Product intent**: Build and deploy a Voice-of-Customer Repository web app from the akillness/web-app-idea-lab specs.

## Standing rules
- Every page must display linked account evidence (no orphan themes)
- build_now / validate_next / hold recommendations must be color-coded and distinct
- GitHub Pages deployment must stay green (CI badge must pass)
- Weekly brief must be exportable as Markdown
- README must always have up-to-date badges

## Validation contract
- `npm run build` must produce zero errors
- TypeScript strict mode must pass (`tsc --noEmit`)
- All 6 app routes must render as static HTML
- GitHub Actions deploy job must succeed on push to main
