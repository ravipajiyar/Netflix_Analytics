import React, { useState, useEffect } from 'react';
import { fetchDashboardData, fetchDashboardDataByYear } from '../api';
import ChartCard from '../components/ChartCard';
import BarChart from '../components/BarChart';
import Loading from '../components/Loading';
import { filterDataByYear } from '../utils';
import LineChart from '../components/LineChart';

const Home = () => {
    const [dashboardData, setDashboardData] = useState(null);
     const [selectedYear, setSelectedYear] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
      const [allYears, setAllYears] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
              let response;
              if(selectedYear === 'All'){
                   response = await fetchDashboardData();
                   setDashboardData(response)
               } else {
                  response = await fetchDashboardDataByYear(parseInt(selectedYear));
                    setDashboardData(response)
              }

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [selectedYear]);

    useEffect(()=> {
        const extractYears = async () => {
             try{
                 const response = await fetchDashboardData();
                 const allContentTrendData = response?.contentTrend
                    if(allContentTrendData) {
                      const years =  [...new Set(allContentTrendData.map(item=> item['Release Year']))]
                      setAllYears(years.sort((a,b)=> b-a))
                    }
               } catch(error){
                 console.log("Error fetching all years:", error)
              }
       }
       extractYears()
     }, [])


    if (isLoading) {
        return <Loading />;
    }
   const contentTrendData = dashboardData?.contentTrend;
   const sentimentAnalysisData = dashboardData?.sentimentAnalysis;

   const sentimentForBarChart = sentimentAnalysisData ? sentimentAnalysisData.reduce((acc, item) => {
         const existingSentiment = acc.find(s => s.Sentiment === item.Sentiment)
         if(existingSentiment){
           existingSentiment.Percentage += item['Total Count']
         } else {
            acc.push({...item, Percentage: item['Total Count']})
         }
          return acc
    }, []) : [];


 const contentTrendForLineChart = contentTrendData ?  contentTrendData : [];
      const mockDurationData = [
        { "Duration": "< 30 minutes", "Percentage": 15 },
        { "Duration": "30-60 minutes", "Percentage": 35 },
       { "Duration": "1-2 hours", "Percentage": 30 },
        { "Duration": "> 2 hours", "Percentage": 20 },
    ];
     const mockTopActorsData = [
          { "Actor": "Tom Hanks", "Total Count": 5 },
            { "Actor": "Morgan Freeman", "Total Count": 3 },
           { "Actor": "Meryl Streep", "Total Count": 4 }
         ];
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

    return (
       <div className="container mx-auto p-4">
            <p className="text-gray-600 mb-6">Comprehensive analysis of Netflix content and performance metrics</p>
              <div className="mb-4 flex justify-end">
                   <select
                       id="year-filter"
                       className="bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                        value={selectedYear}
                       onChange={handleYearChange}>
                        <option value="All"> All Years </option>
                     {allYears.map(year => (<option key={year} value={year}>{year}</option>))}
                  </select>
                 </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white shadow rounded p-4">
                <h3 className="text-gray-500 text-sm">Total Directors</h3>
                    <p className="text-3xl font-bold text-gray-800">{dashboardData?.totalDirectors}</p>
                    <p className="text-sm text-green-500">+12% from last month</p>
               </div>
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-gray-500 text-sm">Total Movies</h3>
                    <p className="text-3xl font-bold text-gray-800">{dashboardData?.totalMovies}</p>
                    <p className="text-sm text-green-500">+5% from last month</p>
               </div>
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-gray-500 text-sm">Total TV Shows</h3>
                   <p className="text-3xl font-bold text-gray-800">{dashboardData?.totalTVShows}</p>
                   <p className="text-sm text-green-500">+8% from last month</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-gray-500 text-sm">Active Users</h3>
                    <p className="text-3xl font-bold text-gray-800">{dashboardData?.activeUsers}</p>
                    <p className="text-sm text-green-500">+15% from last month</p>
              </div>
            </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <ChartCard title="Content Trend">
                  <LineChart data={contentTrendForLineChart} xKey="Release Year" yKey="Total Count" colorKey="Type"/>
                 </ChartCard>
                  <ChartCard title="Duration Distribution">
                        <BarChart data={mockDurationData} xKey="Percentage" yKey="Duration" orientation="h"/>
                  </ChartCard>
           </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <ChartCard title="Sentiment Distribution">
                      <BarChart data={sentimentForBarChart} xKey="Percentage" yKey="Sentiment" orientation="h"/>
                </ChartCard>
                <ChartCard title="Top Actors on Netflix">
                    <BarChart data={mockTopActorsData} xKey="Total Count" yKey="Actor" orientation="h" />
                </ChartCard>
          </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white shadow rounded p-4">
                       <h2 className="text-xl font-semibold mb-4">Recent Trends</h2>
                      <ul className="list-disc pl-5 text-gray-700">
                           <li>Increase in international content production</li>
                           <li>Growing demand for original series</li>
                            <li>Rise in documentary viewership</li>
                        </ul>
                </div>
                <div className="bg-white shadow rounded p-4">
                   <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
                     <div className="mb-2">
                      <p className="font-semibold">Content Engagement</p>
                        <div className="bg-gray-300 rounded-full h-2 w-full">
                        <div className="bg-blue-500 rounded-full h-2" style={{ width: '85%' }}></div>
                      </div>
                    <span className="text-gray-700 text-sm">85%</span>
                  </div>
                <div className="mb-2">
                    <p className="font-semibold">User Satisfaction</p>
                      <div className="bg-gray-300 rounded-full h-2 w-full">
                        <div className="bg-green-500 rounded-full h-2" style={{ width: '92%' }}></div>
                        </div>
                        <span className="text-gray-700 text-sm">92%</span>
                 </div>
              </div>
           </div>
        </div>
    );
};

export default Home;