import React, { useState, useEffect } from 'react';
import { fetchSentimentAnalysis } from '../api';
import ChartCard from '../components/ChartCard';
import BarChart from '../components/BarChart';
import Loading from '../components/Loading';
import YearSlider from '../components/YearSlider';
import {filterDataByYear} from '../utils';

const SentimentAnalysis = () => {
    const [sentimentData, setSentimentData] = useState(null);
    const [selectedYear, setSelectedYear] = useState('all');
      const [view, setView] = useState('Yearly');
    const [isLoading, setIsLoading] = useState(true);
    const mockFeedbackThemes = [
      { "Theme": "Content Quality", "Sentiment": "92% Positive" },
      { "Theme": "Streaming Quality", "Sentiment": "88% Positive" },
      { "Theme": "User Interface", "Sentiment": "85% Positive" },
    ];

     const mockResponseActions = {
       resolved: 892,
       inProgress: 234
     };
     const mockSentimentByGenre = [
         { "Genre": "Drama", "Score": "4.5/5.0" },
         { "Genre": "Comedy", "Score": "4.2/5.0" },
         { "Genre": "Action", "Score": "4.0/5.0" },
     ];
        const mockTotalReviews = "125K"
     const mockSocialMediaImpactData = [
        { "Platform": "Twitter Mentions", "Count": "2.3M" },
        { "Platform": "Instagram Followers", "Count": "5.1M" },
        { "Platform": "YouTube Views", "Count": "12.7M" },
    ];
     const [socialMedia, setSocialMedia] = useState('Twitter Mentions');
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetchSentimentAnalysis();
                setSentimentData(response);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);


    const handleYearChange = (e) => {
      setSelectedYear(parseInt(e.target.value) || 'all');
    };
      const toggleView = (newView) => {
        setView(newView);
    };
    const handleSocialMediaChange = (e) => {
        setSocialMedia(e.target.value);
    };


    if (isLoading) {
        return <Loading />;
    }
const getSentimentData = () => {
    return filterDataByYear(sentimentData, "Release Year", selectedYear);
}

    const filteredData = getSentimentData();
    const minYear = filteredData.length ? Math.min(...filteredData.map(item => item['Release Year'])) : 2005;
    const maxYear = filteredData.length ? Math.max(...filteredData.map(item => item['Release Year'])) : 2021;
const sentimentForBarChart = filteredData ? filteredData.reduce((acc, item) => {
         const existingSentiment = acc.find(s => s.Sentiment === item.Sentiment)
         if(existingSentiment){
           existingSentiment.Percentage += item['Total Count']
         } else {
            acc.push({...item, Percentage: item['Total Count']})
         }
          return acc
    }, []) : [];

    const sentimentIndicators = {
        userSatisfaction: "4.2/5.0",
        recommendationRate: "85%",
      engagementScore: "78%",
      responseRate: "92%"
    };


    return (
         <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Sentiment Analysis</h2>
              <p className="text-gray-600 mb-6">User feedback and sentiment trends across Netflix content</p>
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
                   <div className="flex justify-start mb-2 ml-4">
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
               <h3 className="text-gray-500 text-sm">Positive Sentiment</h3>
                  <p className="text-3xl font-bold text-gray-800">68%</p>
                   <p className="text-sm text-green-500">↑ 5% this month</p>
             </div>
             <div className="bg-white shadow rounded p-4">
                    <h3 className="text-gray-500 text-sm">Neutral Sentiment</h3>
                    <p className="text-3xl font-bold text-gray-800">22%</p>
                   <p className="text-sm text-red-500">↓ 2% this month</p>
            </div>
               <div className="bg-white shadow rounded p-4">
                   <h3 className="text-gray-500 text-sm">Negative Sentiment</h3>
                     <p className="text-3xl font-bold text-gray-800">10%</p>
                     <p className="text-sm text-red-500">↓ 3% this month</p>
               </div>
               <div className="bg-white shadow rounded p-4">
                  <h3 className="text-gray-500 text-sm">Total Reviews</h3>
                     <p className="text-3xl font-bold text-gray-800">{mockTotalReviews}</p>
                     <p className="text-sm text-gray-500">This Month</p>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                   <ChartCard title="Sentiment Distribution">
                        <BarChart data={sentimentForBarChart} xKey="Percentage" yKey="Sentiment" orientation="h" colorKey="Sentiment"/>
                   </ChartCard>
                   <div className="bg-white shadow rounded p-4">
                       <h3 className="text-lg font-semibold mb-4">Key Sentiment Indicators</h3>
                        <div className="mb-2">
                             <p className="font-semibold">User Satisfaction</p>
                               <div className="bg-gray-300 rounded-full h-2 w-full">
                                 <div className="bg-blue-500 rounded-full h-2" style={{ width: `${parseFloat(sentimentIndicators.userSatisfaction.split('/')[0]) /5 *100}%` }}></div>
                                </div>
                              <span className="text-gray-700 text-sm">{sentimentIndicators.userSatisfaction}</span>
                        </div>
                        <div className="mb-2">
                           <p className="font-semibold">Recommendation Rate</p>
                               <div className="bg-gray-300 rounded-full h-2 w-full">
                                  <div className="bg-green-500 rounded-full h-2" style={{ width: `${sentimentIndicators.recommendationRate.replace('%','')}%` }}></div>
                               </div>
                             <span className="text-gray-700 text-sm"> {sentimentIndicators.recommendationRate} ↑ 5% increase</span>
                         </div>
                         <div className="mb-2">
                            <p className="font-semibold">Engagement Score</p>
                                 <div className="bg-gray-300 rounded-full h-2 w-full">
                                     <div className="bg-green-500 rounded-full h-2" style={{ width: `${sentimentIndicators.engagementScore.replace('%','')}%` }}></div>
                                 </div>
                                 <span className="text-gray-700 text-sm"> {sentimentIndicators.engagementScore} ↑ 7% increase</span>
                         </div>
                           <div className="mb-2">
                                <p className="font-semibold">Response Rate</p>
                                   <div className="bg-gray-300 rounded-full h-2 w-full">
                                       <div className="bg-blue-500 rounded-full h-2" style={{ width: `${sentimentIndicators.responseRate.replace('%','')}%` }}></div>
                                   </div>
                                 <span className="text-gray-700 text-sm"> {sentimentIndicators.responseRate}  ↑ 3% increase</span>
                            </div>
                    </div>
           </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                     <div className="bg-white shadow rounded p-4">
                         <h3 className="text-lg font-semibold mb-4">Common Feedback Themes</h3>
                           <ul className="text-gray-700">
                                 {mockFeedbackThemes.map((item, index) => (
                                     <li key={index} className="flex items-center mb-2">
                                          <span>{item.Theme}</span>
                                        <span className="ml-auto font-medium">{item.Sentiment}</span>
                                      </li>
                                  ))}
                                </ul>
                     </div>
                    <div className="bg-white shadow rounded p-4">
                          <h3 className="text-lg font-semibold mb-4">Sentiment by Genre</h3>
                             <ul className="text-gray-700">
                                 {mockSentimentByGenre.map((item, index) => (
                                      <li key={index} className="flex items-center mb-2">
                                         <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: ['#3b82f6', '#ef4444', '#10b981'][index % 3] }}></div>
                                           <span>{item.Genre}</span>
                                         <span className="ml-auto font-medium">{item.Score}</span>
                                       </li>
                                  ))}
                                </ul>
                    </div>
                  <div className="bg-white shadow rounded p-4">
                     <h3 className="text-lg font-semibold mb-4">Response Actions</h3>
                         <div className="mb-2 text-gray-700">
                             <p className="font-semibold">Resolved</p>
                              <p className="text-2xl font-bold text-gray-800">{mockResponseActions.resolved}</p>
                                <p className="text-sm text-green-500">Within 24 hours</p>
                          </div>
                             <div className="mb-2 text-gray-700">
                                  <p className="font-semibold">In Progress</p>
                                   <p className="text-2xl font-bold text-gray-800">{mockResponseActions.inProgress}</p>
                                   <p className="text-sm text-red-500">Being addressed</p>
                           </div>
                            <div className="mb-2">
                            <h3 className="text-lg font-semibold mb-4">Social Media Impact</h3>
                                <div className="flex flex-col">
                                      {mockSocialMediaImpactData.map(item => (
                                        <label key={item.Platform} className="inline-flex items-center">
                                           <input type="radio" className="form-radio h-5 w-5 text-blue-600"
                                             name="socialMedia"
                                               value={item.Platform}
                                               checked={socialMedia === item.Platform}
                                               onChange={handleSocialMediaChange}
                                              />
                                                 <span className="ml-2 text-gray-700"> {item.Platform} - {item.Count}</span>
                                         </label>
                                       ))}
                                 </div>
                            </div>
                  </div>
               </div>
          </div>
    );
};

export default SentimentAnalysis;