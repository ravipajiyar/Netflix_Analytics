import Plot from 'react-plotly.js';
import EmptyState from './EmptyState';
import { CHART_COLORS, axis, baseLayout, chartConfig } from './chartTheme';

const GroupedBarChart = ({
  data,
  xKey,
  series = [],
  barmode = 'group',
  height = 320,
}) => {
  if (!data || data.length === 0 || series.length === 0) return <EmptyState />;

  const traces = series.map((entry, index) => ({
    x: data.map((item) => item[xKey]),
    y: data.map((item) => item[entry.key]),
    name: entry.name || entry.key,
    type: 'bar',
    marker: {
      color: entry.color || CHART_COLORS[index % CHART_COLORS.length],
      line: { width: 0 },
      opacity: 0.92,
    },
    hovertemplate: `<b>%{x}</b><br>${entry.name || entry.key}: %{y}<extra></extra>`,
  }));

  const layout = {
    ...baseLayout,
    height,
    barmode,
    bargap: 0.35,
    bargroupgap: 0.08,
    showlegend: true,
    legend: {
      orientation: 'h',
      x: 0,
      y: 1.15,
      font: { size: 11, color: '#a1a1aa' },
      bgcolor: 'rgba(0,0,0,0)',
    },
    margin: { ...baseLayout.margin, t: 34, b: 42 },
    xaxis: axis({
      showgrid: false,
      tickangle: data.length > 10 ? -38 : 0,
      title: { text: xKey, font: { size: 10, color: '#52525b' }, standoff: 8 },
    }),
    yaxis: axis({
      title: { text: 'Titles', font: { size: 10, color: '#52525b' }, standoff: 8 },
    }),
  };

  return (
    <Plot
      data={traces}
      layout={layout}
      config={chartConfig}
      useResizeHandler
      style={{ width: '100%', height }}
    />
  );
};

export default GroupedBarChart;
