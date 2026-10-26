<<<<<<< HEAD
// src/components/BarChart.jsx
import React from 'react';
import Plot from 'react-plotly.js';

const BarChart = ({ data, xKey, yKey, title, orientation = 'v', colorKey }) => {
    if (!data || data.length === 0) return <p>No data to display</p>;

   const xValues = data.map(item => item[xKey]);
    const yValues = data.map(item => item[yKey]);
   const colors = colorKey ? data.map((item) => {
       if (item[colorKey] === 'Positive') return '#10b981';
       else if (item[colorKey] === 'Negative') return '#ef4444';
       return '#3b82f6'
   }) : '#3b82f6';
=======
import Plot from 'react-plotly.js';
import EmptyState from './EmptyState';
import { CHART_COLORS, axis, baseLayout, chartConfig, sentimentColor } from './chartTheme';

const BarChart = ({
  data,
  xKey,
  yKey,
  orientation = 'v',
  colorKey,
  color,
  height = 320,
}) => {
  if (!data || data.length === 0) return <EmptyState />;

  const xValues = data.map((item) => item[xKey]);
  const yValues = data.map((item) => item[yKey]);

  const markerColor = colorKey
    ? data.map((item, index) => sentimentColor(item[colorKey]) || CHART_COLORS[index % CHART_COLORS.length])
    : color || '#e50914';

>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
  const chartData = [
    {
      x: orientation === 'v' ? xValues : yValues,
      y: orientation === 'v' ? yValues : xValues,
<<<<<<< HEAD
        type: 'bar',
      orientation: orientation,
        marker: {
        color: colors
      }
    },
  ];

  const layout = {
    title: title,
    xaxis: orientation === 'v' ? { title: xKey } : { title: yKey },
    yaxis: orientation === 'v' ? { title: yKey } : { title: xKey },
      margin: { l: 50, r: 50, t: 40, b: 50 },
    };

  return <Plot data={chartData} layout={layout} />;
};

export default BarChart;
=======
      type: 'bar',
      orientation,
      marker: {
        color: markerColor,
        line: { width: 0 },
        opacity: 0.92,
      },
      hovertemplate:
        orientation === 'v'
          ? '%{x}<br><b>%{y}</b><extra></extra>'
          : '<b>%{x}</b><br>%{y}<extra></extra>',
    },
  ];

  const horizontal = orientation === 'h';

  const layout = {
    ...baseLayout,
    height,
    margin: horizontal
      ? { l: 8, r: 16, t: 10, b: 36 }
      : { ...baseLayout.margin, t: 10, b: 48 },
    bargap: 0.45,
    xaxis: horizontal
      ? axis({
          title: { text: yKey, font: { size: 10, color: '#52525b' }, standoff: 8 },
          gridcolor: 'rgba(255,255,255,0.05)',
        })
      : axis({
          title: { text: xKey, font: { size: 10, color: '#52525b' }, standoff: 8 },
          tickangle: data.length > 8 ? -38 : 0,
          gridcolor: 'rgba(0,0,0,0)',
          showgrid: false,
        }),
    yaxis: horizontal
      ? axis({
          automargin: true,
          autorange: 'reversed',
          showgrid: false,
          tickfont: { size: 11, color: '#a1a1aa' },
        })
      : axis({
          title: { text: yKey, font: { size: 10, color: '#52525b' }, standoff: 8 },
          gridcolor: 'rgba(255,255,255,0.05)',
        }),
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

export default BarChart;
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
