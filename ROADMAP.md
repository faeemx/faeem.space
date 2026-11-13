# Project Roadmap: faeem.space

faeem.space is a clean, fast, minimal personal notebook and blog built with Astro, TypeScript, Tailwind CSS, and Content Collections.

## Status Summary

- **Phase 1: Foundation** — ✅ Completed
- **Phase 2: Reading Experience** — ✅ Completed
- **Phase 3: Discovery and SEO** — ✅ Completed
- **Phase 4: Cloudflare Deployment** — 🟡 Up Next
- **Phase 5: Optional Enhancements** — ⚪ Future

---

## Phase 1 — Foundation (Completed)

- [x] Initialize Astro project with strict TypeScript
- [x] Configure Tailwind CSS v4 and custom typography design system
- [x] Configure Shiki code syntax highlighting with dual dark/light themes
- [x] Set up Astro Content Collections schema and validation (`src/content.config.ts`)
- [x] Implement global design system, CSS variables, and typography (Inter, Literata, JetBrains Mono)
- [x] Implement responsive navigation header with dark/light mode toggle
- [x] Build minimal footer with social links and copyright
- [x] Build Homepage (`/`) with intro, recent posts, and featured projects
- [x] Build Blog index (`/blog`) with all published non-draft articles
- [x] Build Individual article page (`/blog/[slug]`) with full layout, metadata, and reading time
- [x] Build Projects page (`/projects`) showcasing development work
- [x] Build About page (`/about`) with developer background and focus areas
- [x] Build Uses page (`/uses`) detailing hardware, software, and tools
- [x] Build Tag filtering route (`/tags/[tag]`) for navigable categorization
- [x] Author realistic, high-quality sample Markdown articles
- [x] Enforce draft security rule (draft posts return 404 and are excluded from all public listings/feeds)
- [x] Generate RSS 2.0 feed (`/rss.xml`)
- [x] Verify build, TypeScript checks (0 errors, 0 warnings, 0 hints), and dev server operation

---

## Phase 2 — Reading Experience (Completed)

- [x] Table of contents for longer articles with active section highlighting on scroll
- [x] Reading time calculation based on clean word count
- [x] Reading progress indicator fixed bar tracking article scroll depth
- [x] Code block enhancements: one-click copy button with clipboard API feedback and language badge
- [x] Related articles recommendation engine based on tag overlap and category matching
- [x] Previous / Next article chronologically ordered navigation links
- [x] Heading anchor links with hover visibility and deep-linking (`rehype-slug` & `rehype-autolink-headings`)
- [x] Editorial typography refinements with Literata serif, Inter headings, and JetBrains Mono code

---

## Phase 3 — Discovery and SEO (Completed)

- [x] Validated RSS 2.0 feed generation (`/rss.xml`)
- [x] Search engine crawler directives (`public/robots.txt`)
- [x] Automated XML sitemap and index generation (`@astrojs/sitemap`)
- [x] Lightning-fast client-side fuzzy search dialog (`Cmd+K` / `Ctrl+K` shortcut, autocomplete, keyboard navigation)
- [x] Static search index generator (`/search.json`)
- [x] Dynamic category filtering routes (`/category/[category]`) and category pill tabs on `/blog`
- [x] Structured JSON-LD metadata for search engines (`BlogPosting`, `WebSite`, `Person`)
- [x] Open Graph & Twitter Summary Cards with canonical URLs and fallbacks

---

## Phase 4 — Cloudflare Deployment (Next Scope)

- [ ] Cloudflare deployment configuration (`wrangler.toml` for Cloudflare Workers / Pages)
- [ ] GitHub Actions CI/CD workflow for automated deployment on push to `main`
- [ ] Production build verification
- [ ] Asset caching and headers configuration (`_headers` / `_routes.json`)

---

## Phase 5 — Optional Enhancements

- [ ] Privacy-friendly analytics (Umami / Plausible)
- [ ] Newsletter signup integration
- [ ] Minimal webmentions or comments integration
- [ ] Advanced project showcases with live metrics and interactive demos
