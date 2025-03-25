// src/components/LineChart.jsx
import React from 'react';
import Plot from 'react-plotly.js';

const LineChart = ({ data, xKey, yKey, title, colorKey }) => {

    if (!data || data.length === 0) return <p>No data to display</p>;


  const uniqueColors = [...new Set(data.map(item => item[colorKey]))];

  const traces = uniqueColors.map((colorValue, index) => {

    const filteredData = data.filter(item => item[colorKey] === colorValue);

      const xValues = filteredData.map(item => item[xKey]);
    const yValues = filteredData.map(item => item[yKey]);

    return {
          x: xValues,
          y: yValues,
          mode: 'lines+markers',
        type: 'scatter',
        name: colorValue,
        line: {
                color: ['#3b82f6', '#10b981', '#ef4444'][index % 3]
              }
        };
    });


    const layout = {
      title: title,
      xaxis: { title: xKey },
      yaxis: { title: yKey },
      margin: { l: 50, r: 50, t: 40, b: 50 },
    };


  return <Plot data={traces} layout={layout} />;
};

export default LineChart;