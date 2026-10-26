import Plot from 'react-plotly.js';
import EmptyState from './EmptyState';
import {
  CHART_COLORS,
  axis,
  baseLayout,
  chartConfig,
  hexToRgba,
  sentimentColor,
} from './chartTheme';

const sortRows = (rows, key) =>
  [...rows].sort((a, b) => {
    const aNum = Number(a[key]);
    const bNum = Number(b[key]);
    if (Number.isFinite(aNum) && Number.isFinite(bNum)) return aNum - bNum;
    return String(a[key]).localeCompare(String(b[key]));
  });

const LineChart = ({ data, xKey, yKey, colorKey, height = 320 }) => {
  if (!data || data.length === 0) return <EmptyState />;

  const groups = colorKey
    ? [...new Set(data.map((item) => item[colorKey]))]
    : ['series'];

  const traces = groups.map((groupValue, index) => {
    const rows = sortRows(
      colorKey ? data.filter((item) => item[colorKey] === groupValue) : data,
      xKey
    );
    const lineColor =
      sentimentColor(groupValue) || CHART_COLORS[index % CHART_COLORS.length];

    return {
      x: rows.map((item) => item[xKey]),
      y: rows.map((item) => item[yKey]),
      mode: 'lines+markers',
      type: 'scatter',
      name: colorKey ? String(groupValue) : yKey,
      line: { color: lineColor, width: 3, shape: 'spline', smoothing: 0.8 },
      marker: {
        size: 6,
        color: '#0b0b11',
        line: { color: lineColor, width: 2 },
      },
      fill: 'tozeroy',
      fillcolor: hexToRgba(lineColor, 0.07),
      hovertemplate: `${xKey}: %{x}<br><b>${yKey}: %{y}</b><extra></extra>`,
    };
  });

  const layout = {
    ...baseLayout,
    height,
    showlegend: Boolean(colorKey) && groups.length > 1,
    margin: { ...baseLayout.margin, t: colorKey && groups.length > 1 ? 34 : 12 },
    xaxis: axis({
      title: { text: xKey, font: { size: 10, color: '#52525b' }, standoff: 8 },
      showgrid: false,
      ticks: 'outside',
      tickcolor: 'rgba(255,255,255,0.1)',
    }),
    yaxis: axis({
      title: { text: yKey, font: { size: 10, color: '#52525b' }, standoff: 8 },
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

export default LineChart;
