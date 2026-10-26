import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Bell, CalendarDays, Command, Menu, Search } from 'lucide-react';
import { navItems } from '../navItems';

const Topbar = ({ onMenu = () => {} }) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = navItems.find((item) => item.to === location.pathname) ?? navItems[0];
  const today = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return navItems;
    return navItems.filter((item) => item.label.toLowerCase().includes(needle));
  }, [query]);

  useEffect(() => {
    setOpen(false);
    setQuery('');
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (event.key === 'Escape') {
        setOpen(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleShortcut);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleShortcut);
    };
  }, []);

  const goTo = (path) => {
    navigate(path);
    setOpen(false);
    setQuery('');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-ink-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1560px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenu}
          aria-label="Open navigation"
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-zinc-300 transition hover:bg-white/5 hover:text-white lg:hidden"
        >
          <Menu size={18} />
        </button>

        <div className="hidden min-w-0 items-center gap-2 text-xs sm:flex">
          <span className="font-medium text-zinc-500">Netflix Analytics</span>
          <span className="text-zinc-700">/</span>
          <span className="truncate font-semibold text-zinc-200">{currentPage.label}</span>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div ref={searchRef} className="relative">
            <div
              className={`flex items-center gap-2 rounded-xl border bg-white/[0.04] px-3 py-2 text-sm transition ${
                open
                  ? 'border-brand-500/60 ring-2 ring-brand-500/20'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <Search size={15} className="shrink-0 text-zinc-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && results[0]) goTo(results[0].to);
                }}
                placeholder="Search dashboard"
                aria-label="Search dashboard"
                className="w-28 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600 sm:w-44"
              />
              <kbd className="hidden items-center gap-0.5 rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 sm:flex">
                <Command size={9} />K
              </kbd>
            </div>

            {open && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-72 overflow-hidden rounded-xl border border-white/10 bg-ink-850/95 p-1.5 shadow-card backdrop-blur-2xl animate-fade-in">
                <p className="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
                  {query ? 'Results' : 'Jump to'}
                </p>
                {results.length === 0 ? (
                  <p className="px-2.5 py-3 text-xs text-zinc-500">No matching views.</p>
                ) : (
                  results.map(({ to, label, icon: Icon }) => (
                    <button
                      key={to}
                      type="button"
                      onClick={() => goTo(to)}
                      className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
                    >
                      <Icon size={15} className="text-zinc-500" />
                      <span>{label}</span>
                      <ArrowRight size={13} className="ml-auto text-zinc-600" />
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <span className="hidden items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-2 text-[11px] font-medium text-zinc-400 md:flex">
            <CalendarDays size={13} className="text-zinc-500" />
            {today}
          </span>

          <button
            type="button"
            aria-label="Notifications"
            className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/10 text-zinc-400 transition hover:bg-white/5 hover:text-white"
          >
            <Bell size={16} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand-soft ring-2 ring-ink-950" />
          </button>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-1 pl-1 pr-2.5">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-brand-gradient text-[10px] font-bold text-white">
              RA
            </div>
            <div className="hidden leading-tight sm:block">
              <p className="text-[11px] font-semibold text-white">Ravi</p>
              <p className="text-[9px] uppercase tracking-wider text-zinc-500">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
