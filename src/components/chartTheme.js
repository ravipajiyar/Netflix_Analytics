export const CHART_COLORS = [
  '#e50914',
  '#fb7185',
  '#a78bfa',
  '#22d3ee',
  '#34d399',
  '#f59e0b',
  '#f472b6',
];

const AXIS = {
  color: '#71717a',
  gridcolor: 'rgba(255,255,255,0.06)',
  zeroline: false,
  linecolor: 'rgba(255,255,255,0.08)',
  tickfont: { size: 11, color: '#71717a' },
};

export const baseLayout = {
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
  font: { family: 'Inter, system-ui, sans-serif', size: 12, color: '#a1a1aa' },
  margin: { l: 46, r: 14, t: 12, b: 42 },
  hoverlabel: {
    bgcolor: '#18181b',
    bordercolor: 'rgba(255,255,255,0.12)',
    font: { color: '#e4e4e7', size: 12 },
  },
  legend: {
    orientation: 'h',
    x: 0,
    y: 1.14,
    font: { size: 11, color: '#a1a1aa' },
    bgcolor: 'rgba(0,0,0,0)',
  },
  autosize: true,
  showlegend: false,
};

export const chartConfig = {
  displayModeBar: false,
  responsive: true,
  displaylogo: false,
};

export const axis = (overrides = {}) => ({ ...AXIS, ...overrides });

export const sentimentColor = (value) => {
  const label = String(value ?? '').toLowerCase();
  if (label.includes('positive')) return '#34d399';
  if (label.includes('negative')) return '#fb7185';
  if (label.includes('neutral')) return '#f59e0b';
  return null;
};

export const hexToRgba = (hex, alpha = 0.1) => {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
