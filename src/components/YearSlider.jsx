// src/components/YearSlider.jsx

import React from 'react';

const YearSlider = ({ minYear, maxYear, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="year-slider" className="block text-gray-700 font-medium mb-1">
        Select Release Year Range:
      </label>
      <div className="flex items-center">
        <input
          type="range"
          id="year-slider"
          min={minYear}
          max={maxYear}
          defaultValue={minYear}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="mr-2 flex-1"
        />
        <span className="text-gray-700">{minYear} - {maxYear}</span>
      </div>

    </div>
  );
};

export default YearSlider;