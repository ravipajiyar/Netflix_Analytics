import React, { useState, useEffect } from 'react';
import { fetchDurationAnalysis } from '../api';
import ChartCard from '../components/ChartCard';
import BarChart from '../components/BarChart';
import Loading from '../components/Loading';


const DurationAnalysis = () => {
    const [durationData, setDurationData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedType, setSelectedType] = useState('All');

    const mockContentDistribution = [
        { "Duration": "< 30 minutes", "Percentage": 15 },
        { "Duration": "30-60 minutes", "Percentage": 35 },
       { "Duration": "1-2 hours", "Percentage": 30 },
        { "Duration": "> 2 hours", "Percentage": 20 },
    ];

     const mockViewingTimePatterns = {
        peakHours: "8PM-11PM",
        weekendAvg: "4.5 hrs",
        weekdayAvg: "2.8 hrs",
       completionRate: "76%"
    }
    const mockGenreDuration = [
       { "Genre": "Action Movies", "Duration": "2.3 hrs avg" },
        { "Genre": "Comedy Shows", "Duration": "30 min avg" },
       { "Genre": "Drama Series", "Duration": "45 min avg" }
   ];

    const mockViewingCompletion = [
        { "Content": "Movies", "Percentage": 85 },
        { "Content": "TV Episodes", "Percentage": 92 },
        { "Content": "Documentaries", "Percentage": 78 },
    ];

    const mockWatchTimeTrends = {
        morning: "15%",
       afternoon: "25%"
    };


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetchDurationAnalysis();
                setDurationData(response);
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
    const handleTypeChange = (type) => {
      setSelectedType(type);
    }

    const contentDistributionForBarChart = mockContentDistribution.map(item => ({...item, "Duration":item.Duration, "Percentage":item.Percentage}));
    const getGenreDuration = () => {
        if (selectedType === 'All') {
             return mockGenreDuration
        }
        if (selectedType === 'Movies'){
             return mockGenreDuration.filter(item => item.Genre.includes("Movies"))
        }
           if (selectedType === 'TV Shows'){
             return mockGenreDuration.filter(item => item.Genre.includes("Shows") || item.Genre.includes("Series"))
        }
        return mockGenreDuration
    }
    const filteredGenreDuration = getGenreDuration();

  return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Duration Analysis</h2>
            <p className="text-gray-600 mb-6">Analysis of content duration patterns and viewing time metrics</p>
               <div className="flex justify-start mb-4">
                        <button
                              onClick={() => handleTypeChange('All')}
                             className={`rounded-md px-3 py-1 text-sm ${ selectedType==='All' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' }`}
                          >
                             All
                        </button>
                        <button
                              onClick={() => handleTypeChange('Movies')}
                            className={`rounded-md px-3 py-1 text-sm ml-2 ${ selectedType==='Movies' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' }`}>
                            Movies
                      </button>
                       <button
                              onClick={() => handleTypeChange('TV Shows')}
                            className={`rounded-md px-3 py-1 text-sm ml-2 ${ selectedType==='TV Shows' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' }`}>
                            TV Shows
                      </button>
                   </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white shadow rounded p-4">
                   <h3 className="text-gray-500 text-sm">Average Duration</h3>
                   <p className="text-3xl font-bold text-gray-800">118 min</p>
                  <p className="text-sm text-gray-500">Per Content</p>
               </div>
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-gray-500 text-sm">Series Episodes</h3>
                    <p className="text-3xl font-bold text-gray-800">45 min</p>
                    <p className="text-sm text-gray-500">Average Length</p>
                </div>
              <div className="bg-white shadow rounded p-4">
                 <h3 className="text-gray-500 text-sm">Movie Length</h3>
                  <p className="text-3xl font-bold text-gray-800">2.4 hrs</p>
                   <p className="text-sm text-gray-500">Average Duration</p>
                </div>
              <div className="bg-white shadow rounded p-4">
                    <h3 className="text-gray-500 text-sm">Binge Time</h3>
                    <p className="text-3xl font-bold text-gray-800">3.2 hrs</p>
                    <p className="text-sm text-gray-500">Average Session</p>
               </div>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                 <div className="bg-white shadow rounded p-4">
                       <h3 className="text-lg font-semibold mb-4">Content Duration Distribution</h3>
                         <BarChart data={contentDistributionForBarChart} xKey="Percentage" yKey="Duration" orientation="h"/>
                  </div>
                   <div className="bg-white shadow rounded p-4">
                        <h3 className="text-lg font-semibold mb-4">Viewing Time Patterns</h3>
                         <p className="text-xl font-semibold text-gray-700">Peak Hours</p>
                           <p className="text-2xl font-bold text-gray-800">{mockViewingTimePatterns.peakHours}</p>
                           <p className="text-sm text-gray-700 mt-2">Highest Activity</p>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div className="text-gray-700">
                                <p className="font-semibold">Weekend Avg</p>
                                  <p className="text-xl font-bold text-gray-800">{mockViewingTimePatterns.weekendAvg}</p>
                                 <p className="text-sm text-gray-700">Per User</p>
                            </div>
                            <div className="text-gray-700">
                                   <p className="font-semibold">Weekday Avg</p>
                                     <p className="text-xl font-bold text-gray-800">{mockViewingTimePatterns.weekdayAvg}</p>
                                     <p className="text-sm text-gray-700">Per User</p>
                            </div>

                        </div>
                         <p className="text-xl font-semibold text-gray-700 mt-2">Completion Rate</p>
                           <p className="text-2xl font-bold text-gray-800">{mockViewingTimePatterns.completionRate}%</p>
                           <p className="text-sm text-gray-700 mt-2">Average</p>
                   </div>
                </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white shadow rounded p-4">
                        <h3 className="text-lg font-semibold mb-4">Genre Duration</h3>
                           <ul className="text-gray-700">
                              {filteredGenreDuration.map((item, index) => (
                                  <li key={index} className="flex items-center mb-2">
                                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: ['#ef4444', '#10b981', '#3b82f6'][index % 3] }}></div>
                                       <span>{item.Genre}</span>
                                      <span className="ml-auto font-medium">{item.Duration}</span>
                                  </li>
                               ))}
                           </ul>
                    </div>
                     <div className="bg-white shadow rounded p-4">
                          <h3 className="text-lg font-semibold mb-4">Viewing Completion</h3>
                          <ul className="text-gray-700">
                              {mockViewingCompletion.map((item, index) => (
                                  <li key={index} className="flex items-center mb-2">
                                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: ['#ef4444', '#10b981', '#3b82f6'][index % 3] }}></div>
                                        <span>{item.Content}</span>
                                       <span className="ml-auto font-medium">{item.Percentage}%</span>
                                   </li>
                              ))}
                         </ul>
                   </div>
                 <div className="bg-white shadow rounded p-4">
                       <h3 className="text-lg font-semibold mb-4">Watch Time Trends</h3>
                           <p className="text-xl font-semibold text-gray-700">Morning</p>
                            <p className="text-2xl font-bold text-gray-800">{mockWatchTimeTrends.morning}</p>
                              <p className="text-sm text-gray-700">6AM - 11PM</p>
                            <p className="text-xl font-semibold text-gray-700 mt-2">Afternoon</p>
                             <p className="text-2xl font-bold text-gray-800">{mockWatchTimeTrends.afternoon}</p>
                              <p className="text-sm text-gray-700">12PM - 6PM</p>
                 </div>
               </div>
        </div>
    );
};

export default DurationAnalysis;