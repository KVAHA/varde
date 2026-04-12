# Varde Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static multi-page market intelligence website called Varde — a homepage listing reports and individual report pages for presenting analysis, charts, and tables.

**Architecture:** Pure HTML/CSS/JS with no build tools or framework. A shared stylesheet (`assets/style.css`) drives all visual design. Chart.js is loaded from CDN. Each report is its own HTML file in `reports/`. Adding a new report means creating one file and adding one card to the homepage.

**Tech Stack:** HTML5, CSS3, vanilla JS, Chart.js 4.x (CDN)

---

## File Map

| File | Purpose |
|---|---|
| `index.html` | Homepage — nav, hero, report cards grid, footer |
| `assets/style.css` | All shared styles — colors, nav, cards, report layout, tables |
| `assets/chart-helpers.js` | Chart.js helper functions pre-styled for Varde palette |
| `reports/nordic-energy-q2-2026.html` | Sample report demonstrating all content types |

---

## Task 1: Project Scaffold

**Files:**
- Create: `index.html`
- Create: `assets/style.css`
- Create: `assets/chart-helpers.js`
- Create: `reports/nordic-energy-q2-2026.html`

- [ ] **Step 1: Create the folder structure**

Open your terminal in the project folder (`C:\Users\hkval\Desktop\Claude Code Projects`) and run:

```bash
mkdir -p assets reports
touch index.html assets/style.css assets/chart-helpers.js reports/nordic-energy-q2-2026.html
```

- [ ] **Step 2: Verify folders exist**

Run:
```bash
ls -R
```

Expected output includes:
```
./assets:
chart-helpers.js  style.css

./reports:
nordic-energy-q2-2026.html

index.html
```

---

## Task 2: CSS Foundation

**Files:**
- Modify: `assets/style.css`

This task writes the complete shared stylesheet. All colors come from CSS variables at the top — easy to tweak later.

- [ ] **Step 1: Write the full stylesheet**

Paste this entire block into `assets/style.css`:

```css
/* ============================================================
   VARDE — Shared Stylesheet
   Deep Arctic color palette
   ============================================================ */

:root {
  --bg:      #0a0f1e;
  --panel:   #0d1b2e;
  --border:  #1e3a5f;
  --accent:  #4fc3f7;
  --muted:   #4a7fa5;
  --text:    #c9d8e8;
  --heading: #e8f0fe;
  --font:    'Segoe UI', system-ui, sans-serif;
}

/* --- Reset --- */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { background: var(--bg); color: var(--text); font-family: var(--font); min-height: 100vh; }
a { color: inherit; }

/* --- Nav --- */
.nav {
  background: var(--panel);
  border-bottom: 1px solid var(--border);
  padding: 14px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-brand { display: flex; align-items: baseline; gap: 10px; text-decoration: none; }
.nav-wordmark { font-size: 20px; font-weight: 700; color: var(--heading); letter-spacing: 3px; }
.nav-subtitle { font-size: 11px; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; }
.nav-right { font-size: 11px; color: var(--muted); }
.nav-back { font-size: 11px; color: var(--accent); text-decoration: none; }
.nav-back:hover { text-decoration: underline; }

/* --- Hero (homepage only) --- */
.hero {
  padding: 48px 32px 36px;
  border-bottom: 1px solid var(--border);
}
.hero-label {
  font-size: 11px; color: var(--accent);
  letter-spacing: 2px; text-transform: uppercase;
  margin-bottom: 12px;
}
.hero-title {
  font-size: 32px; font-weight: 700; color: var(--heading);
  line-height: 1.2; margin-bottom: 10px;
}
.hero-desc {
  font-size: 14px; color: var(--muted);
  max-width: 480px; line-height: 1.6;
}
.stats { display: flex; gap: 24px; margin-top: 28px; align-items: center; }
.stat { }
.stat-value { font-size: 24px; font-weight: 700; color: var(--accent); }
.stat-label { font-size: 10px; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; }
.stat-divider { width: 1px; height: 32px; background: var(--border); }

/* --- Report cards grid (homepage) --- */
.section { padding: 28px 32px; }
.section-label {
  font-size: 10px; color: var(--muted);
  letter-spacing: 2px; text-transform: uppercase;
  margin-bottom: 16px;
}
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 16px;
  text-decoration: none;
  display: block;
  transition: border-color 0.2s;
}
.card:hover { border-color: var(--accent); }
.card-tag {
  font-size: 9px; color: var(--accent);
  letter-spacing: 1px; text-transform: uppercase;
  margin-bottom: 8px;
}
.card-title {
  font-size: 14px; color: var(--heading);
  font-weight: 600; line-height: 1.4;
  margin-bottom: 10px;
}
.card-types { font-size: 10px; color: var(--muted); }
.card-footer {
  margin-top: 12px; padding-top: 12px;
  border-top: 1px solid var(--border);
  display: flex; justify-content: space-between; align-items: center;
}
.card-date { font-size: 10px; color: var(--muted); }
.card-link { font-size: 10px; color: var(--accent); }

/* --- Footer --- */
.footer {
  padding: 16px 32px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}
.footer-text { font-size: 10px; color: #2a4a6a; letter-spacing: 1px; }

/* --- Report page header --- */
.report-header {
  padding: 36px 32px 28px;
  border-bottom: 1px solid var(--border);
}
.tag-row { display: flex; gap: 8px; margin-bottom: 12px; }
.tag {
  font-size: 10px; padding: 3px 8px; border-radius: 3px;
  letter-spacing: 1px; border: 1px solid var(--border);
}
.tag-sector { color: var(--accent); background: #0d2a3e; }
.tag-period  { color: var(--muted);  background: var(--panel); }
.report-title {
  font-size: 26px; font-weight: 700;
  color: var(--heading); margin-bottom: 8px;
}
.report-meta { font-size: 12px; color: var(--muted); }

/* --- Report body layout --- */
.report-body {
  padding: 28px 32px;
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 28px;
  align-items: start;
}

/* --- Report content components --- */
.summary-block {
  background: var(--panel);
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  border-radius: 4px;
  padding: 14px 16px;
  margin-bottom: 28px;
}
.summary-label {
  font-size: 9px; color: var(--accent);
  letter-spacing: 2px; text-transform: uppercase;
  margin-bottom: 6px;
}
.summary-text { font-size: 13px; color: var(--text); line-height: 1.7; }

.content-block { margin-bottom: 28px; }
.content-label {
  font-size: 9px; color: var(--muted);
  letter-spacing: 2px; text-transform: uppercase;
  margin-bottom: 10px;
}
.chart-wrap {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 16px;
}
.chart-caption { font-size: 11px; color: var(--muted); margin-top: 8px; }

.body-text { font-size: 14px; color: var(--text); line-height: 1.8; margin-bottom: 24px; }

/* --- Data table --- */
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
}
.data-table th {
  text-align: left; color: var(--muted);
  padding: 10px 14px; font-weight: 400;
  border-bottom: 1px solid var(--border);
}
.data-table td {
  color: var(--text);
  padding: 9px 14px;
  border-bottom: 1px solid #111e2e;
}
.data-table tr:last-child td { border-bottom: none; }
.td-accent { color: var(--accent) !important; }

/* --- Sidebar panels --- */
.sidebar-panel {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 14px 16px;
  margin-bottom: 14px;
}
.sidebar-label {
  font-size: 9px; color: var(--muted);
  letter-spacing: 2px; text-transform: uppercase;
  margin-bottom: 10px;
}
.toc-list { list-style: none; }
.toc-list li { margin-bottom: 8px; }
.toc-list a { font-size: 12px; color: var(--muted); text-decoration: none; }
.toc-list a:hover { color: var(--accent); }
.related-list { list-style: none; }
.related-list li { margin-bottom: 8px; }
.related-list a { font-size: 12px; color: var(--accent); text-decoration: none; }
.related-list a:hover { text-decoration: underline; }
```

- [ ] **Step 2: No browser check yet** — the stylesheet needs an HTML file to load it. Continue to Task 3.

---

## Task 3: Homepage HTML

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Write the full homepage**

Paste this into `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Varde — Market Intelligence</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>

  <!-- Nav -->
  <nav class="nav">
    <a href="index.html" class="nav-brand">
      <span class="nav-wordmark">VARDE</span>
      <span class="nav-subtitle">Market Intelligence</span>
    </a>
    <span class="nav-right">April 2026</span>
  </nav>

  <!-- Hero -->
  <section class="hero">
    <div class="hero-label">Intelligence Reports</div>
    <h1 class="hero-title">Northern Market<br>Intelligence</h1>
    <p class="hero-desc">In-depth analysis of market trends, competitive landscapes, and strategic opportunities across key sectors.</p>
    <div class="stats">
      <div class="stat">
        <div class="stat-value">1</div>
        <div class="stat-label">Reports</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat">
        <div class="stat-value">1</div>
        <div class="stat-label">Sectors</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat">
        <div class="stat-value">2026</div>
        <div class="stat-label">Latest</div>
      </div>
    </div>
  </section>

  <!-- Report cards -->
  <section class="section">
    <div class="section-label">Latest Reports</div>
    <div class="cards-grid">

      <a href="reports/nordic-energy-q2-2026.html" class="card">
        <div class="card-tag">Energy · Q2 2026</div>
        <div class="card-title">Nordic Energy Market Analysis</div>
        <div class="card-types">Charts · Tables · Analysis</div>
        <div class="card-footer">
          <span class="card-date">Apr 12, 2026</span>
          <span class="card-link">View →</span>
        </div>
      </a>

    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <span class="footer-text">VARDE INTELLIGENCE</span>
    <span class="footer-text">2026</span>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Double-click `index.html` to open it in your browser (or right-click → Open with → Chrome/Edge).

Expected:
- Dark navy background fills the page
- "VARDE" wordmark top-left with "Market Intelligence" beside it
- Large heading "Northern Market Intelligence" in the hero
- One report card visible with "Nordic Energy Market Analysis"
- Minimal footer at the bottom

If the page is white or unstyled, check that `assets/style.css` exists and the path in the `<link>` tag is correct.

---

## Task 4: Report Page HTML

**Files:**
- Modify: `reports/nordic-energy-q2-2026.html`

- [ ] **Step 1: Write the report page**

Paste this into `reports/nordic-energy-q2-2026.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nordic Energy Market Analysis — Varde</title>
  <link rel="stylesheet" href="../assets/style.css">
</head>
<body>

  <!-- Nav -->
  <nav class="nav">
    <a href="../index.html" class="nav-brand">
      <span class="nav-wordmark">VARDE</span>
      <span class="nav-subtitle">Market Intelligence</span>
    </a>
    <a href="../index.html" class="nav-back">← All Reports</a>
  </nav>

  <!-- Report header -->
  <div class="report-header">
    <div class="tag-row">
      <span class="tag tag-sector">Energy</span>
      <span class="tag tag-period">Q2 2026</span>
    </div>
    <h1 class="report-title">Nordic Energy Market Analysis</h1>
    <div class="report-meta">Published April 12, 2026 · 8 min read</div>
  </div>

  <!-- Report body: main content + sidebar -->
  <div class="report-body">

    <!-- Main content -->
    <main>

      <!-- Executive summary -->
      <div class="summary-block">
        <div class="summary-label">Executive Summary</div>
        <p class="summary-text">
          Nordic energy markets showed strong resilience in Q2 2026, driven by renewable
          expansion and elevated cross-border demand. Key findings indicate a 14% year-on-year
          increase in offshore wind capacity, with Norway leading regional growth at 42.1 GW total
          installed capacity.
        </p>
      </div>

      <!-- Chart section -->
      <div class="content-block" id="capacity">
        <div class="content-label">Capacity Growth 2023–2026</div>
        <div class="chart-wrap">
          <canvas id="capacityChart" height="120"></canvas>
        </div>
        <div class="chart-caption">Installed renewable capacity in GW across the Nordic region.</div>
      </div>

      <!-- Data table -->
      <div class="content-block" id="comparison">
        <div class="content-label">Market Comparison</div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Country</th>
              <th>Capacity (GW)</th>
              <th>YoY Change</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Norway</td>
              <td>42.1</td>
              <td class="td-accent">+18%</td>
            </tr>
            <tr>
              <td>Sweden</td>
              <td>38.7</td>
              <td class="td-accent">+11%</td>
            </tr>
            <tr>
              <td>Denmark</td>
              <td>29.4</td>
              <td class="td-accent">+9%</td>
            </tr>
            <tr>
              <td>Finland</td>
              <td>18.2</td>
              <td class="td-accent">+7%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Analysis text -->
      <div class="content-block" id="analysis">
        <div class="content-label">Analysis</div>
        <p class="body-text">
          The Nordic region continues to outpace European averages in renewable energy transition.
          Norway's hydropower base provides a stable backbone while offshore wind expansion accelerates
          across Danish and Swedish waters. Cross-border grid interconnectivity remains a limiting
          factor for full market integration, though planned cable investments in 2027–2028 are
          expected to address this bottleneck.
        </p>
        <p class="body-text">
          Demand-side drivers include industrial electrification in Norway's aluminum sector and
          rapid data center buildout in Sweden, both contributing to sustained high baseload
          requirements through the forecast period.
        </p>
      </div>

    </main>

    <!-- Sidebar -->
    <aside>

      <div class="sidebar-panel">
        <div class="sidebar-label">Contents</div>
        <ul class="toc-list">
          <li><a href="#capacity">Capacity Growth</a></li>
          <li><a href="#comparison">Market Comparison</a></li>
          <li><a href="#analysis">Analysis</a></li>
        </ul>
      </div>

      <div class="sidebar-panel">
        <div class="sidebar-label">Related Reports</div>
        <ul class="related-list">
          <li><a href="#">Scandinavian SaaS →</a></li>
          <li><a href="#">Baltic Investment →</a></li>
        </ul>
      </div>

    </aside>

  </div>

  <!-- Chart.js from CDN -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <script src="../assets/chart-helpers.js"></script>
  <script>
    vardeBarChart(
      'capacityChart',
      ['2023', 'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025', 'Q1 2026', 'Q2 2026'],
      [88, 92, 95, 99, 103, 108, 114, 120, 128],
      'Total Capacity (GW)'
    );
  </script>

</body>
</html>
```

- [ ] **Step 2: Open in browser and verify the layout**

Open `reports/nordic-energy-q2-2026.html` directly in the browser.

Expected:
- Same dark nav, but right side shows "← All Reports" in blue
- Report title and sector/period tags visible in the header
- Main content area on the left with summary block (ice-blue left border), table, and analysis text
- Sidebar on the right with contents list and related reports
- Chart area visible but **empty** (chart-helpers.js is empty — that comes next)

---

## Task 5: Chart Helpers

**Files:**
- Modify: `assets/chart-helpers.js`

- [ ] **Step 1: Write the chart helper functions**

Paste this into `assets/chart-helpers.js`:

```js
// Varde chart helpers — pre-styled wrappers around Chart.js
// Usage: vardeBarChart(canvasId, labels, data, label)
//        vardeLineChart(canvasId, labels, datasets)
// datasets for line chart: [{ label: 'Series name', data: [1,2,3] }, ...]

const VARDE = {
  accent:    '#4fc3f7',
  accentBg:  'rgba(79, 195, 247, 0.15)',
  muted:     '#7a9bbf',
  grid:      '#1e2a40',
  label:     '#4a7fa5',
  font:      "'Segoe UI', system-ui, sans-serif",
};

function vardeBarChart(canvasId, labels, data, label) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label,
        data,
        backgroundColor: VARDE.accentBg,
        borderColor: VARDE.accent,
        borderWidth: 1,
        borderRadius: 2,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: VARDE.label, font: { family: VARDE.font, size: 11 } }
        }
      },
      scales: {
        x: {
          ticks: { color: VARDE.label, font: { family: VARDE.font } },
          grid:  { color: VARDE.grid }
        },
        y: {
          ticks: { color: VARDE.label, font: { family: VARDE.font } },
          grid:  { color: VARDE.grid }
        }
      }
    }
  });
}

function vardeLineChart(canvasId, labels, datasets) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  const colors = [VARDE.accent, VARDE.muted, '#a0c8e8'];
  const styledDatasets = datasets.map((ds, i) => ({
    ...ds,
    borderColor:      colors[i] || VARDE.muted,
    backgroundColor:  'transparent',
    tension:          0.3,
    pointRadius:      3,
    pointBackgroundColor: colors[i] || VARDE.muted,
  }));
  return new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: styledDatasets },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: VARDE.label, font: { family: VARDE.font, size: 11 } }
        }
      },
      scales: {
        x: {
          ticks: { color: VARDE.label, font: { family: VARDE.font } },
          grid:  { color: VARDE.grid }
        },
        y: {
          ticks: { color: VARDE.label, font: { family: VARDE.font } },
          grid:  { color: VARDE.grid }
        }
      }
    }
  });
}
```

- [ ] **Step 2: Reload the report page in your browser**

Reload `reports/nordic-energy-q2-2026.html`.

Expected:
- A bar chart now appears in the "Capacity Growth" section showing 9 bars growing from left to right
- Bars are semi-transparent blue with an ice-blue border
- Axis labels are in muted blue to match the palette

If the chart doesn't appear: make sure you're loading the file in a browser (not a code editor preview), and that you have an internet connection for the Chart.js CDN.

---

## Task 6: Wire Up and Final Check

**Files:**
- Modify: `index.html` (stats numbers already correct for 1 report)

- [ ] **Step 1: Test the homepage → report link**

Open `index.html` in the browser. Click the "Nordic Energy Market Analysis" card.

Expected: the report page opens correctly.

- [ ] **Step 2: Test the back link**

On the report page, click "← All Reports".

Expected: returns to the homepage.

- [ ] **Step 3: Final visual check — homepage**

On the homepage, verify:
- [ ] Navy background, no white flash
- [ ] VARDE wordmark uppercase with letter-spacing
- [ ] Hero section with stats row (1 / 1 / 2026)
- [ ] One report card with hover effect (border turns blue when you hover)
- [ ] Minimal footer at bottom

- [ ] **Step 4: Final visual check — report page**

On the report page, verify:
- [ ] "← All Reports" link top right
- [ ] Sector and period tags under the nav
- [ ] Executive Summary block with ice-blue left border
- [ ] Bar chart with Varde colors
- [ ] Table with muted borders and blue percentage values
- [ ] Two-column layout: content left, sidebar right
- [ ] Sidebar shows table of contents and related reports

---

## How to Add Future Reports

When you have new market intelligence results to publish:

1. Copy `reports/nordic-energy-q2-2026.html` and rename it (e.g. `reports/saas-q3-2026.html`)
2. Update the title, tags, summary, content, and chart data inside the new file
3. Add a new `<a href="..." class="card">` block to the cards grid in `index.html`
4. Update the stats numbers in the hero section of `index.html`

No installs, no build step, no server needed. Just open the HTML files in a browser.
