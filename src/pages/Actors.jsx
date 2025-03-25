import React, { useState, useEffect } from 'react';
import { fetchTopActors, fetchTopActorsByYear } from '../api';
import ChartCard from '../components/ChartCard';
import BarChart from '../components/BarChart';
import Loading from '../components/Loading';
import PieChart from '../components/PieChart';
import {filterDataByYear} from '../utils';

const Actors = () => {
  const [actorsData, setActorsData] = useState(null);
    const [selectedYear, setSelectedYear] = useState('all');
    const [view, setView] = useState('Yearly');
  const [isLoading, setIsLoading] = useState(true);
    const mockGenreData = [
      { "Genre": "Drama", "Percentage": 42 },
        { "Genre": "Action", "Percentage": 28 },
        { "Genre": "Comedy", "Percentage": 30 },
  ];

    const mockSocialMediaImpactData = [
        { "Platform": "Twitter Mentions", "Count": "2.3M" },
        { "Platform": "Instagram Followers", "Count": "5.1M" },
        { "Platform": "YouTube Views", "Count": "12.7M" },
    ];

    const mockViewerRatings = [
        { "Rating": "1", "Percentage": 10 },
        { "Rating": "2", "Percentage": 15 },
        { "Rating": "3", "Percentage": 40 },
        { "Rating": "4", "Percentage": 60 },
       { "Rating": "5", "Percentage": 70 },
    ]

    const mockContentAnalysis = {
      totalActors: "15,234",
       leadingRoles: "5,678",
        supportingRoles: "8,932",
         newTalents: "+892"
    }
       const mockMonthlyActors = [
           { "Actor": "Tom Hanks", "Total Count": 5 },
            { "Actor": "Morgan Freeman", "Total Count": 3 },
           { "Actor": "Meryl Streep", "Total Count": 4 },
           { "Actor": "Leonardo Di Caprio", "Total Count": 1 },
           { "Actor": "Brad Pitt", "Total Count": 2 }
         ];


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
          let response;
          if (selectedYear === 'all') {
           response = await fetchTopActors();
          } else {
              response = await fetchTopActorsByYear(selectedYear);
          }
          setActorsData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

  if (isLoading) {
    return <Loading />;
  }
   const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value) || 'all');
    };
      const toggleView = (newView) => {
        setView(newView);
    };

     const getActorData = () => {
        if (view === 'Monthly') {
             return mockMonthlyActors
        }
         return filterDataByYear(actorsData, "Release Year", selectedYear)
    }
        const currentActorsData = getActorData();
       const formattedActorsForTable = currentActorsData ? currentActorsData.slice(0, 5).map((item, index) => ({
          ...item,
          color: ['#3b82f6', '#10b981', '#9333ea', '#f59e0b', '#ef4444'][index % 5]
     })) : []


     const minYear = actorsData ? Math.min(...actorsData.map(item => item['Release Year'])) : 2000;
    const maxYear = actorsData ? Math.max(...actorsData.map(item => item['Release Year'])) : 2021;
  const genreDataForPieChart = mockGenreData.map(item => ({ M_rating: item.Genre, counts: item.Percentage}));
  return (
       <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Actor Analytics</h2>
              <p className="text-gray-600 mb-6">Comprehensive analysis of actor performances and appearances on Netflix</p>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white shadow rounded p-4">
                        <h3 className="text-gray-500 text-sm">Total Actors</h3>
                            <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.totalActors}</p>
                           <p className="text-sm text-gray-500">Active on Platform</p>
                    </div>
                   <div className="bg-white shadow rounded p-4">
                        <h3 className="text-gray-500 text-sm">Leading Roles</h3>
                        <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.leadingRoles}</p>
                         <p className="text-sm text-gray-500">This Year</p>
                   </div>
                  <div className="bg-white shadow rounded p-4">
                     <h3 className="text-gray-500 text-sm">Supporting Roles</h3>
                     <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.supportingRoles}</p>
                     <p className="text-sm text-gray-500">This Year</p>
                  </div>
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-gray-500 text-sm">New Talents</h3>
                     <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.newTalents}</p>
                      <p className="text-sm text-gray-500">This Quarter</p>
               </div>
           </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                   <ChartCard title="Top Performing Actors">
                      <BarChart data={currentActorsData} xKey="Total Count" yKey="Actor" orientation="h"/>
                     </ChartCard>
                    <ChartCard title="Genre Distribution">
                      <PieChart data={genreDataForPieChart}  />
                   </ChartCard>
              </div>
            <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Top Actors</h3>
                  <div className="overflow-x-auto">
                      <table className="w-full table-auto">
                         <thead>
                           <tr>
                              <th className="border px-4 py-2">Rank</th>
                              <th className="border px-4 py-2">Actor</th>
                              <th className="border px-4 py-2">Total Productions</th>
                         </tr>
                        </thead>
                        <tbody>
                            {formattedActorsForTable.map((item, index) => (
                                <tr key={index}>
                                     <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">
                                         <span className="flex items-center">
                                             <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: item.color}}></span>
                                          {item.Actor}
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2">{item['Total Count']}</td>
                              </tr>
                           ))}
                       </tbody>
                    </table>
                </div>
            </div>


             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                 <div className="bg-white shadow rounded p-4">
                         <h3 className="text-lg font-semibold mb-4">Viewer Ratings</h3>
                           <div className="flex items-center justify-between text-gray-700">
                                 {mockViewerRatings.map(item => (
                                     <div className="flex flex-col items-center" >
                                     <div className="bg-blue-300 h-6 rounded-b-md"  style={{width: "100%", height: `${item.Percentage}px`, }}> </div>
                                       <span className="text-sm">{item.Rating}★</span>
                                     </div>
                                 ))}
                            </div>

                    </div>
                   <div className="bg-white shadow rounded p-4">
                       <h3 className="text-lg font-semibold mb-4">Award Nominations</h3>
                       <div className="mb-2">
                         <div className="bg-gray-300 rounded-full h-2 w-full">
                           <div className="bg-purple-500 rounded-full h-2" style={{ width: '78%' }}></div>
                       </div>
                      <span className="text-gray-700 text-sm">78% PROGRESS</span>
                    </div>
                   </div>
                 <div className="bg-white shadow rounded p-4">
                     <h3 className="text-lg font-semibold mb-4">Social Media Impact</h3>
                     <ul className="text-gray-700">
                         {mockSocialMediaImpactData.map((item, index) => (
                             <li key={index} className="flex items-center mb-2">
                                 <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: ['#1d9bf0', '#f56040', '#ff0000'][index % 3] }}></div>
                                 <span>{item.Platform}</span>
                                <span className="ml-auto font-medium">{item.Count}</span>
                             </li>
                           ))}
                      </ul>
                  </div>
            </div>


        </div>
  );
};

export default Actors;