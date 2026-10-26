<<<<<<< HEAD
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
=======
import { useEffect, useMemo, useState } from 'react';
import { Clock, Film, Timer, Tv } from 'lucide-react';
import { fetchDurationAnalysis } from '../api';
import BarChart from '../components/BarChart';
import ChartCard from '../components/ChartCard';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import ProgressList from '../components/ProgressList';
import SegmentedControl from '../components/SegmentedControl';
import StatCard from '../components/StatCard';
import { formatNumber } from '../utils';

const mockViewingTimePatterns = {
  peakHours: '8PM – 11PM',
  weekendAvg: '4.5 hrs',
  weekdayAvg: '2.8 hrs',
  completionRate: '76%',
};

const mockGenreDuration = [
  { Genre: 'Action Movies', Duration: '2.3 hrs avg' },
  { Genre: 'Comedy Shows', Duration: '30 min avg' },
  { Genre: 'Drama Series', Duration: '45 min avg' },
];

const mockViewingCompletion = [
  { Content: 'Movies', Percentage: 85 },
  { Content: 'TV episodes', Percentage: 92 },
  { Content: 'Documentaries', Percentage: 78 },
];

const mockWatchTimeTrends = [
  { label: 'Morning', value: 15, display: '15%' },
  { label: 'Afternoon', value: 25, display: '25%' },
  { label: 'Evening', value: 60, display: '60%' },
];

const mean = (values) =>
  values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;

const DurationAnalysis = () => {
  const [durationData, setDurationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchDurationAnalysis();
        if (active) setDurationData(response ?? []);
      } catch (error) {
        console.error('Error fetching duration data:', error);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, []);

  const parsed = useMemo(() => {
    const movieMinutes = [];
    const showSeasons = [];

    durationData.forEach((item) => {
      const text = String(item.Duration ?? '');
      const minuteMatch = text.match(/(\d+)\s*min/i);
      const seasonMatch = text.match(/(\d+)\s*season/i);

      if (minuteMatch) movieMinutes.push(Number(minuteMatch[1]));
      if (seasonMatch) showSeasons.push(Number(seasonMatch[1]));
    });

    return { movieMinutes, showSeasons };
  }, [durationData]);

  const stats = useMemo(
    () => ({
      averageRuntime: Math.round(mean(parsed.movieMinutes)),
      longestRuntime: parsed.movieMinutes.length ? Math.max(...parsed.movieMinutes) : 0,
      averageSeasons: mean(parsed.showSeasons).toFixed(1),
      tracked: parsed.movieMinutes.length + parsed.showSeasons.length,
    }),
    [parsed]
  );

  const runtimeDistribution = useMemo(() => {
    const buckets = [
      { Duration: '< 30 min', test: (value) => value < 30 },
      { Duration: '30–60 min', test: (value) => value >= 30 && value < 60 },
      { Duration: '1–2 hours', test: (value) => value >= 60 && value < 120 },
      { Duration: '> 2 hours', test: (value) => value >= 120 },
    ];

    return buckets.map((bucket) => ({
      Duration: bucket.Duration,
      Titles: parsed.movieMinutes.filter(bucket.test).length,
    }));
  }, [parsed.movieMinutes]);

  const seasonDistribution = useMemo(() => {
    const buckets = [
      { Duration: '1 season', test: (value) => value <= 1 },
      { Duration: '2 seasons', test: (value) => value === 2 },
      { Duration: '3+ seasons', test: (value) => value >= 3 },
    ];

    return buckets.map((bucket) => ({
      Duration: bucket.Duration,
      Titles: parsed.showSeasons.filter(bucket.test).length,
    }));
  }, [parsed.showSeasons]);

  const showingSeries = selectedType === 'TV Shows';
  const distributionData = showingSeries ? seasonDistribution : runtimeDistribution;

  const genreDuration = useMemo(() => {
    if (selectedType === 'Movies') {
      return mockGenreDuration.filter((item) => item.Genre.includes('Movies'));
    }
    if (selectedType === 'TV Shows') {
      return mockGenreDuration.filter(
        (item) => item.Genre.includes('Shows') || item.Genre.includes('Series')
      );
    }
    return mockGenreDuration;
  }, [selectedType]);

  const completionItems = mockViewingCompletion.map((item, index) => ({
    label: item.Content,
    value: item.Percentage,
    display: `${item.Percentage}%`,
    color: ['#e50914', '#22d3ee', '#a78bfa'][index % 3],
  }));

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Formats"
        title="Duration analysis"
        description="Compare movie runtimes, series length, and viewing rhythms to understand how audiences spend time with content."
      >
        <SegmentedControl
          value={selectedType}
          onChange={setSelectedType}
          ariaLabel="Duration content type"
          options={[
            { value: 'All', label: 'All' },
            { value: 'Movies', label: 'Movies' },
            { value: 'TV Shows', label: 'TV Shows' },
          ]}
        />
        <span className="chip">
          <Clock size={12} className="text-brand-soft" />
          {formatNumber(stats.tracked)} titles parsed
        </span>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          index={0}
          label="Average runtime"
          value={stats.averageRuntime ? `${stats.averageRuntime} min` : '—'}
          sublabel={`${formatNumber(parsed.movieMinutes.length)} movies`}
          icon={Clock}
          tone="red"
        />
        <StatCard
          index={1}
          label="Longest runtime"
          value={stats.longestRuntime ? `${stats.longestRuntime} min` : '—'}
          sublabel="Movie duration peak"
          icon={Timer}
          tone="violet"
        />
        <StatCard
          index={2}
          label="Average seasons"
          value={stats.averageSeasons}
          sublabel={`${formatNumber(parsed.showSeasons.length)} series`}
          icon={Tv}
          tone="cyan"
        />
        <StatCard
          index={3}
          label="Titles analyzed"
          value={formatNumber(stats.tracked)}
          sublabel="Movies and series"
          icon={Film}
          tone="emerald"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <ChartCard
          className="xl:col-span-2"
          index={1}
          title={showingSeries ? 'Seasons per series' : 'Movie runtime mix'}
          subtitle={
            showingSeries
              ? 'How many seasons the average series spans'
              : 'Distribution of movie runtimes across the catalog'
          }
        >
          <BarChart
            data={distributionData}
            xKey="Titles"
            yKey="Duration"
            orientation="h"
            height={320}
          />
        </ChartCard>

        <ChartCard index={2} title="Viewing time patterns" subtitle="When audiences watch most">
          <div className="space-y-5 pt-2">
            <div>
              <p className="font-display text-3xl font-extrabold text-white">
                {mockViewingTimePatterns.peakHours}
              </p>
              <p className="mt-1 text-xs text-zinc-500">Peak viewing window</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">Weekend</p>
                <p className="mt-1.5 font-display text-lg font-bold text-white">
                  {mockViewingTimePatterns.weekendAvg}
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">Weekday</p>
                <p className="mt-1.5 font-display text-lg font-bold text-white">
                  {mockViewingTimePatterns.weekdayAvg}
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Completion rate</span>
                <span className="font-semibold text-white">
                  {mockViewingTimePatterns.completionRate}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                  style={{ width: mockViewingTimePatterns.completionRate }}
                />
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ChartCard index={1} title="Genre duration" subtitle="Typical length by format">
          <ul className="space-y-3 pt-1">
            {genreDuration.map((item) => (
              <li
                key={item.Genre}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3"
              >
                <span className="text-sm text-zinc-300">{item.Genre}</span>
                <span className="shrink-0 text-[11px] font-semibold text-zinc-200">
                  {item.Duration}
                </span>
              </li>
            ))}
          </ul>
        </ChartCard>

        <ChartCard index={2} title="Viewing completion" subtitle="How often titles are finished">
          <ProgressList items={completionItems} className="pt-2" />
        </ChartCard>

        <ChartCard index={3} title="Watch time trends" subtitle="Share of daily viewing">
          <ProgressList items={mockWatchTimeTrends} className="pt-2" />
        </ChartCard>

        <ChartCard index={4} title="Binge behaviour" subtitle="Sessions and cadence">
          <div className="space-y-4 pt-2">
            <div>
              <p className="font-display text-3xl font-extrabold text-white">3.2 hrs</p>
              <p className="mt-1 text-xs text-zinc-500">Average binge session</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                Most watched window
              </p>
              <p className="mt-1.5 text-sm font-semibold text-white">Evening · 8PM–11PM</p>
            </div>
            <p className="text-[11px] leading-relaxed text-zinc-500">
              Completion is strongest for episodic content, while films see higher drop-off
              mid-runtime.
            </p>
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default DurationAnalysis;
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
