import { ChevronDown } from 'lucide-react';

const FilterSelect = ({ label, value, onChange, options, icon: Icon, ariaLabel }) => {
  return (
    <label className="group relative inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-3 pr-8 text-xs transition focus-within:border-brand-500/60 focus-within:ring-2 focus-within:ring-brand-500/20 hover:border-white/20">
      {Icon && <Icon size={14} className="text-zinc-500" />}
      {label && (
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          {label}
        </span>
      )}
      <select
        value={value}
        onChange={onChange}
        aria-label={ariaLabel || label || 'Filter'}
        className="cursor-pointer appearance-none bg-transparent pr-1 text-xs font-semibold text-white outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-ink-800 text-zinc-200">
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-2.5 text-zinc-500 transition group-hover:text-zinc-300"
      />
    </label>
  );
};

export default FilterSelect;
