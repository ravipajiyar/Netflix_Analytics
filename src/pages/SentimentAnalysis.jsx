<<<<<<< HEAD
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
=======
import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  CalendarRange,
  Frown,
  Meh,
  MessageCircle,
  Smile,
  Star,
  ThumbsUp,
} from 'lucide-react';
import { fetchSentimentAnalysis } from '../api';
import BarChart from '../components/BarChart';
import ChartCard from '../components/ChartCard';
import FilterSelect from '../components/FilterSelect';
import LineChart from '../components/LineChart';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import ProgressList from '../components/ProgressList';
import StatCard from '../components/StatCard';
import { formatNumber, formatPercent } from '../utils';

const sentimentMeta = {
  Positive: { icon: Smile, tone: 'emerald', color: '#34d399' },
  Neutral: { icon: Meh, tone: 'amber', color: '#f59e0b' },
  Negative: { icon: Frown, tone: 'red', color: '#fb7185' },
};

const mockFeedbackThemes = [
  { Theme: 'Content quality', Sentiment: '92% Positive' },
  { Theme: 'Streaming quality', Sentiment: '88% Positive' },
  { Theme: 'User interface', Sentiment: '85% Positive' },
];

const mockSentimentByGenre = [
  { Genre: 'Drama', Score: '4.5/5.0' },
  { Genre: 'Comedy', Score: '4.2/5.0' },
  { Genre: 'Action', Score: '4.0/5.0' },
];

const mockResponseActions = {
  resolved: 892,
  inProgress: 234,
};

const mockSocialMediaImpactData = [
  { Platform: 'Twitter mentions', Count: '2.3M', color: '#1d9bf0' },
  { Platform: 'Instagram followers', Count: '5.1M', color: '#f56040' },
  { Platform: 'YouTube views', Count: '12.7M', color: '#ff0000' },
];

const SentimentAnalysis = () => {
  const [sentimentData, setSentimentData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchSentimentAnalysis();
        if (active) setSentimentData(response ?? []);
      } catch (error) {
        console.error('Error fetching sentiment data:', error);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, []);

  const years = useMemo(
    () =>
      [...new Set(sentimentData.map((item) => item['Release Year']))].sort(
        (a, b) => Number(b) - Number(a)
      ),
    [sentimentData]
  );

  const yearOptions = useMemo(
    () => [
      { value: 'all', label: 'All years' },
      ...years.map((year) => ({ value: String(year), label: String(year) })),
    ],
    [years]
  );

  const filteredData = useMemo(
    () =>
      selectedYear === 'all'
        ? sentimentData
        : sentimentData.filter((item) => item['Release Year'] === Number(selectedYear)),
    [sentimentData, selectedYear]
  );

  const stats = useMemo(() => {
    const totals = filteredData.reduce((acc, item) => {
      const sentiment = item.Sentiment || 'Neutral';
      acc[sentiment] = (acc[sentiment] || 0) + (Number(item['Total Count']) || 0);
      return acc;
    }, {});

    const total = Object.values(totals).reduce((sum, value) => sum + value, 0);
    const rows = ['Positive', 'Neutral', 'Negative']
      .filter((sentiment) => totals[sentiment])
      .map((sentiment) => ({
        Sentiment: sentiment,
        Count: totals[sentiment],
        Share: total ? Number(((totals[sentiment] / total) * 100).toFixed(1)) : 0,
      }));

    return { totals, total, rows };
  }, [filteredData]);

  const indicatorItems = [
    { label: 'User satisfaction', value: 84, display: '4.2/5.0', color: '#34d399' },
    { label: 'Recommendation rate', value: 85, display: '85%', color: '#22d3ee' },
    { label: 'Engagement score', value: 78, display: '78%', color: '#a78bfa' },
    { label: 'Response rate', value: 92, display: '92%', color: '#e50914' },
  ];

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Audience"
        title="Sentiment analysis"
        description="Measure how audiences feel about Netflix content over time, then drill into the themes and formats driving the signal."
      >
        <FilterSelect
          label="Year"
          icon={CalendarRange}
          value={selectedYear}
          onChange={(event) => setSelectedYear(event.target.value)}
          options={yearOptions}
          ariaLabel="Filter sentiment by release year"
        />
        <span className="chip">
          <Activity size={12} className="text-emerald-300" />
          {formatNumber(stats.total)} signals
        </span>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {['Positive', 'Neutral', 'Negative'].map((sentiment, index) => {
          const meta = sentimentMeta[sentiment];
          const count = stats.totals[sentiment] || 0;
          const share = stats.total ? (count / stats.total) * 100 : 0;
          return (
            <StatCard
              key={sentiment}
              index={index}
              label={`${sentiment} sentiment`}
              value={formatPercent(share, 1)}
              sublabel={`${formatNumber(count)} titles`}
              icon={meta.icon}
              tone={meta.tone}
            />
          );
        })}
        <StatCard
          index={3}
          label="Signals analyzed"
          value={formatNumber(stats.total)}
          sublabel={
            selectedYear === 'all' ? 'Across all years' : `Released in ${selectedYear}`
          }
          icon={Activity}
          tone="violet"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <ChartCard
          index={1}
          title="Sentiment distribution"
          subtitle="Share of audience tone in the selection"
        >
          <BarChart
            data={stats.rows}
            xKey="Share"
            yKey="Sentiment"
            orientation="h"
            colorKey="Sentiment"
            height={330}
          />
        </ChartCard>

        <ChartCard
          className="xl:col-span-2"
          index={2}
          title="Sentiment over time"
          subtitle="How tone changes across release years"
        >
          <LineChart
            data={filteredData}
            xKey="Release Year"
            yKey="Total Count"
            colorKey="Sentiment"
            height={330}
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard index={1} title="Key indicators" subtitle="Sentiment health signals">
          <ProgressList items={indicatorItems} className="pt-2" />
        </ChartCard>

        <ChartCard index={2} title="Feedback themes" subtitle="What audiences talk about">
          <ul className="space-y-3 pt-1">
            {mockFeedbackThemes.map((item) => (
              <li
                key={item.Theme}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3"
              >
                <span className="flex items-center gap-2.5 text-sm text-zinc-300">
                  <MessageCircle size={14} className="text-zinc-500" />
                  {item.Theme}
                </span>
                <span className="shrink-0 text-[11px] font-semibold text-emerald-300">
                  {item.Sentiment}
                </span>
              </li>
            ))}
          </ul>
        </ChartCard>

        <ChartCard index={3} title="Sentiment by genre" subtitle="Average audience score">
          <ul className="space-y-3 pt-1">
            {mockSentimentByGenre.map((item) => (
              <li
                key={item.Genre}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3"
              >
                <span className="text-sm text-zinc-300">{item.Genre}</span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                  <Star size={12} fill="currentColor" />
                  {item.Score}
                </span>
              </li>
            ))}
          </ul>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard index={1} title="Response actions" subtitle="Audience feedback resolution">
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.06] p-4">
              <p className="font-display text-2xl font-extrabold text-white">
                {formatNumber(mockResponseActions.resolved)}
              </p>
              <p className="mt-1 text-xs text-zinc-500">Resolved</p>
              <p className="mt-2 flex items-center gap-1 text-[10px] font-medium text-emerald-300">
                <ThumbsUp size={10} /> Within 24 hours
              </p>
            </div>
            <div className="rounded-xl border border-amber-500/15 bg-amber-500/[0.06] p-4">
              <p className="font-display text-2xl font-extrabold text-white">
                {formatNumber(mockResponseActions.inProgress)}
              </p>
              <p className="mt-1 text-xs text-zinc-500">In progress</p>
              <p className="mt-2 text-[10px] font-medium text-amber-300">Being addressed</p>
            </div>
          </div>
        </ChartCard>

        <ChartCard
          className="lg:col-span-2"
          index={2}
          title="Social media impact"
          subtitle="Audience reach across major platforms"
        >
          <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-3">
            {mockSocialMediaImpactData.map((item) => (
              <div
                key={item.Platform}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <span
                  className="block h-1.5 w-8 rounded-full"
                  style={{ backgroundColor: item.color, boxShadow: `0 0 14px ${item.color}66` }}
                />
                <p className="mt-4 font-display text-xl font-extrabold text-white">{item.Count}</p>
                <p className="mt-1 text-xs text-zinc-500">{item.Platform}</p>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default SentimentAnalysis;
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
