# Project Roadmap: Mando

Mando is a clean, fast, minimal personal developer blog built with Astro, TypeScript, Tailwind CSS, and Content Collections.

## Status Summary

- **Phase 1: Foundation** — ✅ Completed
- **Phase 2: Reading Experience** — 🟡 Up Next
- **Phase 3: Discovery and SEO** — ⚪ Planned
- **Phase 4: Cloudflare Deployment** — ⚪ Planned
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

## Phase 2 — Reading Experience (Next Scope)

- [x] Table of contents for longer articles (Initial implementation complete in Phase 1)
- [x] Reading time calculation (Initial implementation complete in Phase 1)
- [x] Previous / Next article navigation links (Initial implementation complete in Phase 1)
- [ ] Reading progress indicator bar on scroll
- [ ] Code block copy button and language pill
- [ ] Related articles recommendation engine
- [ ] Auto-linked heading anchors (`rehype-autolink-headings`)
- [ ] Refined responsive image handling and captions

---

## Phase 3 — Discovery and SEO

- [x] Basic RSS feed generation (`/rss.xml`) (Implemented in Phase 1)
- [x] `robots.txt` configuration (Implemented in Phase 1)
- [ ] Sitemap generation (`@astrojs/sitemap`)
- [ ] Fast client-side / static search (Pagefind or Fuse.js)
- [ ] Dedicated category filtering views
- [ ] Dynamic Open Graph preview cards
- [ ] Structured JSON-LD metadata for search engines

---

## Phase 4 — Cloudflare Deployment

- [ ] Cloudflare Workers / Pages configuration (`wrangler.toml` or `@astrojs/cloudflare` if needed)
- [ ] GitHub Actions workflow for automated deployment on push
- [ ] Custom domain DNS configuration
- [ ] Production build verification
- [ ] Lighthouse / Web Vitals performance benchmarking

---

## Phase 5 — Optional Enhancements

- [ ] Privacy-friendly analytics (Umami / Plausible)
- [ ] Newsletter signup integration
- [ ] Minimal webmentions or comments integration
- [ ] Advanced project showcases with live metrics and interactive demos
