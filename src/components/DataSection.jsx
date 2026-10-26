<<<<<<< HEAD
// src/components/DataSection.jsx
import React from 'react';

const DataSection = ({ title, data }) => {
    if(!data || data.length === 0){
        return <p> No Data to display </p>
    }
  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
                <thead>
                <tr>
                    {Object.keys(data[0]).map(key => (
                    <th key={key} className="border px-4 py-2">{key}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {Object.values(row).map((value, i) => (
                            <td key={i} className="border px-4 py-2">{value}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
          </div>
=======

const DataSection = ({ title, data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="card p-5">
        <h3 className="font-display text-base font-semibold text-white">{title}</h3>
        <p className="mt-3 text-sm text-zinc-500">No data to display.</p>
      </div>
    );
  }

  return (
    <div className="card p-5 sm:p-6">
      {title && <h3 className="mb-4 font-display text-base font-semibold text-white">{title}</h3>}
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, cellIndex) => (
                  <td key={cellIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
    </div>
  );
};

<<<<<<< HEAD
export default DataSection;
=======
export default DataSection;
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
