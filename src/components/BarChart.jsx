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
  const chartData = [
    {
      x: orientation === 'v' ? xValues : yValues,
      y: orientation === 'v' ? yValues : xValues,
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