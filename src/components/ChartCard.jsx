// src/components/ChartCard.jsx
import React from 'react';

const ChartCard = ({ title, children, className = 'mb-4' }) => {
  return (
    <div className={`bg-white shadow rounded p-4 ${className}`}>
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {children}
    </div>
  );
};

export default ChartCard;