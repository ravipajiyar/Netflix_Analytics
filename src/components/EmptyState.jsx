import { BarChart3 } from 'lucide-react';

const EmptyState = ({ message = 'No data available for this selection.' }) => {
  return (
    <div className="flex h-[280px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/10 bg-white/[0.015] px-6 text-center">
      <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-500">
        <BarChart3 size={18} />
      </span>
      <p className="max-w-xs text-xs leading-relaxed text-zinc-500">{message}</p>
    </div>
  );
};

export default EmptyState;
