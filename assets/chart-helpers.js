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
  const el = document.getElementById(canvasId);
  if (!el) { console.error('vardeBarChart: canvas not found:', canvasId); return; }
  const ctx = el.getContext('2d');
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
  const el = document.getElementById(canvasId);
  if (!el) { console.error('vardeLineChart: canvas not found:', canvasId); return; }
  const ctx = el.getContext('2d');
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
