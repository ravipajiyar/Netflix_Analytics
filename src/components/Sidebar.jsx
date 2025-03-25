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