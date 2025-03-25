import React, { useState, useEffect } from 'react';
import { fetchTopGenres } from '../api';
import ChartCard from '../components/ChartCard';
import BarChart from '../components/BarChart';
import Loading from '../components/Loading';
import PieChart from '../components/PieChart';
import { filterDataByYear } from '../utils';

const GenreAnalysis = () => {
  const [genreData, setGenreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState('all');
    const mockGrowthTrends = [
      { "Genre": "Drama", "Percentage": 45 },
        { "Genre": "Action", "Percentage": 38 },
        { "Genre": "Comedy", "Percentage": 32 },
  ];

     const mockViewerDemographics = [
         { "Age Group": "18-24 years", "Percentage": 35 },
         { "Age Group": "25-34 years", "Percentage": 42 },
         { "Age Group": "35+ years", "Percentage": 23 },
   ];

    const mockEngagementMetrics = {
        averageWatchTime: "2.5 hrs",
        completionRate: 78,
    };

    const mockRegionalPreferences = [
        { "Region": "North America", "Genre": "Drama" },
        { "Region": "Europe", "Genre": "Comedy" },
        { "Region": "Asia", "Genre": "Action" },
    ];

    const mockContentAnalysis = {
        totalGenres: "27",
        topGenre: "Drama",
        fastestGrowing: "Thriller",
        newAdditions: "124"
    }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchTopGenres();
        setGenreData(response);
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
  const handleYearChange = (e) => {
      setSelectedYear(parseInt(e.target.value) || 'all');
  };
    const minYear = genreData ? Math.min(...genreData.map(item => item['Release Year'])) : 2000;
    const maxYear = genreData ? Math.max(...genreData.map(item => item['Release Year'])) : 2021;

const genreForPieChart = genreData ? filterDataByYear(genreData, "Release Year", selectedYear).map(item => ({...item, "M_rating":item.Genre, "counts":item['Total Count'] })) : [];
const viewerDemoForBarChart = mockViewerDemographics.map(item => ({ ...item,  "Percentage":item.Percentage, "Age Group":item['Age Group']  }));
    const growthTrendForBarChart = mockGrowthTrends.map(item => ({ ...item, "Percentage":item.Percentage, "Genre":item.Genre }));

  return (
         <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Genre Analytics</h2>
            <p className="text-gray-600 mb-6">Detailed analysis of content distribution across different genres</p>
               <div className="mb-4 flex justify-end">
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
                 </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                   <div className="bg-white shadow rounded p-4">
                        <h3 className="text-gray-500 text-sm">Total Genres</h3>
                        <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.totalGenres}</p>
                       <p className="text-sm text-gray-500">Active Categories</p>
                   </div>
                 <div className="bg-white shadow rounded p-4">
                      <h3 className="text-gray-500 text-sm">Top Genre</h3>
                        <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.topGenre}</p>
                         <p className="text-sm text-gray-500">3,245 Titles</p>
                </div>
                 <div className="bg-white shadow rounded p-4">
                       <h3 className="text-gray-500 text-sm">Fastest Growing</h3>
                       <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.fastestGrowing}</p>
                        <p className="text-sm text-green-500">+45% Growth</p>
                   </div>
                    <div className="bg-white shadow rounded p-4">
                         <h3 className="text-gray-500 text-sm">New Additions</h3>
                        <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.newAdditions}</p>
                       <p className="text-sm text-gray-500">This Month</p>
                    </div>
               </div>


                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                   <ChartCard title="Popular Genres Distribution">
                     <PieChart data={genreForPieChart}  />
                   </ChartCard>
                     <div className="bg-white shadow rounded p-4">
                         <h3 className="text-lg font-semibold mb-4">Genre Growth Trends</h3>
                        <ul className="text-gray-700">
                          {growthTrendForBarChart.map((item, index) => (
                            <li key={index} className="flex items-center mb-2">
                                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: ['#3b82f6', '#ef4444', '#10b981'][index % 3] }}></div>
                                 <span>{item.Genre}</span>
                                <span className="ml-auto text-green-500 font-medium">{item.Percentage}%</span>
                           </li>
                           ))}
                       </ul>
                   </div>

                 </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                 <div className="bg-white shadow rounded p-4">
                   <ChartCard title="Viewer Demographics">
                        <BarChart data={viewerDemoForBarChart} xKey="Percentage" yKey="Age Group" orientation="h"/>
                  </ChartCard>
                  </div>
                 <div className="bg-white shadow rounded p-4">
                           <h3 className="text-lg font-semibold mb-4">Engagement Metrics</h3>
                             <p className="text-xl font-semibold text-gray-700">{mockEngagementMetrics.averageWatchTime}</p>
                           <p className="text-sm text-green-500">↑ 15% vs last month</p>
                            <p className="text-xl font-semibold text-gray-700 mt-2">{mockEngagementMetrics.completionRate}%</p>
                            <p className="text-sm text-green-500">↑ 8% vs last month</p>
                   </div>
                 <div className="bg-white shadow rounded p-4">
                     <h3 className="text-lg font-semibold mb-4">Regional Preferences</h3>
                     <ul className="text-gray-700">
                         {mockRegionalPreferences.map((item, index) => (
                             <li key={index} className="flex items-center mb-2">
                                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: ['#3b82f6', '#ef4444', '#10b981'][index % 3] }}></div>
                                  <span>{item.Region}</span>
                                  <span className="ml-auto font-medium">{item.Genre}</span>
                            </li>
                            ))}
                        </ul>
                 </div>
               </div>
          </div>
  );
};

export default GenreAnalysis;