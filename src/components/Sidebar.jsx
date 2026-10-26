<<<<<<< HEAD
import React, { useState, createContext, useContext, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const DashboardContext = createContext();

const Sidebar = ({ children }) => {
    const [selectedCountries, setSelectedCountries] = useState(['Nepal', 'Indonesia']);
    const [startDate, setStartDate] = useState('2021/01/20');
    const [endDate, setEndDate] = useState('2023/03/09');
     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const dropdownRef = useRef(null);

    const handleCountrySelect = (country) => {
        if (!selectedCountries.includes(country)) {
            setSelectedCountries([...selectedCountries, country]);
        }
         setIsDropdownOpen(false);
    };

    const handleRemoveCountry = (countryToRemove) => {
        setSelectedCountries(selectedCountries.filter(country => country !== countryToRemove))
    }

     const contextValue = {
        selectedCountries,
          startDate,
          endDate,
           handleCountrySelect,
           handleRemoveCountry,
           setStartDate,
           setEndDate
    };

     const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
    const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
        }
    };
    useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    }, []);


  return (
     <DashboardContext.Provider value={contextValue}>
       <aside className="bg-gray-800 text-white w-64 p-4">
          <nav>
            <NavLink to="/" exact className="block py-2 px-4 hover:bg-gray-700 rounded" activeClassName="bg-gray-700">
              Home
            </NavLink>
            <NavLink to="/directors" className="block py-2 px-4 hover:bg-gray-700 rounded" activeClassName="bg-gray-700">
              Directors
            </NavLink>
            <NavLink to="/actors" className="block py-2 px-4 hover:bg-gray-700 rounded" activeClassName="bg-gray-700">
              Actors
            </NavLink>
               <NavLink to="/content-trend" className="block py-2 px-4 hover:bg-gray-700 rounded" activeClassName="bg-gray-700">
                 Content
            </NavLink>
            <NavLink to="/genre-analysis" className="block py-2 px-4 hover:bg-gray-700 rounded" activeClassName="bg-gray-700">
              Genres
            </NavLink>
               <NavLink to="/sentiment-analysis" className="block py-2 px-4 hover:bg-gray-700 rounded" activeClassName="bg-gray-700">
               Sentiment
              </NavLink>
            <NavLink to="/duration-analysis" className="block py-2 px-4 hover:bg-gray-700 rounded" activeClassName="bg-gray-700">
              Duration
            </NavLink>
              <NavLink to="/reports" className="block py-2 px-4 hover:bg-gray-700 rounded" activeClassName="bg-gray-700">
               Reports
              </NavLink>
               {/* <NavLink to="/map" className="block py-2 px-4 hover:bg-gray-700 rounded" activeClassName="bg-gray-700">
                Map
            </NavLink> */}
          </nav>
             {/* <div className="sidebar-separator" > </div>
             <div className="mt-4">
                 <h3 className="text-lg font-semibold mb-2">Customize the Dashboard</h3>
                    <div className="mb-4">
                      <label htmlFor="country-select" className="block text-gray-300 font-medium mb-1">Select countries</label>
                           <div className="flex flex-wrap items-center mb-2">
                           {selectedCountries.map(country => (
                                 <span key={country} className="bg-red-200 text-red-800 px-2 py-1 rounded mr-1 mb-1 flex items-center">
                                     {country}
                                      <button onClick={()=> handleRemoveCountry(country)} className="ml-1 text-red-600 text-xs"> x</button>
                                 </span>
                           ))}
                                <div className="relative inline-block text-left">
                                        <button type="button" className="bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-100 focus:outline-none flex items-center"
                                             onClick={toggleDropdown}  >
                                          <span className="text-sm mr-1">  </span>
                                              <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                     </button>
                                       <div
                                       ref={dropdownRef}
                                         className={` origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${isDropdownOpen ? '' : 'hidden'}`}
                                           role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
                                                 <div className="py-1" role="none">
                                                   <button onClick={()=> handleCountrySelect('Nepal')} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" > Nepal</button>
                                                   <button onClick={()=> handleCountrySelect('Indonesia')} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" > Indonesia</button>
                                                     <button onClick={()=> handleCountrySelect('India')} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" >India</button>
                                                  <button onClick={()=> handleCountrySelect('China')} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">China</button>
                                                      <button onClick={()=> handleCountrySelect('United States')} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">United States</button>
                                                  <button onClick={()=> handleCountrySelect('Canada')} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">Canada</button>
                                                    <button onClick={()=> handleCountrySelect('Brazil')} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">Brazil</button>
                                                    <button onClick={()=> handleCountrySelect('UK')} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">UK</button>
                                                    <button onClick={()=> handleCountrySelect('France')} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">France</button>
                                                   <button onClick={()=> handleCountrySelect('Germany')} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">Germany</button>
                                                   <button onClick={()=> handleCountrySelect('Japan')} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">Japan</button>
                                                   <button onClick={()=> handleCountrySelect('Australia')} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">Australia</button>

                                           </div>
                                    </div>
                              </div>

                       </div>

                       <div className="mb-2">
                            <label htmlFor="start-date" className="block text-gray-300 font-medium mb-1">Start date</label>
                              <input type="text"
                                      id="start-date"
                                  value={startDate}
                                  onChange={(e) => setStartDate(e.target.value)}
                               className="bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="end-date" className="block text-gray-300 font-medium mb-1">End date</label>
                              <input type="text"
                                      id="end-date"
                                    value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                               className="bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" />
                           </div>
                    </div>
                 <div>
                    {children}
                 </div>
                 </div> */}
        </aside>
     </DashboardContext.Provider>
  );
};
export const useDashboard = () => {
     return useContext(DashboardContext);
}
export default Sidebar;
=======
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
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
