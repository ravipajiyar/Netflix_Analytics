import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

const tones = {
  red: {
    tile: 'border-brand-500/25 bg-brand-500/15 text-brand-300',
    glow: 'from-brand-500/30',
    dot: 'bg-brand',
  },
  violet: {
    tile: 'border-violet-500/25 bg-violet-500/15 text-violet-300',
    glow: 'from-violet-500/25',
    dot: 'bg-violet-400',
  },
  cyan: {
    tile: 'border-cyan-500/25 bg-cyan-500/15 text-cyan-300',
    glow: 'from-cyan-500/25',
    dot: 'bg-cyan-400',
  },
  emerald: {
    tile: 'border-emerald-500/25 bg-emerald-500/15 text-emerald-300',
    glow: 'from-emerald-500/25',
    dot: 'bg-emerald-400',
  },
  amber: {
    tile: 'border-amber-500/25 bg-amber-500/15 text-amber-300',
    glow: 'from-amber-500/25',
    dot: 'bg-amber-400',
  },
};

const trends = {
  up: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
  down: 'border-rose-500/20 bg-rose-500/10 text-rose-300',
  neutral: 'border-white/10 bg-white/[0.04] text-zinc-400',
};

const StatCard = ({
  label,
  value,
  sublabel,
  icon: Icon,
  trend,
  trendTone = 'up',
  tone = 'red',
  index = 0,
}) => {
  const theme = tones[tone] ?? tones.red;

  return (
    <div
      className="card card-hover animate-fade-up p-5"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div
        className={`pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${theme.glow} via-transparent to-transparent blur-2xl`}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            {label}
          </p>
          <p className="mt-3 truncate font-display text-[1.75rem] font-extrabold tracking-tight text-white">
            {value ?? '—'}
          </p>
        </div>
        {Icon && (
          <span className={`icon-tile shrink-0 ${theme.tile}`}>
            <Icon size={18} />
          </span>
        )}
      </div>

      <div className="relative mt-4 flex items-center gap-2">
        {trend && (
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
              trends[trendTone] ?? trends.up
            }`}
          >
            {trendTone === 'down' ? <ArrowDownRight size={11} /> : <ArrowUpRight size={11} />}
            {trend}
          </span>
        )}
        {sublabel && <p className="truncate text-xs text-zinc-500">{sublabel}</p>}
      </div>
    </div>
  );
};

export default StatCard;
