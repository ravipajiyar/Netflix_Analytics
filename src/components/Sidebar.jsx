import { NavLink } from 'react-router-dom';
import { Activity, ChevronRight, Play, Sparkles, X } from 'lucide-react';
import { navSections } from '../navItems';

const Sidebar = ({ open = false, onClose = () => {} }) => {
  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col border-r border-white/[0.06] bg-ink-900/95 backdrop-blur-2xl transition-transform duration-300 ease-out lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 pt-6">
          <NavLink to="/" onClick={onClose} className="group flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient shadow-glow-red transition-transform duration-300 group-hover:scale-105">
              <Play size={17} fill="currentColor" className="text-white" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[15px] font-extrabold tracking-[0.22em] text-white">
                NETFLIX
              </span>
              <span className="mt-1.5 block text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-500">
                Analytics
              </span>
            </span>
          </NavLink>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-zinc-400 transition hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="mt-8 flex-1 overflow-y-auto px-3 pb-4">
          {navSections.map((section) => (
            <div key={section.label} className="mb-6">
              <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-600">
                {section.label}
              </p>
              <div className="space-y-1">
                {section.items.map(({ to, label, icon: Icon, disabled }) =>
                  disabled ? (
                    <div
                      key={label}
                      className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-600"
                    >
                      <Icon size={18} className="text-zinc-700" />
                      <span>{label}</span>
                      <span className="ml-auto rounded-full border border-white/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                        Soon
                      </span>
                    </div>
                  ) : (
                    <NavLink
                      key={to}
                      to={to}
                      end={to === '/'}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                          isActive
                            ? 'bg-white/[0.06] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                            : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-brand shadow-[0_0_18px_rgba(229,9,20,0.9)]" />
                          )}
                          <Icon
                            size={18}
                            className={
                              isActive
                                ? 'text-brand-soft'
                                : 'text-zinc-500 transition group-hover:text-zinc-300'
                            }
                          />
                          <span>{label}</span>
                          <ChevronRight
                            size={14}
                            className={`ml-auto transition ${
                              isActive
                                ? 'text-zinc-500'
                                : 'text-zinc-600 opacity-0 group-hover:opacity-100'
                            }`}
                          />
                        </>
                      )}
                    </NavLink>
                  )
                )}
              </div>
            </div>
          ))}
        </nav>

        <div className="space-y-4 px-3 pb-5">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-brand-600/25 via-ink-800 to-ink-800 p-4">
            <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-brand/30 blur-2xl" />
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-200">
              <Sparkles size={13} /> Insight engine
            </div>
            <p className="mt-2 font-display text-sm font-semibold text-white">Live data sync</p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-400">
              Catalog metrics refresh automatically from the analytics API.
            </p>
            <div className="mt-3 flex items-center gap-2 text-[11px] font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              All systems operational
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-gradient text-[11px] font-bold text-white">
              RA
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">Ravi Admin</p>
              <p className="truncate text-[11px] text-zinc-500">Data analyst</p>
            </div>
            <Activity size={15} className="ml-auto text-zinc-500" />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
