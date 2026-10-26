<<<<<<< HEAD
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

=======

const YearSlider = ({ minYear, maxYear, value, onChange }) => {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <label
          htmlFor="year-slider"
          className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500"
        >
          Release year
        </label>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-semibold text-white">
          {value ?? minYear}
        </span>
      </div>
      <input
        type="range"
        id="year-slider"
        min={minYear}
        max={maxYear}
        value={value ?? minYear}
        onChange={(event) => onChange(parseInt(event.target.value, 10))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-brand"
      />
      <div className="mt-1.5 flex justify-between text-[10px] text-zinc-600">
        <span>{minYear}</span>
        <span>{maxYear}</span>
      </div>
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
    </div>
  );
};

<<<<<<< HEAD
export default YearSlider;
=======
export default YearSlider;
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
