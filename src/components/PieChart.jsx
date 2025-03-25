// src/components/PieChart.jsx

import React from 'react';
import Plot from 'react-plotly.js';

const PieChart = ({ data, title }) => {
  if (!data || data.length === 0) return <p>No data to display</p>;

    const labels = data.map(item => item.M_rating);
    const values = data.map(item => item.counts);

  const chartData = [
    {
      values: values,
      labels: labels,
      type: 'pie',
    },
  ];

  const layout = {
    title: title,
    margin: { l: 20, r: 20, t: 40, b: 20 },
  };

  return (
      <Plot data={chartData} layout={layout} />
  );
};

export default PieChart;