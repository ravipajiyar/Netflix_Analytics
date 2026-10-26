
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
    </div>
  );
};

export default DataSection;
