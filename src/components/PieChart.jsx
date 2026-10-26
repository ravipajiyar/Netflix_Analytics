import Plot from 'react-plotly.js';
import EmptyState from './EmptyState';
import { CHART_COLORS, baseLayout, chartConfig, sentimentColor } from './chartTheme';

const PieChart = ({
  data,
  title,
  xKey = 'M_rating',
  yKey = 'counts',
  height = 320,
  hole = 0.6,
}) => {
  if (!data || data.length === 0) return <EmptyState />;

  const labels = data.map((item) => item[xKey]);
  const values = data.map((item) => item[yKey]);
  const colors = labels.map(
    (label, index) => sentimentColor(label) || CHART_COLORS[index % CHART_COLORS.length]
  );

  const chartData = [
    {
      values,
      labels,
      type: 'pie',
      hole,
      sort: false,
      direction: 'clockwise',
      marker: {
        colors,
        line: { color: '#0b0b11', width: 2 },
      },
      textinfo: 'percent',
      textfont: { size: 11, color: '#ffffff' },
      hovertemplate: '<b>%{label}</b><br>%{value} · %{percent}<extra></extra>',
      automargin: true,
    },
  ];

  const layout = {
    ...baseLayout,
    title: title ? { text: title, font: { size: 12, color: '#a1a1aa' } } : undefined,
    height,
    margin: { l: 8, r: 8, t: title ? 28 : 6, b: 8 },
    showlegend: true,
    legend: {
      orientation: 'h',
      x: 0.5,
      xanchor: 'center',
      y: -0.08,
      font: { size: 11, color: '#a1a1aa' },
      bgcolor: 'rgba(0,0,0,0)',
    },
  };

  return (
    <Plot
      data={chartData}
      layout={layout}
      config={chartConfig}
      useResizeHandler
      style={{ width: '100%', height }}
    />
  );
};

export default PieChart;
