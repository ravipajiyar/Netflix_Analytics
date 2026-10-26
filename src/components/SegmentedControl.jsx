
const SegmentedControl = ({ options, value, onChange, ariaLabel }) => {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel || 'View options'}
      className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1"
    >
      {options.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              active
                ? 'bg-brand-gradient text-white shadow-[0_8px_24px_-10px_rgba(229,9,20,0.9)]'
                : 'text-zinc-400 hover:bg-white/[0.06] hover:text-white'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControl;
