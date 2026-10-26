import { CHART_COLORS } from './chartTheme';

const ProgressList = ({ items = [], className = '' }) => {
  if (!items.length) {
    return <p className="py-6 text-sm text-zinc-500">No data to display.</p>;
  }

  return (
    <ul className={`space-y-4 ${className}`}>
      {items.map((item, index) => {
        const color = item.color || CHART_COLORS[index % CHART_COLORS.length];
        const rawValue = Number(item.value) || 0;
        const percentage = item.max
          ? Math.min(100, Math.max(0, (rawValue / Number(item.max)) * 100))
          : Math.min(100, Math.max(0, rawValue));

        return (
          <li key={`${item.label}-${index}`}>
            <div className="flex items-center justify-between gap-3">
              <span className="flex min-w-0 items-center gap-2 text-sm text-zinc-300">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="truncate">{item.label}</span>
              </span>
              <span className="shrink-0 text-xs font-semibold text-white">
                {item.display ?? item.value}
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${percentage}%`,
                  background: `linear-gradient(90deg, ${color}, ${color}99)`,
                  boxShadow: `0 0 12px ${color}55`,
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ProgressList;
