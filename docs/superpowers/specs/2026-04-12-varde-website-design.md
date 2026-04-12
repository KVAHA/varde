# Varde — Market Intelligence Website Design

**Date:** 2026-04-12
**Status:** Approved

---

## Overview

A personal market intelligence website named **Varde** (Norwegian for cairn — a stone landmark used for navigation). Built to present market research results in a professional, elegant format. Designed for personal use now, with public sharing as a future goal.

---

## Structure

**Multi-page site:** A homepage listing all reports, each report opening its own dedicated page.

- `index.html` — Homepage / report index
- `reports/report-name.html` — One file per report
- `assets/style.css` — Shared stylesheet
- `assets/chart-helpers.js` — Optional chart utilities

No framework. Pure HTML, CSS, and JavaScript. Charts via Chart.js loaded from CDN.

---

## Visual Design

### Color Palette (Deep Arctic)

| Role | Value |
|---|---|
| Page background | `#0a0f1e` |
| Card / panel background | `#0d1b2e` |
| Border | `#1e3a5f` |
| Accent (ice blue) | `#4fc3f7` |
| Muted text / labels | `#4a7fa5` |
| Body text | `#c9d8e8` |
| Headings | `#e8f0fe` |

### Typography
- Font: system sans-serif (`'Segoe UI', sans-serif`)
- Brand name: uppercase, letter-spacing 3px, bold
- Section labels: uppercase, letter-spacing 2px, muted blue, small

### Tone
Cold, precise, authoritative. Minimal decoration. Data first.

---

## Homepage (`index.html`)

### Nav
- Left: `VARDE` wordmark + `Market Intelligence` subtitle
- Right: current date or last updated date

### Hero Section
- Small label: `Intelligence Reports`
- Large headline: e.g. `Northern Market Intelligence`
- Short description (1–2 sentences)
- Stats row: total report count · sector count · latest year

### Report Cards Grid
- 3-column grid, each card contains:
  - Sector tag + period (e.g. `ENERGY · Q2 2026`)
  - Report title
  - Content types (e.g. `Charts · Tables · Analysis`)
  - Publish date
  - `View →` link
- Cards link to their respective report page

### Footer
- Brand name left, year right. Minimal.

---

## Report Page (`reports/*.html`)

### Nav
- Same as homepage
- Right side: `← All Reports` back link (replaces date)

### Report Header
- Sector tag pill + period pill
- Report title (large)
- Publish date + estimated read time

### Content Layout
Two-column: main content area (wider) + right sidebar (narrower)

**Main content** (flexible, author fills in per report):
- Executive Summary block — highlighted left border, standout style
- Chart sections — Chart.js canvas elements with captions
- Data tables — styled with alternating row borders, colored metrics
- Analysis text — body paragraphs

**Sidebar:**
- Table of contents (links to sections within the page)
- Related reports list (manual links to other report pages)

---

## Content Types Supported

| Type | Implementation |
|---|---|
| Text / analysis | HTML paragraphs |
| Charts | Chart.js (bar, line, pie) via CDN |
| Tables | Styled HTML `<table>` |
| Summary callout | Special styled `<div>` with left border accent |

---

## Scalability Notes

- Adding a new report = create a new `reports/name.html` and add a card to `index.html`
- No database, no build step, no server required — plain files work
- When going public, can be hosted on GitHub Pages, Netlify, or any static host
- Chart.js loaded from CDN — no install needed

---

## Out of Scope (for now)

- Search or filtering on the homepage
- Authentication / password protection
- Dark/light mode toggle
- CMS or admin interface
- Mobile-specific layout (will be readable, not optimized)
