# Project Roadmap: Mando

Mando is a clean, fast, minimal personal developer blog built with Astro, TypeScript, Tailwind CSS, and Content Collections.

## Status Summary

- **Phase 1: Foundation** — 🟡 In Progress
- **Phase 2: Reading Experience** — ⚪ Planned
- **Phase 3: Discovery and SEO** — ⚪ Planned
- **Phase 4: Cloudflare Deployment** — ⚪ Planned
- **Phase 5: Optional Enhancements** — ⚪ Future

---

## Phase 1 — Foundation (Current Scope)

- [x] Initialize Astro project with strict TypeScript
- [x] Configure Tailwind CSS v4 and typography
- [x] Configure Shiki code syntax highlighting with dark/light themes
- [x] Set up Astro Content Collections schema and validation (`src/content.config.ts`)
- [ ] Implement global design system, CSS variables, and typography (Inter, Literata, JetBrains Mono)
- [ ] Implement responsive navigation header with dark/light mode toggle
- [ ] Build minimal footer with social links
- [ ] Build Homepage (`/`) with intro, recent posts, and featured projects
- [ ] Build Blog index (`/blog`) with all published non-draft articles
- [ ] Build Individual article page (`/blog/[slug]`) with full layout, metadata, and reading time
- [ ] Build Projects page (`/projects`) showcasing development work
- [ ] Build About page (`/about`) with developer background and focus areas
- [ ] Build Uses page (`/uses`) detailing hardware, software, and tools
- [ ] Build Tag filtering route (`/tags/[tag]`) for navigable categorization
- [ ] Author realistic, high-quality sample Markdown articles
- [ ] Verify build, TypeScript checks, and responsive design across viewports

---

## Phase 2 — Reading Experience

- [ ] Table of contents for longer articles
- [ ] Reading progress indicator
- [ ] Code block copy button and language pill
- [ ] Related articles recommendation engine
- [ ] Previous / Next article navigation links
- [ ] Refined responsive image handling
- [ ] Auto-linked heading anchors

---

## Phase 3 — Discovery and SEO

- [ ] RSS feed generation (`/rss.xml`)
- [ ] Sitemap generation (`@astrojs/sitemap`)
- [ ] Fast client-side / static search
- [ ] Dedicated category filtering views
- [ ] Dynamic Open Graph preview cards
- [ ] Structured JSON-LD metadata for search engines
- [ ] `robots.txt` configuration

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
