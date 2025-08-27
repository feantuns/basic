# Basic

Frontend practice project to recreate this website:

https://www.basicagency.com

![](https://www.frontendpractice.com/fullsize/C2-basic.png)

Perguntando para o chat gpt como ele se planejaria para fazer esse trabalho.

Entendendo as escolhas de stack do chat gpt, segundo ele o melhor é usar Next.js e React, usar Sanity como CMS, framer motion e GSAP para animações, GA4 para analytics, usar monorepo como arquitetura para separar design de componentes, configuração e site do código em si, usar storybook para documentar componentes e testá-los.

Observando o wappalyzer essa parece ser realmente a stack do site original, eles usam Next.js e Sanity. Também parecem usar Google Tag Manager.

A diferença é que o site do frontend practice recomendou utilizar outras libs de animação, como a locomotive scroll para animações baseadas no scroll da página.

https://chatgpt.com/s/t_68ac3b8a832c8191b8a416d175ab327b

Nosso plano:

---

# Phase 0 — Align on goals, scope & budgets

1. **Business goals & KPIs.** Leads (contact form), qualified traffic to case studies, applications (careers), newsletter.
2. **Page map.** Home, Work (index), Case Study (detail), Insights (blog), Insight detail, About, Careers, Job detail, Contact, Legal, 404/500.
3. **Performance budgets (p75 mobile):** LCP < 2.5s, CLS < 0.1, INP < 200ms, JS on home ≤ 170KB gzip on critical path.
4. **Accessibility bar:** WCAG 2.2 AA; reduced-motion parity.
5. **Motion language:** define what “must be cinematic” vs “micro”. Anything not mission-critical is cut if it threatens budgets.
   **Exit criteria:** signed one-pager with KPIs, budgets, sitemap, animation scope, languages/locales (start with one).

---

# Phase 1 — Repo, environments, and CI/CD

1. **Monorepo** (Turborepo + pnpm):
   - `apps/web` (Next.js),\*\* **`packages/ui` (components),** **`packages/tokens` (design tokens),** **`packages/config`(eslint/ts/prettier),** \*\*`packages/analytics` (event schema/helpers).
2. **Branching & conventions.** `main` protected; conventional commits; Changesets for versioning packages.
3. **CI** (GitHub Actions): typecheck, lint, unit tests, build, Storybook, Lighthouse CI, Playwright smoke, bundle-size gates.
4. **Hosting:** Vercel project + preview deployments per PR; Cloudflare for DNS/WAF.
5. **Secrets (per env):** `SANITY_PROJECT_ID`,\*\* **`SANITY_DATASET`,** **`SANITY_READ_TOKEN`,** **`NEXT_PUBLIC_SITE_URL`,** **`MUX_TOKEN_ID/SECRET`,** **`CLOUDINARY_URL` (or** **`NEXT_IMAGE_LOADER` config),** **`ALGOLIA_APP_ID/ADMIN_KEY/INDEX`,** **`NEXT_PUBLIC_GA4_ID` (or** **`PLAUSIBLE_DOMAIN`),** **`SENTRY_DSN`.
   **Exit criteria:\*\* CI green on an empty scaffold; preview links auto-post to PRs.

---

# Phase 2 — Content system (Sanity) & editorial UX

1. **Model types:** `HomePage`,\*\* **`CaseStudy`,** **`WorkIndexSettings`,** **`Article`,** **`Category/Tag`,** **`Client`,** **`Service`,** **`Award`,** **`Person`,** **`JobOpening`,** \*\*`Global`.
2. **Modules (portable, reorderable):** hero, marquee, featured work grid, client logo rail, awards strip, testimonial, media gallery, stats, CTA banner, news rail.
3. **Validation guardrails:** alt text required, aspect ratio presets (e.g., 16:9, 4:5), headline char limits, color palette enums, required captions for video.
4. **Previews:** Next.js draft preview (RSC-compatible) with live update; OG image preview in Studio.
5. **Media pipeline:** images via Sanity or Cloudinary with focal point + responsive sets; video via Mux (poster frame & storyboard thumbs).
   **Exit criteria:** editors can build the home page and a full case study** \*\***without code changes\*\* and pass validations.

---

# Phase 3 — Design tokens & system foundations

1. **Token taxonomy:** color (semantic, with contrast pairs), type scale, spacing, radii, shadows, motion (durations/easing), z-indices, breakpoints.
2. **Distribution:** tokens compiled to CSS variables via Style Dictionary; consumed by Tailwind config + vanilla-extract where needed.
3. **Accessibility baked in:** minimum contrasts enforced at token level; motion tokens include “reduced” variants.
4. **Storybook:** a11y addon, viewport, interactions; Chromatic or Percy for visual baselines.
   **Exit criteria:** tokens render in a living doc; core primitives (Button, Link, Heading, Media, Grid, Card, Carousel, Drawer/Modal) available with a11y and keyboard coverage.

---

# Phase 4 — Motion prototyping (de-risk early)

1. **Spike a motion lab** outside the app: GSAP timelines + ScrollTrigger for two hardest sections (e.g., hero choreography, case-study scrollytelling).
2. **Device tests:** mid-tier Android + Safari iOS with CPU throttling; compare with budgets.
3. **Reduced-motion path** designed and verified (no parallax; shorter fades; no smooth-scroll).
4. **Adopt View Transitions API** for cross-page continuity; fall back gracefully on unsupported browsers.
   **Exit criteria:** sign-off on motion grammar and measured perf (filmstrips + INP histograms) before building the full site.

---

# Phase 5 — Information architecture & routing

1. **Clean URLs:** `/work`,\*\* **`/work/{slug}`,** **`/insights`,** **`/insights/{slug}`,** **`/careers`,** \*\*`/careers/{slug}`.
2. **Next.js App Router:** RSC by default; client components only where interactivity is needed.
3. **Data fetching strategy:** SSG + ISR for content; edge SSR only for experiments/search.
4. **Error/empty states** defined for each route; skeletons shimmer only below the fold.
   **Exit criteria:** routes scaffolded, pulling real data in preview; 404/500 implemented.

---

# Phase 6 — Page builds (module-first)

For each page, follow:\*\* \*\* **(a) assemble modules → (b) wire content → (c) a11y pass → (d) perf check → (e) visual baseline** .

- **Home:** hero (motion), featured work (lazy hydrated cards), clients rail (CSS marquee, no JS), awards strip (SVG), news rail.
- **Work index:** filters (client, industry, service); grid with intrinsic ratios; infinite pagination or “Load more”.
- **Case study:** story sections (problem/approach/result), mixed media gallery (image/video/quote/stat/split), outcomes block (metrics), related work.
- **Insights:** article list, categories/tags, author chips; article detail (Portable Text render, pull-quotes, footnotes, TOC).
- **Careers:** job grid with filters; job detail with\*\* \*\*`JobPosting` schema; application CTA.
- **About & Contact:** culture blurbs, offices, awards archive, contact form (rate-limited API route + Turnstile/hCaptcha).
  **Exit criteria:** each page meets its** \*\***acceptance criteria\*\* (a11y, perf, content), and is baselined in visual regression.

---

# Phase 7 — Search & discovery

1. **Algolia indexers** (on publish webhooks): work, articles, jobs.
2. **Front-end search:** typo tolerance, synonyms, facets; keyboard accessible; no layout shift on results load.
3. **SEO:** canonical, sitemap, robots; structured data (Organization, Breadcrumb, Article, CreativeWork, JobPosting).
   **Exit criteria:** search works offline for index hiccups; structured data validated; Search Console smoke passes.

---

# Phase 8 — Analytics, consent, and observability

1. **Analytics:** GA4 or Plausible; server-side events for conversions (lead submit, application start/submit, case-study read depth).
2. **Consent Mode v2** wired before any marketing tags; deny-by-default until consent.
3. **Sentry:** front + server; release health; source maps.
4. **Feature flags & experiments:** Vercel Edge Config (or PostHog flags) with 0-flicker delivery; experiment results shipped to warehouse (BigQuery/Postgres).
   **Exit criteria:** events show in dashboards; consent works; no blocked main-thread from tags.

---

# Phase 9 — Performance engineering & hardening

1. **Fonts:** self-hosted variable; subset;\*\* \*\*`font-display: optional`; fallback metrics tuned.
2. **Images:** AVIF/WebP with art-directioned crops; correct\*\* \*\*`sizes`; prefetch only where LCP benefits.
3. **JS discipline:** route-level code splitting; zero JS for static modules; tree-shake GSAP; remove dev-only motion tools.
4. **Caching:** ISR windows set by content type;\*\* \*\*`Cache-Control` tuned; ETags; CDN revalidation on publish.
5. **Budgets in CI:** Lighthouse CI fails PRs if >2–3% regression on LCP/INP or JS size.
   **Exit criteria:** budgets met on lab and verified with early field RUM (Real User Monitoring).

---

# Phase 10 — Accessibility verification

1. **Automated:** eslint-a11y, Axe CI, color contrast tests.
2. **Manual SR runs:** NVDA (Windows) + VoiceOver (macOS/iOS); keyboard traps; focus order; skip links.
3. **Media:** captions/subtitles for video; transcripts for long-form; alt text verified.
4. **Reduced motion:** user setting persists; ensures equivalent comprehension.
   **Exit criteria:** WCAG 2.2 AA checklist met; known issues triaged with owners/dates.

---

# Phase 11 — Security, privacy, compliance

1. **Headers:** CSP (hash/nonce), HSTS, Referrer-Policy, Permissions-Policy, COEP/COOP if needed.
2. **Forms API:** rate limits, bot score, validation, logging to secure store, PII minimization.
3. **Backups & retention:** CMS dataset backups; log retention policy; incident runbook.
   **Exit criteria:** security review signed; CSP report-only baseline clean; then enforce.

---

# Phase 12 — QA, UAT, and content freeze

1. **Cross-browser matrix:** latest Chrome/Firefox/Safari, iOS Safari, Android Chrome; Windows High-DPI.
2. **Network/Device profiles:** 4G/Slow 4G throttles; mid-tier Android; memory snapshots on heavy pages.
3. **Redirects & legacy URLs** map validated; 404/410 coverage for removed content.
4. **Editorial UAT:** editors rehearse real workflows (publish, rollback, schedule).
   **Exit criteria:** defect burn-down to agreed threshold; go-live checklist all green.

---

# Phase 13 — Launch & cutover

1. **DNS switch** (low-TTL window), monitor 5xx/4xx, CWV, and JS errors in real time.
2. **Submit sitemaps** , fetch as Google, monitor index coverage.
3. **Warm critical ISR** paths (home, top 10 case studies, latest insights).
   **Exit criteria:** stable metrics for 24–48h; incident playbook unused or handled.

---

# Phase 14 — Post-launch growth & maintenance

1. **First experiments:** Home hero narrative, case-study CTA position, “related work” logic.
2. **Content cadence:** quarterly case studies; monthly insight pieces; award updates.
3. **Weekly health:** Sentry triage, CrUX deltas, search rankings for target terms, form conversion funnel.
4. **Quarterly audits:** SEO technical, a11y regression, performance budgets, dependency updates, token drift.
   **Exit criteria:** stable ops; a backlog of validated experiments and content.

---

## Anti-patterns to avoid (hard rules)

- Hijacking scroll globally or building heavy canvas effects without a plain, accessible path.
- Client-side A/B testing snippets that flash or block rendering.
- Letting editors upload original 4K media without enforced transforms.
- Skipping Storybook/visual regression on a design-driven site.
- Treating reduced motion as an afterthought.

---

## “Definition of Done” per module/page

- **A11y:** focus order, SR labels, contrast, reduced motion.
- **Perf:** meets page budget (LCP/CLS/INP), no blocking third-party.
- **SEO:** sensible headings, schema where applicable, OG verified.
- **Content:** editable in Sanity with validations; preview accurate.
- **Tests:** visual baseline stable; Playwright happy path passing.

---

## First 10 tickets

1. Repo + CI skeleton (Turborepo, Actions, Vercel previews).
2. Tokens pipeline + Tailwind integration; typography & spacing scale.
3. Sanity project with core schemas and live preview.
4. Global shell (nav/footer), routing, error pages.
5. Image pipeline (next/image + Sanity/Cloudinary presets).
6. Motion lab prototype with reduced-motion variant.
7. Home page assembly (static modules first).
8. Case Study template + gallery modules wired to CMS.
9. Analytics + consent baseline + Sentry wiring.
10. Lighthouse/axe gates + first perf pass on Home/Case Study.
