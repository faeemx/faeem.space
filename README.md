# faeem.space

Personal notebook, essays, and creative tools built with [Astro](https://astro.build), TypeScript, and Tailwind CSS.

## Overview

- **Author:** Faeem
- **Domain:** [https://faeem.space](https://faeem.space)
- **Theme:** Warm, editorial paper aesthetic (Light mode by default with optional Dark mode)
- **Stack:** Astro (Static Site Generation), Tailwind CSS v4, Content Collections, Shiki syntax highlighting

## Project Structure

```text
src/
├── components/          # Reusable UI components (Header, Footer, Search, ThemeToggle, etc.)
├── content/             # Personal essays & writings
│   └── blog/
├── layouts/             # BaseLayout and BlogLayout
├── pages/               # File-based routes (/blog, /projects, /about, /uses, /tags, /category)
├── styles/              # Global CSS & editorial typography
└── utils/               # Reading time, posts, and tags helpers
```

## Development Commands

```bash
# Start background development server
astro dev --background

# Check server status / stop
astro dev status
astro dev stop

# Typecheck and validate content
npx astro check

# Build production static site to dist/
npm run build
```
