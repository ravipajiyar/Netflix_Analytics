import React, { useState, useEffect } from 'react';
import { fetchTopDirectors } from '../api';
import ChartCard from '../components/ChartCard';
import BarChart from '../components/BarChart';
import Loading from '../components/Loading';
import { filterDataByYear } from '../utils'

const Directors = () => {
    const [directorsData, setDirectorsData] = useState(null);
    const [view, setView] = useState('Yearly');
    const [selectedYear, setSelectedYear] = useState('all');
    const [isLoading, setIsLoading] = useState(true);

    const mockGenreData = [
        { "Genre": "Drama", "Percentage": 45 },
        { "Genre": "Comedy", "Percentage": 30 },
        { "Genre": "Action", "Percentage": 25 },
    ];

    const mockProductionTrends = [
        { "Trend": "Increasing Output", "Percentage": 23 },
        { "Trend": "International Collaborations", "Percentage": 45 },
        { "Trend": "Award Nominations", "Percentage": 12 },
    ];
     const mockMonthlyDirectors = [
          { "Director": "Rajkumar Hirani", "Total Count": 3 },
          { "Director": "Paul Giamatti", "Total Count": 2 },
          { "Director": "Jan Suter", "Total Count": 4 },
          { "Director": "Super Director", "Total Count": 1 },
          { "Director": "Marcos Pillow", "Total Count": 3 }
        ];

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetchTopDirectors();
                setDirectorsData(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    const toggleView = (newView) => {
        setView(newView);
    };

    const handleYearChange = (e) => {
       setSelectedYear(parseInt(e.target.value) || 'all');
    };

     const minYear = directorsData ? Math.min(...directorsData.map(item => item['Release Year'])) : 2000;
    const maxYear = directorsData ? Math.max(...directorsData.map(item => item['Release Year'])) : 2021;


    const getDirectorData = () => {
        if (view === 'Monthly') {
             return mockMonthlyDirectors
        }
        return filterDataByYear(directorsData, "Release Year", selectedYear)
    }
     const currentDirectorsData = getDirectorData()
     const formattedDirectorsForTable = currentDirectorsData ? currentDirectorsData.slice(0, 5).map((item, index) => ({
          ...item,
          color: ['#3b82f6', '#10b981', '#9333ea', '#f59e0b', '#ef4444'][index % 5]
     })) : []
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Director Analysis</h2>
            <p className="text-gray-600 mb-6">Detailed insights into Netflix's top directors and their contributions</p>
             <div className="mb-4 flex justify-between items-center">
                 <div className="flex justify-start items-center">
                 <select
                      value={selectedYear}
                      onChange={handleYearChange}
                       className="bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                    >
                        <option value="all">All Years</option>
                        {Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).map(year => (
                           <option key={year} value={year}>{year}</option>
                         ))}
                 </select>
                   <div className="flex justify-start mb-2  ml-4">
                        <button
                              onClick={() => toggleView('Monthly')}
                             className={`rounded-md px-3 py-1 text-sm ${ view==='Monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' }`}
                          >
                             Monthly
                        </button>
                        <button
                              onClick={() => toggleView('Yearly')}
                            className={`rounded-md px-3 py-1 text-sm ml-2 ${ view==='Yearly' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' }`}>
                             Yearly
                       </button>
                    </div>
                  </div>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-gray-500 text-sm">Most Active Director</h3>
                    <p className="text-2xl font-bold text-gray-800">{currentDirectorsData && currentDirectorsData[0]?.Director}</p>
                    <p className="text-sm text-gray-500">{currentDirectorsData && currentDirectorsData[0]?.['Total Count']} Productions</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-gray-500 text-sm">Average Productions</h3>
                    <p className="text-2xl font-bold text-gray-800">18.4</p>
                    <p className="text-sm text-gray-500">Per Director</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-gray-500 text-sm">New Directors</h3>
                    <p className="text-2xl font-bold text-gray-800">+15</p>
                    <p className="text-sm text-gray-500">This Quarter</p>
                </div>
            </div>

            <div className="mb-8">
                <ChartCard title="Top Directors Performance">
                    <BarChart data={currentDirectorsData} xKey="Total Count" yKey="Director" orientation="h" />
                </ChartCard>
            </div>
            <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Top Directors</h3>
                  <div className="overflow-x-auto">
                      <table className="w-full table-auto">
                         <thead>
                           <tr>
                              <th className="border px-4 py-2">Rank</th>
                              <th className="border px-4 py-2">Director</th>
                              <th className="border px-4 py-2">Total Productions</th>
                         </tr>
                        </thead>
                        <tbody>
                            {formattedDirectorsForTable.map((item, index) => (
                                <tr key={index}>
                                     <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">
                                         <span className="flex items-center">
                                             <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: item.color}}></span>
                                          {item.Director}
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2">{item['Total Count']}</td>
                              </tr>
                           ))}
                       </tbody>
                    </table>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-lg font-semibold mb-4">Genre Distribution</h3>
                    <div className="flex items-center justify-between text-gray-700">
                       {mockGenreData.map(item => (
                           <div className="flex flex-col items-center" >
                                <div className="bg-blue-300 h-6 rounded-b-md" style={{width: "100%", height: `${item.Percentage}px`, }}> </div>
                             <span className="text-sm">{item.Genre}</span>
                           </div>
                         ))}
                   </div>
                </div>

                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-lg font-semibold mb-4">Production Trends</h3>
                    <ul className="text-gray-700">
                        {mockProductionTrends.map((item, index) => (
                            <li key={index} className="flex items-center mb-2">
                                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: ['#10b981', '#3b82f6', '#9333ea'][index % 3] }}></div>
                                <span>{item.Trend}</span>
                                <span className="ml-auto text-green-500 font-medium">{item.Percentage}%</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


        </div>
    );
};

export default Directors;