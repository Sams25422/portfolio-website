# Samuel Simkin — engineering portfolio

A responsive React portfolio built around original project artifacts, current experience, and clearly scoped engineering case studies.

## Review only

This branch is **not approved for production**. Do not merge it into master or publish it to the production Netlify site until Samuel has reviewed and approved it.

- Review branch: `design/portfolio-review-20260928`
- Temporary review URL: https://ccd-helping-salad-annex.trycloudflare.com
- Existing production site: https://samuelsimkin.com
- `CONTEXT=production` builds are deliberately blocked.
- Search indexing is deliberately disabled for this candidate.

The temporary URL is a separate preview on the authorized development server, not a Netlify production deployment. It depends on that preview server and tunnel remaining online.

## Development

```sh
npm ci
npm start
CI=true npm test -- --watchAll=false --runInBand
GENERATE_SOURCEMAP=false npm run build
```

## Source organization

- `src/Portfolio.js`: page composition and interaction components
- `src/content/projects.js`: project and experience content
- `src/portfolio.css`: design tokens and responsive styling
- `src/components/portfolio/Icons.js`: interface icons
- `public/media`: optimized original project images and demonstration videos
- `scripts/review-build-guard.cjs`: fail-closed production-context guard

The site includes a two-view PCB artifact viewer, project-category filters, detailed case studies, accessible image dialogs, native video playback, real contact links, and a downloadable resume reflowed from the supplied September 2026 PDF text. No employer-internal images or specifications are included.

Original source and media remain available on the original master branch and in Git history. See `REVIEW-NOTES.md` for scope and release precautions.
