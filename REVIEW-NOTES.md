# Portfolio redesign — review only

Branch: `design/portfolio-review-20260928`.
Original master: `dc80c99c1115e4e70fb8adf706eb57787639407b`.
Production Netlify site: `05749214-b39d-403c-8e1a-d7f297e04f3d`.
Production deployment to preserve: `681c47eca0b398a2674669d8`.

**Do not merge, publish, promote, or run a production deploy without Samuel's explicit review approval.**
This candidate intentionally ships noindex directives. They must be removed in a separately approved production release.

## Design
Warm off-white, restrained orange, and evergreen charcoal; Manrope, Instrument Serif, IBM Plex Mono. Open editorial layouts and original project media rather than fabricated device renders or generic image grids. Native responsive navigation, a real two-view PCB viewer, project filtering, clean project URLs, keyboard-accessible image enlargement, native video controls, email, and a downloadable resume recreated from the supplied PDF text.

## Content
Current facts and project scope use Samuel's September 2026 resume. Dates corrected to Avride Jan 2026–present; Honda Jun 2022–Jan 2026. Employer work stays high level. Projects separate design, fabrication, bench troubleshooting, prototypes, and planning. Original earlier audio-interface artifacts are not labelled as the newer nRF5340 design. Remove unsupported claims in the previous template (latency, device performance, tracking networks, certification, etc.). No project is described as production-ready without evidence.

## Run
`npm ci`
`npm start`
`CI=true npm test -- --watchAll=false`
`GENERATE_SOURCEMAP=false npm run build`

For an authenticated Netlify CLI, a **draft-only** candidate can be deployed with `netlify deploy --site=05749214-b39d-403c-8e1a-d7f297e04f3d --dir=build --no-build --alias=portfolio-review-20260928`. Never add `--prod`.

The build script explicitly rejects `CONTEXT=production` while this is a review candidate. Review is served on an isolated localhost server through a temporary tunnel, not the production Netlify site. Original source and media remain available on master / in Git history. Résumé text has been reflowed into a two-page PDF for the preview; no employer details beyond the supplied résumé were added.
