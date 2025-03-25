import React, { useState, useEffect } from 'react';
import { fetchContentTrend } from '../api';
import ChartCard from '../components/ChartCard';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart'
import Loading from '../components/Loading';
import YearSlider from '../components/YearSlider';
import {filterDataByYear} from '../utils';

const ContentTrend = () => {
  const [contentTrendData, setContentTrendData] = useState(null);
    const [selectedYear, setSelectedYear] = useState('all');
    const [selectedType, setSelectedType] = useState('Total');
    const [sliderYear, setSliderYear] = useState(2000);
  const [isLoading, setIsLoading] = useState(true);
    const mockPopularCategories = [
        { "Category": "Action & Adventure", "Percentage": 32 },
        { "Category": "Drama", "Percentage": 28 },
        { "Category": "Comedy", "Percentage": 24 },
    ];

    const mockViewingMetrics = {
        averageWatchTime: "2.5 hrs",
        completionRate: "76%",
    };
    const mockContentQuality = {
      userRating: "4.2/5.0",
        criticScore: "78%"
    }
      const mockContentAnalysis = {
         totalContent: "12,458",
          movies: "8,234",
          tvShows: "4,224",
          newReleases: "+342",
        contentDistribution :[
          { label: 'Movies', percentage: 66 },
            {label: 'TV Shows', percentage: 34},
        ]
    }

      const mockReleaseTimeline = [
          { "Year": "2018", "Count": 300 },
          { "Year": "2019", "Count": 350 },
         { "Year": "2020", "Count": 420 },
          { "Year": "2021", "Count": 400 },
           { "Year": "2022", "Count": 380 },
            { "Year": "2023", "Count": 350 },
      ]


  useEffect(() => {
      const fetchData = async () => {
          setIsLoading(true);
          try {
              const response = await fetchContentTrend();
              setContentTrendData(response);
        } catch(error){
            console.log("Error fetching data: ", error);
        } finally{
           setIsLoading(false);
        }
     };
     fetchData();
   }, []);

    const handleYearChange = (e) => {
      setSelectedYear(parseInt(e.target.value) || 'all');
    };
      const handleSliderYearChange = (year) => {
          setSliderYear(year)
      }
    const handleTypeChange = (type) => {
      setSelectedType(type);
    }


    if (isLoading) {
        return <Loading />;
    }
      const getReleaseTimeline = () => {
          if (selectedType === 'Total') {
              return filterDataByYear(mockReleaseTimeline, "Year", selectedYear)
          }
          if(selectedType === 'Movie') {
            const result = mockReleaseTimeline.map(item => ({...item, "Count": parseInt(item.Count *0.75)}))
             return filterDataByYear(result, "Year", selectedYear)
         }
         if(selectedType === 'TV Show') {
            const result = mockReleaseTimeline.map(item => ({...item, "Count": parseInt(item.Count *0.25)}))
            return filterDataByYear(result, "Year", selectedYear)
         }
      }

    const contentDistributionForPieChart = mockContentAnalysis.contentDistribution.map(item => ({ M_rating: item.label, counts: item.percentage}));
    const releaseTimelineForBarChart = getReleaseTimeline()
     const popularCategoriesForBarChart = mockPopularCategories.map(item => ({ Category: item.Category, Percentage: item.Percentage}))
      const minYear = contentTrendData ? Math.min(...contentTrendData.map(item => item['Release Year'])) : 2000;
    const maxYear = contentTrendData ? Math.max(...contentTrendData.map(item => item['Release Year'])) : 2021;

     const getMovieVsTvData = () => {
        const data = filterDataByYear(mockReleaseTimeline, "Year", selectedYear);
         return data.map(item => ({...item, Movies: parseInt(item.Count*0.75), "TV Shows": parseInt(item.Count*0.25)}))
     }
        const movieVsTvData = getMovieVsTvData();
         const minSliderYear =  movieVsTvData.length ? Math.min(...movieVsTvData.map(item => parseInt(item.Year))) : 2000;
    const maxSliderYear = movieVsTvData.length ? Math.max(...movieVsTvData.map(item => parseInt(item.Year))) : 2021;
    const filteredMovieVsTvData = movieVsTvData.filter(item => parseInt(item.Year) === sliderYear);
  return (
       <div className="container mx-auto p-4">
         <h2 className="text-2xl font-semibold mb-4">Content Analysis</h2>
            <p className="text-gray-600 mb-6">Comprehensive overview of Netflix content performance and trends</p>
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
                              onClick={() => handleTypeChange('Total')}
                             className={`rounded-md px-3 py-1 text-sm ${ selectedType==='Total' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' }`}
                          >
                             Total
                        </button>
                        <button
                              onClick={() => handleTypeChange('Movie')}
                            className={`rounded-md px-3 py-1 text-sm ml-2 ${ selectedType==='Movie' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' }`}>
                            Movies
                      </button>
                       <button
                              onClick={() => handleTypeChange('TV Show')}
                            className={`rounded-md px-3 py-1 text-sm ml-2 ${ selectedType==='TV Show' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' }`}>
                            TV Shows
                      </button>
                   </div>
                 </div>


            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white shadow rounded p-4">
                       <h3 className="text-gray-500 text-sm">Total Content</h3>
                       <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.totalContent}</p>
                       <p className="text-sm text-gray-500">Active Titles</p>
                    </div>
                   <div className="bg-white shadow rounded p-4">
                       <h3 className="text-gray-500 text-sm">Movies</h3>
                      <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.movies}</p>
                      <p className="text-sm text-gray-500">Total Films</p>
                   </div>
                    <div className="bg-white shadow rounded p-4">
                      <h3 className="text-gray-500 text-sm">TV Shows</h3>
                         <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.tvShows}</p>
                         <p className="text-sm text-gray-500">Series & Shows</p>
                    </div>
                    <div className="bg-white shadow rounded p-4">
                       <h3 className="text-gray-500 text-sm">New Releases</h3>
                      <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.newReleases}</p>
                        <p className="text-sm text-gray-500">This Month</p>
                    </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                 <div className="bg-white shadow rounded p-4">
                   <h3 className="text-lg font-semibold mb-4">Content Distribution by Type</h3>
                       <PieChart data={contentDistributionForPieChart} />
                  </div>

                  <div className="bg-white shadow rounded p-4">
                    <h3 className="text-lg font-semibold mb-4">Release Timeline</h3>
                      <div className="relative">
                         <BarChart data={releaseTimelineForBarChart} xKey="Year" yKey="Count"  />
                      </div>

                  </div>
            </div>
       <div className="mb-8">
            <ChartCard title="Movie vs TV Shows">
             <YearSlider minYear={minSliderYear} maxYear={maxSliderYear} onChange={handleSliderYearChange} />
             <BarChart data={filteredMovieVsTvData}  xKey="Year" yKey="Movies" orientation="h" />
                  <BarChart data={filteredMovieVsTvData}  xKey="Year" yKey="TV Shows" orientation="h" />
            </ChartCard>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
               <div className="bg-white shadow rounded p-4">
                  <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
                     <div className="flex items-center justify-between text-gray-700">
                       {popularCategoriesForBarChart.map(item => (
                           <div className="flex flex-col items-center" >
                                <div className="bg-blue-300 h-6 rounded-b-md" style={{width: "100%", height: `${item.Percentage}px`, }}> </div>
                             <span className="text-sm">{item.Category}</span>
                           </div>
                         ))}
                   </div>
              </div>
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-lg font-semibold mb-4">Viewing Metrics</h3>
                     <p className="text-xl font-semibold text-gray-700">{mockViewingMetrics.averageWatchTime}</p>
                      <p className="text-sm text-green-500">↑ 12% vs last month</p>
                      <p className="text-xl font-semibold text-gray-700 mt-2">{mockViewingMetrics.completionRate}</p>
                        <p className="text-sm text-green-500">↑ 5% vs last month</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                     <h3 className="text-lg font-semibold mb-4">Content Quality</h3>
                      <div className="mb-2">
                           <p className="font-semibold">User Rating</p>
                            <div className="bg-gray-300 rounded-full h-2 w-full">
                            <div className="bg-blue-500 rounded-full h-2" style={{ width: `${parseFloat(mockContentQuality.userRating.split('/')[0]) /5 *100}%` }}></div>
                          </div>
                         <span className="text-gray-700 text-sm">{mockContentQuality.userRating}</span>
                      </div>
                       <div className="mb-2">
                             <p className="font-semibold">Critic Score</p>
                              <div className="bg-gray-300 rounded-full h-2 w-full">
                                <div className="bg-green-500 rounded-full h-2" style={{ width: mockContentQuality.criticScore }}></div>
                            </div>
                            <span className="text-gray-700 text-sm">{mockContentQuality.criticScore}</span>
                        </div>

                </div>
         </div>
     </div>
  );
};

export default ContentTrend;