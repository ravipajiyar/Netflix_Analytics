<<<<<<< HEAD
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
=======
import { useEffect, useMemo, useState } from 'react';
import {
  CalendarRange,
  Clapperboard,
  Globe2,
  Sparkles,
  TrendingUp,
  Tv,
  Users,
  Zap,
} from 'lucide-react';
import {
  fetchDashboardData,
  fetchDashboardDataByYear,
  fetchTopActors,
} from '../api';
import BarChart from '../components/BarChart';
import ChartCard from '../components/ChartCard';
import FilterSelect from '../components/FilterSelect';
import LineChart from '../components/LineChart';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import ProgressList from '../components/ProgressList';
import StatCard from '../components/StatCard';
import { buildYearOptions, formatNumber, formatPercent } from '../utils';

const insights = [
  {
    icon: Globe2,
    title: 'International catalog keeps expanding',
    description: 'Non-US productions are one of the fastest growing segments in the library.',
    tone: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: TrendingUp,
    title: 'Original series drive engagement',
    description: 'Serialized storytelling continues to outperform on completion and retention.',
    tone: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: Zap,
    title: 'Documentaries are trending',
    description: 'True-crime and nature documentary viewership is climbing year over year.',
    tone: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  },
];

const Home = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedYear, setSelectedYear] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [allYears, setAllYears] = useState([]);
  const [topActors, setTopActors] = useState([]);

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      setIsLoading(true);
      try {
        const response =
          selectedYear === 'all'
            ? await fetchDashboardData()
            : await fetchDashboardDataByYear(Number(selectedYear));
        if (active) setDashboardData(response);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    loadDashboard();
    return () => {
      active = false;
    };
  }, [selectedYear]);

  useEffect(() => {
    let active = true;

    const loadMeta = async () => {
      try {
        const [allData, actors] = await Promise.all([
          fetchDashboardData(),
          fetchTopActors(),
        ]);
        if (!active) return;

        const years = [
          ...new Set((allData?.contentTrend ?? []).map((item) => item['Release Year'])),
        ].sort((a, b) => b - a);

        setAllYears(years);
        setTopActors((actors ?? []).slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard metadata:', error);
      }
    };

    loadMeta();
    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(() => {
    const movies = Number(dashboardData?.totalMovies) || 0;
    const tvShows = Number(dashboardData?.totalTVShows) || 0;
    const directors = Number(dashboardData?.totalDirectors) || 0;
    const totalTitles = movies + tvShows;
    const movieShare = totalTitles ? (movies / totalTitles) * 100 : 0;

    return { movies, tvShows, directors, totalTitles, movieShare };
  }, [dashboardData]);

  const sentimentRows = useMemo(() => {
    const source = dashboardData?.sentimentAnalysis ?? [];
    const totals = source.reduce((acc, item) => {
      const sentiment = item.Sentiment || 'Neutral';
      acc[sentiment] = (acc[sentiment] || 0) + (Number(item['Total Count']) || 0);
      return acc;
    }, {});

    const total = Object.values(totals).reduce((sum, value) => sum + value, 0);
    return Object.entries(totals).map(([Sentiment, count]) => ({
      Sentiment,
      Share: total ? Number(((count / total) * 100).toFixed(1)) : 0,
    }));
  }, [dashboardData]);

  const genreItems = useMemo(() => {
    const genres = (dashboardData?.topGenres ?? []).slice(0, 5);
    const max = Number(genres[0]?.['Total Count']) || 1;

    return genres.map((genre) => ({
      label: genre.Genre,
      value: Number(genre['Total Count']) || 0,
      max,
      display: formatNumber(genre['Total Count']),
    }));
  }, [dashboardData]);

  const yearOptions = useMemo(() => buildYearOptions(allYears), [allYears]);
  const contentTrend = dashboardData?.contentTrend ?? [];
  const hasData = Boolean(dashboardData);

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Overview"
        title="Streaming intelligence, at a glance"
        description="Track catalog growth, audience sentiment, and the talent powering Netflix's library — all in one focused workspace."
      >
        <FilterSelect
          label="Year"
          icon={CalendarRange}
          value={selectedYear}
          onChange={(event) => setSelectedYear(event.target.value)}
          options={yearOptions}
          ariaLabel="Filter by release year"
        />
        <span className="chip">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Live API
        </span>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          index={0}
          label="Total titles"
          value={hasData ? formatNumber(stats.totalTitles) : '—'}
          sublabel={selectedYear === 'all' ? 'Full catalog' : `Released in ${selectedYear}`}
          icon={Clapperboard}
          tone="red"
        />
        <StatCard
          index={1}
          label="Movies"
          value={hasData ? formatNumber(stats.movies) : '—'}
          sublabel={hasData ? `${formatPercent(stats.movieShare, 1)} of catalog` : 'Feature films'}
          icon={Clapperboard}
          tone="violet"
        />
        <StatCard
          index={2}
          label="TV shows"
          value={hasData ? formatNumber(stats.tvShows) : '—'}
          sublabel={
            hasData ? `${formatPercent(100 - stats.movieShare, 1)} of catalog` : 'Series & shows'
          }
          icon={Tv}
          tone="cyan"
        />
        <StatCard
          index={3}
          label="Directors"
          value={hasData ? formatNumber(stats.directors) : '—'}
          sublabel="Unique creators"
          icon={Users}
          tone="emerald"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <ChartCard
          className="xl:col-span-2"
          index={1}
          title="Catalog growth"
          subtitle="Movies and TV shows added to Netflix by release year"
          action={
            <span className="chip">
              <TrendingUp size={12} className="text-brand-soft" />
              {formatNumber(contentTrend.reduce((sum, item) => sum + (Number(item['Total Count']) || 0), 0))}{' '}
              titles
            </span>
          }
        >
          <LineChart
            data={contentTrend}
            xKey="Release Year"
            yKey="Total Count"
            colorKey="Type"
            height={330}
          />
        </ChartCard>

        <ChartCard
          index={2}
          title="Sentiment mix"
          subtitle="Audience tone across title descriptions"
        >
          <BarChart
            data={sentimentRows}
            xKey="Share"
            yKey="Sentiment"
            orientation="h"
            colorKey="Sentiment"
            height={330}
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <ChartCard
          index={1}
          title="Top actors"
          subtitle="Most frequent cast members in the catalog"
        >
          <BarChart data={topActors} xKey="Total Count" yKey="Actor" orientation="h" height={320} />
        </ChartCard>

        <ChartCard
          index={2}
          title="Top genres"
          subtitle="Leading categories by title count"
        >
          <ProgressList items={genreItems} />
        </ChartCard>

        <ChartCard index={3} title="Signals to watch" subtitle="Patterns shaping the platform">
          <ul className="space-y-4">
            {insights.map(({ icon: Icon, title, description, tone }) => (
              <li key={title} className="flex gap-3">
                <span className={`icon-tile h-9 w-9 shrink-0 rounded-lg border ${tone}`}>
                  <Icon size={15} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white">{title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-zinc-500">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </ChartCard>
      </div>

      <div className="card animate-fade-up p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-500/25 bg-brand-500/15 text-brand-300">
              <Sparkles size={18} />
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-white">Want deeper signals?</p>
              <p className="mt-1 max-w-xl text-xs leading-relaxed text-zinc-500">
                Explore sentiment shifts, genre momentum, and regional content trends from the
                navigation. Every view updates against the same live dataset.
              </p>
            </div>
          </div>
          <span className="chip shrink-0">
            <CalendarRange size={12} />
            {selectedYear === 'all' ? 'All years' : selectedYear}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
